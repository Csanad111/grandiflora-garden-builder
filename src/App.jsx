import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { getClientProject } from './lib/supabaseService';


function LiquidGlassCard({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative h-[195px] w-full flex items-center justify-center transition-all duration-300 active:scale-[0.97]"
    >
      {/* Shadow / Blur offset layer - Very subtle organic shadow */}
      <div className="absolute top-[5px] left-0 right-0 bottom-[-5px] rounded-[24px] bg-[rgba(0,0,0,0.02)] blur-[6px] mix-blend-hard-light pointer-events-none" />

      {/* Main Glass Body Base - Whiter, lighter wash, very low frosting (blur), sharp border */}
      <div className="absolute inset-0 rounded-[24px] bg-white/10 backdrop-blur-[2px] border-[1.2px] border-white/60 shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] pointer-events-none" />

      {/* Thicker Glass Overlay - Fades in only when the button is actively pressed (clicked) */}
      <div className="absolute inset-0 rounded-[24px] bg-white/25 backdrop-blur-[12px] opacity-0 group-active:opacity-100 transition-all duration-300 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 transition-transform duration-300 group-active:scale-[0.97]">
        {children}
      </div>
    </button>
  );
}

function LandingScreen({ onNavigate }) {
  return (
    <>
      {/* Extracted Logo Layer Overlay */}
      <div className="absolute top-[80px] w-full flex justify-center mix-blend-multiply pointer-events-none">
        <img
          src="/assets/logo.png"
          alt="Grandiflora Logo"
          className="w-[220px] object-contain brightness-[1.03] contrast-[1.10]"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 60%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 60%, transparent 100%)'
          }}
        />
      </div>

      <div className="absolute top-[328px] left-[22px] right-[22px] flex flex-col gap-[26px]">
        {/* Card 1 - Bejelentkezés */}
        <LiquidGlassCard onClick={() => onNavigate('login')}>
          <div className="w-[227px] h-[65px] bg-[#5e6e5e] text-white text-[20px] font-['DM_Serif_Display',_serif] tracking-[0.14px] rounded-[20px] flex items-center justify-center">
            Bejelentkezés
          </div>
        </LiquidGlassCard>

        {/* Card 2 - Regisztráció */}
        <LiquidGlassCard onClick={() => onNavigate('register')}>
          <div className="w-[227px] h-[65px] bg-[#f3edf7] text-[#5e6e5e] text-[20px] font-['DM_Serif_Display',_serif] tracking-[0.14px] rounded-[20px] flex items-center justify-center">
            Regisztráció
          </div>
        </LiquidGlassCard>
      </div>

      {/* Ugrás gomb */}
      <button className="absolute bottom-[70px] left-1/2 -translate-x-1/2 text-[#5e6e5e] text-[16px] tracking-[0.11px] font-['DM_Serif_Display',_serif] hover:opacity-75 transition-opacity">
        ugrás
      </button>
    </>
  );
}

