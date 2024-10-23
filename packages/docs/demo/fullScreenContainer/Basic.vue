<script setup lang="ts">
import { ref } from 'vue'

const fullScreenContainer = ref()
</script>

<template>
  <x-fullScreenContainer
    ref="fullScreenContainer"
    style="background-color: #fff"
  >
    <template #default="{ enter, exit }">
      <button @click="fullScreenContainer?.enter">全屏</button>
      <button @click="fullScreenContainer?.exit">退出全屏</button>
      <button @click="enter">全屏（插槽）</button>
      <button @click="exit">退出全屏（插槽）</button>
    </template>
  </x-fullScreenContainer>
</template>
