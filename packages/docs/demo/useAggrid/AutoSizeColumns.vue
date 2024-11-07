<script lang="ts" setup>
import { ref } from 'vue'
import { AgGridVue } from '@ag-grid-community/vue3'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import '@ag-grid-community/styles/ag-grid.css'
import '@ag-grid-community/styles/ag-theme-alpine.css'
import { useAggrid } from '@x-anything/hooks'
const modules = [ClientSideRowModelModule]

const rowData = ref<any[]>([])

const colDefs = ref([
  {
    field: 'make',
    tooltipField: 'make',
    headerName: 'MAKEEEEEE',
    pinned: 'left',
  },
  { field: 'model' },
  { field: 'price', tooltipField: 'price' },
  { field: 'electric', pinned: 'right' },
])

setTimeout(() => {
  rowData.value = [
    {
      make: 'Tesla',
      model:
        'Model Y Model Y Model Y Model Y Model Y Model Y Model Y Model Y Model Y Model Y Model Y',
      price: `649506495064950649506495064950649506495064950649506495064950649506495064950649506495064950649506495064950649506495064950649506495064950649506495064950649506495064950649506495064950649506495064950649506495064950649506495064950649506495064950649506495064950649506495064950649506495064950`,
      electric: '按钮 按钮',
    },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: '按钮 按钮' },
    {
      make: 'Toyota',
      model: 'Corolla',
      price: 29600,
      electric: '按钮 按钮 按钮 按钮',
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      price: 29600,
      electric: '按钮 按钮 按钮 按钮',
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      price: 29600,
      electric: '按钮 按钮 按钮 按钮',
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      price: 29600,
      electric: '按钮 按钮 按钮 按钮',
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      price: 29600,
      electric: '按钮 按钮 按钮 按钮',
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      price: 29600,
      electric: '按钮 按钮 按钮 按钮',
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      price: 29600,
      electric: '按钮 按钮 按钮 按钮',
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      price: 29600,
      electric: '按钮 按钮 按钮 按钮',
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      price: 29600,
      electric: '按钮 按钮 按钮 按钮',
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      price: 29600,
      electric: '按钮 按钮 按钮 按钮',
    },
  ]
}, 100)

const { gridReady, firstDataRendered } = useAggrid({
  fitCellContents: true,
  maxWidth: 300,
  autoSizeColumns: ['electric'],
})
</script>

<template>
  <ag-grid-vue
    :modules="modules"
    :rowData="rowData"
    :columnDefs="colDefs"
    class="ag-theme-alpine"
    style="height: 300px"
    :tooltipInteraction="true"
    :tooltipShowDelay="500"
    @grid-ready="gridReady"
    @first-data-rendered="firstDataRendered"
  >
  </ag-grid-vue>
</template>
