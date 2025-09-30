<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- 關閉按鈕 -->
      <button @click="closeModal" class="close-btn">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- 用戶頭像 -->
      <div class="avatar">
        <div class="avatar-circle">👤</div>
      </div>

      <!-- 標題 -->
      <h2 class="modal-title">登錄</h2>
      <p class="modal-subtitle">繼續使用 cali.so</p>

      <!-- 第三方登入選項 -->
      <div class="auth-options">
        <button @click="loginWithGithub" class="auth-btn github-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
          使用 GitHub 登錄
        </button>

        <button @click="loginWithGoogle" class="auth-btn google-btn">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          使用 Google 登錄
        </button>
      </div>

      <!-- 錯誤訊息 -->
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'

interface Props {
  isVisible: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'login-success', user: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const {
  loginWithGoogle: firebaseLoginWithGoogle,
  loginWithGithub: firebaseLoginWithGithub,
  isLoading,
  error,
  clearError,
} = useAuth()

// 監聽模態框顯示狀態，清除錯誤
watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      clearError()
    }
  },
)

// 關閉模態框
const closeModal = () => {
  emit('close')
}

// GitHub 登入
const loginWithGithub = async () => {
  try {
    const user = await firebaseLoginWithGithub()
    if (user) {
      emit('login-success', {
        id: user.uid,
        name: user.displayName || 'GitHub User',
        email: user.email,
        avatar: user.photoURL || `https://i.pravatar.cc/40?u=${user.uid}`,
        provider: 'github',
      })
      closeModal()
    }
  } catch (error) {
    // 錯誤已在 composable 中處理
    console.error('GitHub login error:', error)
  }
}

// Google 登入
const loginWithGoogle = async () => {
  try {
    const user = await firebaseLoginWithGoogle()
    if (user) {
      emit('login-success', {
        id: user.uid,
        name: user.displayName || 'Google User',
        email: user.email,
        avatar: user.photoURL || `https://i.pravatar.cc/40?u=${user.uid}`,
        provider: 'google',
      })
      closeModal()
    }
  } catch (error) {
    // 錯誤已在 composable 中處理
    console.error('Google login error:', error)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  position: relative;
  animation: slideUp 0.3s ease;
  max-height: 90vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.avatar-circle {
  width: 60px;
  height: 60px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #6b7280;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #111827;
}

.modal-subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
}

.auth-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.auth-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.auth-btn:hover {
  border-color: #9ca3af;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.github-btn:hover {
  border-color: #374151;
}

.google-btn:hover {
  border-color: #4285f4;
}

/* 錯誤訊息 */
.error-message {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 響應式設計 */
@media (max-width: 480px) {
  .modal-content {
    margin: 1rem;
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.25rem;
  }

  .auth-btn {
    font-size: 0.875rem;
  }
}
</style>
