<script setup lang="ts">
import { ref } from 'vue'
import { useBetterReq } from '@x-anything/hooks'
import { XLoading, XPopconfirm } from 'x-anything'

// Loading
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

// Popconfirm
const confirm = () => console.log('confirm')
const cancel = () => console.log('cancel')

// ErrorContainer

const {
  getData,
  loading: errorContainerLoading,
  error,
} = useBetterReq(
  async (controller) => {
    const response = await fetch('https://XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', {
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
    // retryCount: 2,
    // interval: 3000,
  }
)

getData()
</script>

<template>
  <!-- <x-fullScreenContainer ref="fullScreenContainer">
    <template #default="{ enter }">
      <x-tooltip content="22222222222222"> 2222 </x-tooltip>
      <button @click="fullScreenContainer?.enter">全屏</button>
      <button @click="fullScreenContainer?.exit">退出全屏</button>
      <button @click="enter">全屏（插槽）</button>
      <button @click="getData">{{ loading }}</button>
      请求错误：{{ error }}
    </template>
  </x-fullScreenContainer> -->

  <x-button
    v-loading.fullscreen.lock="loading"
    type="primary"
    @click="openLoading1"
  >
    As a directive
  </x-button>
  <x-button type="primary" @click="openLoading2"> As a service </x-button>

  <br />
  <br />
  <!-- Popconfirm -->
  <x-popconfirm title="确认删除吗？" @confirm="confirm" @cancel="cancel">
    <x-button type="primary"> Popconfirm </x-button>
  </x-popconfirm>

  <br />
  <br />
  <!-- ErrorContainer -->
  <div class="error-container">
    <x-error-container
      :loading="errorContainerLoading"
      :error="error"
      :retryFn="getData"
    >
      <div class="container">内容</div>
    </x-error-container>
  </div>
</template>

<style lang="scss" scoped>
.error-container {
  width: 400px;
  background-color: plum;
  .container {
    height: 200px;
  }
}
</style>
