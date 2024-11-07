<script setup lang="ts">
const confirm = () => console.log('confirm')
const cancel = () => console.log('cancel')
</script>

<template>
  <x-popconfirm
    width="220"
    confirm-button-text="Delete"
    cancel-button-text="No,Thanks"
    icon="trash"
    icon-color="#626aef"
    title="Are you sure to delete this item?"
    @confirm="confirm"
    @cancel="cancel"
  >
    <x-button>Delete</x-button>
  </x-popconfirm>
</template>
