import { MockMethod } from 'vite-plugin-mock'

// 模擬用戶數據
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: '123456',
    avatar: 'https://via.placeholder.com/100x100?text=Admin',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    username: 'user',
    email: 'user@example.com',
    password: '123456',
    avatar: 'https://via.placeholder.com/100x100?text=User',
    role: 'user',
    createdAt: '2024-01-02T00:00:00.000Z',
  },
]

// 模擬登入 token 存儲
let currentToken = ''

export default [
  // 登入 API
  {
    url: '/api/auth/login',
    method: 'post',
    response: ({ body }: any) => {
      const { username, password } = body
      const user = users.find((u) => u.username === username && u.password === password)

      if (user) {
        // 生成簡單的 token
        currentToken = `token_${user.id}_${Date.now()}`

        return {
          code: 200,
          message: '登入成功',
          data: {
            token: currentToken,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              avatar: user.avatar,
              role: user.role,
              createdAt: user.createdAt,
            },
          },
        }
      } else {
        return {
          code: 401,
          message: '用戶名或密碼錯誤',
          data: null,
        }
      }
    },
  },

  // 登出 API
  {
    url: '/api/auth/logout',
    method: 'post',
    response: () => {
      currentToken = ''
      return {
        code: 200,
        message: '登出成功',
        data: null,
      }
    },
  },

  // 獲取當前用戶信息
  {
    url: '/api/auth/me',
    method: 'get',
    response: ({ headers }: any) => {
      const token = headers.authorization?.replace('Bearer ', '')

      if (!token || token !== currentToken) {
        return {
          code: 401,
          message: '未授權，請重新登入',
          data: null,
        }
      }

      // 從 token 中提取用戶 ID
      const userId = parseInt(token.split('_')[1])
      const user = users.find((u) => u.id === userId)

      if (user) {
        return {
          code: 200,
          message: '獲取用戶信息成功',
          data: {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            createdAt: user.createdAt,
          },
        }
      } else {
        return {
          code: 404,
          message: '用戶不存在',
          data: null,
        }
      }
    },
  },

  // 註冊 API
  {
    url: '/api/auth/register',
    method: 'post',
    response: ({ body }: any) => {
      const { username, email, password } = body

      // 檢查用戶是否已存在
      const existingUser = users.find((u) => u.username === username || u.email === email)
      if (existingUser) {
        return {
          code: 400,
          message: '用戶名或郵箱已存在',
          data: null,
        }
      }

      // 創建新用戶
      const newUser = {
        id: users.length + 1,
        username,
        email,
        password,
        avatar: `https://via.placeholder.com/100x100?text=${username}`,
        role: 'user',
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)

      return {
        code: 200,
        message: '註冊成功',
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          avatar: newUser.avatar,
          role: newUser.role,
          createdAt: newUser.createdAt,
        },
      }
    },
  },
] as MockMethod[]
