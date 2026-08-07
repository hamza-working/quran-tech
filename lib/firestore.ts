import { db } from './firebase';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export interface ChildProfile {
  uid: string;
  name: string;
  email: string;
  level: number;
  memorizedSurahs: number;
  completedQuizzes: number;
  englishProgress: number;
  frenchProgress: number;
  createdAt: unknown;
  updatedAt: unknown;
}

// إنشاء ملف الطفل عند التسجيل
export const createChildProfile = async (
  uid: string,
  name: string,
  email: string,
  level: number = 1
) => {
  await setDoc(doc(db, 'children', uid), {
    uid,
    name,
    email,
    level,
    memorizedSurahs: 0,
    completedQuizzes: 0,
    englishProgress: 0,
    frenchProgress: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// جلب ملف الطفل
export const getChildProfile = async (uid: string): Promise<ChildProfile | null> => {
  const docRef = doc(db, 'children', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as ChildProfile;
  }
  return null;
};

// تحديث عدد السور المحفوظة
export const updateMemorizedSurahs = async (uid: string, count: number) => {
  await updateDoc(doc(db, 'children', uid), {
    memorizedSurahs: count,
    updatedAt: serverTimestamp(),
  });
};

// تحديث تقدم الإنجليزية
export const updateEnglishProgress = async (uid: string, progress: number) => {
  await updateDoc(doc(db, 'children', uid), {
    englishProgress: progress,
    updatedAt: serverTimestamp(),
  });
};

// تحديث عدد الاختبارات المكتملة
export const updateCompletedQuizzes = async (uid: string, count: number) => {
  await updateDoc(doc(db, 'children', uid), {
    completedQuizzes: count,
    updatedAt: serverTimestamp(),
  });
};

// جلب جميع الأطفال للمشرف
export const getAllChildren = async (): Promise<ChildProfile[]> => {
  const q = query(collection(db, 'children'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as ChildProfile);
};