import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 定義文章接口
export interface Article {
  id: number
  title: string
  content: string
  excerpt: string
  author: {
    id: number
    name: string
    avatar: string
  }
  category: {
    id: number
    name: string
  }
  tags: Array<{
    id: number
    name: string
  }>
  coverImage: string
  publishedAt: string
  createdAt: string
  updatedAt: string
  viewCount: number
  likeCount: number
  commentCount: number
  status: 'published' | 'draft'
  featured: boolean
}

// 定義分類接口
export interface Category {
  id: number
  name: string
  slug: string
  articleCount: number
}

// 定義標籤接口
export interface Tag {
  id: number
  name: string
  slug: string
  articleCount: number
}

// 定義分頁信息接口
export interface Pagination {
  current: number
  pageSize: number
  total: number
  pages: number
}

// 定義文章列表響應接口
interface ArticlesResponse {
  articles: Article[]
  pagination: Pagination
}

// 定義 API 響應接口
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 定義搜尋參數接口
export interface ArticleSearchParams {
  page?: number
  pageSize?: number
  category?: string | number
  tag?: string | number
  search?: string
  featured?: boolean
}

export const useBlogStore = defineStore('blog', () => {
  // 狀態
  const articles = ref<Article[]>([])
  const currentArticle = ref<Article | null>(null)
  const categories = ref<Category[]>([])
  const tags = ref<Tag[]>([])
  const pagination = ref<Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
    pages: 0,
  })
  const isLoading = ref(false)
  const popularArticles = ref<Article[]>([])
  const latestArticles = ref<Article[]>([])

  // 計算屬性
  const featuredArticles = computed(() => articles.value.filter((article) => article.featured))

  const publishedArticles = computed(() =>
    articles.value.filter((article) => article.status === 'published'),
  )

  // 獲取文章列表
  const fetchArticles = async (params: ArticleSearchParams = {}): Promise<void> => {
    isLoading.value = true
    try {
      const queryParams = new URLSearchParams()

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value))
        }
      })

      const response = await fetch(`/api/articles?${queryParams.toString()}`)
      const result: ApiResponse<ArticlesResponse> = await response.json()

      if (result.code === 200 && result.data) {
        articles.value = result.data.articles
        pagination.value = result.data.pagination
      } else {
        throw new Error(result.message || '獲取文章列表失敗')
      }
    } catch (error) {
      console.error('Fetch articles error:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // 獲取單篇文章
  const fetchArticle = async (id: number): Promise<Article | null> => {
    isLoading.value = true
    try {
      const response = await fetch(`/api/articles/${id}`)
      const result: ApiResponse<Article> = await response.json()

      if (result.code === 200 && result.data) {
        currentArticle.value = result.data
        return result.data
      } else {
        throw new Error(result.message || '獲取文章失敗')
      }
    } catch (error) {
      console.error('Fetch article error:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // 獲取熱門文章
  const fetchPopularArticles = async (limit: number = 5): Promise<void> => {
    isLoading.value = true
    try {
      const response = await fetch(`/api/articles/popular?limit=${limit}`)
      const result: ApiResponse<Article[]> = await response.json()

      if (result.code === 200 && result.data) {
        popularArticles.value = result.data
      } else {
        throw new Error(result.message || '獲取熱門文章失敗')
      }
    } catch (error) {
      console.error('Fetch popular articles error:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // 獲取最新文章
  const fetchLatestArticles = async (limit: number = 5): Promise<void> => {
    isLoading.value = true
    try {
      const response = await fetch(`/api/articles/latest?limit=${limit}`)
      const result: ApiResponse<Article[]> = await response.json()

      if (result.code === 200 && result.data) {
        latestArticles.value = result.data
      } else {
        throw new Error(result.message || '獲取最新文章失敗')
      }
    } catch (error) {
      console.error('Fetch latest articles error:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // 獲取分類列表
  const fetchCategories = async (): Promise<void> => {
    isLoading.value = true
    try {
      const response = await fetch('/api/categories')
      const result: ApiResponse<Category[]> = await response.json()

      if (result.code === 200 && result.data) {
        categories.value = result.data
      } else {
        throw new Error(result.message || '獲取分類列表失敗')
      }
    } catch (error) {
      console.error('Fetch categories error:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // 獲取標籤列表
  const fetchTags = async (): Promise<void> => {
    isLoading.value = true
    try {
      const response = await fetch('/api/tags')
      const result: ApiResponse<Tag[]> = await response.json()

      if (result.code === 200 && result.data) {
        tags.value = result.data
      } else {
        throw new Error(result.message || '獲取標籤列表失敗')
      }
    } catch (error) {
      console.error('Fetch tags error:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // 點讚文章
  const likeArticle = async (id: number): Promise<number | null> => {
    try {
      const response = await fetch(`/api/articles/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result: ApiResponse<{ likeCount: number }> = await response.json()

      if (result.code === 200 && result.data) {
        // 更新當前文章的點讚數
        if (currentArticle.value && currentArticle.value.id === id) {
          currentArticle.value.likeCount = result.data.likeCount
        }

        // 更新文章列表中對應文章的點讚數
        const articleIndex = articles.value.findIndex((article) => article.id === id)
        if (articleIndex !== -1) {
          articles.value[articleIndex].likeCount = result.data.likeCount
        }

        return result.data.likeCount
      } else {
        throw new Error(result.message || '點讚失敗')
      }
    } catch (error) {
      console.error('Like article error:', error)
      throw error
    }
  }

  // 取消點讚文章
  const unlikeArticle = async (id: number): Promise<number | null> => {
    try {
      const response = await fetch(`/api/articles/${id}/unlike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result: ApiResponse<{ likeCount: number }> = await response.json()

      if (result.code === 200 && result.data) {
        // 更新當前文章的點讚數
        if (currentArticle.value && currentArticle.value.id === id) {
          currentArticle.value.likeCount = result.data.likeCount
        }

        // 更新文章列表中對應文章的點讚數
        const articleIndex = articles.value.findIndex((article) => article.id === id)
        if (articleIndex !== -1) {
          articles.value[articleIndex].likeCount = result.data.likeCount
        }

        return result.data.likeCount
      } else {
        throw new Error(result.message || '取消點讚失敗')
      }
    } catch (error) {
      console.error('Unlike article error:', error)
      throw error
    }
  }

  // 根據分類獲取文章
  const fetchArticlesByCategory = async (
    categoryId: number | string,
    page: number = 1,
  ): Promise<void> => {
    await fetchArticles({ category: categoryId, page })
  }

  // 根據標籤獲取文章
  const fetchArticlesByTag = async (tagId: number | string, page: number = 1): Promise<void> => {
    await fetchArticles({ tag: tagId, page })
  }

  // 搜尋文章
  const searchArticles = async (keyword: string, page: number = 1): Promise<void> => {
    await fetchArticles({ search: keyword, page })
  }

  // 獲取精選文章
  const fetchFeaturedArticles = async (page: number = 1): Promise<void> => {
    await fetchArticles({ featured: true, page })
  }

  // 初始化數據
  const initBlog = async (): Promise<void> => {
    await Promise.all([
      fetchArticles(),
      fetchCategories(),
      fetchTags(),
      fetchPopularArticles(),
      fetchLatestArticles(),
    ])
  }

  // 清除當前文章
  const clearCurrentArticle = (): void => {
    currentArticle.value = null
  }

  return {
    // 狀態
    articles,
    currentArticle,
    categories,
    tags,
    pagination,
    isLoading,
    popularArticles,
    latestArticles,
    // 計算屬性
    featuredArticles,
    publishedArticles,
    // 方法
    fetchArticles,
    fetchArticle,
    fetchPopularArticles,
    fetchLatestArticles,
    fetchCategories,
    fetchTags,
    likeArticle,
    unlikeArticle,
    fetchArticlesByCategory,
    fetchArticlesByTag,
    searchArticles,
    fetchFeaturedArticles,
    initBlog,
    clearCurrentArticle,
  }
})
