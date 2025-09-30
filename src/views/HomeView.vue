<template>
  <div class="home-view">
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            Hi, I'm
            <TextFlip text="Kenyykd" class="highlight-text" />
          </h1>

          <p class="hero-tags">#kenyykd #Frontend #坤郁</p>
          <div class="hero-description">
            <TextGenerateEffect
              text="Welcome to my blog, feel free to explore and discover amazing content!"
              class="description-text"
            />
          </div>
          <div class="hero-actions">
            <router-link to="/blog" class="btn btn-primary">Blog</router-link>
            <router-link to="/project" class="btn btn-secondary">Projects</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="featured-section">
      <div class="container">
        <h2 class="section-title">Featured Articles</h2>
        <div class="cards-grid">
          <div v-for="(company, index) in companies" :key="company.name" class="hover-effect-card">
            <div class="card-content">
              <div class="card-header">
                <h3 class="card-title" v-if="company.name !== 'Spotify'">{{ company.name }}</h3>
              </div>
              <p class="card-description" v-if="company.description">{{ company.description }}</p>
              <TechStackIcons v-if="company.name === 'Tech Stack'" />
              <SpotifyPlaylist v-if="company.name === 'Spotify'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TextFlip from '@/components/TextFlip.vue'
import TextGenerateEffect from '@/components/TextGenerateEffect.vue'
import TechStackIcons from '@/components/TechStackIcons.vue'
import SpotifyIcon from '@/components/SpotifyIcon.vue'
import SpotifyPlaylist from '@/components/SpotifyPlaylist.vue'

// 不再需要這些變數和函數
// const blogStore = useBlogStore()
// const isMarqueePaused = ref(false)
// const marqueeContent = ref<HTMLElement>()

const companies = [
  {
    name: 'About Me',
    description: 'You can call me  kenyykd, Kunyu or 坤郁, living in Taiwan, Taipei.',
  },
  {
    name: 'Tech Stack',
    description: '',
  },
  {
    name: 'Spotify',
  },
]

// 不再需要 onMounted 來獲取文章數據
</script>

<script lang="ts">
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home-view {
  padding-top: 0; /* navbar 現在浮動，不需要額外 padding */
}

.hero-section {
  background: #0a0a0a;
  color: white;
  padding: 0;
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-section .container {
  display: flex;
  justify-content: flex-start;
  max-width: none;
  margin: 0;
  padding-left: 25vw;
  padding-right: 2rem;
}

.featured-section .container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-content {
  max-width: 900px;
  text-align: left;
  width: 100%;
  margin: 0;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  line-height: 1.1;
}

.highlight-text {
  display: inline-block;
  padding: 0.3rem 1.2rem;
  background: #0a0a0a;
  border: none;
  border-radius: 3rem;
  backdrop-filter: blur(20px);
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1em;
}

.highlight-text:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.hero-role {
  font-size: 2rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.5rem;
  text-align: left;
}

.hero-tags {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  text-align: left;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
  max-width: 650px;
  text-align: left;
}

.description-text {
  font-size: 1.125rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
}

.btn {
  padding: 0.75rem 1rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
  border: none;
  background: transparent;
}

.btn-primary {
  color: rgba(255, 255, 255, 0.9);
}

.btn-primary:hover {
  color: white;
  transform: translateX(4px);
}

.btn-secondary {
  color: rgba(255, 255, 255, 0.7);
}

.btn-secondary:hover {
  color: rgba(255, 255, 255, 0.9);
  transform: translateX(4px);
}

.featured-section {
  padding: 2rem 0 4rem 0;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
}

.featured-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
  pointer-events: none;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  z-index: 1;
}

/* 卡片網格布局 */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 900px;
  margin: 0;
  width: 100%;
}

/* Aceternity UI Hover Effect Cards */
.hover-effect-card {
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.hover-effect-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(255, 255, 255, 0.03) 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.hover-effect-card:hover::before {
  opacity: 1;
}

.hover-effect-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: -10px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.3;
  flex: 1;
}

.card-description {
  color: rgba(139, 148, 158, 0.8);
  line-height: 1.6;
  font-size: 0.875rem;
  margin: 0.5rem 0 0 0;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .hero-section {
    padding: 6rem 0;
    align-items: center;
    justify-content: center;
  }

  .hero-section .container {
    padding-left: 2rem;
    padding-right: 2rem;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .hero-content {
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    text-align: center;
  }

  .hero-role {
    font-size: 1.5rem;
    text-align: center;
  }

  .hero-tags {
    text-align: center;
  }

  .hero-description {
    text-align: center;
    font-size: 1rem;
  }

  .highlight-text {
    font-size: 0.9em;
    padding: 0.25rem 0.8rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .hover-effect-card {
    padding: 1.25rem;
    height: 180px;
  }

  .card-header {
    margin-bottom: 0.75rem;
  }

  .card-title {
    font-size: 1.125rem;
    margin: 0;
  }

  .card-description {
    font-size: 0.8rem;
  }

  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-role {
    font-size: 1.25rem;
  }

  .hero-tags {
    font-size: 1rem;
  }

  .hero-description {
    font-size: 0.9rem;
  }

  .highlight-text {
    font-size: 0.85em;
    padding: 0.2rem 0.6rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .hover-effect-card {
    padding: 1rem;
    height: 160px;
  }

  .card-header {
    margin-bottom: 0.5rem;
  }

  .card-title {
    font-size: 1rem;
    margin: 0;
  }

  .card-description {
    font-size: 0.8rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
