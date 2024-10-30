<script setup lang="ts">
import type { LoadingOptions } from './types'
import { computed, type Ref } from 'vue'
import { isString } from 'lodash-es'
import XIcon from '../Icon/Icon.vue'

defineOptions({
  name: 'XLoading',
  inheritAttrs: false,
})
const props = defineProps<LoadingOptions>()

const iconName = computed(() => {
  if (isString(props.spinner)) {
    return props.spinner
  }
  return 'spinner' // 'circle-notch' 也很好看
})
</script>

<template>
  <transition name="fade-in-linear" @after-leave="onAfterLeave">
    <div
      v-show="(props.visible as Ref).value"
      class="x-loading x-loading__mask"
      :class="{ 'is-fullscreen': fullscreen }"
    >
      <div class="x-loading__spinner">
        <x-icon v-if="props.spinner !== false" :icon="iconName" spin />
        <p v-if="text" class="x-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<style>
@import './style.css';
.x-loading {
  --x-loading-bg-color: v-bind(background) !important;
  --x-loading-z-index: v-bind(zIndex) !important;
}
</style>
