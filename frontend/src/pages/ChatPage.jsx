import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import { sendChatMessage } from '../services/api';
import { Send, Loader2, Bot, User, Sparkles, BookOpen, ChevronDown, Zap, RefreshCw, Copy, Check, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

// ─── Model Definitions ────────────────────────────────────────────────────────
const MODELS = [
  {
    key: 'gemini',
    label: 'Gemini 2.0 Flash',
    provider: 'Google',
    description: 'RAG-grounded · cites IPCC, MoEF, FAO',
    icon: '✨',
    color: '#4285F4',
    free: false,
    badge: 'Best',
  },
  {
    key: 'adk-agent',
    label: 'ADK Climate Agent',
    provider: 'Google ADK',
    description: 'Agentic AI · uses CO₂ calculation tools',
    icon: '🤖',
    color: '#34A853',
    free: false,
    badge: 'Agentic',
  },
  {
    key: 'llama-3-8b',
    label: 'Llama 3.1 8B',
    provider: 'Meta / HF',
    description: 'Best quality free model',
    icon: '🦙',
    color: '#FF6B35',
    free: true,
    badge: 'Free',
  },
  {
    key: 'qwen-2.5-72b',
    label: 'Qwen 2.5 72B',
    provider: 'Alibaba / HF',
    description: 'Powerful reasoning model',
    icon: '🧠',
    color: '#9B59B6',
    free: true,
    badge: 'Free',
  },
  {
    key: 'deepseek-r1-8b',
    label: 'DeepSeek R1 8B',
    provider: 'DeepSeek / HF',
    description: 'Strong open model',
    icon: '🐋',
    color: '#00BCF2',
    free: true,
    badge: 'Free',
  },
  {
    key: 'gemma-3-27b',
    label: 'Gemma 3 27B',
    provider: 'Google / HF',
    description: 'Google open model via HuggingFace',
    icon: '💎',
    color: '#FBBC04',
    free: true,
    badge: 'Free',
  },
];

const SUGGESTED_QUESTIONS = [
  'How much CO₂ does my daily auto-rickshaw ride produce?',
  'How many trees offset a Mumbai–Delhi flight?',
  'Best trees to plant in Bangalore\'s climate?',
  'India\'s grid vs solar — CO₂ comparison?',
  'What is my biggest source of CO₂?',
];

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]/g, '<span style="background:rgba(34,197,94,0.15);padding:1px 6px;border-radius:4px;font-size:11px;color:#4ade80;font-weight:600">$1</span>')
    .replace(/^- /gm, '• ')
    .replace(/^#{1,3} (.+)$/gm, '<strong style="font-size:14px;color:var(--text-primary)">$1</strong>')
    .replace(/\n/g, '<br>');
}

