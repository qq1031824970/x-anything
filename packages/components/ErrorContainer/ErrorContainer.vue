<script lang="ts" setup>
import type { ErrorContainerProps } from './types'

defineOptions({
  name: 'XErrorContainer',
})

withDefaults(defineProps<ErrorContainerProps>(), {})
</script>

<template>
  <div class="x-content-wrap" v-loading="loading">
    <div v-if="error" class="x-content__error">
      <x-button
        class="x-content__error__retry"
        type="info"
        plain
        round
        :loading="loading"
        @click="retryFn"
        >{{ buttonText ?? '加载失败，请稍后重试' }}</x-button
      >
    </div>

    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
