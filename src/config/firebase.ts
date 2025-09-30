import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase 配置 - 使用環境變數
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// 檢查必要的環境變數是否存在
if (!firebaseConfig.apiKey) {
  console.error('❌ Firebase 配置錯誤：請檢查 .env.local 文件中的 VITE_FIREBASE_API_KEY')
}

if (!firebaseConfig.projectId) {
  console.error('❌ Firebase 配置錯誤：請檢查 .env.local 文件中的 VITE_FIREBASE_PROJECT_ID')
}

// 初始化 Firebase
const app = initializeApp(firebaseConfig)

// 初始化 Auth
export const auth = getAuth(app)

// 初始化 Firestore
export const db = getFirestore(app)

export default app
