<script lang="ts" setup>
import { ref } from 'vue'
import { AgGridVue } from '@ag-grid-community/vue3'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import '@ag-grid-community/styles/ag-grid.css'
import '@ag-grid-community/styles/ag-theme-alpine.css'
const modules = [ClientSideRowModelModule]

const rowData = ref<any[]>([])

const colDefs = ref([
  { field: 'make', tooltipField: 'make', headerName: 'MAKEEEEEE' },
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
      electric: true,
    },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ]
}, 100)
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
    :autoSizeStrategy="{
      type: 'fitCellContents',
    }"
    :defaultColDef="{
      maxWidth: 150,
    }"
  >
  </ag-grid-vue>
</template>
