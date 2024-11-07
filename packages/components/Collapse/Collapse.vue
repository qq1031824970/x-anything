<script setup lang="ts">
import type { CollapseProps, CollapseEmits, CollapseItemName } from './types'
import { ref, provide, watch, watchEffect } from 'vue'
import { debugWarn } from '@x-anything/utils'
import { COLLAPSE_CTX_KEY } from './constants'

const COMP_NAME = 'XCollapse' as const

defineOptions({
  name: COMP_NAME,
})

const props = defineProps<CollapseProps>()
const emit = defineEmits<CollapseEmits>()
const activeNames = ref(props.modelValue)

function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value]
  if (props.accordion) {
    _activeNames = [_activeNames[0] === item ? '' : item]
    updateActiveNames(_activeNames)
    return
  }

  const index = _activeNames.indexOf(item)
  if (index > -1) {
    _activeNames.splice(index, 1)
  } else {
    _activeNames.push(item)
  }
  updateActiveNames(_activeNames)
}

function updateActiveNames(newNames: CollapseItemName[]) {
  updateValue(newNames)
  emit('change', newNames)
}

function updateValue(newNames: CollapseItemName[]) {
  activeNames.value = newNames
  emit('update:modelValue', newNames)
}

watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    debugWarn(COMP_NAME, 'accordion mode should only have one active item')
  }
})

watch(
  () => props.modelValue,
  (newNames) => updateValue(newNames)
)

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
})
</script>

<template>
  <div class="x-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
