import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

// 模擬文章數據
const articles = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: Mock.Random.title(5, 10),
  content: Mock.Random.paragraph(10, 20),
  excerpt: Mock.Random.sentence(20, 50),
  author: {
    id: Mock.Random.integer(1, 3),
    name: Mock.Random.cname(),
    avatar: Mock.Random.image('100x100', Mock.Random.color(), '#FFF', 'Avatar'),
  },
  category: {
    id: Mock.Random.integer(1, 5),
    name: Mock.Random.pick(['技術', '生活', '旅遊', '美食', '學習']),
  },
  tags: Array.from({ length: Mock.Random.integer(1, 4) }, () => ({
    id: Mock.Random.integer(1, 10),
    name: Mock.Random.pick([
      'Vue',
      'React',
      'JavaScript',
      'TypeScript',
      'CSS',
      'HTML',
      '前端',
      '後端',
      '全端',
      'UI/UX',
    ]),
  })),
  coverImage: Mock.Random.image('800x400', Mock.Random.color(), '#FFF', 'png', 'Cover'),
  publishedAt: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
  createdAt: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
  updatedAt: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
  viewCount: Mock.Random.integer(0, 10000),
  likeCount: Mock.Random.integer(0, 500),
  commentCount: Mock.Random.integer(0, 100),
  status: Mock.Random.pick(['published', 'draft']),
  featured: Mock.Random.boolean(),
}))

// 模擬分類數據
const categories = [
  { id: 1, name: '技術', slug: 'tech', articleCount: 8 },
  { id: 2, name: '生活', slug: 'life', articleCount: 5 },
  { id: 3, name: '旅遊', slug: 'travel', articleCount: 3 },
  { id: 4, name: '美食', slug: 'food', articleCount: 2 },
  { id: 5, name: '學習', slug: 'study', articleCount: 2 },
]

// 模擬標籤數據
const tags = [
  { id: 1, name: 'Vue', slug: 'vue', articleCount: 10 },
  { id: 2, name: 'React', slug: 'react', articleCount: 8 },
  { id: 3, name: 'JavaScript', slug: 'javascript', articleCount: 15 },
  { id: 4, name: 'TypeScript', slug: 'typescript', articleCount: 12 },
  { id: 5, name: 'CSS', slug: 'css', articleCount: 6 },
  { id: 6, name: 'HTML', slug: 'html', articleCount: 4 },
  { id: 7, name: '前端', slug: 'frontend', articleCount: 18 },
  { id: 8, name: '後端', slug: 'backend', articleCount: 5 },
  { id: 9, name: '全端', slug: 'fullstack', articleCount: 7 },
  { id: 10, name: 'UI/UX', slug: 'ui-ux', articleCount: 3 },
]

export default [
  // 獲取文章列表
  {
    url: '/api/articles',
    method: 'get',
    response: ({ query }: any) => {
      const { page = 1, pageSize = 10, category, tag, search, featured } = query
      let filteredArticles = [...articles]

      // 按分類篩選
      if (category) {
        filteredArticles = filteredArticles.filter(
          (article) =>
            article.category.name === category || article.category.id === parseInt(category),
        )
      }

      // 按標籤篩選
      if (tag) {
        filteredArticles = filteredArticles.filter((article) =>
          article.tags.some((t) => t.name === tag || t.id === parseInt(tag)),
        )
      }

      // 搜尋功能
      if (search) {
        filteredArticles = filteredArticles.filter(
          (article) =>
            article.title.includes(search) ||
            article.content.includes(search) ||
            article.excerpt.includes(search),
        )
      }

      // 精選文章
      if (featured === 'true') {
        filteredArticles = filteredArticles.filter((article) => article.featured)
      }

      // 只返回已發布的文章
      filteredArticles = filteredArticles.filter((article) => article.status === 'published')

      // 分頁處理
      const total = filteredArticles.length
      const start = (page - 1) * pageSize
      const end = start + parseInt(pageSize)
      const paginatedArticles = filteredArticles.slice(start, end)

      return {
        code: 200,
        message: '獲取文章列表成功',
        data: {
          articles: paginatedArticles,
          pagination: {
            current: parseInt(page),
            pageSize: parseInt(pageSize),
            total,
            pages: Math.ceil(total / pageSize),
          },
        },
      }
    },
  },

  // 獲取單篇文章
  {
    url: '/api/articles/:id',
    method: 'get',
    response: ({ query }: any) => {
      const { id } = query
      const article = articles.find((a) => a.id === parseInt(id))

      if (!article) {
        return {
          code: 404,
          message: '文章不存在',
          data: null,
        }
      }

      // 增加瀏覽次數
      article.viewCount += 1

      return {
        code: 200,
        message: '獲取文章成功',
        data: article,
      }
    },
  },

  // 獲取熱門文章
  {
    url: '/api/articles/popular',
    method: 'get',
    response: ({ query }: any) => {
      const { limit = 5 } = query
      const popularArticles = articles
        .filter((article) => article.status === 'published')
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, parseInt(limit))

      return {
        code: 200,
        message: '獲取熱門文章成功',
        data: popularArticles,
      }
    },
  },

  // 獲取最新文章
  {
    url: '/api/articles/latest',
    method: 'get',
    response: ({ query }: any) => {
      const { limit = 5 } = query
      const latestArticles = articles
        .filter((article) => article.status === 'published')
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, parseInt(limit))

      return {
        code: 200,
        message: '獲取最新文章成功',
        data: latestArticles,
      }
    },
  },

  // 獲取分類列表
  {
    url: '/api/categories',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '獲取分類列表成功',
        data: categories,
      }
    },
  },

  // 獲取標籤列表
  {
    url: '/api/tags',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '獲取標籤列表成功',
        data: tags,
      }
    },
  },

  // 文章點讚
  {
    url: '/api/articles/:id/like',
    method: 'post',
    response: ({ query }: any) => {
      const { id } = query
      const article = articles.find((a) => a.id === parseInt(id))

      if (!article) {
        return {
          code: 404,
          message: '文章不存在',
          data: null,
        }
      }

      article.likeCount += 1

      return {
        code: 200,
        message: '點讚成功',
        data: { likeCount: article.likeCount },
      }
    },
  },

  // 取消點讚
  {
    url: '/api/articles/:id/unlike',
    method: 'post',
    response: ({ query }: any) => {
      const { id } = query
      const article = articles.find((a) => a.id === parseInt(id))

      if (!article) {
        return {
          code: 404,
          message: '文章不存在',
          data: null,
        }
      }

      article.likeCount = Math.max(0, article.likeCount - 1)

      return {
        code: 200,
        message: '取消點讚成功',
        data: { likeCount: article.likeCount },
      }
    },
  },
] as MockMethod[]
