---
title: useAgGrid
description: useAgGrid hooks文档

prev:
  link: /hooks/useBetterReq
  text: useBetterReq 更好的请求

next:
  link: /hooks/useVxeTable
  text: useVxeTable vxe-table 工具
---

# useAgGrid Aggrid 工具

ag-grid 是世界上最好的 JavaScript 网格，但在使用时可能需要进一步封装，这里提供轻量的工具，方便使用。

## 未使用状态（适应内容宽度）

如果内容过多将导致横向滚动非常长。

::: preview
demo-preview=../demo/useAgGrid/Basic.vue
:::

## 最大宽度

ag-grid 可以设置 defaultColDef 来限制最大宽度，但将导致无法拖宽宽度。

::: preview
demo-preview=../demo/useAgGrid/MaxWidth.vue
:::

使用 useAgGrid ，需要注册两个个回调方法 `gridReady`、`firstDataRendered`，在初次加载时限制最大宽度切后续可拖动，为了更好的展示效果自动适应宽度不再使用 aggrid 的 autoSizeStrategy 配置，改为 useAgGrid 的 `fitCellContents` 配置项

可以看到，因为最后一列采用右固定，此时如果所有列的宽度之和不及表格宽度，会空出来一块，看起来突兀，可以设置 fitGridWidth 并且不使用最大宽度来解决，但由于用户屏幕、缩放比例的不同，导致表格整体宽度不同，对于采用 fitCellContents 还是 fitGridWidth 其实是不好把控的，这里 useAgGrid 已帮你解决，在宽度不足时自动切换为将最后一列设置 `pinned: null`, 宽度超出时设置回原状态。

::: tip
在数据量较大时在 rowData 赋值后调用 `nextTick(firstDataRendered)` 而非直接在标签上绑定来减少闪烁提高视觉效果。
如果你希望最后一列占满剩余宽度可以给列配置设置 `flex: 1` 和 `minWidth`。
:::

::: preview
demo-preview=../demo/useAgGrid/MaxWidthUseAgGrid.vue
:::

## 断点

有时候固定列过多，在小屏幕或移动端下可活动的中间区域很小，影响操作及查看，此时我们希望不再固定列，此时可以用到断点 `breakpoint`，配置后表格宽度低于此数值时将不再固定任何列。你可以拖动浏览器宽度至最小查看效果。

::: preview
demo-preview=../demo/useAgGrid/Breakpoint.vue
:::

## 断点时固定

也可以配置固定列在低于断点值时仍固定指定的列。拖动浏览器宽度查看效果

::: preview
demo-preview=../demo/useAgGrid/BreakpointPinned.vue
:::

## 记录滚动条

在 vue 中我们也许会使用 keepalive 保留列表页，但返回时 ag-grid 的滚动条会回到顶部，配置 `keepScroll` 为 true，会在返回时将上次点击的行展示在表格中间

## 滚动时指定列适应内容宽度

通常，单元格内的内容是宽度是不一致的，由于虚拟滚动，初始宽度设置的是前几十条数据的宽度，在滚动到下面时如果有较长内容将显示省略号。但某些时候，我们希望内容完全展示，如内容为权限控制的不定数量的操作按钮。这时就需要在滚动后调整列的宽度，配置 `autoSizeColumns` 并指定哪些列需要滚动时调整。

你可以滚动查看效果，如果出现更多按钮时该列会调整宽度

::: preview
demo-preview=../demo/useAgGrid/AutoSizeColumns.vue
:::
