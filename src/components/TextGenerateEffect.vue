<template>
  <div class="text-generate-effect">
    <span
      v-for="(word, index) in words"
      :key="index"
      :class="['word', { visible: visibleWords.includes(index) }]"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
      {{ word }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Props {
  text: string
  className?: string
  filter?: boolean
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  filter: true,
  duration: 0.5,
})

const visibleWords = ref<number[]>([])

const words = computed(() => props.text.split(' '))

onMounted(() => {
  // 逐個顯示單詞
  words.value.forEach((_, index) => {
    setTimeout(() => {
      visibleWords.value.push(index)
    }, index * 100)
  })
})
</script>

<style scoped>
.text-generate-effect {
  display: inline-block;
}

.word {
  opacity: 0;
  filter: blur(10px);
  transform: translateY(5px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  margin-right: 0.25rem;
}

.word.visible {
  opacity: 1;
  filter: blur(0px);
  transform: translateY(0px);
}

.word:last-child {
  margin-right: 0;
}
</style>
