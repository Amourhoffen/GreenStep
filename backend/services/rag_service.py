"""RAG Service — BM25 + FAISS Hybrid Retrieval"""
import os
import pickle
import asyncio
import numpy as np
from pathlib import Path
from typing import List, Tuple

try:
    from rank_bm25 import BM25Okapi
    BM25_AVAILABLE = True
except ImportError:
    BM25_AVAILABLE = False

try:
    import faiss
    FAISS_AVAILABLE = True
except ImportError:
    FAISS_AVAILABLE = False

try:
    import google.generativeai as genai
    GENAI_AVAILABLE = True
except ImportError:
    GENAI_AVAILABLE = False

# Knowledge base documents
KNOWLEDGE_DOCS = [
    {
        "id": "ipcc_transport",
        "source": "IPCC AR6 WG3",
        "content": """Transport emission factors from IPCC AR6:
        - Petrol car (India): 0.192 kg CO2/km average (0.16-0.24 range depending on engine size)
        - Diesel car (India): 0.171 kg CO2/km
        - CNG auto-rickshaw: 0.267 kg CO2/km (including CH4 emissions)
        - Electric vehicle (India grid): 0.041-0.089 kg CO2/km depending on grid intensity
        - Diesel bus: 0.089 kg CO2/km per passenger
        - Metro/rail (electrified): 0.041 kg CO2/km per passenger
        - Aviation (economy, short-haul <1500km): 0.255 kg CO2/km/passenger
        - Aviation (economy, long-haul >1500km): 0.195 kg CO2/km/passenger
        - Two-wheeler petrol (India): 0.113 kg CO2/km
        - Bicycle/walking: 0.0 kg CO2/km (zero direct emissions)"""
    },
    {
        "id": "india_moef_electricity",
        "source": "India MoEF & CC",
        "content": """India electricity grid emission factors by region (MoEF 2024):
        - National average: 0.716 kg CO2/kWh (CEA grid emission factor 2023)
        - Northern grid (Delhi, UP, Punjab, Haryana, Rajasthan): 0.82 kg CO2/kWh
        - Southern grid (Karnataka, TN, AP, Telangana, Kerala): 0.65 kg CO2/kWh
        - Western grid (Maharashtra, Gujarat, MP, Rajasthan): 0.78 kg CO2/kWh
        - Eastern grid (WB, Bihar, Jharkhand, Odisha): 0.94 kg CO2/kWh
        - Northeastern grid: 0.45 kg CO2/kWh (high hydro share)
        - Solar panel generation: 0.048 kg CO2/kWh (lifecycle, manufacturing)
        LPG cooking gas: 2.983 kg CO2/kg of LPG
        Natural gas: 2.204 kg CO2/m³"""
    },
    {
        "id": "fao_food_emissions",
        "source": "FAO FAOSTAT 2023",
        "content": """Food system carbon footprint (kg CO2e per kg food):
        - Beef: 27.0 kg CO2e/kg (highest due to methane from cattle)
        - Lamb/mutton: 24.5 kg CO2e/kg
        - Pork: 7.6 kg CO2e/kg
        - Chicken: 6.9 kg CO2e/kg
        - Farmed fish (salmon): 5.4 kg CO2e/kg
        - Wild caught fish: 2.5 kg CO2e/kg
        - Eggs: 4.5 kg CO2e/kg
        - Dairy (milk): 3.2 kg CO2e/kg
        - Rice: 2.7 kg CO2e/kg (includes methane from paddy fields)
        - Wheat/bread: 1.4 kg CO2e/kg
        - Lentils/dal: 0.9 kg CO2e/kg (nitrogen fixing, low footprint)
        - Vegetables (local, seasonal): 0.5-2.0 kg CO2e/kg
        - Fruits (local): 0.4-1.1 kg CO2e/kg
        - Imported fruits: 2.0-5.0 kg CO2e/kg (transport included)
        - Coffee: 17.0 kg CO2e/kg (deforestation impact)
        - Chocolate: 19.0 kg CO2e/kg"""
    },
    {
        "id": "tree_absorption_india",
        "source": "FAO & ICFRE India",
        "content": """CO2 absorption rates for common Indian tree species:
        - Neem (Azadirachta indica): 21.7 kg CO2/year (mature); tropical climate optimal
        - Peepal (Ficus religiosa): 22.6 kg CO2/year; absorbs CO2 even at night
        - Banyan (Ficus benghalensis): 28.3 kg CO2/year; large canopy, high biomass
        - Teak (Tectona grandis): 17.5 kg CO2/year; commercially valuable timber
        - Bamboo: 12.0 kg CO2/year per culm (grows fast, sequesters quickly)
        - Mango (Mangifera indica): 15.8 kg CO2/year; fruit + carbon benefit
        - Ashoka (Saraca asoca): 13.2 kg CO2/year; ornamental + carbon
        - Gulmohar (Delonix regia): 18.4 kg CO2/year; fast-growing
        - Eucalyptus: 8.4 kg CO2/year (lower due to allelopathy)
        - Indian Rosewood (Sheesham): 24.1 kg CO2/year; dense wood
        
        Climate adjustment factors:
        - High temperature (>35°C): ×0.95 (heat stress reduces absorption)
        - High humidity (>70%): ×1.05 (faster growth)
        - High rainfall (>1000mm/year): ×1.10
        - Dry conditions (<500mm rainfall): ×0.85"""
    },
    {
        "id": "carbon_reduction_strategies",
        "source": "IPCC AR6 SPM",
        "content": """Highest impact individual carbon reduction strategies (IPCC AR6):
        1. Avoid one long-haul flight: saves 1.5-3.0 tonnes CO2 per round trip
        2. Switch to plant-based diet: saves 0.5-1.5 tonnes CO2/year
        3. Live car-free: saves 1.0-4.7 tonnes CO2/year depending on vehicle
        4. Buy renewable electricity: saves 1.5 tonnes CO2/year (India avg home)
        5. Avoid one transatlantic cruise: saves 0.5-1.0 tonnes CO2
        6. Reduce home heating by 1°C: saves ~8% heating emissions
        7. Switch to EV: saves 0.8-2.4 tonnes CO2/year vs petrol car
        8. Eat local and seasonal: saves 0.15-0.40 tonnes CO2/year
        9. Reduce food waste by 50%: saves 0.3 tonnes CO2/year
        10. Install solar panels: offsets 1.0-2.5 tonnes CO2/year in India"""
    },
    {
        "id": "india_carbon_context",
        "source": "India MoEF NDC 2022",
        "content": """India carbon context:
        - Average Indian per capita CO2 emissions: 1.9 tonnes/year (2022)
        - Global average: 4.7 tonnes/year per person
        - India's NDC target: 45% reduction in emission intensity by 2030 vs 2005
        - India's renewable energy target: 500 GW by 2030
        - India's forest cover target: 33% of land area (currently ~24%)
        - 1 tonne CO2 = roughly 50 trees planted (annual absorption of mature trees)
        - India plants approximately 900 million trees per year under Green India Mission
        - Top CO2 emitting sectors in India: Power (44%), Industry (24%), Transport (13%), Agriculture (15%)
        - Carbon neutral day: emit ≤2.0 kg CO2 per day (world sustainable budget)
        - Average urban Indian emits: 4.5-6.5 kg CO2/day"""
    },
    {
        "id": "shopping_emissions",
        "source": "EPA Emission Factors 2024",
        "content": """Shopping and consumer goods carbon footprint:
        - New smartphone: 70-95 kg CO2e (manufacturing dominated)
        - New laptop: 300-400 kg CO2e
        - New clothing item (fast fashion): 10-30 kg CO2e
        - New clothing item (organic cotton): 4-8 kg CO2e
        - Online order delivery (India, last mile): 0.5-1.5 kg CO2e per package
        - Plastic bag: 1.6 kg CO2e per 1000 bags
        - Paper bag: 1.07 kg CO2e per bag (similar to plastic)
        - Reusable bag (cotton): 272 uses to break even vs plastic
        - New car (manufacturing): 6-35 tonnes CO2e
        - Second-hand clothing: 82% lower CO2 than new
        - Streaming video (1 hour): 0.036 kg CO2e
        - Bitcoin transaction: 270-380 kg CO2e"""
    },
    {
        "id": "greenstep_faq",
        "source": "GreenStep Knowledge Base",
        "content": """Common carbon footprint questions:
        Q: How much CO2 does a tree absorb per year?
        A: A mature tree absorbs 10-48 kg CO2/year depending on species, age, and climate. Indian neem trees absorb ~21.7 kg/year in tropical conditions.
        
        Q: What is a carbon footprint?
        A: The total greenhouse gas emissions caused by an individual, event, or product, expressed as CO2 equivalent (CO2e).
        
        Q: What is carbon neutral?
        A: When your CO2 emissions equal your CO2 removals (through tree planting, renewable energy, etc.).
        
        Q: How does WattTime help calculate electricity emissions?
        A: WattTime provides real-time marginal emission rates for electricity grids, telling you how much CO2 your electricity actually produced at that moment.
        
        Q: What is the 1.5°C carbon budget?
        A: To limit warming to 1.5°C, global per capita emissions must fall to ~2.5 tonnes CO2e/year by 2030. Current world average is 4.7 tonnes.
        
        Q: How long does CO2 stay in the atmosphere?
        A: CO2 molecules stay in the atmosphere for 300-1000 years. This is why reducing emissions now is critical."""
    }
]

