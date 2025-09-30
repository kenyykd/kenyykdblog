<template>
  <div class="spotify-playlist">
    <div class="playlist-header">
      <div class="playlist-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.176a.6.6 0 0 1-.859.208c-2.203-1.33-5.318-1.628-8.528-.869a.6.6 0 0 1-.365-1.157c3.559-.828 7.008-.42 9.294 1.052a.6.6 0 0 1 .209.859m.258-2.387c-2.646-1.552-6.44-1.988-10.386-1.176a.75.75 0 1 1-.318-1.472c4.354-.882 8.448-.344 11.189 1.344a.75.75 0 0 1-.317 1.476"
          />
        </svg>
      </div>
      <span class="playlist-title">Recent Tracks</span>
    </div>

    <div class="song-list">
      <div v-for="(song, index) in songs" :key="index" class="song-item">
        <div class="song-info">
          <div class="song-title">{{ song.title }}</div>
          <div class="song-artist">{{ song.artist }}</div>
        </div>
        <div class="song-status">
          <div class="play-icon" v-if="index === 0">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Song {
  title: string
  artist: string
}

const songs: Song[] = [
  {
    title: 'bunny girl',
    artist: 'AKASAKI',
  },
  {
    title: 'Loneliness',
    artist: 'CHMCL SØUP x LXRY PXNK',
  },
  {
    title: 'Rin',
    artist: 'Avirex',
  },
]
</script>

<style scoped>
.spotify-playlist {
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-top: -14px;
  max-height: calc(100% + 14px);
  overflow-y: auto;
}

.playlist-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.playlist-icon {
  color: #1ed760;
  display: flex;
  align-items: center;
}

.playlist-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.song-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 120px;
  overflow-y: scroll;
  padding-right: 0.5rem;
}

.song-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  transition: all 0.2s ease;
}

.song-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
}

.song-info {
  flex: 1;
  min-width: 0;
}

.song-title {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.125rem;
}

.song-artist {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-status {
  flex-shrink: 0;
  margin-left: 0.5rem;
}

.play-icon {
  color: #1ed760;
  display: flex;
  align-items: center;
  opacity: 0.8;
}

.song-item:first-child .song-title {
  color: #1ed760;
}

/* 自定义滚动条样式 */
.song-list {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
}

.song-list::-webkit-scrollbar {
  width: 6px;
}

.song-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.song-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 3px;
  min-height: 20px;
}

.song-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.6);
}

.song-list::-webkit-scrollbar-corner {
  background: rgba(0, 0, 0, 0.4);
}

@media (max-width: 480px) {
  .spotify-playlist {
    padding: 0.5rem;
  }

  .song-list {
    max-height: 100px;
  }

  .song-title {
    font-size: 0.7rem;
  }

  .song-artist {
    font-size: 0.6rem;
  }

  .playlist-title {
    font-size: 0.7rem;
  }
}
</style>
