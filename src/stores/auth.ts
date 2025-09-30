import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/composables/useAuth'

export interface User {
  id: string
  email: string | null
  displayName?: string | null
  avatar?: string | null
  provider?: string
  role: 'user' | 'admin'
}

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
}

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export const useAuthStore = defineStore('auth', () => {
  // 使用 Firebase Auth composable
  const firebaseAuth = useAuth()

  // 狀態 (使用 Firebase 的狀態)
  const user = computed(() =>
    firebaseAuth.user.value
      ? {
          id: firebaseAuth.user.value.uid,
          email: firebaseAuth.user.value.email,
          displayName: firebaseAuth.user.value.displayName,
          avatar: firebaseAuth.user.value.photoURL,
          role: 'user' as const, // 預設為普通用戶，可以根據需要擴展
          provider: 'firebase',
        }
      : null,
  )

  const isLoading = computed(() => firebaseAuth.isLoading.value)
  const error = computed(() => firebaseAuth.error.value)

  // 計算屬性
  const isAuthenticated = computed(() => firebaseAuth.isAuthenticated.value)
  const isAdmin = computed(() => false) // 預設所有用戶都不是管理員，可根據需要擴展

  // 初始化認證狀態 (Firebase 會自動處理)
  const initAuth = () => {
    firebaseAuth.initAuth()
  }

  // 登入方法 (使用 Firebase)
  const loginWithGoogle = async (): Promise<void> => {
    try {
      await firebaseAuth.loginWithGoogle()
    } catch (error) {
      throw error
    }
  }

  const loginWithGithub = async (): Promise<void> => {
    try {
      await firebaseAuth.loginWithGithub()
    } catch (error) {
      throw error
    }
  }

  // 登出方法
  const logout = async (): Promise<void> => {
    try {
      await firebaseAuth.logout()
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  // 清除錯誤
  const clearError = () => {
    firebaseAuth.clearError()
  }

  return {
    // 狀態
    user,
    isLoading,
    error,

    // 計算屬性
    isAuthenticated,
    isAdmin,

    // 方法
    initAuth,
    loginWithGoogle,
    loginWithGithub,
    logout,
    clearError,
  }
})
