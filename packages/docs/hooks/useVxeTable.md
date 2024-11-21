---
title: useVxeTable
description: useVxeTable hooks文档

prev:
  link: /hooks/useAgGrid
  text: useAgGrid ag-grid 工具
---

# useVxeTable VxeTable 工具

vxe-table 是很好用的 vue 表格，但在使用时可能需要进一步封装，这里提供轻量的工具，方便使用。

## 未使用状态

::: preview
demo-preview=../demo/useVxeTable/Basic.vue
:::

## 表头吸附、滚动条吸附(未开启虚拟滚动)

配置 `sticky:true`

::: preview
demo-preview=../demo/useVxeTable/Sticky.vue
:::

## 表头吸附、滚动条吸附(开启虚拟滚动)

配置 `virtualSticky:true`

::: tip
由于 vxe-table 会监测自身及父元素的高度变化来设置虚拟高度，如果直接设置表格或其父元素高度会导致滚动时虚拟高度异常，来回跳，闪现空白，所以使用 virtualSticky 时请提供两层祖先元素，useVxeTable 会将父父元素作为粘性定位的窗口，父元素作为粘性定位的元素，从而不改变表格自身，避免负面影响
:::

::: preview
demo-preview=../demo/useVxeTable/VirtualSticky.vue
:::

## 大量复杂列

目前 vxetable 在存在冻结列的情况下渲染速度较慢，在有大量列时容易出现白屏；并且为了提高性能，左右及中间滚动存在防抖处理，在滚动时会有延时错位的感觉。

::: preview
demo-preview=../demo/useVxeTable/LargeClumns.vue
:::

相比之下 v4.7.59 等低版本(不支持自适应行高)在相同的情况下基本不会白屏。(codesandbox 中可尝试修改两种版本比较)

<a href="https://codesandbox.io/p/sandbox/jxx2sr" target="_blank" >打开 codesandbox(4.7.59 版本 vxetable)</a>

如果开启了自适应行高性能会进一步下降

::: preview
demo-preview=../demo/useVxeTable/LargeClumnsAutoRowHeight.vue
:::

## 采用原生 sticky 来固定左右列

在没有固定列的情况下性能会好很多，useVxeTable 提供原生粘性定位固定列，配置 `colSticky:true` ，如果有列宽拖动还需绑定 `resizableChange`。

性能会比自带固定列好点，不会错位

::: preview
demo-preview=../demo/useVxeTable/LargeClumnsSticky.vue
:::

## 采用原生 sticky 来固定左右列(开启虚拟滚动)

目前 4.8.x 版本白屏问题比较严重，待官方优化

如果开启虚拟滚动还需绑定 `cellStyle`

::: preview
demo-preview=../demo/useVxeTable/LargeClumnsStickyVirtual.vue
:::

## 完整功能

::: preview
demo-preview=../demo/useVxeTable/All.vue
:::
