<template>
  <vxe-grid ref="gridRef" v-bind="gridOptions"> </vxe-grid>
</template>

<script lang="tsx" setup>
import { VxeGrid } from 'vxe-table'
import 'vxe-table/styles/all.scss'
import { reactive } from 'vue'
import { type VxeGridProps } from 'vxe-table'

interface RowVO {
  id: number
  [key: string]: string | number | boolean | any[]
}

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  loading: false,
  columnConfig: {
    resizable: true,
  },
  scrollY: {
    enabled: false,
    gt: 0,
  },
  columns: [
    { type: 'checkbox', width: 100, fixed: 'left' },
    { title: '列0', field: 'col0', width: 100 },
    { title: '列1', field: 'imgUrl', width: 100 },
    { title: '列2', field: 'col2', width: 300 },
    { title: '列3', field: 'col3', width: 300 },
    { title: '列4', field: 'col4', width: 300 },
    { title: '列5', field: 'col5', width: 300 },
    { title: '列6', field: 'col6', width: 200 },
    { title: '列7', field: 'col7', width: 200 },
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

    gridOptions.data = dataList
    gridOptions.loading = false
  }, 350)
}

loadData(50)
</script>

<style>
/* 无关代码，为修复文档通用样式造成的影响 */
.vp-doc table {
  margin: initial;
}
.vp-doc td,
.vp-doc th {
  border: initial;
}
.vp-doc th {
  padding: initial;
}
.vitepress-demo-preview__element-plus__container {
  overflow: initial;
}
</style>
