<template>
  <div class="message-form-container">
    <div class="user-info">
      <img
        :src="user.avatar || `https://i.pravatar.cc/40?u=${user.id}`"
        :alt="user.name"
        class="user-avatar"
      />
      <div class="user-details">
        <span class="user-name">{{ user.name || user.email }}</span>
        <button @click="$emit('logout')" class="logout-btn">登出</button>
      </div>
    </div>

    <form @submit.prevent="submitMessage" class="message-form">
      <div class="form-group">
        <textarea
          v-model="messageContent"
          class="message-input"
          placeholder="寫下您的留言..."
          rows="3"
          maxlength="500"
          required
        ></textarea>
        <div class="char-count">{{ messageContent.length }}/500</div>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-btn" :disabled="isSubmitting || !messageContent.trim()">
          <span v-if="isSubmitting">發送中...</span>
          <span v-else>發送留言</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessages } from '@/composables/useMessages'

interface Props {
  user: {
    id: string
    name?: string
    email?: string
    avatar?: string
  }
}

interface Emits {
  (e: 'logout'): void
  (e: 'message-sent', message: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { addMessage, isLoading: isSubmittingMessage, error } = useMessages()

const messageContent = ref('')
const isSubmitting = ref(false)

const submitMessage = async () => {
  if (!messageContent.value.trim()) return

  isSubmitting.value = true

  try {
    // 保存到 Firestore
    await addMessage({
      userId: props.user.id,
      userName: props.user.name || props.user.email?.split('@')[0] || 'User',
      userEmail: props.user.email,
      userAvatar: props.user.avatar,
      content: messageContent.value.trim(),
    })

    // 通知父組件留言已發送（可選，因為實時監聽會自動更新）
    emit('message-sent', {
      content: messageContent.value.trim(),
      success: true,
    })

    messageContent.value = '' // 清空輸入框
    console.log('留言發送成功')
  } catch (error) {
    console.error('發送留言失敗:', error)
    // 這裡可以顯示錯誤提示給用戶
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.message-form-container {
  background: transparent;
  border: none;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  max-width: 60%;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-name {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.logout-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.375rem;
  padding: 0.25rem 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  border-color: rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.9);
}

.message-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  position: relative;
}

.message-input {
  width: 100%;
  max-width: 60%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  color: white;
  font-size: 0.875rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 80px;
  transition: all 0.3s ease;
}

.message-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
}

.message-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.char-count {
  position: absolute;
  bottom: 0.75rem;
  right: 1rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  background: none;
  padding: 0;
  pointer-events: none;
  z-index: 1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.submit-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .message-form-container {
    padding: 1rem;
    max-width: 90%;
  }

  .user-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .logout-btn {
    align-self: flex-end;
  }

  .message-input {
    max-width: 90%;
  }

  .char-count {
    display: none;
  }
}
</style>
