<script lang="ts" setup>
import { ref, computed } from 'vue'
import { addUnit } from '@x-anything/utils'
import type { TooltipInstance } from '../Tooltip'
import type { PopconfirmProps, PopconfirmEmits } from './types'

import XTooltip from '../Tooltip/Tooltip.vue'
import XButton from '../Button/Button.vue'
import XIcon from '../Icon/Icon.vue'

defineOptions({
  name: 'XPopconfirm',
})

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: '',
  confirmButtonType: 'primary',
  icon: 'question-circle',
  iconColor: '#f90',
  hideAfter: 200,
  width: 150,
  cancelButtonText: '取消',
  confirmButtonText: '确定',
})

const emit = defineEmits<PopconfirmEmits>()
const tooltipRef = ref<TooltipInstance>()
const style = computed(() => ({ width: addUnit(props.width) }))

function hidePopper() {
  tooltipRef.value?.hide()
}

function confirm(e: MouseEvent) {
  emit('confirm', e)
  hidePopper()
}

function cancel(e: MouseEvent) {
  emit('cancel', e)
  hidePopper()
}
</script>

<template>
  <x-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
    <template #content>
      <div class="x-popconfirm" :style="style">
        <div class="x-popconfirm__main">
          <x-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
          {{ title }}
        </div>
        <div class="x-popconfirm__action">
          <x-button size="small" :type="cancelButtonType" @click="cancel">
            {{ cancelButtonText }}
          </x-button>
          <x-button size="small" :type="confirmButtonType" @click="confirm">
            {{ confirmButtonText }}
          </x-button>
        </div>
      </div>
    </template>

    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>

    <template v-if="$slots.reference" #default>
      <slot name="default"></slot>
    </template>
  </x-tooltip>
</template>

<style scoped>
@import './style.css';
</style>
