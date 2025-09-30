<template>
  <div class="spotify-icon-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#1ed760"
      viewBox="0 0 16 16"
      class="spotify-icon"
    >
      <path
        d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.176a.6.6 0 0 1-.859.208c-2.203-1.33-5.318-1.628-8.528-.869a.6.6 0 0 1-.365-1.157c3.559-.828 7.008-.42 9.294 1.052a.6.6 0 0 1 .209.859m.258-2.387c-2.646-1.552-6.44-1.988-10.386-1.176a.75.75 0 1 1-.318-1.472c4.354-.882 8.448-.344 11.189 1.344a.75.75 0 0 1-.317 1.476"
      />
    </svg>
  </div>
</template>

<style scoped>
.spotify-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

/* 當用作右上角圖標時 */
.card-icon-top-right .spotify-icon-container {
  margin: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spotify-icon {
  transition: all 0.3s ease;
}

.spotify-icon:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 12px rgba(30, 215, 96, 0.3));
}
</style>
