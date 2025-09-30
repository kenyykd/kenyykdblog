import { ref, computed, onMounted } from 'vue'
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from '@/config/firebase'

// 全局用戶狀態
const user = ref<User | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

export const useAuth = () => {
  // 計算屬性
  const isAuthenticated = computed(() => !!user.value)

  // 清除錯誤
  const clearError = () => {
    error.value = null
  }

  // Google 登入
  const loginWithGoogle = async () => {
    isLoading.value = true
    error.value = null

    try {
      const provider = new GoogleAuthProvider()
      // 設定自定義參數
      provider.setCustomParameters({
        prompt: 'select_account',
      })

      const result = await signInWithPopup(auth, provider)
      return result.user
    } catch (err: any) {
      if (err.code === 'auth/account-exists-with-different-credential') {
        // 處理帳戶已存在但使用不同登入方式的情況
        error.value =
          '該電子郵件已使用其他方式註冊。請使用相同的登入方式（如 GitHub），或聯繫管理員合併帳戶。'
        console.log('帳戶衝突：該電子郵件已被其他登入提供商使用')
      } else if (err.code !== 'auth/popup-closed-by-user') {
        error.value = getErrorMessage(err.code)
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // GitHub 登入
  const loginWithGithub = async () => {
    isLoading.value = true
    error.value = null

    try {
      const provider = new GithubAuthProvider()
      // 設定權限範圍
      provider.addScope('user:email')

      const result = await signInWithPopup(auth, provider)
      return result.user
    } catch (err: any) {
      if (err.code === 'auth/account-exists-with-different-credential') {
        // 處理帳戶已存在但使用不同登入方式的情況
        error.value =
          '該電子郵件已使用其他方式註冊。請使用相同的登入方式（如 Google），或聯繫管理員合併帳戶。'
        console.log('帳戶衝突：該電子郵件已被其他登入提供商使用')
      } else if (err.code !== 'auth/popup-closed-by-user') {
        error.value = getErrorMessage(err.code)
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 登出
  const logout = async () => {
    isLoading.value = true
    error.value = null

    try {
      await signOut(auth)
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 錯誤訊息處理
  const getErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': '找不到該用戶',
      'auth/wrong-password': '密碼錯誤',
      'auth/email-already-in-use': '該電子郵件已被使用',
      'auth/weak-password': '密碼強度不足',
      'auth/invalid-email': '電子郵件格式無效',
      'auth/user-disabled': '該用戶帳戶已被停用',
      'auth/too-many-requests': '請求過於頻繁，請稍後再試',
      'auth/network-request-failed': '網絡連接失敗',
      'auth/popup-blocked': '彈出視窗被阻擋，請允許彈出視窗',
      'auth/popup-closed-by-user': '登入視窗被用戶關閉',
      'auth/account-exists-with-different-credential': '該帳戶已存在，但使用不同的登入方式',
      'auth/invalid-credential': '無效的憑證',
      'auth/operation-not-allowed': '該登入方式未啟用',
      'auth/invalid-verification-code': '驗證碼無效',
      'auth/invalid-verification-id': '驗證ID無效',
    }

    return errorMessages[errorCode] || '登入過程發生未知錯誤'
  }

  // 初始化認證狀態監聽
  const initAuth = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
    })
  }

  // 在組件掛載時初始化
  onMounted(() => {
    if (!user.value) {
      initAuth()
    }
  })

  return {
    // 狀態
    user: computed(() => user.value),
    isAuthenticated,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),

    // 方法
    loginWithGoogle,
    loginWithGithub,
    logout,
    clearError,
    initAuth,
  }
}
