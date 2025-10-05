<template>
  <div class="project-view">
    <div class="project-header">
      <div class="container">
        <h1 class="page-title">Project</h1>
      </div>
    </div>

    <div class="project-content">
      <div class="container">
        <!-- Featured Projects -->
        <div class="featured-projects">
          <div class="projects-grid">
            <div
              v-for="(project, index) in featuredProjects"
              :key="project.id"
              class="project-card"
              @click="handleProjectClick(project)"
            >
              <div class="card-content">
                <div class="card-header">
                  <h3 class="card-title">{{ project.name }}</h3>
                </div>
                <p class="card-description" v-if="project.description">{{ project.description }}</p>
                <div class="project-tech">
                  <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Project {
  id: number
  name: string
  description: string
  technologies: string[]
  url?: string
  githubUrl?: string
}

// Featured Projects Data - 6 items (2 rows x 3 columns)
const featuredProjects: Project[] = [
  {
    id: 1,
    name: 'instagram-login-clone',
    description: '使用純html和css實現的instagram登入頁面',
    technologies: ['HTML', 'CSS'],
    url: 'https://ig-clone-pr.netlify.app/',
    githubUrl:'https://github.com/kenyykd/instagram-login-clone'
  },
  {
    id: 2,
    name: 'wanpai (已停止部屬)',
    description: '讓喜歡玩具的人能更快找到喜歡的玩具，是一個大型的團體專案',
    technologies: ['Vue', 'Tailwind CSS', 'nodejs', 'express'],
    url: 'https://github.com/wanpai-app/frontend',
    githubUrl:'https://github.com/wanpai-app/frontend'
  },
  {
    id: 3,
    name: 'inline-net-clone',
    description: '模仿inline訂餐系統的頁面',
    technologies: ['HTML', 'CSS'],
    url: 'https://inline-net-clone.netlify.app/',
    githubUrl:'https://github.com/kenyykd/inline-net-clone'
  },
  {
    id: 4,
    name: 'UBike',
    description: 'UBike資訊業面API串接',
    technologies: ['next.js'],
    url: 'https://ubike-test.netlify.app/',
    githubUrl: 'https://github.com/kenyykd/ubike',
  },
  {
    id: 5,
    name: '打磚遊戲',
    description: 'canvas和metter.js，2d物理引擎實現的打磚遊戲',
    technologies: ['next.js'],
    url: 'https://hit-break.netlify.app/',
    githubUrl: 'https://github.com/kenyykd/hit-brick',
  },
]

// 點擊專案卡片的處理函數
const handleProjectClick = (project: Project) => {
  if (project.url && project.url !== '#') {
    // 如果有有效的 URL，在新標籤頁中打開
    window.open(project.url, '_blank')
  } else if (project.githubUrl && project.githubUrl !== '#') {
    // 如果沒有 demo URL 但有 GitHub URL，打開 GitHub
    window.open(project.githubUrl, '_blank')
  } else {
    // 如果都沒有，可以顯示一個提示或者進行其他操作
    console.log(`點擊了專案：${project.name}`)
  }
}
</script>

<style scoped>
.project-view {
  min-height: 100vh;
  background: #0a0a0a;
  padding-top: 5rem;
  color: white;
}

.project-header {
  padding: 3rem 0;
}

.project-header .container {
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

.project-content {
  padding: 2rem 0 4rem 0;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
}

.project-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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

/* Projects Grid Layout */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

/* Aceternity UI Hover Effect Cards */
.project-card {
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

.project-card::before {
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

.project-card:hover::before {
  opacity: 1;
}

.project-card:hover {
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

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
}

.tech-tag {
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 0.5rem;
  font-size: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .project-header .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .container {
    padding: 0 1rem;
  }

  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .project-card {
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

  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .project-card {
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
