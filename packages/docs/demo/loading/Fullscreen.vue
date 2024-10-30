<script setup>
import { ref } from 'vue'
import { XLoading } from 'x-anything'

const loading = ref(false)

function openLoading1() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

function openLoading2() {
  const _loading = XLoading.service({
    lock: true,
    spinner: 'circle-notch',
    text: '加载中...',
    background: 'rgba(255,255,255,0.5)',
  })
  setTimeout(() => {
    _loading.close()
  }, 2000)
}
</script>

<template>
  <x-button
    v-loading.fullscreen.lock="loading"
    type="primary"
    @click="openLoading1"
  >
    As a directive
  </x-button>
  <x-button type="primary" @click="openLoading2"> As a service </x-button>
</template>
