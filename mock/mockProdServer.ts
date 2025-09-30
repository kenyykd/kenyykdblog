import { createProdMockServer } from 'vite-plugin-mock/client'

// 導入所有 mock 文件
import authMock from './auth'
import blogMock from './blog'

const mockModules = [...authMock, ...blogMock]

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
