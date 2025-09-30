import { ref, computed } from 'vue'
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/config/firebase'

export interface Message {
  id?: string
  userId: string
  userName: string
  userEmail?: string
  userAvatar?: string
  content: string
  createdAt: Timestamp | Date
}

export const useMessages = () => {
  const messages = ref<Message[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 清除錯誤
  const clearError = () => {
    error.value = null
  }

  // 樂觀更新：立即添加到本地，然後保存到數據庫
  const addMessage = async (messageData: {
    userId: string
    userName: string
    userEmail?: string
    userAvatar?: string
    content: string
  }) => {
    isLoading.value = true
    error.value = null

    // 創建臨時 ID 和樂觀更新的留言
    const tempId = 'temp_' + Date.now()
    const optimisticMessage: Message = {
      id: tempId,
      ...messageData,
      createdAt: new Date(), // 使用本地時間作為臨時時間戳
    }

    try {
      // 樂觀更新：立即添加到本地列表
      messages.value.unshift(optimisticMessage)

      // 保存到 Firestore
      const docRef = await addDoc(collection(db, 'messages'), {
        ...messageData,
        createdAt: serverTimestamp(),
      })

      console.log('留言已保存，ID:', docRef.id)

      // 設定一個延遲，讓實時監聽有時間更新，然後移除臨時留言
      setTimeout(() => {
        const messageIndex = messages.value.findIndex((msg) => msg.id === tempId)
        if (messageIndex !== -1) {
          messages.value.splice(messageIndex, 1)
        }
      }, 1000) // 1秒後移除臨時留言

      return docRef.id
    } catch (err: any) {
      // 如果保存失敗，立即移除樂觀更新的留言
      const messageIndex = messages.value.findIndex((msg) => msg.id === tempId)
      if (messageIndex !== -1) {
        messages.value.splice(messageIndex, 1)
      }

      error.value = '發送留言失敗：' + err.message
      console.error('添加留言錯誤:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 獲取所有留言
  const fetchMessages = async () => {
    isLoading.value = true
    error.value = null

    try {
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)

      messages.value = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Message,
      )

      console.log('獲取到', messages.value.length, '條留言')
    } catch (err: any) {
      error.value = '獲取留言失敗：' + err.message
      console.error('獲取留言錯誤:', err)
    } finally {
      isLoading.value = false
    }
  }

  // 實時監聽留言更新
  const subscribeToMessages = () => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))

    return onSnapshot(
      q,
      (querySnapshot) => {
        const firestoreMessages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[]

        // 直接使用 Firestore 的資料（已經按時間排序）
        messages.value = firestoreMessages
      },
      (err) => {
        error.value = '實時更新失敗：' + err.message
        console.error('實時監聽錯誤:', err)
      },
    )
  }

  // 格式化時間顯示
  const formatMessageDate = (timestamp: Timestamp | Date): string => {
    let date: Date

    if (timestamp instanceof Timestamp) {
      date = timestamp.toDate()
    } else {
      date = timestamp
    }

    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) {
      return 'Just now'
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else if (diffInMinutes < 7 * 24 * 60) {
      const days = Math.floor(diffInMinutes / (24 * 60))
      return `${days} day${days > 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  // 清除所有臨時留言（用於處理錯誤情況）
  const clearTempMessages = () => {
    messages.value = messages.value.filter((msg) => !msg.id?.toString().startsWith('temp_'))
  }

  return {
    // 狀態
    messages: computed(() => messages.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),

    // 方法
    addMessage,
    fetchMessages,
    subscribeToMessages,
    formatMessageDate,
    clearError,
    clearTempMessages,
  }
}
