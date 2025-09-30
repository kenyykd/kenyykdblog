<template>
  <div class="blog-view">
    <header class="blog-header">
      <div class="container">
        <h1 class="page-title">Blog</h1>
      </div>
    </header>

    <main class="blog-content">
      <div class="container">
        <!-- Single Featured Article -->
        <div class="featured-article">
          <article class="article-card">
            <div class="article-image">
              <div class="placeholder-image">
                <div class="terminal-window">
                  <img src="/images/blogs/kenyydblog.png" alt="kenyykd blog preview" />
                </div>
              </div>
            </div>
            <div class="article-content">
              <div class="article-header">
                <h2 class="article-title">kenyykd's Blog</h2>
                <div class="article-meta">
                  <span class="article-date">2025-09-30</span>
                  <span class="article-category">Vue</span>
                </div>
              </div>
              <p class="article-description">How to create this website? Let's check out !</p>
            </div>
          </article>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Simple blog page with single featured article
</script>

<style scoped>
.blog-view {
  min-height: 100vh;
  background: #0a0a0a;
  padding-top: 5rem;
  color: white;
}

.blog-header {
  padding: 3rem 0;
}

.blog-header .container {
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

.blog-content {
  padding: 2rem 0;
}

.blog-content .container {
  max-width: none;
  margin: 0;
  padding: 0 2rem;
  padding-left: 25vw;
  padding-right: 25vw;
}

.featured-article {
  max-width: none;
  margin: 0;
}

.article-card {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.article-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.article-image {
  position: relative;
  width: 50%;
  height: 250px;
  overflow: hidden;
  flex-shrink: 0;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
}

.terminal-window img {
  width: 100%;
  height: calc(100% - 4px);
  object-fit: cover;
  border-radius: 0.5rem;
  margin: 2px 0;
}

.terminal-window {
  background: #2d2d2d;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.terminal-header {
  background: #3c3c3c;
  padding: 0.5rem;
  border-radius: 0.5rem 0.5rem 0 0;
  display: flex;
  align-items: center;
}

.terminal-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.btn.close {
  background: #ff5f57;
}

.btn.minimize {
  background: #ffbd2e;
}

.btn.maximize {
  background: #28ca42;
}

.terminal-content {
  padding: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  line-height: 1.4;
}

.terminal-line {
  margin-bottom: 0.5rem;
  color: #e0e0e0;
}

.prompt {
  color: #4ade80;
  margin-right: 0.5rem;
}

.command {
  color: #60a5fa;
}

.text {
  color: #e0e0e0;
}

.article-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.article-header {
  margin-bottom: 1rem;
}

.article-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.article-date {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
}

.article-category {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.article-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .blog-header .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .blog-content .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .article-card {
    flex-direction: column;
    gap: 0;
  }

  .article-image {
    width: 100%;
    height: 200px;
  }

  .article-content {
    padding: 1.5rem;
  }

  .article-title {
    font-size: 1.25rem;
  }
}
</style>
