<template>
  <div class="message-view">
    <div class="message-header">
      <div class="container">
        <h1 class="page-title">Message</h1>
      </div>
    </div>

    <div class="message-content">
      <div class="container">
        <!-- 登入狀態判斷 -->
        <div v-if="!authStore.isAuthenticated" class="login-notice" @click="showLogin">
          🔒 Please log in to leave a message
        </div>

        <!-- 留言輸入框（登入後顯示） -->
        <MessageForm
          v-else
          :user="{
            id: authStore.user?.id || '',
            name: authStore.user?.displayName || undefined,
            email: authStore.user?.email || undefined,
            avatar: authStore.user?.avatar || undefined,
          }"
          @logout="handleLogout"
          @message-sent="handleMessageSent"
        />

        <!-- 留言列表 -->
        <div class="messages-list">
          <div v-if="messagesLoading" class="loading-message">載入留言中...</div>
          <div v-else-if="firestoreMessages.length === 0" class="no-messages">
            還沒有留言，成為第一個留言的人吧！
          </div>
          <div v-else>
            <div v-for="message in firestoreMessages" :key="message.id" class="message-item">
              <div class="message-avatar">
                <img
                  :src="message.userAvatar || `https://i.pravatar.cc/40?u=${message.userId}`"
                  :alt="message.userName"
                />
              </div>

              <div class="message-info">
                <div class="message-header">
                  <span class="message-author">{{ message.userName }}</span>
                  <span class="message-date">{{ formatMessageDate(message.createdAt) }}</span>
                </div>
                <div class="message-content-text">{{ message.content }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 登入模態框 -->
        <LoginModal
          :is-visible="showLoginModal"
          @close="closeLogin"
          @login-success="handleLoginSuccess"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useMessages } from '@/composables/useMessages'
import LoginModal from '@/components/LoginModal.vue'
import MessageForm from '@/components/MessageForm.vue'

interface Message {
  id: number
  name: string
  avatar: string
  content: string
  date: string
}

// 登入狀態
const authStore = useAuthStore()
const showLoginModal = ref(false)

// 留言狀態
const {
  messages: firestoreMessages,
  subscribeToMessages,
  formatMessageDate,
  isLoading: messagesLoading,
} = useMessages()

let unsubscribe: (() => void) | null = null

// 顯示登入模態框
const showLogin = () => {
  showLoginModal.value = true
}

// 關閉登入模態框
const closeLogin = () => {
  showLoginModal.value = false
}

// 處理登入成功
const handleLoginSuccess = (user: any) => {
  console.log('用戶登入成功:', user)
  // 用戶狀態已經透過 Firebase 自動管理
}

// 處理登出
const handleLogout = async () => {
  try {
    await authStore.logout()
    console.log('用戶已登出')
  } catch (error) {
    console.error('登出失敗:', error)
  }
}

// 處理新留言
const handleMessageSent = (result: any) => {
  if (result.success) {
    console.log('留言發送成功')
    // 實時監聽會自動更新列表，這裡不需要手動添加
  }
}

// 生命週期管理
onMounted(() => {
  // 開始監聽實時留言更新
  unsubscribe = subscribeToMessages()
})

onUnmounted(() => {
  // 清理監聽器
  if (unsubscribe) {
    unsubscribe()
  }
})
</script>

<style scoped>
.message-view {
  min-height: 100vh;
  background: #0a0a0a;
  padding-top: 5rem;
  color: white;
}

.message-header {
  padding: 3rem 0;
}

.message-header .container {
  display: flex;
  justify-content: flex-start;
  max-width: none;
  margin: 0;
  padding-left: 25vw;
  padding-right: 2rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: left;
}

.message-content {
  padding: 2rem 0 4rem 0;
}

.container {
  max-width: none;
  margin: 0;
  padding-left: 25vw;
  padding-right: 2rem;
}

/* 登入提示 */
.login-notice {
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 2rem;
  color: #ffc107;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 60%;
}

.login-notice:hover {
  background: rgba(255, 193, 7, 0.15);
  border-color: rgba(255, 193, 7, 0.4);
  transform: translateY(-1px);
}

/* 響應式調整登入提示 */
@media (max-width: 768px) {
  .login-notice {
    max-width: 90%;
  }
}

/* 留言列表 */
.messages-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-left: 2px solid rgba(255, 255, 255, 0.1);
  padding-left: 1rem;
  max-height: 60vh;
  max-width: 60%;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 隱藏滾動條 */
.messages-list::-webkit-scrollbar {
  display: none;
}

/* Firefox 隱藏滾動條 */
.messages-list {
  scrollbar-width: none;
}

.message-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  position: relative;
}

.message-item::before {
  content: '';
  position: absolute;
  left: -1.25rem;
  top: 1.25rem;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

.message-avatar {
  flex-shrink: 0;
}

.message-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.message-info {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.message-author {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
}

.message-date {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

.message-content-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  line-height: 1.4;
}

.loading-message,
.no-messages {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  padding: 2rem;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .message-header .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .message-content .container {
    padding-left: 2rem;
    padding-right: 1rem;
  }

  .messages-list {
    padding-left: 0.75rem;
    max-height: 50vh;
  }

  .message-item::before {
    left: -1rem;
  }
}
</style>
