import { useState, useEffect } from 'react';
import { hasSupabaseConfig, supabase } from './lib/supabase';

type Props = {
  darkMode: boolean;
  onAuth: () => void;
  onGuest: () => void;
};

export default function SignIn({ darkMode, onAuth, onGuest }: Props) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [floatingStep, setFloatingStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFloatingStep(s => (s + 1) % 3), 2200);
    return () => clearInterval(id);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!hasSupabaseConfig) {
      setMessage('Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Frontend/.env to enable Supabase auth.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: name,
          });
        }

        if (!data.session) {
          setMessage('Account created. Check your email to confirm your account, then sign in.');
          setMode('signin');
          return;
        }
      }

      if (!remember) {
        localStorage.removeItem('sb-reminder');
      }

      onAuth();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-500 ${darkMode ? 'bg-[#08080c] text-zinc-100' : 'bg-[#fcfcfd] text-zinc-900'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* LEFT BRANDING PANEL */}
      <div className="hidden lg:flex lg:w-[48%] xl:w-[50%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-700" />
        <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full blur-[100px] bg-cyan-400/40" />
        <div className="absolute -bottom-[20%] -left-[20%] w-[60%] h-[60%] rounded-full blur-[100px] bg-fuchsia-400/40" />

        {/* floating product cards */}
        <div className="absolute inset-0 p-10 flex items-center justify-center">
          <div className="relative w-full max-w-[440px] aspect-[4/3]">
            {[
              { img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop", rot: -8, tx: -30, ty: 20 },
              { img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=500&fit=crop", rot: 0, tx: 0, ty: 0, main: true },
              { img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop", rot: 8, tx: 30, ty: 20 },
            ].map((c, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-[20px] overflow-hidden border-2 border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-700 ease-out"
                style={{
                  transform: `translate(${c.tx}px, ${c.ty}px) rotate(${c.rot}deg) scale(${c.main ? 1 : 0.92})`,
                  zIndex: c.main ? 20 : 10,
                  opacity: c.main || floatingStep === i ? 1 : 0.6,
                }}
              >
                <img src={c.img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {c.main && (
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/95 grid place-items-center text-indigo-700 text-[12px] font-bold">97%</div>
                    <div className="text-white text-[13px] font-medium leading-tight">Floral Summer Dress<br/><span className="text-white/70 text-[11px]">Match found in 29ms</span></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-[12px] bg-white/15 backdrop-blur-md border border-white/20 grid place-items-center text-[18px] font-bold">V</div>
            <div>
              <div className="font-semibold text-[16px]">Visio</div>
              <div className="text-[10px] tracking-[0.12em] uppercase text-white/60">AI RECOMMENDATION</div>
            </div>
          </div>
          <div className="rounded-[16px] bg-white/10 backdrop-blur-md border border-white/15 p-4 max-w-[420px]">
            <div className="text-[13px] leading-[1.6] text-white/90">"Visio transformed our product discovery. Shoppers find visually similar items in milliseconds — conversion up 34%."</div>
            <div className="flex items-center gap-2.5 mt-3">
              <img src="https://i.pravatar.cc/32?img=47" className="w-7 h-7 rounded-full border border-white/20" alt="" />
              <div className="text-[11px]">
                <div className="font-medium">Amelia Chen</div>
                <div className="text-white/60">Head of Merchandising, LUXE</div>
              </div>
            </div>
          </div>
        </div>

        {/* scan line */}
        <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[scanline_4s_linear_infinite]" />
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 relative">
        {/* subtle bg accent for mobile */}
        <div className="absolute inset-0 lg:hidden overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[80%] aspect-square rounded-full blur-[100px] bg-indigo-500/10" />
        </div>

        <div className="w-full max-w-[420px] relative">
          {/* mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-indigo-600 to-violet-600 grid place-items-center text-white font-bold shadow-lg">V</div>
            <div className="leading-none">
              <div className="font-semibold text-[16px]">Visio</div>
              <div className={`text-[10px] tracking-[0.12em] uppercase ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>AI RECOMMENDATION</div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-[28px] md:text-[32px] font-semibold tracking-tight leading-[1.1]">
              {mode === 'signin' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className={`text-[14px] mt-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {mode === 'signin' ? 'Sign in to access your AI recommendation dashboard.' : 'Start discovering visually similar products in seconds.'}
            </p>
          </div>

          {/* mode tabs */}
          <div className={`mt-8 p-1 rounded-full grid grid-cols-2 gap-1 ${darkMode ? 'bg-white/[0.04] border border-white/[0.06]' : 'bg-zinc-100 border border-zinc-200'}`}>
            {(['signin', 'signup'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} className={`h-9 rounded-full text-[13px] font-medium transition-all ${mode === m ? (darkMode ? 'bg-white text-black shadow' : 'bg-white text-zinc-900 shadow-sm') : (darkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900')}`}>
                {m === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* social buttons */}
          <div className="mt-6 grid grid-cols-3 gap-2.5">
            <button type="button" className={`h-11 rounded-[12px] border flex items-center justify-center gap-2 text-[13px] font-medium transition-all hover:translate-y-[-1px] ${darkMode ? 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]' : 'bg-white border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 shadow-[0_1px_2px_rgba(0,0,0,0.03)]'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
              Google
            </button>
            <button type="button" className={`h-11 rounded-[12px] border flex items-center justify-center gap-2 text-[13px] font-medium transition-all hover:translate-y-[-1px] ${darkMode ? 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]' : 'bg-white border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 shadow-[0_1px_2px_rgba(0,0,0,0.03)]'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </button>
            <button type="button" className={`h-11 rounded-[12px] border flex items-center justify-center gap-2 text-[13px] font-medium transition-all hover:translate-y-[-1px] ${darkMode ? 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]' : 'bg-white border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 shadow-[0_1px_2px_rgba(0,0,0,0.03)]'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.536c-.027-2.88 2.353-4.27 2.46-4.337-1.34-1.96-3.427-2.228-4.17-2.26-1.772-.18-3.46 1.043-4.36 1.043-.91 0-2.297-1.02-3.763-.992-1.937.028-3.726 1.126-4.726 2.863-2.018 3.497-.516 8.687 1.45 11.527.963 1.39 2.11 2.953 3.613 2.898 1.45-.058 1.997-.935 3.748-.935 1.74 0 2.24.935 3.773.906 1.563-.028 2.547-1.41 3.5-2.808 1.108-1.62 1.563-3.187 1.59-3.27-.035-.015-3.05-1.17-3.08-4.635zM14.107 3.96c.805-.97 1.348-2.314 1.2-3.65-1.16.047-2.57.77-3.402 1.74-.748.862-1.403 2.242-1.225 3.556 1.293.1 2.617-.662 3.427-1.646z"/></svg>
              Apple
            </button>
          </div>

          {/* divider */}
          <div className="flex items-center gap-3 mt-6">
            <div className={`flex-1 h-px ${darkMode ? 'bg-white/[0.08]' : 'bg-zinc-200'}`} />
            <span className={`text-[11px] uppercase tracking-widest font-medium ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>or with email</span>
            <div className={`flex-1 h-px ${darkMode ? 'bg-white/[0.08]' : 'bg-zinc-200'}`} />
          </div>

          {/* form */}
          <form onSubmit={submit} className="mt-6 space-y-4">
            {message && (
              <div className={`rounded-[12px] border px-3.5 py-3 text-[12.5px] leading-[1.5] ${darkMode ? 'bg-red-500/10 border-red-500/20 text-red-200' : 'bg-red-50 border-red-200 text-red-700'}`}>
                {message}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className={`text-[12px] font-medium block mb-1.5 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Full name</label>
                <div className={`group rounded-[12px] border flex items-center transition-all focus-within:border-indigo-500 focus-within:ring-4 ${darkMode ? 'bg-white/[0.03] border-white/[0.08] focus-within:ring-indigo-500/20' : 'bg-white border-zinc-200 focus-within:ring-indigo-500/10'}`}>
                  <span className={`pl-3.5 text-[14px] ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>◐</span>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" className="w-full bg-transparent px-3 h-11 outline-none text-[14px] placeholder:text-zinc-400" />
                </div>
              </div>
            )}

            <div>
              <label className={`text-[12px] font-medium block mb-1.5 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Email address</label>
              <div className={`group rounded-[12px] border flex items-center transition-all focus-within:border-indigo-500 focus-within:ring-4 ${darkMode ? 'bg-white/[0.03] border-white/[0.08] focus-within:ring-indigo-500/20' : 'bg-white border-zinc-200 focus-within:ring-indigo-500/10'}`}>
                <span className={`pl-3.5 text-[14px] ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>✉</span>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="w-full bg-transparent px-3 h-11 outline-none text-[14px] placeholder:text-zinc-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`text-[12px] font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Password</label>
                {mode === 'signin' && <button type="button" className="text-[12px] font-medium text-indigo-500 hover:text-indigo-400">Forgot password?</button>}
              </div>
              <div className={`rounded-[12px] border flex items-center transition-all focus-within:border-indigo-500 focus-within:ring-4 ${darkMode ? 'bg-white/[0.03] border-white/[0.08] focus-within:ring-indigo-500/20' : 'bg-white border-zinc-200 focus-within:ring-indigo-500/10'}`}>
                <span className={`pl-3.5 text-[14px] ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>⚿</span>
                <input type={showPwd ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder={mode === 'signin' ? '••••••••' : 'Create a strong password'} className="w-full bg-transparent px-3 h-11 outline-none text-[14px] placeholder:text-zinc-400" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className={`pr-3.5 text-[11px] font-medium ${darkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-700'}`}>{showPwd ? 'Hide' : 'Show'}</button>
              </div>
              {mode === 'signup' && (
                <div className={`mt-2 flex items-center gap-2 text-[11.5px] ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  <div className={`flex-1 h-1 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-zinc-100'}`}>
                    <div className={`h-full rounded-full ${password.length < 6 ? 'bg-red-400' : password.length < 10 ? 'bg-amber-400' : 'bg-emerald-500'}`} style={{ width: password.length === 0 ? '0%' : password.length < 6 ? '30%' : password.length < 10 ? '65%' : '100%' }} />
                  </div>
                  <span>{password.length === 0 ? 'Strength' : password.length < 6 ? 'Weak' : password.length < 10 ? 'Good' : 'Strong'}</span>
                </div>
              )}
            </div>

            {mode === 'signin' && (
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="sr-only peer" />
                <div className={`w-4 h-4 rounded-[5px] border-2 grid place-items-center transition-all peer-checked:bg-indigo-600 peer-checked:border-indigo-600 ${darkMode ? 'border-white/20' : 'border-zinc-300'}`}>
                  {remember && <span className="text-white text-[10px]">✓</span>}
                </div>
                <span className={`text-[12.5px] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Keep me signed in for 30 days</span>
              </label>
            )}

            {mode === 'signup' && (
              <p className={`text-[11.5px] leading-[1.5] ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                By creating an account, you agree to our <a href="#" className="text-indigo-500 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-500 hover:underline">Privacy Policy</a>.
              </p>
            )}

            <button type="submit" disabled={loading} className="w-full h-12 rounded-[12px] bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[14px] font-medium shadow-[0_8px_24px_rgba(99,102,241,0.35)] hover:shadow-[0_12px_32px_rgba(99,102,241,0.45)] hover:translate-y-[-1px] active:translate-y-[0px] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === 'signin' ? 'Signing in…' : 'Creating account…'}
                </>
              ) : (
                <>{mode === 'signin' ? 'Sign in to dashboard' : 'Create account'} →</>
              )}
            </button>
          </form>

          {/* guest continue */}
          <div className="mt-6 text-center">
            <button onClick={onGuest} className={`text-[12.5px] font-medium ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'} underline-offset-4 hover:underline transition-colors`}>
              Continue as guest → try demo without signing in
            </button>
          </div>

          {/* footer note */}
          <div className={`mt-10 pt-6 border-t text-center text-[11px] ${darkMode ? 'border-white/[0.06] text-zinc-500' : 'border-zinc-200 text-zinc-400'}`}>
            <div>Protected by enterprise-grade encryption • SOC 2 Type II</div>
            <div className="mt-1">© 2026 Visio AI • v2.4.1</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanline { 0% { top: 0% } 100% { top: 100% } }
      `}</style>
    </div>
  );
}