// ─── Model Picker Dropdown ────────────────────────────────────────────────────
function ModelPicker({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const model = MODELS.find(m => m.key === selected) || MODELS[0];

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '7px 12px', borderRadius: 10,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          color: 'var(--text-primary)', cursor: 'pointer',
          fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <span style={{ fontSize: 16 }}>{model.icon}</span>
        {model.label}
        {model.free && (
          <span style={{
            fontSize: 9, padding: '2px 6px', borderRadius: 6,
            background: 'rgba(34,197,94,0.15)', color: 'var(--green-400)',
            fontWeight: 700, letterSpacing: '0.04em',
          }}>FREE</span>
        )}
        <ChevronDown size={13} style={{ opacity: 0.6, transform: open ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 14, padding: 6, zIndex: 100, minWidth: 300,
          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(12px)',
        }}>
          {/* Free models section */}
          <div style={{ fontSize: 10, color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.08em', padding: '6px 10px 4px', textTransform: 'uppercase' }}>
            🤗 Free HuggingFace Models
          </div>
          {MODELS.filter(m => m.free).map(m => (
            <ModelOption key={m.key} model={m} selected={selected} onSelect={(k) => { onChange(k); setOpen(false); }} />
          ))}

          <div style={{ height: 1, background: 'var(--border)', margin: '6px 0' }} />

          {/* Premium models section */}
          <div style={{ fontSize: 10, color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.08em', padding: '4px 10px', textTransform: 'uppercase' }}>
            ✨ Google AI Models
          </div>
          {MODELS.filter(m => !m.free).map(m => (
            <ModelOption key={m.key} model={m} selected={selected} onSelect={(k) => { onChange(k); setOpen(false); }} />
          ))}
        </div>
      )}
    </div>
  );
}

function ModelOption({ model, selected, onSelect }) {
  const isSelected = model.key === selected;
  return (
    <button
      onClick={() => onSelect(model.key)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
        padding: '9px 10px', borderRadius: 9, border: 'none',
        background: isSelected ? 'rgba(34,197,94,0.1)' : 'transparent',
        cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
        outline: isSelected ? '1px solid rgba(34,197,94,0.3)' : 'none',
      }}
      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
    >
      <span style={{ fontSize: 20, flexShrink: 0 }}>{model.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 1 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{model.label}</span>
          {model.badge && (
            <span style={{
              fontSize: 9, padding: '2px 6px', borderRadius: 5, fontWeight: 700,
              background: model.free ? 'rgba(34,197,94,0.15)' : 'rgba(66,133,244,0.15)',
              color: model.free ? '#4ade80' : '#60a5fa',
            }}>{model.badge}</span>
          )}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{model.description}</div>
      </div>
      {isSelected && <span style={{ color: 'var(--green-400)', fontSize: 14 }}>✓</span>}
    </button>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────
function MessageBubble({ msg }) {
  const [copied, setCopied] = useState(false);
  const model = MODELS.find(m => m.key === msg.modelKey);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        {msg.role === 'assistant' ? (
          <>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Bot size={12} color="white" />
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              {msg.modelLabel || 'GreenStep AI'}
            </span>
            {msg.provider && (
              <span style={{
                fontSize: 9, padding: '1px 6px', borderRadius: 5,
                background: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)',
                fontWeight: 600,
              }}>{msg.provider}</span>
            )}
            {msg.toolsUsed?.length > 0 && (
              <span style={{
                fontSize: 9, padding: '1px 6px', borderRadius: 5,
                background: 'rgba(34,197,94,0.1)', color: 'var(--green-400)',
                fontWeight: 600,
              }}>🔧 {msg.toolsUsed.length} tools used</span>
            )}
            {msg.offline && <span className="badge badge-gold" style={{ fontSize: 9 }}>offline</span>}
          </>
        ) : (
          <>
            <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>You</span>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: 'linear-gradient(135deg, #4ade80, #22c55e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <User size={12} color="white" />
            </div>
          </>
        )}
      </div>

      {/* Bubble */}
      <div
        className={msg.role === 'user' ? 'chat-bubble-user glass-card' : 'chat-bubble-ai glass-card'}
        style={{ position: 'relative', maxWidth: '88%', padding: '12px 18px', border: msg.role === 'assistant' ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(255,255,255,0.1)' }}
      >
        {msg.loading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%', background: 'var(--green-500)',
                  animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
            <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>
              {msg.loadingLabel || 'Thinking...'}
            </span>
          </div>
        ) : (
          <>
            <div
              style={{ fontSize: 14, lineHeight: 1.75 }}
              dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
            />
            {msg.role === 'assistant' && msg.content && (
              <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 6 }}>
                <button
                  onClick={async () => {
                    const { addCommunityPost } = useAppStore.getState();
                    const newPost = {
                      id: `p_${Date.now()}`,
                      user_name: 'Green Earthling',
                      user_city: 'India',
                      user_avatar: 'G',
                      caption: msg.content,
                      post_type: 'update',
                      likes: 0, liked_by: [], comments: [], badges: ['🤖 AI Shared'], created_at: new Date().toISOString()
                    };
                    await addCommunityPost(newPost);
                    toast.success('Shared to Community Feed! 🌍');
                  }}
                  title="Share to Community"
                  style={{
                    background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
                    borderRadius: 6, padding: '3px 8px', cursor: 'pointer',
                    color: 'var(--green-400)', display: 'flex', alignItems: 'center', gap: 4,
                    fontSize: 11, fontWeight: 600, opacity: 0.8, transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
                >
                  <Share2 size={11} /> Share
                </button>
                <button
                  onClick={handleCopy}
                  title="Copy response"
                  style={{
                    background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)',
                    borderRadius: 6, padding: '3px 6px', cursor: 'pointer',
                    color: 'var(--text-dim)', display: 'flex', alignItems: 'center',
                    opacity: 0.7, transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
                >
                  {copied ? <Check size={11} color="var(--green-400)" /> : <Copy size={11} />}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main ChatPage ─────────────────────────────────────────────────────────────
export default function ChatPage() {
  const { chatMessages, addChatMessage, updateChatMessage, clearChatMessages } = useAppStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama-3-8b');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const getLoadingLabel = (modelKey) => {
    const labels = {
      'adk-agent': 'Agent calling tools...',
      'llama-3-8b': 'Llama thinking...',
      'qwen-2.5-72b': 'Qwen thinking...',
      'deepseek-r1-8b': 'DeepSeek reasoning...',
      'gemma-3-27b': 'Gemma generating...',
      'gemini': 'Searching knowledge base...',
    };
    return labels[modelKey] || 'Thinking...';
  };

  const handleSend = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;
    setInput('');
    setLoading(true);

    const model = MODELS.find(m => m.key === selectedModel) || MODELS[0];

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };
    addChatMessage(userMsg);

    const aiMsgId = (Date.now() + 1).toString();
    addChatMessage({
      id: aiMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      loading: true,
      loadingLabel: getLoadingLabel(selectedModel),
      modelKey: selectedModel,
      modelLabel: model.label,
      provider: model.provider,
    });

    try {
      const history = chatMessages.slice(-8).map(m => ({ role: m.role, content: m.content }));
      const response = await sendChatMessage(messageText, history, selectedModel);

      updateChatMessage(aiMsgId, {
        content: response.response || 'No response generated.',
        loading: false,
        modelLabel: response.model || model.label,
        provider: response.provider || model.provider,
        modelKey: response.model_key || selectedModel,
        toolsUsed: response.tools_used || [],
        icon: response.icon,
      });

    } catch (err) {
      // Rich offline fallback by category
      const q = messageText.toLowerCase();
      let fallback = '';

      if (q.includes('auto') || q.includes('rickshaw')) {
        fallback = 'A CNG auto-rickshaw emits **0.267 kg CO₂/km** [IPCC AR6]. A typical 12 km daily commute = **3.2 kg/day** or **96 kg/month**. 🌱 5 Neem trees can fully offset your monthly commute!';
      } else if (q.includes('flight') || q.includes('mumbai') && q.includes('delhi')) {
        fallback = 'A Mumbai–Delhi flight (≈1,150 km, economy) emits **293 kg CO₂** [IPCC AR6]. That\'s equivalent to **13.5 Neem trees\' annual absorption**. 🌱 Consider train travel — Indian Railways emits only 0.014 kg CO₂/km!';
      } else if (q.includes('bangalore') || q.includes('bengaluru')) {
        fallback = 'Bangalore\'s climate (24°C avg, 800mm rainfall) is ideal for: **Peepal** (22.6 kg CO₂/yr), **Neem** (21.7 kg/yr), **Gulmohar** (18.4 kg/yr) [FAO & ICFRE India]. 🌱 Plant in the monsoon season for best results!';
      } else if (q.includes('solar') || q.includes('electric')) {
        fallback = 'India\'s grid emits **0.716 kg CO₂/kWh** vs solar\'s **0.048 kg CO₂/kWh** (lifecycle) — a **93% reduction** [India MoEF CEA 2023]. A 3 kW rooftop solar system saves ~1.5 tonnes CO₂/year. 🌱 Check PM Surya Ghar scheme for subsidies!';
      } else if (q.includes('tree')) {
        fallback = 'Top CO₂-absorbing trees for India [FAO & ICFRE]:\n- **Banyan**: 28.3 kg/yr\n- **Indian Rosewood**: 24.1 kg/yr\n- **Peepal**: 22.6 kg/yr (absorbs CO₂ even at night!)\n- **Neem**: 21.7 kg/yr\n\n🌱 Plant 50 trees to offset 1 tonne CO₂/year!';
      } else {
        fallback = 'I\'m GreenStep\'s AI climate advisor powered by **Gemini + free HuggingFace LLMs**.\n\nThe backend isn\'t connected, but here\'s what I know:\n- 🚗 Urban Indians emit **4.5–6.5 kg CO₂/day**\n- ⚡ India\'s grid: **0.716 kg CO₂/kWh**\n- 🌳 One Neem tree absorbs **21.7 kg CO₂/year**\n- ✈️ One Mumbai–Delhi flight = **293 kg CO₂**\n\n🌱 *Start by logging your daily activities!*';
      }

      updateChatMessage(aiMsgId, {
        content: fallback,
        loading: false,
        offline: true,
        modelLabel: 'Offline Knowledge Base',
        provider: 'Local',
        modelKey: 'offline',
      });
      toast('Backend not connected — using local knowledge', { icon: '📚' });
    } finally {
      setLoading(false);
    }
  };

  const currentModel = MODELS.find(m => m.key === selectedModel) || MODELS[0];

  return (
    <div
      className="animate-fade-up"
      style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)', maxWidth: 800 }}
    >
      {/* ── Header ── */}
      <div style={{ marginBottom: 16, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'linear-gradient(135deg, rgba(34,197,94,0.3), rgba(34,197,94,0.1))',
              border: '1px solid rgba(34,197,94,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20,
            }}>
              {currentModel.icon}
            </div>
            <div>
              <h1 style={{ fontSize: 19, fontWeight: 800, fontFamily: 'Space Grotesk', marginBottom: 2 }}>
                GreenStep AI Advisor
              </h1>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <Sparkles size={11} color="var(--green-500)" />
                <span>{currentModel.label} · {currentModel.provider}</span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                <BookOpen size={11} />
                <span>IPCC AR6 · India MoEF · FAO</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ModelPicker selected={selectedModel} onChange={setSelectedModel} />
            {chatMessages.length > 0 && (
              <button
                onClick={() => clearChatMessages()}
                title="Clear chat"
                style={{
                  padding: '7px 10px', borderRadius: 10,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  cursor: 'pointer', color: 'var(--text-dim)',
                  display: 'flex', alignItems: 'center', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <RefreshCw size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Model info bar */}
        <div style={{
          marginTop: 10, padding: '8px 14px', borderRadius: 10,
          background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>
            Active model: <strong style={{ color: 'var(--text-secondary)' }}>{currentModel.label}</strong>
          </span>
          {currentModel.free && (
            <span style={{
              fontSize: 10, padding: '2px 7px', borderRadius: 5,
              background: 'rgba(34,197,94,0.12)', color: 'var(--green-400)', fontWeight: 700,
            }}>FREE — no API key needed</span>
          )}
          {currentModel.key === 'adk-agent' && (
            <span style={{
              fontSize: 10, padding: '2px 7px', borderRadius: 5,
              background: 'rgba(66,133,244,0.12)', color: '#60a5fa', fontWeight: 700,
            }}>🔧 Has tool access</span>
          )}
          <span style={{ fontSize: 11, color: 'var(--text-dim)', marginLeft: 'auto' }}>
            {currentModel.description}
          </span>
        </div>
      </div>

      {/* ── Messages ── */}
      <div style={{
        flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16,
        padding: '4px 0', marginBottom: 16,
        scrollbarWidth: 'thin', scrollbarColor: 'rgba(74,222,128,0.2) transparent',
      }}>
        {chatMessages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
              Ask me anything about carbon footprint
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>
              Powered by {currentModel.free ? 'free HuggingFace LLMs' : 'Google AI'} · Grounded in IPCC AR6, India MoEF & FAO
            </div>
          </div>
        )}

        {chatMessages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Suggested Questions ── */}
      {chatMessages.length <= 1 && (
        <div style={{ marginBottom: 12, flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 8 }}>💡 Try asking:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {SUGGESTED_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={loading}
                style={{
                  padding: '6px 13px', borderRadius: 20,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer',
                  transition: 'all 0.2s', opacity: loading ? 0.5 : 1,
                }}
                onMouseEnter={e => { if (!loading) { e.target.style.borderColor = 'var(--green-500)'; e.target.style.color = 'var(--text-primary)'; } }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-secondary)'; }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Input ── */}
      <div style={{ flexShrink: 0 }}>
        <div
          style={{
            display: 'flex', gap: 10, alignItems: 'flex-end',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 16, padding: '10px 10px 10px 16px',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--green-500)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(34,197,94,0.15)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder={`Ask ${currentModel.label} about CO₂, trees, emissions... (Enter to send)`}
            rows={1}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text-primary)', fontSize: 14, fontFamily: 'Inter, sans-serif',
              resize: 'none', lineHeight: 1.6, paddingTop: 2,
              maxHeight: 120, overflowY: 'auto',
            }}
          />
          <button
            className="btn-primary"
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            style={{ borderRadius: 10, padding: '10px 16px', flexShrink: 0 }}
          >
            {loading
              ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              : <Send size={16} />
            }
          </button>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6, textAlign: 'center' }}>
          Grounded in IPCC AR6 · India MoEF · FAO · Switch models freely with the picker above
        </div>
      </div>

      {/* Bounce animation for loading dots */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
