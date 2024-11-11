<script setup lang="ts">
import useBetterReq from '../../../hooks/useBetterReq'

const { getData, loading, error } = useBetterReq(
  async (controller) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      signal: controller.signal,
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    console.log(data)
  },
  {
    delPending: true,
  }
)
</script>

<template>
  <x-button :throttleDuration="0" @click="getData">点击发送请求</x-button>
  请求中：{{ loading }} 请求错误：{{ error }}
</template>
