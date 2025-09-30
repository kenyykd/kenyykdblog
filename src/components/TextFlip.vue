<template>
  <div class="text-flip-container">
    <div class="text-flip" :class="{ animate: isVisible }">
      <span
        v-for="(word, wordIndex) in words"
        :key="wordIndex"
        class="word"
        :style="{ '--delay': wordIndex * 0.1 + 's' }"
      >
        <span
          v-for="(letter, letterIndex) in word.letters"
          :key="letterIndex"
          class="letter"
          :style="{
            '--letter-delay': (wordIndex * word.letters.length + letterIndex) * 0.05 + 's',
          }"
        >
          {{ letter }}
        </span>
        <span v-if="wordIndex < words.length - 1" class="space"> </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  text: string
  animate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  animate: true,
})

const isVisible = ref(false)

const words = computed(() => {
  return props.text.split(' ').map((word) => ({
    text: word,
    letters: word.split(''),
  }))
})

onMounted(() => {
  if (props.animate) {
    setTimeout(() => {
      isVisible.value = true
    }, 300)
  } else {
    isVisible.value = true
  }
})
</script>

<style scoped>
.text-flip-container {
  perspective: 1000px;
  overflow: hidden;
}

.text-flip {
  display: inline-block;
  font-weight: 700;
  font-size: inherit;
  line-height: inherit;
}

.word {
  display: inline-block;
  white-space: nowrap;
}

.letter {
  display: inline-block;
  transform-origin: 50% 50%;
  transform: rotateX(90deg);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  animation-fill-mode: forwards;
}

.space {
  display: inline-block;
  width: 0.3em;
}

.text-flip.animate .letter {
  animation: flipIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  animation-delay: var(--letter-delay, 0s);
}

@keyframes flipIn {
  0% {
    transform: rotateX(90deg);
    opacity: 0;
  }
  50% {
    transform: rotateX(-10deg);
    opacity: 0.8;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}

/* 懸停效果 */
.text-flip:hover .letter {
  animation: flipHover 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  animation-delay: calc(var(--letter-delay, 0s) * 0.5);
}

@keyframes flipHover {
  0%,
  100% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(180deg);
  }
}

/* 特殊字母樣式 */
.letter:nth-child(even) {
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* 發光效果 */
.text-flip.animate .letter {
  text-shadow:
    0 0 5px currentColor,
    0 0 10px currentColor,
    0 0 15px currentColor;
  animation-name: flipInGlow;
}

@keyframes flipInGlow {
  0% {
    transform: rotateX(90deg);
    opacity: 0;
    text-shadow: none;
  }
  50% {
    transform: rotateX(-10deg);
    opacity: 0.8;
    text-shadow:
      0 0 5px currentColor,
      0 0 10px currentColor;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
    text-shadow:
      0 0 2px currentColor,
      0 0 4px currentColor,
      0 0 6px currentColor;
  }
}
</style>
