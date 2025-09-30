<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-container">
      <div class="navbar-brand">
        <router-link to="/" class="brand-link">MyBlog</router-link>
      </div>

      <div ref="navMenuRef" class="navbar-menu" @mouseleave="resetHover">
        <!-- 動態背景指示器 -->
        <div
          class="navbar-indicator"
          :style="indicatorStyle"
          :class="{ visible: showIndicator }"
        ></div>

        <div
          v-for="(item, index) in menuItems"
          :key="item.path"
          ref="navItemRefs"
          class="navbar-item-wrapper"
          @mouseenter="setHoverIndex(index)"
        >
          <router-link
            :to="item.path"
            class="navbar-item"
            :class="{ active: $route.path === item.path }"
          >
            <span class="navbar-text">{{ item.name }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

interface MenuItem {
  name: string
  path: string
}

const route = useRoute()

const menuItems: MenuItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Project', path: '/project' },
  { name: 'Message', path: '/message' },
]

const activeIndex = ref(0)
const hoveredIndex = ref(-1)
const isScrolled = ref(false)
const navMenuRef = ref<HTMLElement>()
const navItemRefs = ref<HTMLElement[]>([])

// 根據當前路由找到對應的索引
const activeRouteIndex = computed(() => {
  return menuItems.findIndex((item) => item.path === route.path)
})

// 是否顯示指示器
const showIndicator = computed(() => {
  return hoveredIndex.value >= 0 || activeRouteIndex.value >= 0
})

// 設置懸停索引
const setHoverIndex = (index: number) => {
  hoveredIndex.value = index
}

// 重置懸停狀態
const resetHover = () => {
  hoveredIndex.value = -1
}

// 計算指示器的樣式
const indicatorStyle = computed(() => {
  const displayIndex = hoveredIndex.value >= 0 ? hoveredIndex.value : activeRouteIndex.value

  if (displayIndex < 0 || !navItemRefs.value[displayIndex]) {
    return {
      transform: 'translateX(0%)',
      width: '0px',
      opacity: 0,
    }
  }

  const targetElement = navItemRefs.value[displayIndex]
  if (!targetElement || !navMenuRef.value) {
    return {
      transform: 'translateX(0%)',
      width: '0px',
      opacity: 0,
    }
  }

  const menuRect = navMenuRef.value.getBoundingClientRect()
  const itemRect = targetElement.getBoundingClientRect()
  const offsetLeft = itemRect.left - menuRect.left - 8 // 減去 padding
  const width = itemRect.width

  return {
    transform: `translateX(${offsetLeft}px)`,
    width: `${width}px`,
    opacity: 1,
  }
})

// 滾動監聽
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 更新指示器位置
const updateIndicatorPosition = async () => {
  await nextTick()
  // 觸發 computed 重新計算
  hoveredIndex.value = hoveredIndex.value
}

// 監聽路由變化
watch(
  () => route.path,
  () => {
    hoveredIndex.value = -1
    updateIndicatorPosition()
  },
)

// 監聽窗口大小變化
const handleResize = () => {
  updateIndicatorPosition()
}

onMounted(() => {
  activeIndex.value = activeRouteIndex.value
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
  handleScroll() // 初始檢查

  // 初始化指示器位置
  nextTick(() => {
    updateIndicatorPosition()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: auto;
  max-width: calc(100vw - 2rem);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: auto;
}

.navbar-brand {
  display: none; /* 隱藏品牌名稱，只顯示導航菜單 */
}

.navbar-menu {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(30, 30, 30, 0.95);
  border-radius: 3rem;
  padding: 0.5rem;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  gap: 0;
}

.navbar-item-wrapper {
  position: relative;
  z-index: 2;
}

.navbar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  white-space: nowrap;
}

.navbar-text {
  position: relative;
  z-index: 3;
  transition: all 0.3s ease;
}

.navbar-item:hover .navbar-text {
  color: rgba(255, 255, 255, 0.9);
}

.navbar-item.active .navbar-text {
  color: rgba(255, 255, 255, 1);
  font-weight: 600;
}

.navbar-indicator {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  height: calc(100% - 1rem);
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  opacity: 0;
  pointer-events: none;
}

.navbar-indicator.visible {
  opacity: 1;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .navbar {
    top: 0.5rem;
    max-width: calc(100vw - 1rem);
  }

  .navbar-menu {
    padding: 0.3rem;
  }

  .navbar-item {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .navbar-indicator {
    top: 0.3rem;
    left: 0.3rem;
    height: calc(100% - 0.6rem);
  }
}

@media (max-width: 480px) {
  .navbar {
    position: fixed;
    top: auto;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .navbar-item {
    padding: 0.5rem 0.8rem;
    font-size: 0.75rem;
  }

  .navbar-menu {
    padding: 0.25rem;
  }

  .navbar-indicator {
    top: 0.25rem;
    left: 0.25rem;
    height: calc(100% - 0.5rem);
  }
}

/* 滾動時的效果 */
.navbar.scrolled .navbar-menu {
  background: rgba(20, 20, 20, 0.98);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.15);
}

/* 懸停效果增強 */
.navbar-menu:hover {
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.2);
}

/* 動畫效果 */
@keyframes fadeInNav {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.navbar {
  animation: fadeInNav 0.6s ease-out;
}
</style>
