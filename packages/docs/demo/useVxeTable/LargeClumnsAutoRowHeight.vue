<template>
  <x-button @click="handleOpenDialog">打开弹窗(为避免样式污染)</x-button>
  <Teleport to="body">
    <dialog id="largeClumnsAutoRowHeightDialog">
      <div>
        <x-button @click="loadData(5000)">加载5k条</x-button>
        <x-button @click="loadData(10000)">加载1w条</x-button>
        <x-button @click="loadData(30000)">加载3w条</x-button>

        <vxe-grid v-if="show" v-bind="gridOptions">
          <template #buttonSlot>
            <x-tooltip title="tooltip">
              <x-button>按钮</x-button>
            </x-tooltip>
          </template>
        </vxe-grid>
      </div>
      <x-button @click="handleCloseDialog">关闭</x-button>
    </dialog>
  </Teleport>
</template>

<script lang="tsx" setup>
import { VxeGrid } from 'vxe-table'
import 'vxe-table/styles/all.scss'
import { reactive, ref } from 'vue'
import { type VxeGridProps } from 'vxe-table'
interface RowVO {
  id: number
  [key: string]: string | number | boolean | any[]
}

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  loading: false,
  height: 600,
  columnConfig: {
    resizable: true,
  },
  scrollY: {
    enabled: true,
    gt: 0,
  },
  columns: [
    { type: 'checkbox', width: 100, fixed: 'left' },
    {
      title: '列0',
      fixed: 'left',
      children: [
        { title: '列1', field: 'imgUrl', width: 100 },
        { title: '列2', field: 'col2', width: 200 },
      ],
    },
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
      title: '列7',
      fixed: 'right',
      children: [
        { title: '列9', field: 'col9', width: 80 },
        { title: '列10', field: 'col10', width: 80 },
      ],
    },
    { title: '列8', field: 'col8', width: 80, fixed: 'right' },
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

    gridOptions.data = dataList
    gridOptions.loading = false
  }, 350)
}

loadData(200)

// 不相关代码，传送到body下为避免样式污染造成的虚拟滚动错位
const show = ref(false)
const handleOpenDialog = () => {
  const dialog = document.getElementById(
    'largeClumnsAutoRowHeightDialog'
  ) as HTMLDialogElement
  dialog.showModal()
  show.value = true
}
const handleCloseDialog = () => {
  const dialog = document.getElementById(
    'largeClumnsAutoRowHeightDialog'
  ) as HTMLDialogElement
  dialog.close()
}
</script>
