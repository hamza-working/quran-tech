'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { createChildProfile } from '@/lib/firestore';

interface LoginFormProps {
  locale: string;
  onSuccess: () => void;
}

export default function LoginForm({ locale, onSuccess }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [childName, setChildName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const texts = {
    ar: {
      login: 'تسجيل الدخول', register: 'تسجيل جديد',
      email: 'البريد الإلكتروني', password: 'كلمة المرور',
      confirm: 'تأكيد كلمة المرور', name: 'اسم الطفل',
      submit_login: 'دخول', submit_register: 'تسجيل',
      error_fields: 'يرجى ملء جميع الحقول',
      error_password: 'كلمة المرور غير متطابقة',
      error_length: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
    },
    fr: {
      login: 'Connexion', register: 'Inscription',
      email: 'Email', password: 'Mot de passe',
      confirm: 'Confirmer le mot de passe', name: "Nom de l'enfant",
      submit_login: 'Se connecter', submit_register: "S'inscrire",
      error_fields: 'Veuillez remplir tous les champs',
      error_password: 'Les mots de passe ne correspondent pas',
      error_length: 'Le mot de passe doit contenir au moins 8 caractères',
    },
    en: {
      login: 'Login', register: 'Register',
      email: 'Email', password: 'Password',
      confirm: 'Confirm Password', name: 'Child Name',
      submit_login: 'Login', submit_register: 'Register',
      error_fields: 'Please fill in all fields',
      error_password: 'Passwords do not match',
      error_length: 'Password must be at least 8 characters',
    },
  };

  const t = texts[locale as keyof typeof texts] || texts.ar;

  const inputStyle: React.CSSProperties = {
    border: '2px solid #b2f0ee',
    color: '#333',
    backgroundColor: 'white',
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        if (!email || !password) { setError(t.error_fields); setLoading(false); return; }
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (!childName || !email || !password || !confirmPassword) { setError(t.error_fields); setLoading(false); return; }
        if (password !== confirmPassword) { setError(t.error_password); setLoading(false); return; }
        if (password.length < 8) { setError(t.error_length); setLoading(false); return; }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
await createChildProfile(
  userCredential.user.uid,
  childName,
  email,
  1
);
      }
      onSuccess();
    } catch (err: unknown) {
      const code = (err as {code?: string}).code;
      if (code === 'auth/email-already-in-use') setError('البريد الإلكتروني مستخدم مسبقاً');
      else if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') setError('البريد أو كلمة المرور خاطئة');
      else if (code === 'auth/invalid-email') setError('البريد الإلكتروني غير صحيح');
      else setError('حدث خطأ، يرجى المحاولة مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* تبديل Login/Register */}
      <div className="flex rounded-2xl overflow-hidden mb-6 shadow-sm">
        <button
          onClick={() => { setIsLogin(true); setError(''); }}
          className="flex-1 py-2 font-bold text-sm transition"
          style={isLogin ? {background: '#00cec9', color: 'white'} : {background: '#f0fffe', color: '#006a67'}}
        >
          {t.login}
        </button>
        <button
          onClick={() => { setIsLogin(false); setError(''); }}
          className="flex-1 py-2 font-bold text-sm transition"
          style={!isLogin ? {background: '#00cec9', color: 'white'} : {background: '#f0fffe', color: '#006a67'}}
        >
          {t.register}
        </button>
      </div>

      <div className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-bold mb-1" style={{color: '#006a67'}}>{t.name}</label>
            <input
              type="text"
              placeholder={t.name}
              value={childName}
              onChange={e => setChildName(e.target.value)}
              className="w-full rounded-2xl px-4 py-3 text-right outline-none"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#00cec9'}
              onBlur={e => e.target.style.borderColor = '#b2f0ee'}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-bold mb-1" style={{color: '#006a67'}}>{t.email}</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-2xl px-4 py-3 text-right outline-none"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#00cec9'}
            onBlur={e => e.target.style.borderColor = '#b2f0ee'}
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1" style={{color: '#006a67'}}>{t.password}</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-2xl px-4 py-3 text-right outline-none"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#00cec9'}
            onBlur={e => e.target.style.borderColor = '#b2f0ee'}
          />
        </div>

        {!isLogin && (
          <div>
            <label className="block text-sm font-bold mb-1" style={{color: '#006a67'}}>{t.confirm}</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full rounded-2xl px-4 py-3 text-right outline-none"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#00cec9'}
              onBlur={e => e.target.style.borderColor = '#b2f0ee'}
            />
          </div>
        )}

        {error && (
          <div className="rounded-2xl p-3 text-center text-sm font-bold" style={{background: '#fee2e2', color: '#dc2626'}}>
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full font-bold py-3 rounded-2xl text-white transition hover:opacity-90"
          style={{background: loading ? '#b2f0ee' : 'linear-gradient(135deg, #00cec9, #006a67)'}}
        >
          {loading ? '⏳...' : isLogin ? t.submit_login : t.submit_register}
        </button>
      </div>
    </div>
  );
}