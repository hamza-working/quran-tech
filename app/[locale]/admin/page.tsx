'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Navbar from '@/components/shared/Navbar';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getAllChildren, ChildProfile } from '@/lib/firestore';

const ADMIN_EMAIL = 'workhamza77@gmail.com';

export default function AdminPage() {
  const locale = useLocale();
  const router = useRouter();
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'children' | 'stats'>('children');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push(`/${locale}`);
        return;
      }
      const data = await getAllChildren();
      setChildren(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [locale, router]);

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(search.toLowerCase()) ||
    child.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalMemorized = children.reduce((sum, c) => sum + c.memorizedSurahs, 0);
  const avgMemorized = children.length > 0 ? Math.round(totalMemorized / children.length) : 0;
  const totalQuizzes = children.reduce((sum, c) => sum + c.completedQuizzes, 0);

  if (loading) {
    return (
      <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e6fffe 0%, #fff9e6 100%)'}}>
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl font-bold" style={{color: '#006a67'}}>جاري التحميل...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e6fffe 0%, #fff9e6 100%)'}}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* رأس الصفحة */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">⚙️</div>
          <h1 className="text-3xl font-bold" style={{color: '#006a67'}}>لوحة تحكم المشرف</h1>
          <p className="text-gray-400 mt-2">إدارة الأطفال المسجلين ومتابعة تقدمهم</p>
        </div>

        {/* إحصائيات عامة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: '👦', label: 'الأطفال المسجلين', value: children.length, color: '#079992' },
            { icon: '📖', label: 'متوسط السور المحفوظة', value: avgMemorized, color: '#fbbf24' },
            { icon: '🧠', label: 'إجمالي الاختبارات', value: totalQuizzes, color: '#f59e0b' },
            { icon: '⭐', label: 'إجمالي السور المحفوظة', value: totalMemorized, color: '#06b6d4' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl p-5 text-center shadow-md" style={{border: `3px solid ${stat.color}`}}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold" style={{color: stat.color}}>{stat.value}</div>
              <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* تبويبات */}
        <div className="flex rounded-2xl overflow-hidden mb-6 shadow-sm bg-white">
          <button
            onClick={() => setActiveTab('children')}
            className="flex-1 py-3 font-bold transition"
            style={activeTab === 'children' ? {background: '#079992', color: 'white'} : {color: '#006a67'}}
          >
            👦 قائمة الأطفال
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className="flex-1 py-3 font-bold transition"
            style={activeTab === 'stats' ? {background: '#079992', color: 'white'} : {color: '#006a67'}}
          >
            📊 إحصائيات تفصيلية
          </button>
        </div>

        {/* قائمة الأطفال */}
        {activeTab === 'children' && (
          <div>
            {/* بحث */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="🔍 ابحث باسم الطفل أو البريد..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full rounded-2xl px-4 py-3 text-right outline-none bg-white"
                style={{border: '2px solid #b2f0ee', color: '#333'}}
              />
            </div>

            {/* جدول الأطفال */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden" style={{border: '3px solid #079992'}}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{background: '#006a67', color: 'white'}}>
                      <th className="p-4 text-right">الاسم</th>
                      <th className="p-4 text-right">البريد</th>
                      <th className="p-4 text-center">المستوى</th>
                      <th className="p-4 text-center">السور المحفوظة</th>
                      <th className="p-4 text-center">الاختبارات</th>
                      <th className="p-4 text-center">الإنجليزية</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredChildren.map((child, i) => (
                      <tr
                        key={child.uid}
                        className="border-b transition hover:opacity-90"
                        style={{
                          borderColor: '#e6fffe',
                          background: i % 2 === 0 ? 'white' : '#f0fffe'
                        }}
                      >
                        <td className="p-4 font-bold" style={{color: '#006a67'}}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                              style={{background: '#079992'}}
                            >
                              {child.name.charAt(0).toUpperCase()}
                            </div>
                            {child.name}
                          </div>
                        </td>
                        <td className="p-4 text-gray-400 text-sm">{child.email}</td>
                        <td className="p-4 text-center">
                          <span className="px-2 py-1 rounded-full text-white text-xs font-bold"
                            style={{background: child.level === 1 ? '#079992' : child.level === 2 ? '#fbbf24' : '#f59e0b'}}>
                            {child.level === 1 ? 'مبتدئ' : child.level === 2 ? 'متوسط' : 'متقدم'}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <div className="w-16 rounded-full h-2" style={{background: '#e6fffe'}}>
                              <div className="h-2 rounded-full" style={{width: `${(child.memorizedSurahs / 114) * 100}%`, background: '#079992'}} />
                            </div>
                            <span className="font-bold text-sm" style={{color: '#079992'}}>{child.memorizedSurahs}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center font-bold" style={{color: '#fbbf24'}}>{child.completedQuizzes}</td>
                        <td className="p-4 text-center font-bold" style={{color: '#06b6d4'}}>{child.englishProgress}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredChildren.length === 0 && (
                  <div className="text-center py-10 text-gray-400">لا توجد نتائج</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* إحصائيات تفصيلية */}
        {activeTab === 'stats' && (
          <div className="grid md:grid-cols-2 gap-6">

            {/* توزيع المستويات */}
            <div className="bg-white rounded-3xl p-6 shadow-md" style={{border: '3px solid #079992'}}>
              <h2 className="font-bold text-lg mb-4" style={{color: '#006a67'}}>📊 توزيع المستويات</h2>
              {[
                { label: 'مبتدئ 🌱', level: 1, color: '#079992' },
                { label: 'متوسط ⭐', level: 2, color: '#fbbf24' },
                { label: 'متقدم 👑', level: 3, color: '#f59e0b' },
              ].map((lvl, i) => {
                const count = children.filter(c => c.level === lvl.level).length;
                const percentage = children.length > 0 ? Math.round((count / children.length) * 100) : 0;
                return (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-sm" style={{color: lvl.color}}>{lvl.label}</span>
                      <span className="text-sm text-gray-400">{count} طفل ({percentage}%)</span>
                    </div>
                    <div className="w-full rounded-full h-3" style={{background: '#f0f0f0'}}>
                      <div className="h-3 rounded-full transition-all" style={{width: `${percentage}%`, background: lvl.color}} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* أفضل الأطفال حفظاً */}
            <div className="bg-white rounded-3xl p-6 shadow-md" style={{border: '3px solid #fbbf24'}}>
              <h2 className="font-bold text-lg mb-4" style={{color: '#d97706'}}>🏆 أكثر الأطفال حفظاً</h2>
              {children
                .sort((a, b) => b.memorizedSurahs - a.memorizedSurahs)
                .slice(0, 5)
                .map((child, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3">
                    <span className="font-bold text-lg" style={{color: '#fbbf24'}}>#{i + 1}</span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{background: '#079992'}}
                    >
                      {child.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm" style={{color: '#006a67'}}>{child.name}</div>
                    </div>
                    <span className="font-bold" style={{color: '#079992'}}>{child.memorizedSurahs} سورة</span>
                  </div>
                ))}
              {children.length === 0 && (
                <div className="text-center text-gray-400">لا توجد بيانات</div>
              )}
            </div>

          </div>
        )}

      </div>
    </main>
  );
}