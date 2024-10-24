<script setup lang="ts">
import { useBetterReq } from '@x-anything/hooks'

const { getData, loading, error } = useBetterReq(async () => {
  const response = await fetch('http://jsonplaceholder.typicode.com/posts')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  console.log(data)
})
</script>

<template>
  <x-button @click="getData">点击发送请求</x-button>
  请求中：{{ loading }} 请求错误：{{ error }}
</template>
