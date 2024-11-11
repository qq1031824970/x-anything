<template>
  <div>
    <button @click="show = !show">显示隐藏</button>
    <vxe-button @click="loadData(5000)">加载5k条</vxe-button>
    <vxe-button @click="loadData(10000)">加载1w条</vxe-button>
    <vxe-button @click="loadData(30000)">加载3w条</vxe-button>

    <vxe-grid
      ref="gridRef"
      v-show="show"
      v-bind="gridOptions"
      style="margin-bottom: 1000px"
    >
      <template #buttonSlot>
        <x-tooltip title="tooltip">
          <x-button>按钮</x-button>
        </x-tooltip>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="tsx" setup>
import { log, VxeGrid } from 'vxe-table'
import 'vxe-table/styles/all.scss'
import { reactive, nextTick, ref, onMounted } from 'vue'
import { VxeUI, type VxeGridProps, type VxeColumnPropTypes } from 'vxe-table'
// import { useVxeTable } from '@x-anything/hooks'
import useVxeTable from '../../hooks/useVxeTable'

const show = ref(true)

interface RowVO {
  id: number
  [key: string]: string | number | boolean | any[]
}

const imgUrlCellRender = reactive<VxeColumnPropTypes.CellRender>({
  name: 'VxeImage',
  props: {
    width: 36,
    height: 36,
  },
})

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  loading: false,
  height: window.innerHeight,
  columnConfig: {
    resizable: true,
  },
  scrollY: {
    enabled: true,
    gt: 0,
    // mode: 'wheel',
  },
  columns: [
    { type: 'checkbox', width: 100, fixed: 'left' },
    { title: '列0', field: 'col0', width: 100, fixed: 'left' },
    { title: '列1', field: 'imgUrl', width: 100 },
    { title: '列2', field: 'col2', width: 300 },
    { title: '列3', field: 'col3', width: 300 },
    { title: '列4', field: 'col4', width: 300 },
    { title: '列5', field: 'col5', width: 300 },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
      fixed: 'right',
    },
    {
      title: '列6',
      field: 'col6',
      width: 200,
      slots: {
        default: 'buttonSlot',
      },
      fixed: 'right',
    },
    { title: '列7', field: 'col7', width: 200, fixed: 'right' },
    { title: '列8', field: 'col8', width: 200, fixed: 'right' },
  ],
  data: [],
})

// 模拟行数据
const loadData = (rowSize: number) => {
  gridOptions.loading = true
  setTimeout(() => {
    const dataList: RowVO[] = []
    for (let i = 0; i < rowSize; i++) {
      const item: RowVO = {
        id: 10000 + i,
        imgUrl:
          i % 3 === 0
            ? 'https://vxeui.com/resource/img/546.gif'
            : 'https://vxeui.com/resource/img/673.gif',
      }
      for (let j = 0; j < 10; j++) {
        if (i % 9 === 0) {
          item[
            `col${j}`
          ] = `值_${i}_${j} 内容9内容9 内容9内容9内容9 内容9内容9内容9内容9 内容9内容9内容9内容9 内容9内容9内容9 内容9内容9`
        } else if (i % 8 === 0) {
          item[`col${j}`] = `值_${i}_${j} 内容8内容8内容8内容8`
        } else if (i % 7 === 0) {
          item[`col${j}`] = `值_${i}_${j} 内容7内容7`
        } else if (i % 6 === 0) {
          item[
            `col${j}`
          ] = `值_${i}_${j} 内容6内容6内容6内容6内容6内容6内容6内容6`
        } else if (i % 5 === 0) {
          item[`col${j}`] = `值_${i}_${j} 内容5内容5内容5内容5内容5`
        } else if (i % 4 === 0) {
          item[
            `col${j}`
          ] = `值_${i}_${j} 内容4内容4内容4内容4内容4内容4内容4内容4内容4内容4内容4内容4`
        } else {
          item[`col${j}`] = `值_${i}_${j}`
        }
      }
      dataList.push(item)
    }

    const startTime = Date.now()
    gridOptions.data = dataList
    gridOptions.loading = false
  }, 350)
}

setTimeout(() => {
  loadData(200)
}, 100)

const gridRef = ref()
useVxeTable(gridRef, {
  sticky: true,
  virtualSticky: true,
})
</script>