CHUNK_SIZE = 300  # words
CHUNK_OVERLAP = 30  # words


def _chunk_documents(docs: List[dict]) -> List[dict]:
    """Split documents into overlapping chunks."""
    chunks = []
    for doc in docs:
        words = doc["content"].split()
        i = 0
        chunk_id = 0
        while i < len(words):
            chunk_words = words[i:i + CHUNK_SIZE]
            chunk_text = " ".join(chunk_words)
            chunks.append({
                "id": f"{doc['id']}_chunk_{chunk_id}",
                "source": doc["source"],
                "content": chunk_text,
            })
            i += CHUNK_SIZE - CHUNK_OVERLAP
            chunk_id += 1
    return chunks


class RAGService:
    def __init__(self):
        self.chunks: List[dict] = []
        self.bm25 = None
        self.faiss_index = None
        self.embeddings: List[List[float]] = []
        self.initialized = False
        self._index_dir = Path(__file__).parent.parent / "rag"

    async def initialize(self):
        """Build or load RAG indexes."""
        self._index_dir.mkdir(exist_ok=True)
        self.chunks = _chunk_documents(KNOWLEDGE_DOCS)
        
        # Build BM25
        if BM25_AVAILABLE:
            tokenized = [c["content"].lower().split() for c in self.chunks]
            self.bm25 = BM25Okapi(tokenized)
        
        # Build FAISS (if available and API key present)
        if FAISS_AVAILABLE and GENAI_AVAILABLE and os.getenv("GEMINI_API_KEY"):
            await self._build_faiss_index()
        
        self.initialized = True

    async def _build_faiss_index(self):
        """Generate embeddings and build FAISS index."""
        try:
            faiss_path = self._index_dir / "faiss.bin"
            embed_path = self._index_dir / "embeddings.pkl"
            
            if faiss_path.exists() and embed_path.exists():
                # Load existing
                self.faiss_index = faiss.read_index(str(faiss_path))
                with open(embed_path, "rb") as f:
                    self.embeddings = pickle.load(f)
                return
            
            # Generate embeddings
            texts = [c["content"] for c in self.chunks]
            batch_embeddings = []
            
            for text in texts:
                result = genai.embed_content(
                    model="models/embedding-001",
                    content=text,
                    task_type="retrieval_document"
                )
                batch_embeddings.append(result["embedding"])
            
            self.embeddings = batch_embeddings
            vectors = np.array(batch_embeddings, dtype=np.float32)
            
            dim = vectors.shape[1]
            self.faiss_index = faiss.IndexFlatIP(dim)  # Inner product (cosine)
            # Normalize for cosine similarity
            faiss.normalize_L2(vectors)
            self.faiss_index.add(vectors)
            
            # Persist
            faiss.write_index(self.faiss_index, str(faiss_path))
            with open(embed_path, "wb") as f:
                pickle.dump(self.embeddings, f)
                
        except Exception as e:
            print(f"FAISS index build failed: {e}")

    def _bm25_retrieve(self, query: str, top_k: int = 10) -> List[Tuple[int, float]]:
        """BM25 retrieval → [(chunk_idx, score)]"""
        if not self.bm25:
            return []
        tokens = query.lower().split()
        scores = self.bm25.get_scores(tokens)
        top_indices = np.argsort(scores)[::-1][:top_k]
        return [(int(i), float(scores[i])) for i in top_indices if scores[i] > 0]

    async def _vector_retrieve(self, query: str, top_k: int = 10) -> List[Tuple[int, float]]:
        """FAISS vector retrieval → [(chunk_idx, score)]"""
        if not self.faiss_index or not GENAI_AVAILABLE:
            return []
        try:
            result = genai.embed_content(
                model="models/embedding-001",
                content=query,
                task_type="retrieval_query"
            )
            query_vec = np.array([result["embedding"]], dtype=np.float32)
            faiss.normalize_L2(query_vec)
            scores, indices = self.faiss_index.search(query_vec, top_k)
            return [(int(idx), float(score)) for idx, score in zip(indices[0], scores[0]) if idx >= 0]
        except Exception:
            return []

    def _reciprocal_rank_fusion(
        self,
        bm25_results: List[Tuple[int, float]],
        vector_results: List[Tuple[int, float]],
        k: int = 60,
        top_k: int = 5
    ) -> List[dict]:
        """Combine BM25 and vector results using RRF."""
        rrf_scores = {}
        
        for rank, (idx, _) in enumerate(bm25_results):
            rrf_scores[idx] = rrf_scores.get(idx, 0) + 1 / (k + rank + 1)
        
        for rank, (idx, _) in enumerate(vector_results):
            rrf_scores[idx] = rrf_scores.get(idx, 0) + 1 / (k + rank + 1)
        
        sorted_chunks = sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)[:top_k]
        
        return [
            {
                "content": self.chunks[idx]["content"],
                "source": self.chunks[idx]["source"],
                "rrf_score": score,
            }
            for idx, score in sorted_chunks
            if idx < len(self.chunks)
        ]

    async def retrieve(self, query: str, top_k: int = 5) -> str:
        """Full hybrid retrieval pipeline → formatted context string."""
        if not self.initialized:
            return "Knowledge base not initialized."
        
        bm25_results = self._bm25_retrieve(query, top_k=10)
        vector_results = await self._vector_retrieve(query, top_k=10)
        
        if not bm25_results and not vector_results:
            # Fallback: return all chunks concatenated (for small corpus)
            all_text = "\n\n".join([c["content"] for c in self.chunks[:3]])
            return all_text
        
        fused = self._reciprocal_rank_fusion(bm25_results, vector_results, top_k=top_k)
        
        context_parts = []
        for chunk in fused:
            context_parts.append(f"[Source: {chunk['source']}]\n{chunk['content']}")
        
        return "\n\n---\n\n".join(context_parts)


# Singleton
rag_service = RAGService()
