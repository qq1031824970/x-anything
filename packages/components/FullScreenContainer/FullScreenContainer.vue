<script setup lang="ts">
import { computed, ref } from 'vue'
import type {
  FullScreenContainerProps,
  FullScreenContainerInstance,
} from './types'
import { useEventListener } from '@x-anything/hooks'

defineOptions({
  name: 'XFullScreenContainer',
})

const props = withDefaults(defineProps<FullScreenContainerProps>(), {
  baseWidth: 1920,
})

const isFullscreen = ref(false)

const baseHeight = ref(screen.height / (screen.width / props.baseWidth))
const scaleValue = ref(window.innerWidth / props.baseWidth)

const style = computed(() =>
  isFullscreen.value
    ? {
        width: `${props.baseWidth}px`,
        height: `${baseHeight.value}px`,
        transform: `scale(${scaleValue.value})`,
        transformOrigin: '0 0',
      }
    : {}
)

const enter = () => {
  if (!isFullscreen.value) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  }
}

const exit = () => {
  if (isFullscreen.value) {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

useEventListener(window, 'resize', () => {
  baseHeight.value = screen.height / (screen.width / props.baseWidth)
  scaleValue.value = window.innerWidth / props.baseWidth
})
useEventListener(
  window,
  'fullscreenchange',
  () => (isFullscreen.value = document.fullscreenElement !== null)
)

defineExpose<FullScreenContainerInstance>({
  isFullscreen,
  enter,
  exit,
  scaleValue,
})
</script>

<template>
  <div
    class="fullscreen-container"
    :class="{
      fullscreen: isFullscreen,
    }"
    :style="style"
  >
    <slot
      v-bind="{
        isFullscreen,
        enter,
        exit,
        scaleValue,
      }"
    ></slot>
  </div>
</template>

<style>
@import './style.css';
</style>
