<script setup lang="ts">
import { ref } from 'vue'
import useBetterReq from '../../hooks/useBetterReq'

const fullScreenContainer = ref()

const { getData, loading, error } = useBetterReq(
  async (controller) => {
    const response = await fetch('http://jsonplaceholder.typicode.com/posts', {
      signal: controller.signal,
    })
    const data = await response.json()
    console.log(data)
  },
  {
    delPending: true,
    retryCount: 2,
    interval: 3000,
  }
)
</script>

<template>
  <x-fullScreenContainer ref="fullScreenContainer">
    <template #default="{ enter }">
      <x-tooltip content="22222222222222"> 2222 </x-tooltip>
      <button @click="fullScreenContainer?.enter">全屏</button>
      <button @click="fullScreenContainer?.exit">退出全屏</button>
      <button @click="enter">全屏（插槽）</button>
      <button @click="getData">{{ loading }}</button>
      请求错误：{{ error }}
    </template>
  </x-fullScreenContainer>
</template>
