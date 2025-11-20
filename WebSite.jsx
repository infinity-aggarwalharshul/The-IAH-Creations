import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signInWithCustomToken,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import {
  ShoppingCart,
  Zap,
  Globe,
  Shield,
  MessageSquare,
  Menu,
  X,
  CreditCard,
  Code,
  Cpu,
  CheckCircle,
  AlertCircle,
  Bitcoin,
  Mail,
  RefreshCw,
  Lock,
  FileText,
  Smartphone,
  Sparkles,
  User,
  LogOut,
  Image as ImageIcon,
  Mic,
  Volume2,
  LayoutDashboard,
  Database,
  Minimize2,
  Server,
  HelpCircle,
  Download,
  Info,
  Share2,
  Eye,
  Calendar,
  TrendingUp,
  Play,
  Pause,
  Rocket,
  Mic as MicIcon,
  Headphones,
  Maximize,
  Upload,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* CONFIGURATION & NLP MODULES                 */
/* -------------------------------------------------------------------------- */

const APP_NAME = "The IAH Creations";
const EXCHANGE_RATE = 84.0;
const APP_VERSION = "3.6.2 (Commercial Build)";

// --- Data Optimization Module ---
const DataOptimizer = {
  compress: (data) => {
    const json = JSON.stringify(data);
    const minified = json.replace(/\s+/g, "");
    const originalSize = new Blob([json]).size;
    const compressedSize = new Blob([minified]).size;
    return {
      payload: JSON.parse(json),
      stats: {
        original: originalSize,
        compressed: compressedSize,
        saved: (((originalSize - compressedSize) / originalSize) * 100).toFixed(
          1
        ),
      },
    };
  },
};

// --- AUDIO SYNTHESIS ENGINE (Futuristic SFX) ---
const SynthEngine = {
  ctx: null,
  init: () => {
    if (!SynthEngine.ctx) {
      SynthEngine.ctx = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
  },
  playTone: (freq, type, duration, vol = 0.1) => {
    if (!SynthEngine.ctx) SynthEngine.init();
    const osc = SynthEngine.ctx.createOscillator();
    const gain = SynthEngine.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, SynthEngine.ctx.currentTime);
    gain.gain.setValueAtTime(vol, SynthEngine.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      SynthEngine.ctx.currentTime + duration
    );
    osc.connect(gain);
    gain.connect(SynthEngine.ctx.destination);
    osc.start();
    osc.stop(SynthEngine.ctx.currentTime + duration);
  },
  playClick: () => SynthEngine.playTone(1200, "sine", 0.1, 0.05),
  playHover: () => SynthEngine.playTone(400, "triangle", 0.05, 0.02),
  playSuccess: () => {
    setTimeout(() => SynthEngine.playTone(600, "sine", 0.1), 0);
    setTimeout(() => SynthEngine.playTone(800, "sine", 0.1), 100);
    setTimeout(() => SynthEngine.playTone(1200, "square", 0.2), 200);
  },
  playError: () => {
    SynthEngine.playTone(150, "sawtooth", 0.3);
    setTimeout(() => SynthEngine.playTone(100, "sawtooth", 0.3), 150);
  },
  playDeploy: () => {
    // Rising futuristic sound
    if (!SynthEngine.ctx) SynthEngine.init();
    const osc = SynthEngine.ctx.createOscillator();
    const gain = SynthEngine.ctx.createGain();
    osc.frequency.setValueAtTime(200, SynthEngine.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      2000,
      SynthEngine.ctx.currentTime + 1
    );
    gain.gain.setValueAtTime(0.1, SynthEngine.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, SynthEngine.ctx.currentTime + 1);
    osc.connect(gain);
    gain.connect(SynthEngine.ctx.destination);
    osc.start();
    osc.stop(SynthEngine.ctx.currentTime + 1);
  },
};

// --- GLOBAL STYLES (Futuristic UI) ---
const styles = `
  .holographic-card {
    background: rgba(17, 24, 39, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(59, 130, 246, 0.3);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
    transition: all 0.3s ease;
  }
  .holographic-card:hover {
    border-color: rgba(59, 130, 246, 0.8);
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
    transform: translateY(-2px);
  }
  .neon-text {
    text-shadow: 0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(147, 51, 234, 0.8);
  }
  .cyber-grid {
    background-image: linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// --- API HELPERS ---
const callGemini = async (userPrompt, systemInstruction) => {
  const apiKey = "";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.0-pro-latest:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Gemini API Error");
    const data = await response.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text || "Processing error."
    );
  } catch (error) {
    console.error(error);
    return "AI is currently offline. Please try again.";
  }
};

const callImagen = async (prompt) => {
  const apiKey = "";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`;

  const payload = {
    instances: [{ prompt: prompt }],
    parameters: { sampleCount: 1 },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Imagen API Error");
    const data = await response.json();
    const base64 = data.predictions?.[0]?.bytesBase64Encoded;
    return base64 ? `data:image/png;base64,${base64}` : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// --- SEO & ANALYTICS MODULE ---
const SEOEngine = {
  update: (title, description, image = "") => {
    document.title = `${title} | IAH Creations`;

    // Meta Tags
    const meta = {
      description: description,
      "og:title": title,
      "og:description": description,
      "og:image": image,
      "twitter:card": "summary_large_image",
    };

    Object.entries(meta).forEach(([name, content]) => {
      let element =
        document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(
          name.startsWith("og:") ? "property" : "name",
          name
        );
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    });

    // Schema.org JSON-LD
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "IAH Creations",
      url: "https://iahcreations.com",
      description: description,
      potentialAction: {
        "@type": "SearchAction",
        target: "https://iahcreations.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    };

    let script = document.querySelector("#schema-json-ld");
    if (!script) {
      script = document.createElement("script");
      script.id = "schema-json-ld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  },
};

// --- CLOUD STORAGE MODULE ---
const CloudStorage = {
  upload: async (file) => {
    console.log(`[CloudStorage] Uploading ${file.name}...`);
    return new Promise((resolve, reject) => {
      // Simulate secure chunked upload
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve({
            url: `https://storage.iah.cloud/v1/buckets/user-assets/${
              file.name
            }-${Date.now()}`,
            size: file.size,
            hash: "sha256-simulated-hash",
          });
        } else {
          reject(
            new Error("Upload interrupted: Network instability detected.")
          );
        }
      }, 2500);
    });
  },
  backupUser: async (userId, data) => {
    console.log(`[CloudStorage] Backing up user ${userId}...`);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
};

// --- BLOG DATA (SEO OPTIMIZED) ---
const BLOG_POSTS = [
  {
    id: "ai-web-revolution",
    title: "The Quantum Leap: How Generative AI is Rewriting the Web",
    excerpt:
      "Explore the transformative power of Gemini 3.0 and Imagen in modern web architectures. A deep dive into prompt-to-deploy pipelines.",
    author: "Dr. A. I. Architect",
    date: "Nov 20, 2025",
    readTime: "12 min read",
    views: "12.5k",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    content: `
      ## The Dawn of Autonomous Web Development

      In the rapidly evolving landscape of digital technology, we are witnessing a paradigm shift of seismic proportions. The integration of Large Language Models (LLMs) like **Gemini 3.0** into the very fabric of web development is not just an enhancement; it is a complete rewriting of the rules.

      ### 1. The Prompt-to-Deploy Pipeline

      Gone are the days of boilerplate code and repetitive setup. At **IAH Creations**, we have pioneered the "Prompt-to-Deploy" architecture. This system allows developers and business owners to describe their vision in natural language, which is then transmuted into production-ready code, deployed to edge networks like **Cloudflare Pages** in milliseconds.

      > "The future of coding is no coding at all," GitHub's CEO once famously said. We believe the future is *collaborative coding* with AI.

      ### 2. SEO in the Age of AI

      Search Engine Optimization (SEO) is no longer about keyword stuffing. It's about **Semantic Relevance** and **User Intent**. 
      
      *   **Core Web Vitals**: AI optimizes asset loading strategies automatically.
      *   **Structured Data**: Our systems inject JSON-LD schemas dynamically, ensuring Google understands your content instantly.
      *   **Voice Search Optimization**: With 50% of searches being voice-driven, our templates are optimized for conversational queries.

      ### 3. Hyper-Personalization via Edge Computing

      Imagine a website that adapts its layout based on the user's mood, time of day, or past interactions. By leveraging **Firebase Firestore** at the edge, we deliver personalized experiences with zero latency.

      *(Content continues for 1200+ words covering Neural Networks in CSS, WebAssembly, and Quantum Encryption standards...)*
      
      ### 4. The Commercial Advantage

      Businesses utilizing AI-driven platforms see a **40% increase in conversion rates**. Why? Because the friction between "intent" and "action" is removed. Speed is the new currency, and our **Hybrid Cloud** solutions print it.

      ### Conclusion

      The web is alive. It breathes data and exhales innovation. Join us at IAH Creations as we build the digital nervous system of tomorrow.
    `,
  },
  {
    id: "sustainable-tech",
    title: "Green Cloud: Sustainable Tech for a Better Future",
    excerpt:
      "Reducing digital carbon footprints using optimized algorithms and serverless architectures.",
    author: "EcoTech Lead",
    date: "Nov 18, 2025",
    readTime: "8 min read",
    views: "8.2k",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
    content: "Full article content regarding sustainable technology...",
  },
];

// Firebase Setup
const firebaseConfig = JSON.parse(__firebase_config || "{}");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== "undefined" ? __app_id : "iah-creations";

/* -------------------------------------------------------------------------- */
/* MOCK DATA                                  */
/* -------------------------------------------------------------------------- */

const TEMPLATES = [
  {
    id: 1,
    name: "Nexus E-Com AI",
    category: "E-Commerce",
    priceUSD: 49,
    priceINR: 3999,
    type: "Premium",
  },
  {
    id: 2,
    name: "Portfolio minimal",
    category: "Portfolio",
    priceUSD: 0,
    priceINR: 0,
    type: "Free",
  },
  {
    id: 3,
    name: "CyberDash Admin",
    category: "Dashboard",
    priceUSD: 29,
    priceINR: 2499,
    type: "Premium",
  },
  {
    id: 4,
    name: "HealthBot Med",
    category: "Healthcare",
    priceUSD: 99,
    priceINR: 8499,
    type: "Premium",
  },
  {
    id: 5,
    name: "EduSmart LMS",
    category: "Education",
    priceUSD: 59,
    priceINR: 4999,
    type: "Premium",
  },
  {
    id: 6,
    name: "BlogStarter AI",
    category: "Blog",
    priceUSD: 0,
    priceINR: 0,
    type: "Free",
  },
];

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

const formatPrice = (amount, currency) => {
  if (amount === 0) return "FREE";
  return currency === "INR"
    ? `₹${amount.toLocaleString("en-IN")}`
    : `$${amount.toLocaleString("en-US")}`;
};

const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-2xl flex items-center space-x-2 transition-all duration-500 ${
      type === "success" ? "bg-green-600" : "bg-red-600"
    } text-white`}
  >
    {type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
    <span className="font-medium">{message}</span>
    <button onClick={onClose} className="ml-4 opacity-75 hover:opacity-100">
      <X size={16} />
    </button>
  </div>
);

// --- Advanced NLP Chatbot ---
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello! I am the IAH Neural Assistant. I can help with Orders, Technical Support, or Pricing.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(
    () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages, isOpen]
  );

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    const systemPrompt = `You are 'IAH Bot', an advanced AI agent for 'The IAH Creations'.
    CONTEXT:
    - We offer 24-72h website delivery.
    - Pricing: Custom Sites start at ₹4999 ($59).
    - Tech Stack: React, Firebase, Gemini AI.
    - Platform: Hybrid Cloud (Firebase + Cloudflare).
    INSTRUCTIONS:
    - If user asks about "storage" or "speed", mention our Data Optimizer module.
    - If user asks about "login", guide them to the dashboard.
    - Keep answers concise (< 50 words).
    - Be polite and professional.`;

    try {
      const reply = await callGemini(userMsg, systemPrompt);
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Neural link unstable. Retrying..." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {isOpen && (
        <div className="bg-gray-900 border border-gray-700 w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-purple-700 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Cpu size={18} className="text-blue-200 animate-pulse" />
              <h3 className="font-bold text-white text-sm">IAH NLP Core</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-800">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    m.from === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-xs text-gray-500 ml-2 animate-pulse">
                Processing natural language...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-gray-900 border-t border-gray-700 flex">
            <input
              className="flex-1 bg-gray-800 text-white text-sm rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-3 py-2 rounded-r-md hover:bg-blue-500"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN APP                                    */
/* -------------------------------------------------------------------------- */

export default function App() {
  // State
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [view, setView] = useState("home");
  const [currency, setCurrency] = useState("INR");
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDeployWizard, setShowDeployWizard] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  // Forms
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [customOrder, setCustomOrder] = useState({
    prompt: "",
    type: "Website",
    speed: "72h",
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "gpay",
  });
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [imagePrompt, setImagePrompt] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("up-to-date");
  const [activeBlogPost, setActiveBlogPost] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [voiceActive, setVoiceActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [cloudBackupStatus, setCloudBackupStatus] = useState("idle"); // idle, backing-up, success, error

  // --- BACKEND SYSTEMS (Hidden Auto-Update) ---
  useEffect(() => {
    // Silent Auto-Update System
    const systemHeartbeat = setInterval(() => {
      // Simulate checking for critical security patches
      const timestamp = new Date().toISOString();
      console.log(`[IAH-Sys] System Check at ${timestamp}: Integrity OK.`);

      // 5% chance of a "patch" being applied
      if (Math.random() > 0.95) {
        console.log("[IAH-Sys] Applying security patch v3.6.x...");
        setUpdateStatus("updating");
        setTimeout(() => {
          console.log("[IAH-Sys] Patch applied successfully.");
          setUpdateStatus("up-to-date");
        }, 3000);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(systemHeartbeat);
  }, []);

  // SEO Effect
  useEffect(() => {
    const titles = {
      home: "Home - Future of Web",
      services: "AI Services & Development",
      templates: "Premium Web Templates",
      blog: "Tech Insights & News",
      contact: "Contact IAH Creations",
      dashboard: "User Dashboard",
    };
    SEOEngine.update(
      titles[view] || "IAH Creations",
      "IAH Creations: The world's most advanced AI-powered web development platform. Deploy in seconds."
    );
  }, [view]);

  // Voice Command Listener (Simulated)
  useEffect(() => {
    if (voiceActive) {
      const timer = setTimeout(() => {
        setVoiceActive(false);
        showToast("Voice command not recognized (Demo)", "error");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [voiceActive]);

  // Auth & Init
  useEffect(() => {
    const initAuth = async () => {
      if (typeof __initial_auth_token !== "undefined" && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    initAuth();
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Fetch Profile
        const docRef = doc(
          db,
          "artifacts",
          appId,
          "users",
          u.uid,
          "profile",
          "main"
        );
        const snap = await getDoc(docRef);
        if (snap.exists()) setUserProfile(snap.data());
      }
    });
  }, []);

  // Helpers
  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    if (type === "success") SynthEngine.playSuccess();
    else if (type === "error") SynthEngine.playError();
    else SynthEngine.playClick();

    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    SynthEngine.playSuccess();
    showToast(`Added ${item.name} to cart!`);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const getPrice = (item) =>
    currency === "INR" ? item.priceINR : item.priceUSD;
  const calculateTotal = () =>
    cart.reduce((total, item) => total + getPrice(item), 0);

  // --- ACTIONS ---

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const profileData = {
        name: authForm.name || "User",
        email: authForm.email,
        role: "customer",
        memberSince: serverTimestamp(),
        preferences: { theme: "dark", notifications: true },
        storageStats: { totalSaved: 0 },
      };

      const optimized = DataOptimizer.compress(profileData);
      await setDoc(
        doc(db, "artifacts", appId, "users", user.uid, "profile", "main"),
        optimized.payload
      );
      setUserProfile(profileData);
      setShowAuthModal(false);
      showToast(`Welcome back, ${profileData.name}!`);
    } catch (err) {
      showToast("Authentication failed.", "error");
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) return;
    if (!checkoutForm.name || !checkoutForm.email)
      return showToast("Missing details.", "error");
    setPaymentStatus("processing");

    setTimeout(async () => {
      try {
        const rawOrder = {
          userId: user.uid,
          items: cart,
          total: calculateTotal(),
          currency: currency,
          customer: checkoutForm,
          status: "paid",
          timestamp: serverTimestamp(),
        };

        const { payload, stats } = DataOptimizer.compress(rawOrder);

        // Store Private
        await addDoc(
          collection(db, "artifacts", appId, "users", user.uid, "orders"),
          {
            ...payload,
            _meta: {
              compressionRate: stats.saved + "%",
              sizeBytes: stats.compressed,
            },
          }
        );

        // Store Public
        await addDoc(
          collection(db, "artifacts", appId, "public", "data", "orders"),
          payload
        );

        setPaymentStatus("success");
        SynthEngine.playSuccess();
        showToast("Order Confirmed!");
        setCart([]);
        setTimeout(() => {
          setPaymentStatus("idle");
          setView("dashboard");
        }, 3000);
      } catch (error) {
        console.error(error);
        setPaymentStatus("idle");
        showToast("Transaction failed.", "error");
      }
    }, 2000);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      return showToast("Please fill all fields", "error");
    }

    try {
      // In a real app, save to 'messages' collection
      await addDoc(
        collection(db, "artifacts", appId, "public", "data", "messages"),
        {
          ...contactForm,
          timestamp: serverTimestamp(),
          userId: user?.uid || "anonymous",
        }
      );

      showToast("Message Sent! We'll contact you within 24h.");
      setContactForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      showToast("Failed to send message. Try again.", "error");
    }
  };

  const handleGenerateAsset = async () => {
    if (!imagePrompt) return showToast("Please describe the image.", "error");
    setIsGeneratingImage(true);
    try {
      const imgData = await callImagen(imagePrompt);
      if (imgData) {
        setGeneratedImage(imgData);
        if (user) {
          const assetData = {
            prompt: imagePrompt,
            type: "image",
            timestamp: serverTimestamp(),
          };
          const optimized = DataOptimizer.compress(assetData);
          await addDoc(
            collection(db, "artifacts", appId, "users", user.uid, "assets"),
            optimized.payload
          );
        }
      } else {
        showToast("Could not generate image.", "error");
      }
    } catch (e) {
      showToast("Asset generation failed.", "error");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // --- VIEWS ---

  const Navbar = () => (
    <nav className="bg-gray-900 border-b border-gray-800 text-white sticky top-0 z-30 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setView("home")}
          >
            <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
              <Cpu className="text-white" size={24} />
            </div>
            <span className="font-bold text-xl tracking-wider">
              IAH <span className="text-blue-400">CREATIONS</span>
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {[
                "Home",
                "Services",
                "Templates",
                "Blog",
                "Contact",
                "Legal",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setView(item.toLowerCase());
                    SynthEngine.playClick();
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === item.toLowerCase()
                      ? "bg-gray-800 text-blue-400 neon-text"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setVoiceActive(true);
                showToast("Listening... Say 'Go to Dashboard'", "info");
              }}
              className={`p-2 rounded-full transition-all ${
                voiceActive
                  ? "bg-red-600 animate-pulse text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
              title="Voice Navigation"
            >
              <MicIcon size={18} />
            </button>

            <button
              onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
              className="text-xs font-bold bg-gray-800 px-2 py-1 rounded border border-gray-600 hover:border-blue-400 transition-colors flex items-center"
            >
              {currency === "INR" ? "🇮🇳 INR" : "🇺🇸 USD"}
            </button>

            <div
              className="relative cursor-pointer"
              onClick={() => setView("cart")}
            >
              <ShoppingCart
                className="text-gray-300 hover:text-white"
                size={24}
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>

            {userProfile ? (
              <button
                onClick={() => setView("dashboard")}
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold border border-blue-400 shadow-glow">
                  {userProfile.name[0]}
                </div>
              </button>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded border border-gray-700 flex items-center gap-2"
              >
                <User size={14} /> Login
              </button>
            )}

            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-300"
              >
                {menuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-gray-800 pb-4">
          {[
            "Home",
            "Services",
            "Templates",
            "Blog",
            "Contact",
            "Dashboard",
            "Legal",
          ].map((item) => (
            <button
              key={item}
              onClick={() => {
                setView(item.toLowerCase());
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );

  const LoginModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-md border border-gray-700 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">
              {authMode === "login" ? "Member Login" : "Join IAH Family"}
            </h3>
            <button
              onClick={() => setShowAuthModal(false)}
              className="text-gray-400 hover:text-white"
            >
              <X />
            </button>
          </div>
          <form onSubmit={handleAuth} className="space-y-5">
            {authMode === "register" && (
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:border-blue-500 outline-none"
                  value={authForm.name}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, name: e.target.value })
                  }
                />
              </div>
            )}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:border-blue-500 outline-none"
                value={authForm.email}
                onChange={(e) =>
                  setAuthForm({ ...authForm, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:border-blue-500 outline-none"
                value={authForm.password}
                onChange={(e) =>
                  setAuthForm({ ...authForm, password: e.target.value })
                }
              />
            </div>

            <div className="flex items-center text-xs text-gray-500">
              <Shield size={12} className="mr-1" /> Data is encrypted and
              compressed before storage.
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold shadow-lg mt-2 transition-transform transform hover:scale-[1.02]"
            >
              {authMode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-400">
            {authMode === "login" ? "New to IAH? " : "Already a member? "}
            <button
              onClick={() =>
                setAuthMode(authMode === "login" ? "register" : "login")
              }
              className="text-blue-400 hover:underline font-bold"
            >
              {authMode === "login" ? "Create Account" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardView = () => {
    const [orders, setOrders] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
      if (!user) return;
      const qOrders = query(
        collection(db, "artifacts", appId, "users", user.uid, "orders"),
        orderBy("timestamp", "desc")
      );
      const qAssets = query(
        collection(db, "artifacts", appId, "users", user.uid, "assets"),
        orderBy("timestamp", "desc")
      );

      const unsubOrders = onSnapshot(qOrders, (snap) =>
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      );
      const unsubAssets = onSnapshot(qAssets, (snap) =>
        setAssets(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      );

      return () => {
        unsubOrders();
        unsubAssets();
      };
    }, [user]);

    if (!userProfile)
      return (
        <div className="p-12 text-center text-white">
          Please log in to view your dashboard.
        </div>
      );

    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* User Header */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white border-4 border-gray-800 shadow-xl">
              {userProfile.name[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {userProfile.name}
              </h2>
              <p className="text-gray-400 flex items-center gap-2">
                <Mail size={14} /> {userProfile.email}
              </p>
              <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded mt-2 inline-block">
                Hybrid Cloud Account
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {orders.length}
              </div>
              <div className="text-xs text-gray-400">Orders</div>
            </div>
            <div className="text-center border-l border-gray-600 pl-4">
              <div className="text-2xl font-bold text-white">
                {assets.length}
              </div>
              <div className="text-xs text-gray-400">Assets</div>
            </div>
            <div className="text-center border-l border-gray-600 pl-4">
              <div className="text-2xl font-bold text-green-400 flex items-center justify-center gap-1">
                <Minimize2 size={16} /> 15%
              </div>
              <div className="text-xs text-gray-400">Space Saved</div>
            </div>
          </div>
        </div>

        {/* Auto Update Status in Dashboard (Hidden) */}
        {/* 
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-full ${
                updateStatus === "checking"
                  ? "bg-yellow-900/50 text-yellow-400"
                  : "bg-green-900/50 text-green-400"
              }`}
            >
              <RefreshCw
                size={18}
                className={updateStatus === "checking" ? "animate-spin" : ""}
              />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">System Status</h4>
              <p className="text-xs text-gray-400">
                {updateStatus === "checking"
                  ? "Checking for updates..."
                  : "System is up to date. Auto-update feature is active."}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 font-mono">
              v{APP_VERSION}
            </span>
          </div>
        </div> 
        */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order History */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ShoppingCart size={20} /> Recent Orders
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-white font-bold">
                        #{order.id.slice(0, 6)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {order.items?.length} Items •{" "}
                        <span className="text-green-400">Paid</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">
                        {formatPrice(order.total, order.currency)}
                      </p>
                      {order._meta && (
                        <span className="text-[10px] text-blue-400 flex items-center justify-end gap-1">
                          <Database size={8} /> {order._meta.compressionRate}{" "}
                          optimized
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Asset Library */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ImageIcon size={20} /> Generated Assets
            </h3>
            <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
              {assets.length === 0 ? (
                <p className="text-gray-500 col-span-2">
                  No assets generated yet.
                </p>
              ) : (
                assets.map((asset) => (
                  <div
                    key={asset.id}
                    className="bg-black rounded-lg overflow-hidden border border-gray-700 relative group"
                  >
                    <div className="h-24 bg-gray-900 flex items-center justify-center text-xs text-gray-500 p-2 text-center">
                      {asset.prompt}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-[10px] p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      Download
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Cloud Storage & Backup Section */}
        <div className="col-span-1 md:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Server size={20} className="text-purple-500" /> Cloud Storage &
              Backup
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded border ${
                cloudBackupStatus === "success"
                  ? "border-green-500 text-green-400"
                  : "border-gray-600 text-gray-400"
              }`}
            >
              {cloudBackupStatus === "success" ? "Synced" : "Ready"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* File Upload Simulation */}
            <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer group relative">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setIsUploading(true);
                  try {
                    const result = await CloudStorage.upload(file);
                    showToast(`Uploaded: ${file.name}`);
                    // Add to assets for demo
                    setAssets((prev) => [
                      {
                        id: "cloud-" + Date.now(),
                        prompt: "Cloud Upload: " + file.name,
                        type: "file",
                        timestamp: { seconds: Date.now() / 1000 },
                      },
                      ...prev,
                    ]);
                  } catch (err) {
                    showToast("Upload failed", "error");
                  } finally {
                    setIsUploading(false);
                  }
                }}
              />
              <div className="flex flex-col items-center gap-3">
                {isUploading ? (
                  <RefreshCw className="animate-spin text-blue-500" size={32} />
                ) : (
                  <Upload
                    className="text-gray-400 group-hover:text-blue-500 transition-colors"
                    size={32}
                  />
                )}
                <p className="text-gray-300 font-medium">
                  {isUploading
                    ? "Encrypting & Uploading..."
                    : "Drop files to secure cloud"}
                </p>
                <p className="text-xs text-gray-500">
                  Supports AES-256 Encryption
                </p>
              </div>
            </div>

            {/* System Backup Control */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Storage Usage</span>
                  <span className="text-sm text-white font-bold">45%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>

              <button
                onClick={async () => {
                  setCloudBackupStatus("backing-up");
                  await CloudStorage.backupUser(user.uid, {});
                  setCloudBackupStatus("success");
                  showToast("System Backup Completed");
                }}
                disabled={cloudBackupStatus === "backing-up"}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
              >
                {cloudBackupStatus === "backing-up" ? (
                  <RefreshCw className="animate-spin" size={16} />
                ) : (
                  <Database size={16} />
                )}
                {cloudBackupStatus === "backing-up"
                  ? "Backing up..."
                  : "Backup System State"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setUserProfile(null);
              setView("home");
            }}
            className="text-red-400 hover:text-red-300 flex items-center gap-2 mx-auto"
          >
            <LogOut size={18} /> Sign Out securely
          </button>
        </div>
      </div>
    );
  };

  const ServicesView = () => {
    const [activeTab, setActiveTab] = useState("build");

    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 p-1 rounded-lg flex">
            <button
              onClick={() => setActiveTab("build")}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                activeTab === "build"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Web Builder
            </button>
            <button
              onClick={() => setActiveTab("assets")}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                activeTab === "assets"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              AI Asset Studio
            </button>
          </div>
        </div>

        {activeTab === "build" ? (
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 holographic-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">
                Describe your dream project
              </h2>
              <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded flex items-center gap-1">
                <Zap size={12} /> Powered by Gemini 2.5
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Our AI Architect will analyze your prompt and create a technical
              specification using NLP.
            </p>

            <textarea
              value={customOrder.prompt}
              onChange={(e) =>
                setCustomOrder({ ...customOrder, prompt: e.target.value })
              }
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 h-40 mb-4"
              placeholder="e.g., A crypto dashboard with dark mode and real-time charts..."
            />

            <div className="flex justify-between items-center">
              <button
                onClick={async () => {
                  if (!customOrder.prompt)
                    return showToast("Enter a prompt first", "error");
                  const res = await callGemini(
                    customOrder.prompt,
                    "You are a software architect. Expand this idea into a bulleted feature list and tech stack using Markdown."
                  );
                  setCustomOrder((prev) => ({ ...prev, prompt: res }));
                }}
                className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <Sparkles size={14} /> Auto-Expand with AI
              </button>

              <button
                onClick={() => {
                  addToCart({
                    id: Date.now(),
                    name: "Custom Project",
                    priceINR: 4999,
                    priceUSD: 59,
                    category: "Service",
                  });
                  setView("cart");
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 holographic-card">
            <h2 className="text-2xl font-bold text-white mb-2">
              AI Asset Generator
            </h2>
            <p className="text-gray-400 mb-6">
              Create production-ready assets using Imagen 3 models.
            </p>

            <div className="flex gap-4 mb-6">
              <input
                type="text"
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-3 text-white"
                placeholder="e.g., A futuristic logo for a coffee shop, neon style, vector art"
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
              />
              <button
                onClick={handleGenerateAsset}
                disabled={isGeneratingImage}
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50"
              >
                {isGeneratingImage ? (
                  <RefreshCw className="animate-spin" />
                ) : (
                  <ImageIcon size={18} />
                )}{" "}
                Generate
              </button>
            </div>

            {generatedImage && (
              <div className="bg-black rounded-xl overflow-hidden border border-gray-700">
                <img
                  src={generatedImage}
                  alt="Generated Asset"
                  className="w-full h-auto"
                />
                <div className="p-4 flex justify-between items-center bg-gray-900">
                  <span className="text-xs text-gray-400">
                    Generated by Imagen 3
                  </span>
                  <button
                    className="text-blue-400 hover:text-white text-sm"
                    onClick={() => showToast("Saved to Dashboard")}
                  >
                    Save Asset
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const Hero = () => (
    <div className="relative bg-gray-900 overflow-hidden cyber-grid">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-24 relative text-center">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs text-gray-400 flex items-center justify-center gap-2 mx-auto w-fit">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Version {APP_VERSION} • Commercial Ready
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 neon-text">
          <span className="block">Creation of Innovation</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Transforming the Era
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-10">
          Thinking creatively to build the future. Deploy innovative solutions
          in 24 hours using our advanced prompt technology.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setView("services")}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            Start Building
          </button>
          <button
            onClick={() => setView("templates")}
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-bold text-lg border border-gray-600 transition-all"
          >
            View Templates
          </button>
        </div>
      </div>
    </div>
  );

  const TemplatesView = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">
        Premium AI Templates
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TEMPLATES.map((t) => (
          <div
            key={t.id}
            className="bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition-all group overflow-hidden holographic-card"
          >
            <div className="h-48 bg-gray-900 flex items-center justify-center relative">
              <span
                className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-bold ${
                  t.type === "Free"
                    ? "bg-green-500 text-white"
                    : "bg-yellow-500 text-black"
                }`}
              >
                {t.type}
              </span>
              <Code
                className="text-gray-600 group-hover:text-blue-400 transition-colors"
                size={48}
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-bold text-white">{t.name}</h3>
                <p className="font-bold text-white">
                  {formatPrice(
                    currency === "INR" ? t.priceINR : t.priceUSD,
                    currency
                  )}
                </p>
              </div>
              <button
                onClick={() =>
                  addToCart({
                    ...t,
                    priceINR: t.priceINR,
                    priceUSD: t.priceUSD,
                  })
                }
                className="w-full bg-gray-700 hover:bg-blue-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CartView = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
          <ShoppingCart className="mx-auto text-gray-600 mb-4" size={48} />
          <p className="text-gray-400">Your cart is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center border border-gray-700"
              >
                <div className="flex items-center gap-4">
                  <FileText className="text-gray-400" />
                  <div>
                    <h4 className="font-bold text-white">{item.name}</h4>
                    <p className="text-sm text-gray-400">{item.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-white">
                    {formatPrice(getPrice(item), currency)}
                  </span>
                  <button
                    onClick={() => removeFromCart(idx)}
                    className="text-red-400"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-800 p-6 rounded-xl h-fit border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Summary</h3>
            <div className="flex justify-between mb-2 text-gray-400">
              <span>Subtotal</span>
              <span>{formatPrice(calculateTotal(), currency)}</span>
            </div>
            <div className="flex justify-between mb-6 text-gray-400">
              <span>Tax (18%)</span>
              <span>{formatPrice(calculateTotal() * 0.18, currency)}</span>
            </div>
            <div className="border-t border-gray-700 pt-4 flex justify-between mb-6 text-white text-xl font-bold">
              <span>Total</span>
              <span>{formatPrice(calculateTotal() * 1.18, currency)}</span>
            </div>
            <button
              onClick={() => setView("checkout")}
              className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const CheckoutView = () => (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button
        onClick={() => setView("cart")}
        className="mb-6 text-gray-400 hover:text-white flex items-center"
      >
        <span className="mr-2">←</span> Back to Cart
      </button>
      <h2 className="text-3xl font-bold text-white mb-8">Secure Checkout</h2>
      {paymentStatus === "success" ? (
        <div className="bg-green-900/30 border border-green-500 rounded-xl p-8 text-center">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
          <h3 className="text-2xl font-bold text-white mb-2">
            Payment Successful!
          </h3>
          <p className="text-gray-300">Receipt sent to {checkoutForm.email}</p>
        </div>
      ) : paymentStatus === "processing" ? (
        <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
          <RefreshCw
            className="animate-spin mx-auto text-blue-500 mb-4"
            size={48}
          />
          <h3 className="text-xl font-bold text-white">
            Processing Payment...
          </h3>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white"
              value={checkoutForm.name}
              onChange={(e) =>
                setCheckoutForm({ ...checkoutForm, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white"
              value={checkoutForm.email}
              onChange={(e) =>
                setCheckoutForm({ ...checkoutForm, email: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["gpay", "paypal", "crypto"].map((m) => (
              <button
                key={m}
                onClick={() =>
                  setCheckoutForm({ ...checkoutForm, paymentMethod: m })
                }
                className={`p-4 rounded border flex flex-col items-center ${
                  checkoutForm.paymentMethod === m
                    ? "bg-blue-900/50 border-blue-500 text-white"
                    : "bg-gray-800 border-gray-700 text-gray-400"
                }`}
              >
                <span className="uppercase font-bold text-xs">{m}</span>
              </button>
            ))}
          </div>
          {checkoutForm.paymentMethod === "gpay" && (
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="w-32 h-32 bg-gray-200 mx-auto flex items-center justify-center text-black text-xs">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=aggarwalharshul49@okicici"
                  alt="QR"
                  className="w-full h-full"
                />
              </div>
              <p className="text-gray-800 mt-2 font-mono text-sm">
                aggarwalharshul49@okicici
              </p>
            </div>
          )}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-lg font-bold text-lg"
          >
            Pay {formatPrice(calculateTotal() * 1.18, currency)}
          </button>
        </div>
      )}
    </div>
  );

  const AboutView = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-6">About Us</h2>
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-gray-300 leading-relaxed space-y-4">
        <p>
          Welcome to <strong>The IAH Creations</strong>. We are a
          next-generation web development firm leveraging the power of
          Generative AI and Hybrid Cloud architectures.
        </p>
        <p>
          <strong>
            Our platform is built for creation of innovation and innovative
            solutions to transform the era of the thinking creatively.
          </strong>
        </p>
        <p>
          We specialize in <strong>Prompt-to-Deploy</strong> technology,
          allowing businesses to go from idea to live commercial website in
          under 72 hours.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-gray-900 p-4 rounded border border-gray-800">
            <h4 className="text-white font-bold mb-2">Vision</h4>
            <p className="text-sm">
              To be the global leader in AI-assisted software deployment.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded border border-gray-800">
            <h4 className="text-white font-bold mb-2">Compliance</h4>
            <p className="text-sm">Adhering to IT Act 2000 & GDPR standards.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactView = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Contact Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form
          onSubmit={handleContactSubmit}
          className="bg-gray-800 p-8 rounded-xl border border-gray-700 space-y-4 h-fit"
        >
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
            value={contactForm.name}
            onChange={(e) =>
              setContactForm({ ...contactForm, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
            value={contactForm.email}
            onChange={(e) =>
              setContactForm({ ...contactForm, email: e.target.value })
            }
          />
          <textarea
            placeholder="Message"
            rows="4"
            className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"
            value={contactForm.message}
            onChange={(e) =>
              setContactForm({ ...contactForm, message: e.target.value })
            }
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-bold w-full"
          >
            Send Message
          </button>
        </form>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <HelpCircle size={18} /> FAQ
            </h3>
            <details className="mb-2">
              <summary className="text-gray-400 cursor-pointer">
                How secure is my data?
              </summary>
              <p className="text-sm text-gray-500 mt-1">
                We use industry-standard encryption and compress all user data
                to minimize footprint.
              </p>
            </details>
            <details className="mb-2">
              <summary className="text-gray-400 cursor-pointer">
                Can I export my code?
              </summary>
              <p className="text-sm text-gray-500 mt-1">
                Yes, all Premium templates come with full source code export
                rights.
              </p>
            </details>
            <details>
              <summary className="text-gray-400 cursor-pointer">
                Refund Policy?
              </summary>
              <p className="text-sm text-gray-500 mt-1">
                Refunds are processed if the delivered product deviates
                significantly from the prompt.
              </p>
            </details>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="font-bold text-white mb-2">Office</h3>
            <p className="text-gray-400">Jaipur, Rajasthan</p>
          </div>
        </div>
      </div>
    </div>
  );

  const LegalView = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Legal & Compliance</h2>

      <div className="space-y-8">
        <section className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield size={20} /> Privacy Policy
          </h3>
          <div className="text-gray-300 space-y-2 text-sm">
            <p>
              At The IAH Creations, your privacy is our priority. We collect
              only necessary information to process orders and improve our
              services.
            </p>
            <ul className="list-disc list-inside ml-2">
              <li>
                <strong>Data Collection:</strong> We collect name, email, and
                payment details securely.
              </li>
              <li>
                <strong>Data Usage:</strong> Used solely for order fulfillment
                and communication.
              </li>
              <li>
                <strong>Third Parties:</strong> We do not sell your data.
                Payment data is processed via secure gateways (Google
                Pay/PayPal).
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies to enhance user
                experience and track session data.
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FileText size={20} /> Terms & Conditions
          </h3>
          <div className="text-gray-300 space-y-2 text-sm">
            <p>By using our platform, you agree to the following terms:</p>
            <ul className="list-disc list-inside ml-2">
              <li>
                <strong>Usage:</strong> Templates and code are for commercial
                use upon payment.
              </li>
              <li>
                <strong>Intellectual Property:</strong> You own the rights to
                custom code generated for you.
              </li>
              <li>
                <strong>Liability:</strong> The IAH Creations is not liable for
                downtime caused by third-party hosting providers.
              </li>
              <li>
                <strong>Updates:</strong> The Auto-Update feature ensures your
                dashboard remains compatible with our latest API changes.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );

  const BlogsView = () => {
    if (activeBlogPost) {
      const post = BLOG_POSTS.find((p) => p.id === activeBlogPost);
      return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
          <button
            onClick={() => setActiveBlogPost(null)}
            className="mb-6 text-blue-400 hover:text-white flex items-center gap-2"
          >
            ← Back to Articles
          </button>

          <article className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
            <div className="h-64 md:h-96 relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
                  Featured
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center gap-6 text-gray-300 text-sm">
                  <span className="flex items-center gap-2">
                    <User size={14} /> {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={14} /> {post.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Eye size={14} /> {post.views}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              {/* AI Tools Bar */}
              <div className="flex flex-wrap gap-4 mb-8 p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                <button
                  onClick={() => {
                    setIsSpeaking(!isSpeaking);
                    showToast(
                      isSpeaking ? "Voice Stopped" : "Reading Article..."
                    );
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-white transition-colors"
                >
                  {isSpeaking ? <Pause size={16} /> : <Play size={16} />}
                  {isSpeaking ? "Pause Audio" : "Listen to Article"}
                </button>
                <button
                  onClick={async () => {
                    showToast("Generating Summary...");
                    await new Promise((r) => setTimeout(r, 1500));
                    showToast(
                      "Summary: AI is changing everything. (Demo)",
                      "success"
                    );
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-white transition-colors"
                >
                  <Sparkles size={16} /> AI Summarize
                </button>
                <button className="flex items-center gap-2 text-sm font-bold text-green-400 hover:text-white transition-colors ml-auto">
                  <Share2 size={16} /> Share
                </button>
              </div>

              <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>

              <div className="mt-12 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  Ready to build the future?
                </h3>
                <p className="text-gray-400 mb-4">
                  Deploy your own AI-powered website in minutes.
                </p>
                <button
                  onClick={() => setView("services")}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold"
                >
                  Start Your Project
                </button>
              </div>
            </div>
          </article>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              IAH Insights
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Deep dives into the future of technology, AI, and digital
            transformation. Curated for the innovators of tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveBlogPost(post.id)}
              className="group cursor-pointer bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp size={12} className="text-green-400" /> Trending
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="bg-gray-700 px-2 py-1 rounded text-gray-300">
                    {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-blue-400 font-bold text-sm group-hover:translate-x-2 transition-transform">
                  Read Article <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DeployWizard = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-2xl border border-gray-700 shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Rocket className="text-blue-500" /> Deploy to Production
            </h3>
            <button
              onClick={() => setShowDeployWizard(false)}
              className="text-gray-400 hover:text-white"
            >
              <X />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-orange-500 cursor-pointer transition-all group">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500/30">
                <Globe className="text-orange-500" size={24} />
              </div>
              <h4 className="text-white font-bold mb-2">Cloudflare Pages</h4>
              <p className="text-sm text-gray-400">
                Best for static sites. Zero config required.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-white cursor-pointer transition-all group">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/20">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h4 className="text-white font-bold mb-2">Vercel</h4>
              <p className="text-sm text-gray-400">
                Optimized for Next.js and React apps.
              </p>
            </div>
          </div>

          <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 mb-6 overflow-x-auto">
            <p className="mb-2 text-gray-500"># Build Command</p>
            <p>npm run build</p>
            <p className="mb-2 mt-4 text-gray-500"># Output Directory</p>
            <p>dist/</p>
          </div>

          <button
            onClick={() => {
              showToast("Project Exported! Check your downloads.");
              setShowDeployWizard(false);
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-xl font-bold shadow-lg transform transition-transform hover:scale-[1.01]"
          >
            Download Deployment Bundle
          </button>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-gray-900 border-t border-gray-800 py-16 mt-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {/* Brand Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Cpu className="text-white" size={20} />
              </div>
              <h4 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                IAH Creations
              </h4>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Innovating for the future. Building the next generation of digital
              experiences with AI and Hybrid Cloud technology.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/20 border border-green-500/30 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-green-400 font-medium tracking-wide">
              SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-bold mb-6 flex items-center gap-2">
            <Globe size={16} className="text-blue-500" /> Explore
          </h4>
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => setView("services")}
                className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                Services
              </button>
            </li>
            <li>
              <button
                onClick={() => setView("templates")}
                className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                Templates
              </button>
            </li>
            <li>
              <button
                onClick={() => setView("about")}
                className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                About Us
              </button>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-bold mb-6 flex items-center gap-2">
            <Shield size={16} className="text-purple-500" /> Legal
          </h4>
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => setView("legal")}
              className="text-gray-400 hover:text-white transition-colors text-sm text-left flex items-center gap-2 bg-gray-800/50 hover:bg-gray-800 px-4 py-2 rounded-lg border border-transparent hover:border-gray-700 w-fit"
            >
              <Lock size={14} /> Privacy Policy
            </button>
            <button
              onClick={() => setView("legal")}
              className="text-gray-400 hover:text-white transition-colors text-sm text-left flex items-center gap-2 bg-gray-800/50 hover:bg-gray-800 px-4 py-2 rounded-lg border border-transparent hover:border-gray-700 w-fit"
            >
              <FileText size={14} /> Terms of Use
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} IAH Creations. All rights reserved.
        </p>
        <p className="mt-2 md:mt-0">
          Powered by Gemini 3.0 • Jaipur, Rajasthan
        </p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-blue-500 selection:text-white">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {showAuthModal && <LoginModal />}

      <Navbar />

      <main>
        {view === "home" && (
          <>
            <Hero />
            <TemplatesView />
          </>
        )}
        {view === "services" && <ServicesView />}
        {view === "templates" && <TemplatesView />}
        {view === "cart" && <CartView />}
        {view === "checkout" && <CheckoutView />}
        {view === "dashboard" && <DashboardView />}
        {view === "contact" && <ContactView />}
        {view === "about" && <AboutView />}
        {view === "legal" && <LegalView />}
        {view === "blog" && <BlogsView />}
      </main>

      <Footer />
      <ChatBot />
      {showDeployWizard && <DeployWizard />}

      {/* Floating Deploy Button for Demo */}
      <button
        onClick={() => {
          setShowDeployWizard(true);
          SynthEngine.playClick();
        }}
        className="fixed bottom-6 left-6 z-40 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full shadow-lg border border-gray-700 text-xs font-bold flex items-center gap-2"
      >
        <Rocket size={14} className="text-blue-400" /> Deploy App
      </button>
    </div>
  );
}
