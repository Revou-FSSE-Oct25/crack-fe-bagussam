import React, { useState, useEffect } from 'react';
import { BookOpen, Mail, Key, Eye, EyeOff, ArrowLeft, Send, AlertCircle } from 'lucide-react';
import { LanguageToggle } from '../components/UIComponents';

// --- STORES ---
import { useUIStore } from '../store/useUIStore';
import { useAuthStore } from '../store/useAuthStore';

export default function AuthPage() {
  // --- CONSUME STORES ---
  const { darkMode, setDarkMode, lang, getText, showAlert } = useUIStore();
  const { login, error } = useAuthStore();

  // LOCAL UI STATES (Always starts at 'login')
  const [authView, setAuthView] = useState('login'); // 'login' | 'register' | 'forgot'
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Password States
  const [regPass, setRegPass] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation rules
  const checks = {
    length: regPass.length >= 8, 
    upperLower: /(?=.*[a-z])(?=.*[A-Z])/.test(regPass),
    number: /(?=.*\d)/.test(regPass), 
    special: /(?=.*[@$!%*?&])/.test(regPass)
  };

  // --- HANDLERS ---
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await login(e.target.email.value, e.target.password.value); 
    setIsLoading(false);
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    const confirm = e.target.confirmPassword.value;
    
    if (regPass !== confirm) return showAlert("Error", getText('passMismatch'));
    if (!Object.values(checks).every(Boolean)) return showAlert("Error", getText('reqTitle') + ' Security check failed.');

    setIsLoading(true);
    // Simulation logic
    setTimeout(() => {
      setIsLoading(false);
      showAlert(getText('success'), getText('regSuccess') + ' (Simulation)');
      setAuthView('login');
      setRegPass('');
    }, 1500);
  };

  const onSubmitForgotPass = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showAlert("Email Sent", "If the email is registered, a password reset link has been sent to your inbox.");
      setAuthView('login');
    }, 1500);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Top Right Controls */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-50">
        <LanguageToggle />
        <button onClick={() => setDarkMode(!darkMode)} className="p-3 rounded-2xl bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm hover:scale-105 transition-all">
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
      
      <div className={`w-full max-w-xl p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden transition-colors ${darkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white'}`}>
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="bg-blue-600 p-4 rounded-2xl text-white mb-4 shadow-xl shadow-blue-500/30"><BookOpen size={32}/></div>
          <h1 className="text-3xl font-black italic tracking-tight">EduHub LMS</h1>
          <p className="opacity-60 text-sm mt-1 font-bold">
            {authView === 'login' ? getText('authSubLogin') : authView === 'register' ? getText('authSubReg') : 'Account Recovery'}
          </p>
        </div>

        {/* Global Error Alert */}
        {error && authView === 'login' && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2">
            <AlertCircle size={18}/> {error}
          </div>
        )}

        {/* --- 1. LOGIN VIEW --- */}
        {authView === 'login' && (
          <form onSubmit={onSubmitLogin} className="space-y-4 animate-in fade-in duration-300">
            <input name="email" type="email" required placeholder={`${getText('emailHolder')} *`} defaultValue="guru@lms.com" className="w-full px-5 py-4 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
            <div className="relative">
              <input name="password" type={showLoginPassword ? "text" : "password"} required placeholder={`${getText('passHolder')} *`} defaultValue="password123" className="w-full px-5 py-4 pr-12 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
              <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100">
                {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="flex items-center justify-between pl-2 pr-2">
              <label className="flex items-center gap-2 text-sm opacity-70 cursor-pointer font-bold">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded text-blue-600" /> {getText('remember')}
              </label>
              <button type="button" onClick={() => setAuthView('forgot')} className="text-sm font-bold text-blue-600 hover:underline">
                {getText('forgotPass')}
              </button>
            </div>

            <button disabled={isLoading} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 mt-2 uppercase tracking-widest text-sm">
              {isLoading ? getText('processing') : getText('signInBtn')}
            </button>
            <div className="text-center mt-6">
              <button type="button" onClick={() => { setAuthView('register'); setRegPass(''); }} className="text-sm font-bold text-slate-500 hover:text-blue-600 hover:underline">
                {getText('noAccount')}
              </button>
            </div>
          </form>
        )}

        {/* --- 2. REGISTER VIEW --- */}
        {authView === 'register' && (
          <form onSubmit={onSubmitRegister} className="space-y-4 max-h-[60vh] overflow-y-auto px-1 scrollbar-hide pb-2 animate-in fade-in duration-300">
            <p className="text-xs text-red-500 italic mb-2 font-bold uppercase">{getText('mandatory')}</p>
            <div className="grid grid-cols-2 gap-4">
              <input name="fullname" type="text" required placeholder={`${getText('fullName')} *`} className="w-full px-4 py-3.5 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
              <input name="phone" type="tel" required placeholder={`${getText('phone')} *`} className="w-full px-4 py-3.5 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
            </div>
            <input name="email" type="email" required placeholder={`${getText('emailHolder')} *`} className="w-full px-4 py-3.5 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
            <textarea name="address" required placeholder={`${getText('address')} *`} rows="2" className="w-full px-4 py-3.5 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 font-bold"></textarea>
            
            <div className="relative">
              <input name="password" type={showRegPassword ? "text" : "password"} required placeholder={`${getText('createPass')} *`} value={regPass} onChange={(e) => setRegPass(e.target.value)} className="w-full px-4 py-3.5 pr-12 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
              <button type="button" onClick={() => setShowRegPassword(!showRegPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100">
                {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border dark:border-slate-700 text-xs space-y-2">
              <p className="font-bold opacity-70 uppercase tracking-wider">{getText('reqTitle')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <span className={checks.length ? "text-green-500 font-bold" : "opacity-50 dark:text-white"}>✓ {getText('req1')}</span>
                <span className={checks.upperLower ? "text-green-500 font-bold" : "opacity-50 dark:text-white"}>✓ {getText('req2')}</span>
                <span className={checks.number ? "text-green-500 font-bold" : "opacity-50 dark:text-white"}>✓ {getText('req3')}</span>
                <span className={checks.special ? "text-green-500 font-bold" : "opacity-50 dark:text-white"}>✓ {getText('req4')}</span>
              </div>
            </div>
            
            <div className="relative">
              <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} required placeholder={`${getText('confirmPass')} *`} className="w-full px-4 py-3.5 pr-12 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100">
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button disabled={isLoading} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50 mt-4 uppercase tracking-widest text-sm">
              {isLoading ? getText('processing') : getText('regBtn')}
            </button>
            <button type="button" onClick={() => { setAuthView('login'); setRegPass(''); }} className="w-full flex items-center justify-center gap-2 text-slate-500 text-sm font-bold hover:text-blue-500 transition-colors mt-2">
              <ArrowLeft size={16} /> {getText('backLogin')}
            </button>
          </form>
        )}

        {/* --- 3. FORGOT PASSWORD VIEW --- */}
        {authView === 'forgot' && (
          <form onSubmit={onSubmitForgotPass} className="space-y-6 animate-in zoom-in-95 duration-300">
            <div>
              <p className="text-sm font-bold opacity-60 mb-6 text-center">Enter the email address associated with your account, and we'll send you a link to reset your password.</p>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
                <input required type="email" className="w-full px-5 py-4 pl-12 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 font-bold" placeholder="Recovery Email Address" />
              </div>
            </div>

            <button disabled={isLoading} className="w-full py-4 bg-slate-900 dark:bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:bg-black active:scale-95 transition-all uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
              {isLoading ? getText('processing') : <><Send size={18}/> Send Reset Link</>}
            </button>

            <button type="button" onClick={() => setAuthView('login')} className="w-full py-4 text-slate-500 font-bold hover:text-slate-900 dark:hover:text-white flex items-center justify-center gap-2 transition-all text-sm">
              <ArrowLeft size={16}/> {getText('backLogin')}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

// Helper simple icons
const SunIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const MoonIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;