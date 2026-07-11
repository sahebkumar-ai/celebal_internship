import { useState, useEffect, useRef, useMemo } from 'react';
import type { User } from '@supabase/supabase-js';
import SignIn from './SignIn';
import { hasSupabaseConfig, supabase } from './lib/supabase';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

type Product = {
  id: string;
  category: string;
  similarity: number;
  confidence: number;
  img: string;
  color: string;
};

// ---------- Mock Data ----------
const CATEGORIES = ["All", "Dresses", "Tshirts", "Shirts", "Jeans", "Casual Shoes", "Handbags"];

const MOCK_PRODUCTS: Product[] = [
  { id: "FSP-20481", category: "Dresses", similarity: 97, confidence: 0.96, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop", color: "Emerald" },
  { id: "FSP-10293", category: "T-Shirts", similarity: 94, confidence: 0.93, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop", color: "Ivory" },
  { id: "FSP-88312", category: "Jeans", similarity: 92, confidence: 0.90, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop", color: "Indigo" },
  { id: "FSP-55190", category: "Jackets", similarity: 91, confidence: 0.89, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop", color: "Black" },
  { id: "FSP-33921", category: "Dresses", similarity: 89, confidence: 0.88, img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop", color: "Blush" },
  { id: "FSP-77201", category: "Shoes", similarity: 88, confidence: 0.86, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop", color: "White" },
  { id: "FSP-10923", category: "Bags", similarity: 86, confidence: 0.84, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop", color: "Tan" },
  { id: "FSP-44512", category: "T-Shirts", similarity: 84, confidence: 0.82, img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=600&fit=crop", color: "Charcoal" },
  { id: "FSP-90122", category: "Accessories", similarity: 83, confidence: 0.81, img: "https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=500&h=600&fit=crop", color: "Gold" },
  { id: "FSP-23011", category: "Jeans", similarity: 81, confidence: 0.79, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop", color: "Washed Blue" },
  { id: "FSP-66712", category: "Dresses", similarity: 79, confidence: 0.77, img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop", color: "Crimson" },
  { id: "FSP-12093", category: "Jackets", similarity: 76, confidence: 0.74, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop", color: "Olive" },
];

const MODEL_DATA = [
  { name: "EfficientNet Baseline", type: "baseline", acc: 81.2, p5: 74.5, r5: 68.2, time: 42, dim: 1280, color: "from-slate-400 to-slate-600" },
  { name: "Fine-Tuned EfficientNet", type: "finetuned", acc: 89.7, p5: 86.3, r5: 82.1, time: 38, dim: 1280, color: "from-indigo-500 to-violet-500" },
  { name: "Siamese Network", type: "siamese", acc: 92.4, p5: 91.8, r5: 89.4, time: 29, dim: 512, color: "from-cyan-400 to-emerald-400" },
];

const PROCESS_STEPS = [
  { title: "Upload Image", desc: "Secure transfer to inference cluster", icon: "↑" },
  { title: "Image Preprocessing", desc: "Resize 224×224 • Normalize • Augment", icon: "✦" },
  { title: "Feature Extraction", desc: "Convolutional backbone activation", icon: "◍" },
  { title: "EfficientNet Embedding", desc: "1280-D vector generation", icon: "⬙" },
  { title: "FAISS Similarity Search", desc: "ANN search over 44k indexed vectors", icon: "◎" },
  { title: "Ranking Results", desc: "Cosine similarity re-ranking", icon: "≡" },
  { title: "Display Recommendations", desc: "Top-K visually similar products", icon: "✓" },
];

const TECH_STACK = [
  { name: "TensorFlow", icon: "TF", grad: "from-orange-400 to-red-500" },
  { name: "EfficientNetB0", icon: "EN", grad: "from-indigo-500 to-purple-500" },
  { name: "FAISS", icon: "FA", grad: "from-cyan-400 to-blue-500" },
  { name: "NumPy", icon: "NP", grad: "from-blue-400 to-indigo-400" },
  { name: "OpenCV", icon: "CV", grad: "from-emerald-400 to-teal-500" },
  { name: "Scikit-learn", icon: "SK", grad: "from-amber-400 to-orange-500" },
  { name: "Siamese Network", icon: "SN", grad: "from-violet-400 to-fuchsia-500" },
  { name: "Transfer Learning", icon: "TL", grad: "from-rose-400 to-pink-500" },
];

const FEATURES = [
  { icon: "◐", title: "Image-Based Search", desc: "Upload any fashion image to find identical visual patterns instantly." },
  { icon: "⬡", title: "Deep Learning", desc: "Powered by EfficientNetB0 pretrained on ImageNet with 5.3M parameters." },
  { icon: "⤢", title: "Transfer Learning", desc: "Fine-tuned on fashion dataset for domain-specific embeddings." },
  { icon: "◎", title: "FAISS Search", desc: "Facebook AI Similarity Search for millisecond ANN retrieval." },
  { icon: "⧉", title: "Siamese Network", desc: "Contrastive learning with shared encoder for similarity optimization." },
  { icon: "▤", title: "Top-K Recommendation", desc: "Dynamic K selection from 1 to 15 with threshold filtering." },
  { icon: "⚡", title: "Fast Retrieval", desc: "29ms average inference on 44k indexed products." },
  { icon: "◫", title: "Interactive Dashboard", desc: "Real-time metrics, pipeline viz, and model comparison." },
  { icon: "◧", title: "Responsive Design", desc: "Optimized for 1920px to 390px with adaptive grids." },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [authReady, setAuthReady] = useState(!hasSupabaseConfig);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState('Guest');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileMeta, setFileMeta] = useState<{ name: string; size: string; res: string } | null>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>(MOCK_PRODUCTS);
  const [apiError, setApiError] = useState<string | null>(null);
  const [topK, setTopK] = useState(10);
  const [threshold, setThreshold] = useState(75);
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedModel, setSelectedModel] = useState("Siamese Network");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastSearchId, setLastSearchId] = useState<number | null>(null);
  const [dbMessage, setDbMessage] = useState<string | null>(null);
  const [pipelineActive, setPipelineActive] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);

  // theme + fonts
  useEffect(() => {
    document.title = "Visio — Visual Product Recommendation System";
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (!hasSupabaseConfig) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      const currentUser = data.session?.user ?? null;

      setUser(currentUser);
      setAuthenticated(Boolean(currentUser));
      setUserName(currentUser?.user_metadata?.full_name || currentUser?.email || 'Guest');
      setAuthReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;

      setUser(currentUser);
      setAuthenticated(Boolean(currentUser));
      setUserName(currentUser?.user_metadata?.full_name || currentUser?.email || 'Guest');
      setAuthReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  // pipeline auto animate
  useEffect(() => {
    const id = setInterval(() => setPipelineActive(p => (p + 1) % 9), 1800);
    return () => clearInterval(id);
  }, []);

  // drag & drop handlers
  const handleFile = (file: File) => {
    if (!file.type.match(/image\/(jpeg|jpg|png)/)) return;
    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    // meta
    const size = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : `${(file.size / 1024).toFixed(0)} KB`;
    const img = new Image();
    img.onload = () => setFileMeta({ name: file.name, size, res: `${img.width} × ${img.height}px` });
    img.src = url;
    setShowResults(false);
    setApiError(null);
    setDbMessage(null);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const startProcessing = async () => {
    if (!previewUrl) return;

    setProcessing(true);
    setProcessStep(0);
    setShowResults(false);
    setApiError(null);
    setDbMessage(null);

    const interval = window.setInterval(() => {
      setProcessStep(step => Math.min(step + 1, PROCESS_STEPS.length - 1));
    }, 520);

    try {
      if (!uploadedFile || uploadedFile.size === 0) {
        setRecommendations(MOCK_PRODUCTS.slice(0, topK));
        return;
      }

      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('k', String(topK));

      const response = await fetch(`${API_BASE_URL}/api/recommend`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || 'Recommendation API request failed.');
      }

      const data = await response.json();
      const products = (data.products || []).map((product: Product) => ({
        ...product,
        img: product.img.startsWith('http') ? product.img : `${API_BASE_URL}${product.img}`,
      }));

      setRecommendations(products);

      if (user && hasSupabaseConfig) {
        const { data: search, error } = await supabase.from('recommendation_searches').insert({
          user_id: user.id,
          uploaded_image: uploadedFile.name,
          recommendations: products,
          model_used: selectedModel,
        }).select('id').single();

        if (error) {
          setDbMessage(`Recommendations loaded. History was not saved: ${error.message}`);
        } else {
          setLastSearchId(search?.id ?? null);
          setDbMessage('Recommendation history saved.');
        }
      }
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Could not fetch recommendations.');
      setRecommendations([]);
    } finally {
      window.clearInterval(interval);
      setProcessStep(PROCESS_STEPS.length - 1);
      setProcessing(false);
      setShowResults(true);
      setTimeout(() => {
        document.getElementById('recommendation-engine')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const filteredProducts = useMemo(() => {
    return recommendations.filter(p => (selectedCat === "All" || p.category === selectedCat) && p.similarity >= threshold).slice(0, topK);
  }, [recommendations, selectedCat, threshold, topK]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenu(false);
  };

  const tryDemo = () => {
    setPreviewUrl("https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&h=800&fit=crop");
    setFileMeta({ name: "demo-product.jpg", size: "2.4 MB", res: "800 × 800px" });
    setUploadedFile(new File([], "demo-product.jpg"));
    setLastSearchId(null);
    setDbMessage(null);
    uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => setShowResults(false), 100);
  };

  const saveFavorite = async (product: Product) => {
    if (!user || !hasSupabaseConfig) {
      setDbMessage('Sign in to save favorites.');
      return;
    }

    const { error } = await supabase.from('favorites').insert({
      user_id: user.id,
      product_name: `${product.category} ${product.id}`,
      image_path: product.img,
      similarity_score: product.similarity,
    });

    setDbMessage(error ? error.message : 'Saved to favorites.');
  };

  const submitFeedback = async (rating: number, comment = '') => {
    if (!user || !hasSupabaseConfig) {
      setDbMessage('Sign in to send feedback.');
      return;
    }

    if (!lastSearchId) {
      setDbMessage('Run a recommendation search before sending feedback.');
      return;
    }

    const { error } = await supabase.from('feedback').insert({
      user_id: user.id,
      recommendation_id: lastSearchId,
      rating,
      comment,
    });

    setDbMessage(error ? error.message : 'Thanks for the feedback.');
  };

  // SIGN IN GATE
  if (!authReady) {
    return (
      <div className={`min-h-screen grid place-items-center ${darkMode ? 'bg-[#08080c] text-zinc-100' : 'bg-[#fcfcfd] text-zinc-900'}`}>
        <div className="text-[14px] font-medium">Loading session...</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <SignIn
        darkMode={darkMode}
        onAuth={() => setAuthenticated(true)}
        onGuest={() => { setUserName('Guest'); setUser(null); setAuthenticated(true); }}
      />
    );
  }

  return (
    <div className={`min-h-screen antialiased transition-colors duration-500 ${darkMode ? 'bg-[#08080c] text-zinc-100' : 'bg-[#fcfcfd] text-zinc-900'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* subtle background gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={`absolute -top-[40%] -right-[20%] w-[80%] h-[80%] rounded-full blur-[120px] opacity-[0.12] ${darkMode ? 'bg-[radial-gradient(circle_at_center,_#6366f1,_transparent_60%)]' : 'bg-[radial-gradient(circle_at_center,_#6366f1,_transparent_70%)]'}`} />
        <div className={`absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-[0.10] ${darkMode ? 'bg-[radial-gradient(circle_at_center,_#06b6d4,_transparent_60%)]' : 'bg-[radial-gradient(circle_at_center,_#06b6d4,_transparent_70%)]'}`} />
        <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] rounded-full blur-[140px] opacity-[0.06] bg-[radial-gradient(circle_at_center,_#a855f7,_transparent_70%)]" />
      </div>

      {/* NAV */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-[16px] transition-all ${darkMode ? 'bg-[#08080c]/70 border-white/[0.06]' : 'bg-white/70 border-zinc-200/60 shadow-[0_1px_0_0_rgba(0,0,0,0.02)]'}`}>
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[12px] bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-[16px] shadow-[0_4px_12px_rgba(99,102,241,0.3)]">V</div>
              <div className="leading-none">
                <div className="font-semibold text-[15px] tracking-tight">Visio</div>
                <div className={`text-[10px] tracking-[0.12em] uppercase font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>AI RECOMMENDATION</div>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'search', label: 'Search' },
                { id: 'recommendation-engine', label: 'Engine' },
                { id: 'model-comparison', label: 'Models' },
                { id: 'evaluation-metrics', label: 'Metrics' },
                { id: 'about', label: 'About' },
              ].map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className={`px-3.5 py-2 rounded-full text-[13.5px] font-medium transition-all hover:scale-[1.02] ${darkMode ? 'hover:bg-white/[0.06] text-zinc-400 hover:text-white' : 'hover:bg-zinc-900/[0.04] text-zinc-600 hover:text-zinc-900'}`}>{item.label}</button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className={`w-9 h-9 rounded-full grid place-items-center transition-all border ${darkMode ? 'bg-white/[0.06] border-white/[0.08] hover:bg-white/[0.10]' : 'bg-zinc-900/[0.04] border-zinc-200 hover:bg-zinc-900/[0.08]'}`}>
              <span className="text-[14px]">{darkMode ? '☾' : '☀'}</span>
            </button>
            <a href="https://github.com" target="_blank" className={`hidden md:grid w-9 h-9 rounded-full place-items-center border transition-all ${darkMode ? 'bg-white/[0.06] border-white/[0.08] hover:bg-white/[0.10]' : 'bg-white border-zinc-200 hover:bg-zinc-50'} `}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
            </a>
            <div className="hidden md:flex items-center gap-2.5 pl-3 ml-2 border-l border-zinc-200/60 dark:border-white/[0.08]">
              <div className="leading-tight text-right">
                <div className="text-[12.5px] font-semibold">{userName}</div>
                <div className={`text-[10.5px] ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Pro Plan</div>
              </div>
              <button
                onClick={async () => { if (user && hasSupabaseConfig) await supabase.auth.signOut(); setUser(null); setAuthenticated(false); setShowResults(false); setPreviewUrl(null); setUploadedFile(null); setFileMeta(null); }}
                title="Sign out"
                className="relative group w-8 h-8 rounded-full overflow-hidden ring-2 ring-white dark:ring-white/10 hover:ring-indigo-400 transition-all"
              >
                <img src="https://i.pravatar.cc/100?img=33" alt="avatar" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-zinc-900/70 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                </div>
              </button>
            </div>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden w-9 h-9 rounded-full grid place-items-center bg-zinc-900 text-white dark:bg-white dark:text-black">☰</button>
          </div>
        </div>
        {mobileMenu && (
          <div className={`lg:hidden border-t px-4 py-4 space-y-1 ${darkMode ? 'bg-[#0e0e14] border-white/[0.06]' : 'bg-white border-zinc-200'}`}>
            {[
              { id: 'home', label: 'Home' },
              { id: 'search', label: 'Search' },
              { id: 'recommendation-engine', label: 'Recommendation Engine' },
              { id: 'model-comparison', label: 'Model Comparison' },
              { id: 'evaluation-metrics', label: 'Evaluation Metrics' },
              { id: 'about', label: 'About' },
            ].map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className={`w-full text-left px-4 py-3 rounded-[12px] text-[14px] font-medium ${darkMode ? 'hover:bg-white/[0.06]' : 'hover:bg-zinc-50'}`}>{item.label}</button>
            ))}
          </div>
        )}
      </header>

      <main className="relative mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
        {/* HERO */}
        <section id="home" className="pt-12 md:pt-20 pb-16 md:pb-24 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-8 items-center">
          <div className="space-y-8">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium tracking-wide border ${darkMode ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> NEW • EfficientNet + FAISS • 29ms Retrieval
            </div>
            <div className="space-y-5">
              <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-[700] leading-[0.92] tracking-[-0.03em]">
                AI-Powered <br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">Visual Product</span> <br />
                Recommendation
              </h1>
              <p className={`text-[16px] md:text-[18px] leading-[1.6] max-w-[560px] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Upload any fashion product image and instantly discover visually similar products using <span className={`font-medium ${darkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>EfficientNet, Transfer Learning, Siamese Networks, and FAISS.</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => uploadRef.current?.scrollIntoView({ behavior: 'smooth' })} className="h-[48px] px-7 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-medium text-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.20)] hover:translate-y-[-1px] active:translate-y-[0px] transition-all">
                Upload Image →
              </button>
              <button onClick={tryDemo} className={`h-[48px] px-7 rounded-full font-medium text-[14px] border backdrop-blur transition-all hover:translate-y-[-1px] ${darkMode ? 'bg-white/[0.06] border-white/[0.08] hover:bg-white/[0.10]' : 'bg-white border-zinc-200 hover:bg-zinc-50 shadow-[0_4px_12px_rgba(0,0,0,0.04)]'}`}>
                Try Demo
              </button>
              <div className={`flex items-center gap-2 text-[12px] ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => <img key={i} src={`https://i.pravatar.cc/32?img=${10 + i}`} className="w-7 h-7 rounded-full border-2 border-white dark:border-[#08080c]" alt="" />)}
                </div>
                Trusted by 2k+ stylists
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-[460px] pt-2">
              {[
                { k: "44k+", v: "Indexed Products" },
                { k: "92.4%", v: "Top-5 Precision" },
                { k: "29ms", v: "Avg Inference" },
              ].map(m => (
                <div key={m.k} className={`rounded-[16px] p-4 border ${darkMode ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'}`}>
                  <div className="text-[20px] font-bold tracking-tight">{m.k}</div>
                  <div className={`text-[11px] uppercase tracking-widest font-medium ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* animated illustration */}
          <div className="relative">
            <div className={`relative rounded-[32px] overflow-hidden border p-3 md:p-4 ${darkMode ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-zinc-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)]'}`}>
              <div className="rounded-[20px] overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-900 dark:to-black relative aspect-[4/3.2]">
                <div className="absolute inset-0">
                  <img src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&h=700&fit=crop" alt="fashion" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* AI scan lines */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 animate-[scan_3s_linear_infinite]" style={{ animation: 'scan 3s linear infinite' }} />
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.15]">
                      {Array.from({ length: 36 }).map((_, i) => <div key={i} className="border-[0.5px] border-white/20" />)}
                    </div>
                    {/* bounding boxes */}
                    <div className="absolute top-[22%] left-[18%] w-[28%] h-[32%] border border-cyan-400 rounded-[6px] shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                      <div className="absolute -top-5 left-0 px-2 py-0.5 rounded-full bg-cyan-400 text-[10px] font-bold text-black">DRESS 96%</div>
                      <div className="absolute w-2 h-2 bg-cyan-400 rounded-full -top-1 -left-1" />
                      <div className="absolute w-2 h-2 bg-cyan-400 rounded-full -top-1 -right-1" />
                      <div className="absolute w-2 h-2 bg-cyan-400 rounded-full -bottom-1 -left-1" />
                      <div className="absolute w-2 h-2 bg-cyan-400 rounded-full -bottom-1 -right-1" />
                    </div>
                    <div className="absolute bottom-[18%] right-[16%] w-[24%] h-[28%] border border-violet-400 rounded-[6px] shadow-[0_0_20px_rgba(167,139,250,0.6)]">
                      <div className="absolute -top-5 left-0 px-2 py-0.5 rounded-full bg-violet-400 text-[10px] font-bold text-black">BAG 88%</div>
                    </div>
                  </div>
                </div>
                {/* bottom glass panel */}
                <div className="absolute bottom-3 left-3 right-3 rounded-[14px] bg-white/10 backdrop-blur-[16px] border border-white/10 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[10px] bg-white text-black grid place-items-center font-bold">EN</div>
                    <div>
                      <div className="text-white text-[13px] font-medium leading-none">EfficientNet-B0 • Embedding</div>
                      <div className="text-white/60 text-[11px] mt-1 font-mono">1280-D • cosine distance 0.04</div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-400 grid place-items-center text-black font-bold">✓</div>
                </div>
              </div>
              {/* floating cards */}
              <div className={`absolute -right-4 top-[18%] hidden md:flex rounded-[14px] p-2.5 items-center gap-2.5 border shadow-[0_12px_32px_rgba(0,0,0,0.12)] ${darkMode ? 'bg-[#14141c] border-white/[0.08]' : 'bg-white border-zinc-200'}`}>
                <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop" className="w-12 h-12 rounded-[10px] object-cover" alt="" />
                <div>
                  <div className="text-[12px] font-semibold">Similar • 94%</div>
                  <div className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Floral Summer Dress</div>
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white grid place-items-center text-[12px]">↗</div>
              </div>
              <div className={`absolute -left-6 bottom-[22%] hidden md:flex rounded-[14px] p-2.5 items-center gap-2.5 border shadow-[0_12px_32px_rgba(0,0,0,0.12)] ${darkMode ? 'bg-[#14141c] border-white/[0.08]' : 'bg-white border-zinc-200'}`}>
                <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-indigo-500 to-violet-500 grid place-items-center text-white font-bold text-[11px]">FAISS</div>
                <div>
                  <div className="text-[12px] font-semibold">Indexed in 29ms</div>
                  <div className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>44,000 vectors</div>
                </div>
              </div>
            </div>
            {/* glow */}
            <div className="absolute -z-10 inset-0 blur-[50px] opacity-30 bg-gradient-to-br from-indigo-400 via-violet-400 to-cyan-300 rounded-[32px] translate-y-6" />
          </div>
        </section>

        {/* UPLOAD */}
        <section ref={uploadRef} id="search" className="pb-20">
          <div className={`rounded-[24px] border p-6 md:p-8 ${darkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-zinc-200 shadow-[0_8px_40px_rgba(0,0,0,0.04)]'}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-[22px] font-semibold tracking-tight">Upload Product Image</h2>
                <p className={`text-[13.5px] mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Drag & drop or browse • JPG, JPEG, PNG • Max 10MB • 224×224 auto-resized</p>
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium border ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> AI Engine Online
              </div>
            </div>

            {!previewUrl ? (
              <div
                onDragOver={e => { e.preventDefault(); setIsDrag(true); }}
                onDragLeave={() => setIsDrag(false)}
                onDrop={onDrop}
                className={`group relative rounded-[20px] border-[1.5px] border-dashed p-8 md:p-12 text-center transition-all ${isDrag ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10 scale-[1.01]' : darkMode ? 'border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]' : 'border-zinc-300 hover:border-zinc-400 bg-zinc-50/50 hover:bg-zinc-50'}`}
              >
                <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                <div className="mx-auto max-w-[420px] space-y-5">
                  <div className={`mx-auto w-16 h-16 rounded-[18px] grid place-items-center text-[26px] shadow-sm border transition-transform group-hover:scale-105 ${darkMode ? 'bg-white/[0.06] border-white/[0.08]' : 'bg-white border-zinc-200'}`}>◫</div>
                  <div>
                    <div className="text-[16px] font-medium">Drop fashion image here</div>
                    <div className={`text-[13px] mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>or click to browse from your device</div>
                  </div>
                  <button onClick={() => fileInputRef.current?.click()} className="h-10 px-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-[13px] font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform">Browse Files</button>
                  <div className="flex justify-center gap-2">
                    {["JPG", "JPEG", "PNG"].map(fmt => (
                      <span key={fmt} className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest border ${darkMode ? 'bg-white/[0.04] border-white/[0.06] text-zinc-400' : 'bg-white border-zinc-200 text-zinc-500'}`}>{fmt}</span>
                    ))}
                  </div>
                </div>
                {isDrag && (
                  <div className="absolute inset-0 rounded-[20px] bg-indigo-500/10 backdrop-blur-sm grid place-items-center">
                    <div className="bg-white dark:bg-zinc-900 px-5 py-3 rounded-full shadow-lg text-[13px] font-medium">Release to upload</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-[340px_1fr] gap-6">
                <div className={`relative rounded-[20px] overflow-hidden border aspect-square ${darkMode ? 'border-white/[0.08] bg-black' : 'border-zinc-200 bg-zinc-50'}`}>
                  <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-bold shadow flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Uploaded successfully</div>
                  <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[20px]" />
                </div>
                <div className="space-y-5">
                  <div className={`rounded-[16px] border p-5 space-y-4 ${darkMode ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-zinc-50/80 border-zinc-200'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="font-medium text-[14px] truncate">{fileMeta?.name}</div>
                        <div className={`text-[12px] mt-1 font-mono ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{fileMeta?.size} • {fileMeta?.res} • RGB</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => fileInputRef.current?.click()} className={`h-8 px-3 rounded-full text-[12px] font-medium border ${darkMode ? 'bg-white/[0.06] border-white/[0.08] hover:bg-white/[0.10]' : 'bg-white border-zinc-200 hover:bg-zinc-50'}`}>Replace</button>
                        <button onClick={() => { setPreviewUrl(null); setUploadedFile(null); setFileMeta(null); setShowResults(false); }} className="h-8 px-3 rounded-full text-[12px] font-medium bg-red-500 text-white hover:bg-red-600">Remove</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { k: "Preprocess", v: "224×224" },
                        { k: "Encode", v: "EfficientNet-B0" },
                        { k: "Search", v: "FAISS Index" },
                      ].map(i => (
                        <div key={i.k} className={`rounded-[12px] p-3 border ${darkMode ? 'bg-black/30 border-white/[0.06]' : 'bg-white border-zinc-200'}`}>
                          <div className={`text-[10px] uppercase tracking-widest font-semibold ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{i.k}</div>
                          <div className="text-[12px] font-medium mt-1">{i.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button onClick={startProcessing} className="h-[44px] px-6 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[13.5px] font-medium shadow-[0_8px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_12px_24px_rgba(99,102,241,0.45)] hover:translate-y-[-1px] active:translate-y-[0px] transition-all flex items-center gap-2">
                      <span>✦</span> Find Similar Products
                    </button>
                    <div className={`h-[44px] px-4 rounded-full border flex items-center gap-2 text-[12px] ${darkMode ? 'bg-white/[0.03] border-white/[0.06] text-zinc-400' : 'bg-white border-zinc-200 text-zinc-500'}`}>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Model: {selectedModel} • Embedding: 512-D
                    </div>
                  </div>

                  <div className={`rounded-[12px] p-3 flex gap-3 text-[12px] leading-[1.5] ${darkMode ? 'bg-amber-500/10 border border-amber-500/20 text-amber-200' : 'bg-amber-50 border border-amber-200 text-amber-800'}`}>
                    <span className="text-[14px]">⚑</span>
                    <span>Tip: For best accuracy, use clear product photos with neutral background. Our Siamese Network is optimized for fashion texture & silhouette matching.</span>
                  </div>
                </div>
                {/* hidden file input for replace */}
                <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
              </div>
            )}

            {/* processing timeline */}
            {processing && (
              <div className={`mt-8 rounded-[20px] border p-6 md:p-7 ${darkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-zinc-50 border-zinc-200'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-[15px] flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-indigo-600 text-white grid place-items-center text-[12px]">⚡</span> AI Processing Pipeline</h3>
                  <div className={`px-3 py-1 rounded-full text-[11px] font-medium border ${darkMode ? 'bg-white/[0.06] border-white/[0.08]' : 'bg-white border-zinc-200'}`}>{processStep + 1} / {PROCESS_STEPS.length}</div>
                </div>
                <div className="grid md:grid-cols-7 gap-3">
                  {PROCESS_STEPS.map((s, idx) => {
                    const done = idx < processStep;
                    const active = idx === processStep;
                    return (
                      <div key={s.title} className={`relative rounded-[14px] border p-3.5 transition-all duration-500 ${active ? (darkMode ? 'bg-indigo-500/15 border-indigo-500/30 scale-[1.02] shadow-[0_0_20px_rgba(99,102,241,0.25)]' : 'bg-white border-indigo-300 shadow-[0_8px_20px_rgba(99,102,241,0.15)] scale-[1.02]') : done ? (darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200') : darkMode ? 'bg-white/[0.02] border-white/[0.06] opacity-70' : 'bg-white border-zinc-200 opacity-80'}`}>
                        <div className={`w-8 h-8 rounded-full grid place-items-center text-[14px] font-bold mb-2.5 border ${done ? 'bg-emerald-500 text-white border-emerald-500' : active ? 'bg-indigo-600 text-white border-indigo-600 animate-pulse' : darkMode ? 'bg-white/[0.06] border-white/[0.08] text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-500'}`}>{done ? '✓' : s.icon}</div>
                        <div className="text-[12px] font-semibold leading-tight">{s.title}</div>
                        <div className={`text-[10.5px] leading-[1.4] mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{s.desc}</div>
                        {active && <div className="mt-3 h-1 rounded-full bg-zinc-200 dark:bg-white/10 overflow-hidden"><div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 animate-[shimmer_1.2s_ease-in-out_infinite]" style={{ width: '60%' }} /></div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* RECOMMENDATION ENGINE */}
        {showResults && (
          <section id="recommendation-engine" className="pb-20">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* filters sidebar */}
              <aside className="lg:w-[300px] shrink-0">
                <div className={`sticky top-[80px] rounded-[20px] border p-5 space-y-6 ${darkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
                  <div>
                    <h3 className="font-semibold text-[14px]">Filters</h3>
                    <p className={`text-[12px] mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Refine similarity search</p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-[12px] font-medium uppercase tracking-widest">Top-K</label>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono border ${darkMode ? 'bg-white/[0.06] border-white/[0.08]' : 'bg-zinc-50 border-zinc-200'}`}>{topK}</span>
                      </div>
                      <input type="range" min={1} max={15} value={topK} onChange={e => setTopK(parseInt(e.target.value))} className="w-full accent-indigo-600" />
                      <div className="flex justify-between text-[11px] mt-1 text-zinc-500"><span>1</span><span>15</span></div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-[12px] font-medium uppercase tracking-widest">Similarity Threshold</label>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono border ${darkMode ? 'bg-white/[0.06] border-white/[0.08]' : 'bg-zinc-50 border-zinc-200'}`}>{threshold}%</span>
                      </div>
                      <input type="range" min={50} max={95} value={threshold} onChange={e => setThreshold(parseInt(e.target.value))} className="w-full accent-emerald-500" />
                      <div className={`mt-2 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-zinc-100'}`}>
                        <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all" style={{ width: `${threshold}%` }} />
                      </div>
                    </div>

                    <div>
                      <label className="text-[12px] font-medium uppercase tracking-widest block mb-3">Category</label>
                      <div className="grid grid-cols-2 gap-2">
                        {CATEGORIES.map(cat => (
                          <button key={cat} onClick={() => setSelectedCat(cat)} className={`px-3 py-2 rounded-full text-[12px] font-medium border transition-all ${selectedCat === cat ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white shadow' : darkMode ? 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] text-zinc-400' : 'bg-zinc-50 border-zinc-200 hover:bg-white text-zinc-600'}`}>{cat}</button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[12px] font-medium uppercase tracking-widest block mb-3">Model</label>
                      <div className="space-y-2">
                        {[
                          { id: "EfficientNet Baseline", desc: "ImageNet • 1280-D" },
                          { id: "Fine-Tuned EfficientNet", desc: "Fashion-tuned • 1280-D" },
                          { id: "Siamese Network", desc: "Contrastive • 512-D" },
                        ].map(m => (
                          <button key={m.id} onClick={() => setSelectedModel(m.id)} className={`w-full text-left px-3.5 py-3 rounded-[12px] border transition-all ${selectedModel === m.id ? (darkMode ? 'bg-indigo-500/15 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200') : darkMode ? 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]' : 'bg-zinc-50 border-zinc-200 hover:bg-white'}`}>
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded-full border grid place-items-center ${selectedModel === m.id ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-zinc-300 dark:border-white/20'}`}>{selectedModel === m.id && <span className="text-[10px]">✓</span>}</div>
                              <div className="text-[12.5px] font-medium">{m.id}</div>
                            </div>
                            <div className={`text-[11px] mt-1 ml-6 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{m.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button onClick={() => { setTopK(10); setThreshold(75); setSelectedCat("All"); setSelectedModel("Siamese Network"); }} className={`flex-1 h-10 rounded-full border text-[12px] font-medium ${darkMode ? 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]' : 'bg-white border-zinc-200 hover:bg-zinc-50'}`}>Reset</button>
                      <button onClick={() => { /* re-trigger would re-filter via memo */ }} className="flex-1 h-10 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-[12px] font-medium">Apply</button>
                    </div>
                  </div>
                </div>
              </aside>

              {/* results grid */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-[22px] font-semibold tracking-tight">Visually Similar Products</h2>
                    {dbMessage && <p className={`text-[12px] mt-1 ${dbMessage.includes('Sign in') || dbMessage.includes('Run a') ? 'text-amber-500' : 'text-emerald-500'}`}>{dbMessage}</p>}
                    <p className={`text-[13px] mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Found {filteredProducts.length} matches using {selectedModel} • FAISS cosine similarity</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1.5 rounded-full text-[12px] font-medium border flex items-center gap-2 ${darkMode ? 'bg-white/[0.04] border-white/[0.08]' : 'bg-white border-zinc-200'}`}>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live ranking
                      <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono ${darkMode ? 'bg-white/10' : 'bg-zinc-100'}`}>{topK}K</span>
                    </div>
                  </div>
                </div>

                {apiError ? (
                  <div className={`rounded-[20px] border p-12 text-center ${darkMode ? 'bg-red-500/10 border-red-500/20 text-red-100' : 'bg-red-50 border-red-200 text-red-700'}`}>
                    <div className="font-medium">Recommendation API error</div>
                    <div className="text-[13px] mt-2">{apiError}</div>
                    <button onClick={startProcessing} className="mt-4 h-9 px-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-[12px] font-medium">Try again</button>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className={`rounded-[20px] border p-12 text-center ${darkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-zinc-200'}`}>
                    <div className="text-[32px] mb-3">∅</div>
                    <div className="font-medium">No matches above {threshold}%</div>
                    <div className={`text-[13px] mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Try lowering threshold or changing category</div>
                    <button onClick={() => setThreshold(60)} className="mt-4 h-9 px-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-[12px] font-medium">Lower threshold</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                    {filteredProducts.map(product => (
                      <div key={product.id} className={`group relative rounded-[16px] overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] ${darkMode ? 'bg-[#12121a] border-white/[0.06] hover:border-white/[0.12]' : 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]'}`}>
                        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                          <img src={product.img} alt={product.category} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]" />
                          <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold tracking-wide backdrop-blur-md border ${product.similarity > 90 ? 'bg-emerald-500 text-white border-emerald-400' : product.similarity > 80 ? 'bg-amber-500 text-white border-amber-400' : 'bg-zinc-900 text-white border-zinc-700'} shadow-sm`}>{product.similarity}% MATCH</span>
                            <button className="w-7 h-7 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur grid place-items-center text-[12px] hover:scale-110 transition-transform">♡</button>
                          </div>
                          <div className="absolute bottom-0 inset-x-0 h-[50%] bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                          <div className="absolute bottom-2 left-2 right-2">
                            <div className={`h-1 rounded-full overflow-hidden ${darkMode ? 'bg-white/20' : 'bg-white/40'}`}>
                              <div className="h-full bg-white rounded-full" style={{ width: `${product.similarity}%` }} />
                            </div>
                          </div>
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${darkMode ? 'bg-white/[0.06] border-white/[0.08] text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-600'}`}>{product.category}</span>
                            <span className={`text-[10px] font-mono ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{product.id}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${product.confidence > 0.85 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            <span className="text-[11px] font-medium">{(product.confidence * 100).toFixed(1)}% conf</span>
                            <span className={`text-[11px] ml-auto ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{product.color}</span>
                          </div>
                          <button onClick={() => setSelectedProduct(product)} className={`w-full h-8 rounded-full text-[12px] font-medium border transition-all hover:scale-[1.02] active:scale-[0.98] ${darkMode ? 'bg-white text-black border-white hover:bg-zinc-100' : 'bg-zinc-900 text-white border-zinc-900 hover:bg-black'}`}>View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* MODEL COMPARISON */}
        <section id="model-comparison" className="pb-20">
          <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
            <div>
              <h2 className="text-[26px] md:text-[30px] font-semibold tracking-tight">Model Comparison</h2>
              <p className={`text-[13.5px] mt-2 max-w-[560px] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Benchmarking three architectures on Fashion Product Images dataset — optimized for precision, recall and latency.</p>
            </div>
            <div className={`px-3 py-1.5 rounded-full text-[11px] font-mono border ${darkMode ? 'bg-white/[0.04] border-white/[0.08] text-zinc-400' : 'bg-white border-zinc-200 text-zinc-600'}`}>Evaluated on 4,400 val images • 44k indexed</div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 md:gap-5">
            {MODEL_DATA.map(model => (
              <div key={model.name} className={`group relative rounded-[20px] border p-5 md:p-6 overflow-hidden transition-all hover:-translate-y-1 ${darkMode ? 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.10]' : 'bg-white border-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]'}`}>
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${model.color}`} />
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-[14px] bg-gradient-to-br ${model.color} grid place-items-center text-white font-bold text-[12px] shadow-[0_6px_16px_rgba(0,0,0,0.15)]`}>{model.type.slice(0,2).toUpperCase()}</div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest border ${model.type === 'siamese' ? 'bg-emerald-500 text-white border-emerald-500' : darkMode ? 'bg-white/[0.06] border-white/[0.08] text-zinc-300' : 'bg-zinc-900 text-white border-zinc-900'}`}>{model.type === 'siamese' ? 'BEST' : model.type === 'finetuned' ? 'PRO' : 'BASE'}</span>
                </div>
                <h3 className="font-semibold text-[16px] leading-tight">{model.name}</h3>
                <div className={`text-[12px] mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{model.type === 'baseline' ? 'ImageNet features • No fine-tuning' : model.type === 'finetuned' ? 'Fine-tuned on fashion subset' : 'Contrastive learning • Shared encoder'}</div>

                <div className="mt-6 space-y-4">
                  {[
                    { label: "Accuracy", value: model.acc },
                    { label: "Precision@5", value: model.p5 },
                    { label: "Recall@5", value: model.r5 },
                  ].map(metric => (
                    <div key={metric.label}>
                      <div className="flex justify-between text-[11px] mb-1.5">
                        <span className={`uppercase tracking-widest font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{metric.label}</span>
                        <span className="font-mono font-medium">{metric.value}%</span>
                      </div>
                      <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-zinc-100'}`}>
                        <div className={`h-full rounded-full bg-gradient-to-r ${model.color} transition-all duration-[1200ms] ease-out`} style={{ width: `${metric.value}%` }} />
                      </div>
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className={`rounded-[12px] border p-3 ${darkMode ? 'bg-black/20 border-white/[0.06]' : 'bg-zinc-50 border-zinc-200'}`}>
                      <div className={`text-[10px] uppercase tracking-widest ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Inference</div>
                      <div className="text-[16px] font-semibold mt-1">{model.time} ms</div>
                    </div>
                    <div className={`rounded-[12px] border p-3 ${darkMode ? 'bg-black/20 border-white/[0.06]' : 'bg-zinc-50 border-zinc-200'}`}>
                      <div className={`text-[10px] uppercase tracking-widest ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Embedding Dim</div>
                      <div className="text-[16px] font-semibold mt-1">{model.dim}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EVALUATION DASHBOARD */}
        <section id="evaluation-metrics" className="pb-20">
          <div className={`rounded-[24px] border p-6 md:p-8 ${darkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-zinc-200 shadow-[0_8px_40px_rgba(0,0,0,0.04)]'}`}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <h2 className="text-[22px] font-semibold">Evaluation Dashboard</h2>
              <div className="flex gap-2">
                {["Last 7 days", "All time"].map(tab => (
                  <button key={tab} className={`h-8 px-4 rounded-full text-[12px] font-medium border ${tab === "All time" ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white' : darkMode ? 'bg-white/[0.04] border-white/[0.08] text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'}`}>{tab}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {[
                { k: "Precision@5", v: "91.8%", sub: "+5.5% vs baseline", col: "from-indigo-500 to-violet-500" },
                { k: "Recall@5", v: "89.4%", sub: "+21.2% vs baseline", col: "from-cyan-400 to-blue-500" },
                { k: "Inference", v: "29ms", sub: "per query", col: "from-emerald-400 to-teal-500" },
                { k: "Embedding", v: "18ms", sub: "EfficientNet-B0", col: "from-amber-400 to-orange-500" },
                { k: "Dataset", v: "44k", sub: "images total", col: "from-rose-400 to-pink-500" },
                { k: "Indexed", v: "44,000", sub: "FAISS vectors", col: "from-violet-400 to-fuchsia-500" },
              ].map(card => (
                <div key={card.k} className={`rounded-[16px] border p-4 relative overflow-hidden ${darkMode ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-zinc-50/80 border-zinc-200'}`}>
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.col}`} />
                  <div className={`text-[10px] uppercase tracking-widest font-semibold ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{card.k}</div>
                  <div className="text-[20px] font-bold mt-2 tracking-tight">{card.v}</div>
                  <div className={`text-[11px] mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{card.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Precision chart */}
              <div className={`rounded-[16px] border p-5 ${darkMode ? 'bg-black/20 border-white/[0.06]' : 'bg-zinc-50 border-zinc-200'}`}>
                <div className="flex items-center justify-between mb-5">
                  <div className="text-[12px] font-semibold uppercase tracking-widest">Precision Comparison</div>
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                </div>
                <div className="space-y-4">
                  {MODEL_DATA.map(m => (
                    <div key={m.name} className="flex items-center gap-3">
                      <div className="w-[92px] text-[11px] truncate">{m.name.split(' ')[0]}</div>
                      <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-white/10' : 'bg-zinc-200'}`}>
                        <div className={`h-full rounded-full bg-gradient-to-r ${m.color}`} style={{ width: `${m.p5}%` }} />
                      </div>
                      <div className="text-[11px] font-mono w-[34px] text-right">{m.p5}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recall chart */}
              <div className={`rounded-[16px] border p-5 ${darkMode ? 'bg-black/20 border-white/[0.06]' : 'bg-zinc-50 border-zinc-200'}`}>
                <div className="flex items-center justify-between mb-5">
                  <div className="text-[12px] font-semibold uppercase tracking-widest">Recall & Latency</div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="space-y-4">
                  {MODEL_DATA.map(m => (
                    <div key={m.name} className="flex items-center gap-3">
                      <div className="w-[92px] text-[11px] truncate">{m.name.split(' ')[0]}</div>
                      <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-white/10' : 'bg-zinc-200'}`}>
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${m.r5}%` }} />
                      </div>
                      <div className="text-[11px] font-mono w-[42px] text-right">{m.time}ms</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category distribution */}
              <div className={`rounded-[16px] border p-5 ${darkMode ? 'bg-black/20 border-white/[0.06]' : 'bg-zinc-50 border-zinc-200'}`}>
                <div className="text-[12px] font-semibold uppercase tracking-widest mb-5">Category Distribution</div>
                <div className="space-y-3">
                  {[
                    { name: "Dresses", count: 6123, pct: 72 },
                    { name: "T-Shirts", count: 5210, pct: 61 },
                    { name: "Jeans", count: 4890, pct: 57 },
                    { name: "Jackets", count: 4102, pct: 48 },
                    { name: "Shoes", count: 3801, pct: 44 },
                  ].map(cat => (
                    <div key={cat.name} className="flex items-center gap-3">
                      <div className="w-[70px] text-[11px]">{cat.name}</div>
                      <div className={`flex-1 h-1.5 rounded-full ${darkMode ? 'bg-white/10' : 'bg-zinc-200'}`}>
                        <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: `${cat.pct}%` }} />
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500">{cat.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DATASET + PIPELINE */}
        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 pb-20">
          <div className={`rounded-[24px] border p-6 md:p-7 ${darkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
            <h3 className="text-[18px] font-semibold">Dataset Overview</h3>
            <p className={`text-[13px] mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Fashion Product Images Dataset • Source: Kaggle • 44k curated</p>

            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { k: "Total", v: "44,000" },
                { k: "Training", v: "35,200" },
                { k: "Validation", v: "4,400" },
                { k: "Test", v: "4,400" },
                { k: "Categories", v: "8" },
                { k: "Subset", v: "12k" },
              ].map(s => (
                <div key={s.k} className={`rounded-[12px] border p-3 ${darkMode ? 'bg-black/20 border-white/[0.06]' : 'bg-zinc-50 border-zinc-200'}`}>
                  <div className={`text-[10px] uppercase tracking-widest ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{s.k}</div>
                  <div className="text-[15px] font-semibold mt-1">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-2.5 mt-6">
              {[
                { name: "Dresses", icon: "◍" },
                { name: "T-Shirts", icon: "⧉" },
                { name: "Jeans", icon: "⫶" },
                { name: "Jackets", icon: "⬔" },
                { name: "Shoes", icon: "⬓" },
                { name: "Bags", icon: "⬒" },
                { name: "Accessories", icon: "⬕" },
                { name: "Watches", icon: "◍" },
              ].map(cat => (
                <div key={cat.name} className={`rounded-[12px] border p-2.5 flex items-center gap-2 ${darkMode ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-zinc-50 border-zinc-200'}`}>
                  <div className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-200 text-white dark:text-black grid place-items-center text-[12px]">{cat.icon}</div>
                  <div className="text-[11px] font-medium leading-tight">{cat.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[24px] border p-6 md:p-7 ${darkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
            <h3 className="text-[18px] font-semibold">AI Pipeline</h3>
            <p className={`text-[13px] mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>From raw image to ranked recommendations</p>

            <div className="mt-6 relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-indigo-500 via-violet-500 to-emerald-400 opacity-30" />
              {[
                "Fashion Dataset (Kaggle)",
                "Dataset Preprocessing",
                "EfficientNetB0 Backbone",
                "Transfer Learning Fine-Tuning",
                "Feature Embeddings (1280-D)",
                "FAISS Index Building",
                "Cosine Similarity Search",
                "Top-K Recommendations",
                "Interactive Dashboard",
              ].map((step, i) => {
                const active = i === pipelineActive;
                return (
                  <div key={step} className={`relative flex gap-3 py-2.5 group cursor-pointer ${active ? 'scale-[1.02]' : ''} transition-transform`} onMouseEnter={() => setPipelineActive(i)}>
                    <div className={`w-8 h-8 rounded-full border-2 grid place-items-center z-10 shrink-0 transition-all ${active ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white shadow-[0_0_16px_rgba(99,102,241,0.5)]' : darkMode ? 'bg-[#12121a] border-white/10 text-zinc-500' : 'bg-white border-zinc-200 text-zinc-400 group-hover:border-zinc-300'}`}>
                      <span className="text-[11px] font-mono">{i + 1}</span>
                    </div>
                    <div className={`flex-1 rounded-[12px] border p-3 transition-all ${active ? (darkMode ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-200') : darkMode ? 'bg-white/[0.02] border-white/[0.04] group-hover:bg-white/[0.04]' : 'bg-zinc-50 border-zinc-200 group-hover:bg-white'}`}>
                      <div className={`text-[13px] font-medium ${active ? '' : ''}`}>{step}</div>
                      <div className={`text-[11px] mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{i % 2 === 0 ? 'Automated • GPU accelerated' : 'Optimized • Cached'}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="pb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[22px] font-semibold">Technology Stack</h2>
            <div className={`text-[12px] px-3 py-1 rounded-full border ${darkMode ? 'bg-white/[0.04] border-white/[0.08] text-zinc-400' : 'bg-white border-zinc-200 text-zinc-500'}`}>Built with modern AI infrastructure</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TECH_STACK.map(t => (
              <div key={t.name} className={`group rounded-[16px] border p-4 flex items-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] ${darkMode ? 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}>
                <div className={`w-10 h-10 rounded-[12px] bg-gradient-to-br ${t.grad} grid place-items-center text-white font-bold text-[11px] shadow`}>{t.icon}</div>
                <div>
                  <div className="text-[13px] font-medium">{t.name}</div>
                  <div className={`text-[11px] ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>AI Core • v2.4</div>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">↗</div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="pb-20">
          <h2 className="text-[26px] font-semibold tracking-tight text-center">Project Features</h2>
          <p className={`text-center text-[13.5px] mt-2 max-w-[560px] mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Every interaction crafted for stylists, buyers, and ML engineers — fast, precise, and beautiful.</p>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {FEATURES.map(f => (
              <div key={f.title} className={`group rounded-[18px] border p-5 transition-all hover:-translate-y-1 ${darkMode ? 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.10]' : 'bg-white border-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:border-zinc-300'}`}>
                <div className={`w-10 h-10 rounded-[12px] grid place-items-center border text-[16px] transition-transform group-hover:scale-110 ${darkMode ? 'bg-white/[0.06] border-white/[0.08]' : 'bg-zinc-50 border-zinc-200'}`}>{f.icon}</div>
                <div className="text-[14px] font-semibold mt-4">{f.title}</div>
                <div className={`text-[12.5px] leading-[1.6] mt-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{f.desc}</div>
                <div className={`mt-4 h-[1px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-indigo-500 to-violet-500`} />
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className={`rounded-[24px] border p-8 md:p-10 mb-16 ${darkMode ? 'bg-gradient-to-br from-white/[0.04] to-white/[0.02] border-white/[0.06]' : 'bg-gradient-to-br from-white to-zinc-50 border-zinc-200 shadow-[0_8px_40px_rgba(0,0,0,0.04)]'}`}>
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            <div>
              <div className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold tracking-widest border mb-4 ${darkMode ? 'bg-white/[0.06] border-white/[0.08] text-zinc-300' : 'bg-zinc-900 text-white border-zinc-900'}`}>ABOUT PROJECT</div>
              <h2 className="text-[28px] md:text-[32px] font-semibold tracking-tight leading-[1.1]">Built for fashion-tech excellence</h2>
              <p className={`text-[14px] leading-[1.7] mt-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                This AI-powered recommendation system uses computer vision and deep learning to retrieve visually similar fashion products. The system combines <span className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>EfficientNet feature extraction, Transfer Learning, Siamese Networks, and FAISS similarity search</span> for accurate, millisecond retrieval.
                <br /><br />
                Designed as a production-grade SaaS dashboard, it demonstrates end-to-end ML — from dataset curation and embedding generation to ANN indexing and interactive UI. Perfect for portfolio, hackathons, and enterprise demos.
              </p>
              <div className="flex gap-3 mt-6">
                <a href="https://github.com" target="_blank" className="h-10 px-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-[13px] font-medium inline-flex items-center gap-2">View Code ↗</a>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`h-10 px-5 rounded-full border text-[13px] font-medium ${darkMode ? 'bg-white/[0.06] border-white/[0.08] hover:bg-white/[0.10]' : 'bg-white border-zinc-200 hover:bg-zinc-50'}`}>Back to top</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "Project", v: "Visual Search SaaS" },
                { k: "Version", v: "v2.4.1 • Stable" },
                { k: "License", v: "MIT • Open Source" },
                { k: "Stack", v: "Python • TF • FAISS" },
              ].map(i => (
                <div key={i.k} className={`rounded-[14px] border p-4 ${darkMode ? 'bg-black/30 border-white/[0.06]' : 'bg-white border-zinc-200'}`}>
                  <div className={`text-[10px] uppercase tracking-widest ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{i.k}</div>
                  <div className="text-[13px] font-medium mt-1">{i.v}</div>
                </div>
              ))}
              <div className={`col-span-2 rounded-[14px] border p-4 flex items-center gap-3 ${darkMode ? 'bg-black/30 border-white/[0.06]' : 'bg-white border-zinc-200'}`}>
                <img src="https://i.pravatar.cc/100?img=12" alt="" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="text-[13px] font-medium">Designed for portfolio & interviews</div>
                  <div className={`text-[11px] ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Crafted with 8px grid • Premium aesthetics</div>
                </div>
                <div className="ml-auto text-emerald-500">●</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`border-t ${darkMode ? 'border-white/[0.06] bg-black/20' : 'border-zinc-200 bg-white'}`}>
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-indigo-600 to-violet-600 grid place-items-center text-white font-bold">V</div>
                <div className="font-semibold">Visio</div>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-mono border ${darkMode ? 'bg-white/[0.06] border-white/[0.08]' : 'bg-zinc-100 border-zinc-200'}`}>v2.4.1</span>
              </div>
              <p className={`text-[12.5px] leading-[1.6] mt-3 max-w-[360px] ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>AI-Powered Visual Product Recommendation System — Find visually similar fashion products using Deep Learning, Transfer Learning, and AI-powered similarity search.</p>
            </div>
            <div className="grid grid-cols-3 gap-8 text-[12.5px]">
              <div className="space-y-2.5">
                <div className="font-semibold text-[12px] uppercase tracking-widest">Product</div>
                <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'} space-y-1.5`}>
                  <div>Search Engine</div><div>Model Zoo</div><div>API Docs</div>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="font-semibold text-[12px] uppercase tracking-widest">Developers</div>
                <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'} space-y-1.5`}>
                  <div>GitHub</div><div>LinkedIn</div><div>Email</div>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="font-semibold text-[12px] uppercase tracking-widest">Legal</div>
                <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'} space-y-1.5`}>
                  <div>Privacy</div><div>Terms</div><div>© 2026 Visio AI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Product detail modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-[12px] p-4 grid place-items-center" onClick={() => setSelectedProduct(null)}>
          <div className={`w-full max-w-[760px] rounded-[24px] overflow-hidden border shadow-[0_24px_64px_rgba(0,0,0,0.4)] ${darkMode ? 'bg-[#12121a] border-white/[0.08]' : 'bg-white border-zinc-200'}`} onClick={e => e.stopPropagation()}>
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/5] bg-zinc-100 dark:bg-zinc-900">
                <img src={selectedProduct.img} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-bold">{selectedProduct.similarity}% Match</div>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[20px] font-semibold">{selectedProduct.category} Product</div>
                    <div className={`text-[12px] font-mono mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{selectedProduct.id} • {selectedProduct.color}</div>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className={`w-8 h-8 rounded-full grid place-items-center border ${darkMode ? 'bg-white/[0.06] border-white/[0.08]' : 'bg-zinc-50 border-zinc-200'}`}>✕</button>
                </div>
                <div className="space-y-3">
                  {[
                    { k: "Similarity Score", v: `${selectedProduct.similarity}%`, pct: selectedProduct.similarity },
                    { k: "Confidence", v: `${(selectedProduct.confidence * 100).toFixed(1)}%`, pct: selectedProduct.confidence * 100 },
                    { k: "Embedding Distance", v: "0.04 cosine", pct: 96 },
                  ].map(row => (
                    <div key={row.k}>
                      <div className="flex justify-between text-[11px] mb-1.5"><span className="uppercase tracking-widest text-zinc-500">{row.k}</span><span className="font-mono font-medium">{row.v}</span></div>
                      <div className={`h-1.5 rounded-full ${darkMode ? 'bg-white/10' : 'bg-zinc-100'}`}><div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: `${row.pct}%` }} /></div>
                    </div>
                  ))}
                </div>
                <div className={`rounded-[12px] p-3 text-[11px] leading-[1.5] border ${darkMode ? 'bg-white/[0.04] border-white/[0.06] text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'}`}>
                  This item was retrieved via {selectedModel} with FAISS IndexFlatL2 over 44k vectors. Visual similarity computed on 512-D embeddings fine-tuned for texture, pattern, and silhouette.
                </div>
                <div className="flex gap-2">
                  <button onClick={() => saveFavorite(selectedProduct)} className="flex-1 h-10 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-[12px] font-medium">Add to favorites</button>
                  <button onClick={() => submitFeedback(5, `Useful match: ${selectedProduct.id}`)} className={`flex-1 h-10 rounded-full border text-[12px] font-medium ${darkMode ? 'bg-white/[0.06] border-white/[0.08]' : 'bg-white border-zinc-200'}`}>Rate 5 stars</button>
                </div>
                {dbMessage && <div className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{dbMessage}</div>}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scan { 0% { top: 0% } 100% { top: 100% } }
        @keyframes shimmer { 0% { transform: translateX(-100%) } 100% { transform: translateX(200%) } }
      `}</style>
    </div>
  );
}
