https://kenyykdblog.vercel.app/

## 🛠️ 技術棧

### 前端技術

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

- **Vue 3** - 採用 Composition API 的現代前端框架
- **TypeScript** - 提供類型安全的開發體驗
- **Vite** - 快速的前端建構工具
- **Vue Router** - 單頁面應用路由管理
- **Pinia** - Vue 3 官方狀態管理庫

### 後端服務

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)

- **Firebase Authentication** - 支援 Google、GitHub OAuth 登入
- **Cloud Firestore** - NoSQL 即時資料庫
- **即時資料同步** - 多用戶留言即時更新

### UI/UX 設計

- **Aceternity UI 風格** - 現代化設計語言
- **響應式設計** - 完美適配桌面與移動設備
- **動畫效果** - Text Flip、Hover Cards、玻璃擬態效果
- **自定義 CSS** - 原生 CSS 實現所有視覺效果

### 部署與工具

![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)

- **Vercel** - 前端應用部署平台
- **GitHub** - 版本控制與 CI/CD
- **ESLint** - 程式碼品質檢查
- **自動化部署** - Git push 觸發自動部署

## ✨ 核心功能

### 🎨 用戶介面

- **響應式導航列** - 基於 Aceternity UI 設計，支援懸停動畫
- **動態文字效果** - Text Flip 和 Text Generate 動畫
- **互動卡片** - Hover Cards 展示專案和技術棧
- **玻璃擬態設計** - 現代化視覺效果

### 🔐 用戶系統

- **多平台登入** - 支援 Google 和 GitHub OAuth
- **安全認證** - JWT Token 管理和狀態持久化
- **權限控制** - 登入用戶才能發送留言

### 💬 即時留言系統

- **樂觀更新** - 發送留言立即顯示，提升用戶體驗
- **即時同步** - 多用戶留言即時更新
- **資料持久化** - Firestore 雲端存儲
- **字數限制** - 500 字留言限制與即時計數

### 📱 響應式設計

- **移動優先** - 完美適配手機、平板、桌面
- **觸控友好** - 針對觸控設備優化的互動設計
- **跨瀏覽器** - 支援現代瀏覽器

## 🚀 效能優化

- **程式碼分割** - Vue Router 懶載入和動態 import
- **資源優化** - SVG 圖示、圖片懶載入、CSS/JS 壓縮
- **CDN 加速** - Vercel 全球 CDN 分發
- **快取策略** - 瀏覽器和 CDN 多層快取

## 🔒 安全性

- **Firebase 安全規則** - 資料庫讀寫權限控制
- **OAuth 2.0** - 標準化第三方登入
- **HTTPS 加密** - 全站 SSL/TLS 加密
- **XSS/CSRF 防護** - 前端安全防護機制

## 📊 項目架構

```
src/
├── components/      # 可重用元件
├── views/          # 頁面元件
├── stores/         # Pinia 狀態管理
├── composables/    # Vue 組合式函數
├── config/         # Firebase 配置
├── assets/         # 靜態資源
└── router/         # 路由配置
```

## 🛠️ 開發環境

```bash
# 安裝依賴
pnpm install

# 啟動開發伺服器
pnpm dev

# 建構生產版本
pnpm build

# 程式碼檢查
pnpm lint
```

---

**技術特色**: Vue 3 + TypeScript + Firebase + Vercel 全棧解決方案  
**設計風格**: Aceternity UI + 玻璃擬態 + 響應式設計  
**核心亮點**: 即時留言系統 + OAuth 認證 + 動畫效果
