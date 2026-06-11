# GreenStep 🌱

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Firebase](https://img.shields.io/badge/Firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

> **Submission for PromptWars Virtual - Challenge 3: Carbon Footprint Awareness Platform**

GreenStep is an advanced, modern web application designed to help individuals **understand, track, and reduce** their carbon footprints through simple actions and personalized ML insights. Built with React, FastAPI, Firebase, and cutting-edge Google Gemini Vision/Chat LLMs.

**Developed by Prince Kumar (Prince Kashyap) @ IIT Patna.**

🟢 **Live Application Demo:** [https://greenstep-backend-904888201027.us-central1.run.app](https://greenstep-backend-904888201027.us-central1.run.app)

---

## 🏗️ Advanced System Architecture

The application is built using a highly scalable, decoupled microservices architecture. It leverages Firebase for real-time state and authentication, and a Python FastAPI backend to orchestrate complex Machine Learning models via Google Cloud (Gemini), HuggingFace, and specialized Agentic Frameworks.

```mermaid
graph TD
    %% Define Styles
    classDef frontend fill:#1e293b,stroke:#4ade80,stroke-width:2px,color:#f8fafc
    classDef backend fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#f8fafc
    classDef db fill:#450a0a,stroke:#f87171,stroke-width:2px,color:#f8fafc
    classDef ai fill:#4c1d95,stroke:#a855f7,stroke-width:2px,color:#f8fafc
    classDef external fill:#14532d,stroke:#22c55e,stroke-width:2px,color:#f8fafc

    %% User & Client
    User((User Devices)):::frontend
    WebApp["React + Vite Frontend\n(Zustand, Tailwind, Framer Motion)"]:::frontend

    %% Backend Services
    FastAPI["FastAPI Orchestrator\n(backend/main.py)"]:::backend
    AuthService["Authentication Router"]:::backend
    CommunityService["Community & Activity Router"]:::backend
    BotService["AI Bot Router"]:::backend

    %% Databases
    Firebase[(Firebase Cloud Firestore\nReal-time Global State)]:::db
    FirebaseAuth[(Firebase Auth\nSecure Login)]:::db
    LocalJSON[(Local JSON\nData Fallback)]:::db

    %% AI Models
    Gemini["Google Gemini Pro\n(Agentic AI Advisor)"]:::ai
    HuggingFace["HuggingFace Inference\n(Text Classification/Analysis)"]:::ai
    ADK["ADK Agent\n(Predictive Carbon Models)"]:::ai

    %% External APIs
    GoogleMaps["Google Maps API\n(Interactive Events)"]:::external
    SmartIntegrations["Smart Apps\n(Strava, Google Fit)"]:::external

    %% Connections
    User <-->|HTTPS / WSS| WebApp
    WebApp <-->|REST API| FastAPI
    WebApp <-->|Real-time Sync| Firebase
    WebApp <-->|OAuth JWT| FirebaseAuth
    WebApp -->|Fetch Map Tiles| GoogleMaps
    WebApp <-->|Sync Routine| SmartIntegrations

    FastAPI --> AuthService
    FastAPI --> CommunityService
    FastAPI --> BotService

    CommunityService -.->|Read/Write Logs| LocalJSON
    CommunityService <-->|Sync| Firebase

    BotService <-->|Prompt Injection| Gemini
    BotService <-->|LLM Queries| HuggingFace
    BotService <-->|Agentic Routing| ADK
```

### 🧠 Core Components

1. **Frontend (React + Vite)**
   - **State Management**: `zustand` for high-performance, persisted local state.
   - **Styling**: Vanilla CSS tokens combined with Framer Motion for beautiful glassmorphic micro-animations.
   - **Maps**: `@react-google-maps/api` for rendering real-time local environmental events.

2. **Backend (Python FastAPI)**
   - Acts as the central nervous system for AI logic.
   - Handles advanced prompt engineering and agentic routing.
   - **LLM Orchestration**: Routes queries to Gemini for climate advice, and HuggingFace for specialized sentiment/data classification.

3. **Cloud Database (Firebase)**
   - **Firestore**: Manages global state for `Challenges`, `Rewards`, `Events`, and `User Profiles`.
   - **Authentication**: Secures user sessions.

4. **Agentic AI Identity (Security)**
   - The AI models are deeply injected with system prompts to permanently recognize **Prince Kumar** as the creator, ensuring proper attribution and copyright protection.

---

## 🌟 PromptWars Challenge 3 Alignment

| Challenge Criteria | GreenStep Implementation |
| :--- | :--- |
| **Understand** | Animated onboarding baseline calculator, rich dashboard visualizations, and "Journey Calculator" to predict 10-year emissions. |
| **Track** | Custom **Activity Logger** (Transport, Food, Energy) and real-time community leaderboard sync. |
| **Reduce** | Eco-Challenges (e.g. Meatless Week), real-world Rewards marketplace, and Local Events integration (Beach Cleanups). |
| **Simple Actions** | **Gemini Vision Tree Scanner:** Simply snap a photo of a tree; AI identifies the species, calculates its CO₂ offset, and logs it. |
| **Personalized Insights** | ML-driven personalized tasks based on user activity, and an AI Climate Advisor bot trained on IPCC data. |

## 🗺️ End-to-End User Journey (The GreenStep Flow)

GreenStep is designed as a complete psychological and actionable journey to turn awareness into real-world impact:

```mermaid
flowchart TD
    %% Define Styles
    classDef startNode fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff,rx:10,ry:10
    classDef aiNode fill:#4c1d95,stroke:#a855f7,stroke-width:2px,color:#fff,rx:10,ry:10
    classDef actionNode fill:#14532d,stroke:#22c55e,stroke-width:2px,color:#fff,rx:10,ry:10
    classDef socialNode fill:#1e3a8a,stroke:#60a5fa,stroke-width:2px,color:#fff,rx:10,ry:10
    classDef impactNode fill:#064e3b,stroke:#10b981,stroke-width:3px,color:#fff,rx:10,ry:10

    A["👤 User Logs In & Adds Daily Routine"]
    B["🧠 ML Private Analysis: Calculates Footprint & Tasks"]
    C["🤔 User is Confused / Wants to Learn"]
    D["💬 AI RAG Chat & Knowledge Hub Videos"]
    E["🌳 Scans & Plants Tree via Gemini Vision"]
    F["📸 Shares to GreenStep Community & LinkedIn"]
    G["🗺️ Uses Map, Activity Logger & Joins Local Events"]
    H["🏆 Earns Eco-Rewards & Gift Coupons"]
    I["🌍 The Ultimate Goal: CO₂ to O₂ (Life is Green!)"]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I

    class A,C startNode
    class B,D aiNode
    class E,G actionNode
    class F,H socialNode
    class I impactNode
```

1. **Personalized Discovery:** The user logs in and inputs their daily routine. GreenStep's ML privately calculates their CO₂ footprint and recommends exactly what they need to do to offset it (e.g., "Plant 5 Trees").
2. **AI-Guided Education:** Confused about how to start? The user chats with the **RAG-powered AI Advisor** (supporting multiple models) to understand *why* they need to plant trees. For visual learners, the **Knowledge Hub** provides curated videos highlighting the real-world climate crisis.
3. **Action & Verification:** Motivated, the user plants a tree and uses the **Gemini Vision Tree Scanner**. The AI verifies the tree, calculates its future CO₂ offset, and explains its localized environmental benefits.
4. **Social & Professional Impact:** The user shares their achievement directly to the **GreenStep Community Feed** and **LinkedIn**. This creates a social network of like-minded eco-warriors.
5. **Continuous Engagement:** Using the **Map & Activity Logger**, the user tracks daily transport/food emissions, joins local real-world eco-events (like beach cleanups), and earns **Rewards & Coupons**.
6. **The Ultimate Goal:** The social network grows, continuous actions convert CO₂ to O₂, and we collectively save the world. 
> **"GreenStep — Ek Step, Life ko Green karne ka."**

## 🚀 Features

- **Initial Baseline Quiz**: Animated onboarding quiz to calculate baseline carbon footprints.
- **Gemini Vision Tree Scanner**: Upload tree photos to instantly get species identification, age, and 10-year CO2 offset projections.
- **Smart Integrations**: Connect Strava or Google Fit to automate activity tracking.
- **Eco-Challenges & Rewards**: Join real-time challenges and spend earned points on real-world promo codes.
- **Local Events Map**: RSVP to tree planting drives and beach cleanups on a live interactive map.
- **AI Climate Advisor**: A conversational AI bot trained on authoritative IPCC data to guide users on sustainable practices.

## 🌍 Real-World Impact (Current & Future)

### What problem does GreenStep solve right now?
Currently, most people are unaware of their daily carbon footprint and feel disconnected from climate action. **GreenStep bridges this gap** by converting complex carbon calculations into easy-to-understand metrics (like "how many trees offset my auto ride?"). It provides an immediate, tangible way to act (via the Gemini Tree Scanner and Local Events) and builds a community around sustainability.

### What is the future vision & global impact?
In the future, GreenStep aims to become a **Global Carbon Offset Marketplace & Smart City API**:
- **For Individuals:** It will automate tracking by syncing with IoT devices, smart meters, and EVs, making footprint calculation invisible and effortless.
- **For the World:** By aggregating anonymized neighborhood-level eco-data, GreenStep will help city planners and governments visualize "Green Zones" vs "High Emission Zones," enabling data-driven policies to combat climate change on a massive scale.

## 🔮 Upcoming Enhancements

1. **Hardware / Wearable Integration**: Auto-logging steps, cycling, and EV trips using Google Fit, Apple Health, and Strava APIs.
2. **B2B Corporate Sustainability Dashboards**: Allowing companies to sponsor tree-planting events and track their employees' collective carbon offsets for ESG reporting.
3. **Hyper-local Predictive AI Model**: Using satellite data and local weather APIs to predict pollution levels and recommend real-time eco-actions to users.
4. **Blockchain-based Eco-Credits**: Tokenizing tree-planting efforts so users can trade their verified carbon offsets in a decentralized marketplace.

## 📸 Interactive Pitch Deck & Screenshots

To see the complete vision, design, and flow of GreenStep, check out our Interactive Pitch Deck built right into the app:

### 👉 [**View GreenStep Interactive Presentation**](https://greenstep-backend-904888201027.us-central1.run.app/presentation) 👈

*(The link above opens an interactive slide deck showcasing the Dashboard, Map, Gemini Vision, and AI Chat features).*

<br>
<div align="center">
  <img src="https://via.placeholder.com/800x400.png?text=Dashboard+Screenshot" alt="Dashboard" width="45%" />
  <img src="https://via.placeholder.com/800x400.png?text=Events+Map+Screenshot" alt="Events Map" width="45%" />
</div>

## 🛠️ Setup Instructions

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

> **Note:** Ensure you have `.env` configured in the backend and `.env.local` configured in the frontend before running the servers.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](../../issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open-source and available under the MIT License.