function LoginScreen({ onBack, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = email.includes('@') && email.includes('.');
  const isPasswordValid = password.length >= 4; // Just an example min-length

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (isEmailValid && isPasswordValid) {
      onLoginSuccess();
    }
  };

  const getValidationIndicator = (isValid, isEmpty) => {
    if (isEmpty && !submitted) return null; // Initially nothing
    if (isValid) {
      return (
        <div className="size-[24px] rounded-full flex items-center justify-center flex-shrink-0 ml-2 bg-[#899c85] transition-colors duration-300">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    }
    return null; // Removed the red cross. We just use the red border.
  };

  return (
    <div className="absolute inset-0 z-10 font-serif">
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-[60px] left-[20px] w-10 h-10 flex items-center justify-center z-20 text-[#5e6e5e] hover:bg-black/5 hover:scale-110 active:scale-95 rounded-full transition-all duration-300 outline-none"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Titles */}
      <div className="absolute top-[110px] left-[35px]">
        <h1 className="text-[#5e6e5e] text-[30px] font-['DM_Serif_Display',_serif] leading-tight mb-3 tracking-wide">
          Bejelentkezés
        </h1>
        <p className="text-black text-[16px]">
          Jó újra látni téged
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="absolute top-[204px] left-[22px] right-[22px]">
          <div className={`relative w-full h-[50px] bg-white border ${(!isEmailValid && (email.length > 0 || submitted)) ? 'border-red-400' : 'border-[#e6e2ea]'} rounded-[15px] flex items-center px-[20px] focus-within:border-[#899c85] focus-within:ring-4 focus-within:ring-[#899c85]/20 transition-all duration-300`}>
            <input
              type="email"
              placeholder="E-mail cím"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-black text-[16px] placeholder:text-[#c4c4c4] outline-none"
            />
            {getValidationIndicator(isEmailValid, email.length === 0)}
          </div>
        </div>

        {/* Password Input */}
        <div className="absolute top-[278px] left-[22px] right-[22px]">
          <div className={`relative w-full h-[50px] bg-white border ${(!isPasswordValid && (password.length > 0 || submitted)) ? 'border-red-400' : 'border-[#5e6e5e]'} rounded-[15px] flex items-center px-[20px] focus-within:border-[#899c85] focus-within:ring-4 focus-within:ring-[#899c85]/20 transition-all duration-300`}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-black text-[16px] placeholder:text-[#c4c4c4] outline-none"
            />
            {/* Eye icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex-shrink-0 text-[#c4c4c4] hover:text-[#5e6e5e] transition-colors mr-2 outline-none"
            >
              {showPassword ? (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 7.5C1 7.5 4.27273 1.5 10 1.5C15.7273 1.5 19 7.5 19 7.5C19 7.5 15.7273 13.5 10 13.5C4.27273 13.5 1 7.5 1 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="10" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            {getValidationIndicator(isPasswordValid, password.length === 0)}
          </div>
        </div>

        {/* Forgot password */}
        <button type="button" className="absolute top-[344px] right-[22px] text-[#5e6e5e] text-[14px] hover:underline underline-offset-2 tracking-wide">
          Elfelejtetted a jelszavad?
        </button>

        {/* Login Button */}
        <button
          type="submit"
          className="absolute top-[384px] left-[22px] right-[22px] h-[50px] bg-[#5e6e5e] rounded-[25px] flex items-center justify-center text-white text-[20px] font-['DM_Serif_Display',_serif] tracking-[0.14px] hover:bg-[#4a574a] transition-all duration-300 active:scale-[0.95] hover:shadow-[0_8px_20px_rgba(94,110,94,0.3)] outline-none"
        >
          Belépés
        </button>
      </form>

      {/* OR separator */}
      <div className="absolute top-[460px] left-[22px] right-[22px] flex items-center gap-[10px]">
        <div className="h-[1px] flex-1 bg-[#e6e2ea]"></div>
        <span className="text-[#5e6e5e] text-[16px] font-['DM_Serif_Display',_serif] tracking-[0.11px]">vagy</span>
        <div className="h-[1px] flex-1 bg-[#e6e2ea]"></div>
      </div>

      {/* Register link */}
      <div className="absolute top-[506px] w-full flex justify-center items-center gap-1 text-[16px]">
        <span className="text-[#5e6e5e]">Szeretnél csatlakozni?</span>
        <button className="text-[#5e6e5e] font-['DM_Serif_Display',_serif] hover:underline underline-offset-2 tracking-[0.11px]">
          Regisztráció
        </button>
      </div>

    </div>
  );
}

function RegisterScreen({ onBack, onRegisterSuccess, onGoToLogin }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isEmailValid = email.includes('@') && email.includes('.');
  const isUsernameValid = username.trim().length >= 3;
  const isPasswordValid = password.length >= 4;
  const isPasswordConfirmValid = passwordConfirm === password && passwordConfirm.length >= 4;

  const handleRegister = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (isEmailValid && isUsernameValid && isPasswordValid && isPasswordConfirmValid) {
      setIsSuccess(true);
      setTimeout(() => {
        onGoToLogin();
      }, 2000);
    }
  };

  const getValidationIndicator = (isValid, isEmpty) => {
    if (isEmpty && !submitted) return null;
    if (isValid) {
      return (
        <div className="absolute right-[14px] top-[14px] size-[22px] rounded-full flex items-center justify-center bg-[#899c85] transition-colors duration-300">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    }
    return null; // Removed the red cross. We just use the red border.
  };

  if (isSuccess) {
    return (
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-3xl bg-white/50 animate-in fade-in duration-300">
        <div className="w-[120px] h-[120px] bg-[#899c85] rounded-full shadow-lg flex items-center justify-center mb-6">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-[#5e6e5e] text-[32px] font-['DM_Serif_Display',_serif] mb-2 text-center tracking-wide leading-tight">
          Sikeres<br />regisztráció!
        </h2>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-10 w-full h-full flex flex-col bg-transparent">

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-[60px] left-[20px] w-10 h-10 flex items-center justify-center z-20 text-[#5e6e5e] hover:bg-black/5 hover:scale-110 active:scale-95 rounded-full transition-all duration-300 outline-none"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Header text */}
      <div className="absolute top-[86px] left-[41px]">
        <h1 className="text-[#5e6e5e] text-[30px] font-['DM_Serif_Display',_serif] tracking-wide mb-2 leading-tight">
          Regisztrálj
        </h1>
        <p className="text-[#5e6e5e] text-[16px] font-['Hedvig_Letters_Serif',_serif]">
          Töltsd ki az adatokat
        </p>
      </div>

      <form onSubmit={handleRegister} className="absolute top-[210px] w-full px-[22px] flex flex-col gap-[20px]">

        {/* Email Input */}
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail cím"
            className={`w-full h-[50px] bg-white border ${(!isEmailValid && (email.length > 0 || submitted)) ? 'border-red-400' : 'border-[#5e6e5e]'} rounded-[15px] pl-[18px] pr-[45px] text-[16px] font-['Hedvig_Letters_Serif',_serif] text-[#5e6e5e] placeholder:text-[#c4c4c4] outline-none focus:border-[#899c85] focus:ring-4 focus:ring-[#899c85]/20 transition-all duration-300`}
          />
          {getValidationIndicator(isEmailValid, email.length === 0)}
        </div>

        {/* Username Input */}
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Felhasználónév"
            className={`w-full h-[50px] bg-white border ${(!isUsernameValid && (username.length > 0 || submitted)) ? 'border-red-400' : 'border-[#5e6e5e]'} rounded-[15px] pl-[18px] pr-[45px] text-[16px] font-['Hedvig_Letters_Serif',_serif] text-[#5e6e5e] placeholder:text-[#c4c4c4] outline-none focus:border-[#899c85] focus:ring-4 focus:ring-[#899c85]/20 transition-all duration-300`}
          />
          {getValidationIndicator(isUsernameValid, username.length === 0)}
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Jelszó"
            className={`w-full h-[50px] bg-white border ${(!isPasswordValid && (password.length > 0 || submitted)) ? 'border-red-400' : 'border-[#5e6e5e]'} rounded-[15px] pl-[18px] pr-[80px] text-[16px] font-['Hedvig_Letters_Serif',_serif] text-[#5e6e5e] placeholder:text-[#c4c4c4] outline-none focus:border-[#899c85] focus:ring-4 focus:ring-[#899c85]/20 transition-all duration-300`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-[45px] top-[15px] flex-shrink-0 text-[#c4c4c4] hover:text-[#5e6e5e] transition-colors outline-none"
          >
            {showPassword ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7.5C1 7.5 4.27273 1.5 10 1.5C15.7273 1.5 19 7.5 19 7.5C19 7.5 15.7273 13.5 10 13.5C4.27273 13.5 1 7.5 1 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          {getValidationIndicator(isPasswordValid, password.length === 0)}
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <input
            type={showPasswordConfirm ? "text" : "password"}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Jelszó még egyszer"
            className={`w-full h-[50px] bg-white border ${(!isPasswordConfirmValid && (passwordConfirm.length > 0 || submitted)) ? 'border-red-400' : 'border-[#5e6e5e]'} rounded-[15px] pl-[18px] pr-[80px] text-[16px] font-['Hedvig_Letters_Serif',_serif] text-[#5e6e5e] placeholder:text-[#c4c4c4] outline-none focus:border-[#899c85] focus:ring-4 focus:ring-[#899c85]/20 transition-all duration-300`}
          />
          <button
            type="button"
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            className="absolute right-[45px] top-[15px] flex-shrink-0 text-[#c4c4c4] hover:text-[#5e6e5e] transition-colors outline-none"
          >
            {showPasswordConfirm ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7.5C1 7.5 4.27273 1.5 10 1.5C15.7273 1.5 19 7.5 19 7.5C19 7.5 15.7273 13.5 10 13.5C4.27273 13.5 1 7.5 1 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          {getValidationIndicator(isPasswordConfirmValid, passwordConfirm.length === 0)}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-[50px] bg-[#5e6e5e] text-white text-[20px] font-['DM_Serif_Display',_serif] tracking-[0.14px] rounded-[25px] flex items-center justify-center mt-[10px] hover:bg-[#4a574a] transition-all duration-300 active:scale-[0.95] hover:shadow-[0_8px_20px_rgba(94,110,94,0.3)] outline-none"
        >
          Tovább
        </button>

      </form>

      {/* OR separator */}
      <div className="absolute top-[596px] left-[22px] right-[22px] flex items-center gap-[10px]">
        <div className="h-[1px] flex-1 bg-[#e6e2ea]"></div>
        <span className="text-[#5e6e5e] text-[16px] font-['DM_Serif_Display',_serif] tracking-[0.11px]">vagy</span>
        <div className="h-[1px] flex-1 bg-[#e6e2ea]"></div>
      </div>

      {/* Login link */}
      <div className="absolute top-[642px] w-full flex justify-center items-center gap-1 text-[16px]">
        <span className="text-[#5e6e5e] font-['Hedvig_Letters_Serif',_serif]">Szeretnél bejelentkezni?</span>
        <button
          onClick={onGoToLogin}
          className="text-[#5e6e5e] font-['DM_Serif_Display',_serif] hover:underline underline-offset-2 tracking-[0.11px]"
        >
          Bejelentkezés
        </button>
      </div>

    </div>
  );
}

function ProjectStatus({ project, onBack }) {
  if (!project) return null;

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-transparent animate-in slide-in-from-right duration-300">
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-[60px] left-[20px] w-10 h-10 flex items-center justify-center z-30 text-[#5e6e5e] hover:bg-black/5 rounded-full transition-all"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Header */}
      <div className="mt-[110px] px-[35px] mb-8">
        <h1 className="text-[#5e6e5e] text-[30px] font-['DM_Serif_Display',_serif] leading-tight mb-2 tracking-wide">
          Nyomon követés
        </h1>
        <p className="text-black text-[16px] font-['Hedvig_Letters_Serif',_serif]">
          A kerted építésének folyamata
        </p>
      </div>

      {/* Main Status Glass Card */}
      <div className="px-[22px] mb-8">
        <div className="relative w-full p-6 rounded-[24px] bg-white/40 backdrop-blur-md border border-white/60 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#5e6e5e] font-semibold">Aktuális állapot:</span>
            <span className="px-3 py-1 bg-[#899c85]/20 text-[#5e6e5e] rounded-full text-sm font-medium">
              {project.status === 'in_progress' ? 'Folyamatban' : project.status}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[24px] font-['DM_Serif_Display',_serif] text-[#5e6e5e]">{project.progress_percentage}%</span>
              <span className="text-sm text-[#5e6e5e]/70">Készültségi fok</span>
            </div>
            <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#899c85] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${project.progress_percentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 text-[#5e6e5e]">
            <div className="flex justify-between border-t border-black/5 pt-2">
              <span className="opacity-70">Helyszín:</span>
              <span className="font-medium text-right">{project.address}</span>
            </div>
            <div className="flex justify-between border-t border-black/5 pt-2">
              <span className="opacity-70">Várható befejezés:</span>
              <span className="font-medium">{new Date(project.estimated_completion_date).toLocaleDateString('hu-HU')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Updates */}
      <div className="flex-1 overflow-y-auto px-[35px] pb-10 custom-scrollbar">
        <h3 className="text-[#5e6e5e] font-['DM_Serif_Display',_serif] text-[20px] mb-4">Legutóbbi értesítések</h3>
        <div className="relative border-l-2 border-[#899c85]/30 pl-6 space-y-8">
          {project.updates?.map((update, idx) => (
            <div key={update.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full bg-[#899c85] border-4 border-white shadow-sm" />

              <span className="text-xs text-[#5e6e5e]/60 mb-1 block">
                {new Date(update.created_at).toLocaleDateString('hu-HU')}
              </span>
              <p className="text-[#5e6e5e] font-['Hedvig_Letters_Serif',_serif]">
                {update.message}
              </p>
              {update.media_url && (
                <div className="mt-3 rounded-xl overflow-hidden border border-white/50 shadow-md">
                  <img src={update.media_url} alt="Update" className="w-full h-32 object-cover" />
                </div>
              )}
            </div>
          ))}
          {(!project.updates || project.updates.length === 0) && (
            <p className="text-[#5e6e5e]/50 italic">Hamarosan érkeznek az első frissítések...</p>
          )}
        </div>
      </div>
    </div>
  );
}

function BeforeAfterGallery({ project, onBack }) {
  if (!project) return null;
  const media = project.before_after_media?.[0];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Új kertem a Grandiflorától!',
          text: media?.share_text || 'Nézzétek milyen csodás lett a kertem!',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('A megosztás nem támogatott ezen a böngészőn. Másold ki a linket!');
    }
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-transparent animate-in slide-in-from-right duration-300">
      <button
        onClick={onBack}
        className="absolute top-[60px] left-[20px] w-10 h-10 flex items-center justify-center z-30 text-[#5e6e5e] hover:bg-black/5 rounded-full transition-all"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="mt-[110px] px-[35px] mb-8 text-center">
        <h1 className="text-[#5e6e5e] text-[30px] font-['DM_Serif_Display',_serif] leading-tight mb-2 tracking-wide">
          Előtte - utána
        </h1>
        <p className="text-black text-[16px] font-['Hedvig_Letters_Serif',_serif]">
          Varázslat a kertedben
        </p>
      </div>

      <div className="flex-1 px-[22px] overflow-y-auto pb-10">
        {!media ? (
          <div className="h-64 flex flex-col items-center justify-center bg-white/30 backdrop-blur-md rounded-[24px] border border-white/60 p-10 text-center">
            <span className="text-4xl mb-4">🌱</span>
            <p className="text-[#5e6e5e]/70">Hamarosan készítünk képeket az elkészült kertről!</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative group overflow-hidden rounded-[24px] border border-white/60 shadow-xl bg-white/40">
              <div className="aspect-[4/3] relative">
                <img src={media.before_url} alt="Előtte" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md text-white rounded-full text-xs font-bold tracking-widest uppercase">Előtte</div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-[24px] border border-white/60 shadow-xl bg-white/40">
              <div className="aspect-[4/3] relative">
                <img src={media.after_url} alt="Utána" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#899c85]/80 backdrop-blur-md text-white rounded-full text-xs font-bold tracking-widest uppercase">Utána</div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="w-full h-[60px] bg-[#5e6e5e] text-white rounded-[30px] flex items-center justify-center gap-3 font-['DM_Serif_Display',_serif] text-[18px] tracking-wide shadow-lg active:scale-95 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 6L12 2L8 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 2V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Közösségi megosztás
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function HomeScreen({ onLogout, onNavigateTo }) {
  return (
    <div className="absolute inset-0 z-10 w-full h-full flex flex-col bg-transparent">
      {/* Top Header */}
      <div className="absolute top-[61px] left-[24px] right-[19px] flex items-center justify-between z-20">
        {/* Temperature */}
        <div className="flex items-center gap-[6px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#8e8e93]">
            <path d="M14 14.76V3.5C14 2.67157 13.3284 2 12.5 2C11.6716 2 11 2.67157 11 3.5V14.76C9.18413 15.548 8.16327 17.5843 8.85243 19.5106C9.54158 21.4368 11.611 22.5186 13.6766 22.0305C15.7423 21.5424 16.9632 19.6841 16.5204 17.6534C16.1953 16.1593 15.1963 15.0215 14 14.76Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5 16V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 7H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 11H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[#8e8e93] text-[16px] tracking-[0.11px]" style={{ fontFamily: "SF Pro, sans-serif" }}>18°C</span>
        </div>

        {/* LOGO Text */}
        <div className="text-[#5e6e5e] text-[20px] font-['DM_Serif_Display',_serif] tracking-[1.40px] mt-1">
          GRANDIFLORA
        </div>

        {/* User Icon (Logout) */}
        <button
          onClick={onLogout}
          className="text-[#5e6e5e] hover:bg-black/5 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95 outline-none"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Main Content Cards */}
      <div className="absolute top-[151px] left-[22px] right-[22px] flex flex-col gap-[30px] z-20">
        <LiquidGlassCard onClick={() => onNavigateTo('project-status')}>
          <div className="w-[227px] h-[65px] bg-[#5e6e5e] text-white text-[19px] font-['DM_Serif_Display',_serif] tracking-[0.14px] rounded-[22px] flex items-center justify-center shadow-[0_4px_15px_rgba(94,110,94,0.2)]">
            Nyomon követés
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard onClick={() => { }}>
          <div className="w-[227px] h-[65px] bg-[#5e6e5e] text-white text-[19px] font-['DM_Serif_Display',_serif] tracking-[0.14px] rounded-[22px] flex items-center justify-center shadow-[0_4px_15px_rgba(94,110,94,0.2)]">
            Időpontfoglalás
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard onClick={() => onNavigateTo('before-after')}>
          <div className="w-[227px] h-[65px] bg-[#5e6e5e] text-white text-[19px] font-['DM_Serif_Display',_serif] tracking-[0.14px] rounded-[22px] flex items-center justify-center shadow-[0_4px_15px_rgba(94,110,94,0.2)]">
            Előtte - utána
          </div>
        </LiquidGlassCard>
      </div>

      {/* Footer Area */}
      <div className="absolute bottom-[24px] w-full flex flex-col items-center z-20">
        <div className="w-[311px] h-[1px] bg-[#5e6e5e]/30 mb-[12px]"></div>
        <button className="text-[#5e6e5e] text-[16px] font-['Hedvig_Letters_Serif',_serif] underline underline-offset-4 tracking-[0.11px] hover:opacity-70 transition-opacity">
          Rólunk
        </button>
      </div>
    </div>
  );
}


export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock ID for demonstration
  const DUMMY_CLIENT_ID = '00000000-0000-0000-0000-000000000000';

  useEffect(() => {
    async function loadProject() {
      if (currentPage === 'home' || currentPage === 'project-status' || currentPage === 'before-after') {
        setLoading(true);
        let data = null;
        if (supabase) {
          data = await getClientProject(DUMMY_CLIENT_ID);
        }
        if (data) {
          setProjectData(data);
        } else {

          // If no data in Supabase yet, use dummy data for UI display testing
          setProjectData({
            id: 'demo-1',
            status: 'in_progress',
            address: 'Budapest, Budai Vár köz 4.',
            progress_percentage: 65,
            estimated_completion_date: '2026-05-20',
            updates: [
              { id: 1, message: 'Alapozás és szintezés befejezve.', created_at: '2026-03-01' },
              { id: 2, message: 'Öntözőrendszer telepítése folyamatban.', created_at: '2026-03-05' }
            ],
            before_after_media: [{
              before_url: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=800',
              after_url: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=800',
              share_text: 'Nézzétek milyen csodás kertet épít nekem a Grandiflora! 🌿🏡'
            }]
          });
        }
        setLoading(false);
      }
    }
    loadProject();
  }, [currentPage]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#1a1a1a] p-4 font-sans">
      <div className="relative w-full max-w-[395px] aspect-[395/852] bg-white sm:rounded-[40px] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)] flex-shrink-0 ring-1 ring-white/10">

        {/* Background container (Shared exactly between pages) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/assets/background-image-2.png"
            alt="Háttér"
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm transition-all duration-300">
            <div className="w-10 h-10 border-4 border-[#899c85]/30 border-t-[#899c85] rounded-full animate-spin" />
          </div>
        )}

        {/* Top status bar (Shared) */}
        <div className="absolute top-0 w-full px-[24px] pt-[21px] pb-[19px] flex justify-between items-center z-20 text-black">
          <span className="font-semibold text-[17px] tracking-wide" style={{ fontFamily: "SF Pro, sans-serif" }}>9:41</span>
          <div className="flex gap-[7px] items-center">
            {/* Status bar icons */}
            <svg width="19" height="12" viewBox="0 0 19 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 11V3M5 11V1M9 11V5M13 11V8M17 11V6" stroke="black" strokeWidth="2" strokeLinecap="round" /></svg>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 8C5.5 4 11.5 4 15.5 8" stroke="black" strokeWidth="2" strokeLinecap="round" /><path d="M5.5 11C7.5 9.5 9.5 9.5 11.5 11" stroke="black" strokeWidth="2" strokeLinecap="round" /></svg>
            <svg width="27" height="13" viewBox="0 0 27 13" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="22" height="11" rx="3.5" stroke="black" strokeWidth="1" /><rect x="3" y="3" width="18" height="7" rx="2" fill="black" /><path d="M25 4V9" stroke="black" strokeWidth="2" strokeLinecap="round" /></svg>
          </div>
        </div>

        {/* Router */}
        {currentPage === 'landing' && <LandingScreen onNavigate={setCurrentPage} />}
        {currentPage === 'login' && <LoginScreen onBack={() => setCurrentPage('landing')} onLoginSuccess={() => setCurrentPage('home')} />}
        {currentPage === 'register' && <RegisterScreen onBack={() => setCurrentPage('landing')} onRegisterSuccess={() => setCurrentPage('home')} onGoToLogin={() => setCurrentPage('login')} />}
        {currentPage === 'home' && <HomeScreen onLogout={() => setCurrentPage('landing')} onNavigateTo={setCurrentPage} />}
        {currentPage === 'project-status' && <ProjectStatus project={projectData} onBack={() => setCurrentPage('home')} />}
        {currentPage === 'before-after' && <BeforeAfterGallery project={projectData} onBack={() => setCurrentPage('home')} />}

      </div>
    </div>
  );
}

