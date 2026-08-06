'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

export default function RegisterPage() {
  const t = useTranslations('register');
  const locale = useLocale();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    childName: '',
    age: '',
    level: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [checking, setChecking] = useState(true);
const [isLoggedIn, setIsLoggedIn] = useState(false);


useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      window.location.replace(`/${locale}/dashboard`);
    } else {
      setMounted(true);
      setChecking(false);
    }
  });
  return () => unsubscribe();
}, [locale]);
  
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!isLogin) {
        // التسجيل
        if (!formData.childName || !formData.email || !formData.password || !formData.confirmPassword) {
          setError(t('error_fields'));
          setLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError(t('error_password'));
          setLoading(false);
          return;
        }
        if (formData.password.length < 8) {
          setError(t('error_length'));
          setLoading(false);
          return;
        }
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        setSuccess(t('success_register'));
        setTimeout(() => router.push(`/${locale}/dashboard`), 1500);
      } else {
        // تسجيل الدخول
        if (!formData.email || !formData.password) {
          setError(t('error_fields'));
          setLoading(false);
          return;
        }
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setSuccess(t('success_login'));
        setTimeout(() => router.push(`/${locale}/dashboard`), 1500);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        const code = (err as {code?: string}).code;
        if (code === 'auth/email-already-in-use') {
          setError('البريد الإلكتروني مستخدم مسبقاً');
        } else if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
          setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        } else if (code === 'auth/weak-password') {
          setError('كلمة المرور ضعيفة جداً');
        } else if (code === 'auth/invalid-email') {
          setError('البريد الإلكتروني غير صحيح');
        } else {
          setError('حدث خطأ، يرجى المحاولة مرة أخرى');
        }
      }
    } finally {
      setLoading(false);
    }
  };

if (!mounted || checking) return null;
  
  return (
    <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e6fffe 0%, #fff9e6 100%)'}}>
      <Navbar />
      <div className="max-w-md mx-auto px-4 py-12">

        <div className="flex rounded-2xl overflow-hidden mb-8 shadow-md">
          <button
            onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
            className="flex-1 py-3 font-bold text-lg transition"
            style={!isLogin ? {background: '#00cec9', color: 'white'} : {background: 'white', color: '#006a67'}}
          >
            {t('tab_register')}
          </button>
          <button
            onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
            className="flex-1 py-3 font-bold text-lg transition"
            style={isLogin ? {background: '#00cec9', color: 'white'} : {background: 'white', color: '#006a67'}}
          >
            {t('tab_login')}
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8" style={{border: '3px solid #00cec9'}}>
          <div className="text-center mb-8">
            <div className="text-6xl mb-3">{isLogin ? '🔑' : '🌟'}</div>
            <h1 className="text-3xl font-bold" style={{color: '#006a67'}}>
              {isLogin ? t('login_title') : t('title')}
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              {isLogin ? t('login_subtitle') : t('subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block font-bold mb-2 text-sm" style={{color: '#006a67'}}>{t('name')}</label>
                  <input
                    type="text"
                    placeholder={t('name_placeholder')}
                    value={formData.childName}
                    onChange={e => setFormData({...formData, childName: e.target.value})}
                    className="w-full rounded-2xl px-4 py-3 text-right outline-none"
                    style={{border: '2px solid #b2f0ee'}}
                    onFocus={e => e.target.style.borderColor = '#00cec9'}
                    onBlur={e => e.target.style.borderColor = '#b2f0ee'}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2 text-sm" style={{color: '#006a67'}}>{t('age')}</label>
                  <select
                    value={formData.age}
                    onChange={e => setFormData({...formData, age: e.target.value})}
                    className="w-full rounded-2xl px-4 py-3 text-right outline-none"
                    style={{border: '2px solid #b2f0ee'}}
                  >
                    <option value="">{t('age_placeholder')}</option>
                    {Array.from({length: 7}, (_, i) => i + 6).map(age => (
                      <option key={age} value={age}>{age}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-2 text-sm" style={{color: '#006a67'}}>{t('level')}</label>
                  <select
                    value={formData.level}
                    onChange={e => setFormData({...formData, level: e.target.value})}
                    className="w-full rounded-2xl px-4 py-3 text-right outline-none"
                    style={{border: '2px solid #b2f0ee'}}
                  >
                    <option value="">{t('level_placeholder')}</option>
                    <option value="1">1 — (6-8)</option>
                    <option value="2">2 — (8-10)</option>
                    <option value="3">3 — (10-12)</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block font-bold mb-2 text-sm" style={{color: '#006a67'}}>{t('email')}</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full rounded-2xl px-4 py-3 text-right outline-none"
                style={{border: '2px solid #b2f0ee'}}
                onFocus={e => e.target.style.borderColor = '#00cec9'}
                onBlur={e => e.target.style.borderColor = '#b2f0ee'}
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm" style={{color: '#006a67'}}>{t('password')}</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full rounded-2xl px-4 py-3 text-right outline-none"
                style={{border: '2px solid #b2f0ee'}}
                onFocus={e => e.target.style.borderColor = '#00cec9'}
                onBlur={e => e.target.style.borderColor = '#b2f0ee'}
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block font-bold mb-2 text-sm" style={{color: '#006a67'}}>{t('confirm_password')}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full rounded-2xl px-4 py-3 text-right outline-none"
                  style={{border: '2px solid #b2f0ee'}}
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
            {success && (
              <div className="rounded-2xl p-3 text-center text-sm font-bold" style={{background: '#dcfce7', color: '#16a34a'}}>
                {success}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full font-bold py-4 rounded-2xl text-lg text-white transition hover:opacity-90"
              style={{
                background: loading ? '#b2f0ee' : 'linear-gradient(135deg, #00cec9, #006a67)',
                boxShadow: '0 4px 15px rgba(0,206,201,0.4)',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '⏳ ...' : isLogin ? `🔑 ${t('login_submit')}` : `🌟 ${t('submit')}`}
            </button>

            {isLogin && (
              <p className="text-center text-sm cursor-pointer hover:opacity-70" style={{color: '#00cec9'}}>
                {t('forgot_password')}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}