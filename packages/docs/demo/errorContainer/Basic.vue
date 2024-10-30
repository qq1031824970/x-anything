<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
const error = ref(false)

const getData = async () => {
  error.value = false
  loading.value = true
  await new Promise((resolve) => {
    setTimeout(() => {
      error.value = true
      resolve('')
    }, 2000)
  })
  loading.value = false
}

getData()
</script>

<template>
  <x-error-container :loading="loading" :error="error" :retryFn="getData">
    <div class="container">内容</div>
  </x-error-container>
</template>

<style scoped>
.container {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
