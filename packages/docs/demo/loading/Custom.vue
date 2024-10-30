<script setup>
import { ref } from 'vue'

const isLoading = ref(true)
const activeNames = ref(['1', '2'])
</script>
<template>
  <div class="container">
    <x-collapse v-model="activeNames">
      <x-collapse-item
        title="Consistency"
        name="1"
        v-loading="isLoading"
        x-loading-text="Loading..."
        x-loading-spinner="circle-notch"
        x-loading-background="rgba(250, 250, 250, 0.8)"
      >
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </x-collapse-item>
      <x-collapse-item title="Feedback" name="2" v-loading="isLoading">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </x-collapse-item>
    </x-collapse>
  </div>
</template>

<style scoped>
:deep(.x-collapse-item) {
  padding: 10px;
}
</style>
