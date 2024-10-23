<script lang="ts" setup>
import { ref } from "vue";

const disabled = ref(false);
</script>

<template>
  <x-tooltip
    :disabled="disabled"
    content="click to close tooltip function"
    placement="bottom"
  >
    <x-button @click="disabled = !disabled"
      >click to {{ disabled ? "active" : "close" }} tooltip function</x-button
    >
  </x-tooltip>
</template>