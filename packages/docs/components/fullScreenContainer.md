---
title: FullScreenContainer
description: FullScreenContainer 组件文档
---

# FullScreenContainer 全屏容器

用于大屏页面展示，对浏览器缩放进行了处理，在全屏展示时始终保持初始的展示效果。

## 基础用法

直接包裹大屏页面

::: preview
demo-preview=../demo/fullScreenContainer/Basic.vue
:::

## FullScreenContainer API

### Slots

| Name    | Description        | Type                                                                                       |
| ------- | ------------------ | ------------------------------------------------------------------------------------------ |
| default | 默认插槽, 页面内容 | `{isFullscreen: Ref<boolean>;enter: () => void;exit: () => void;scaleValue: Ref<number>;}` |

### Expose

| Name         | Description                                                                    | Type           |
| ------------ | ------------------------------------------------------------------------------ | -------------- |
| isFullscreen | 是否全屏                                                                       | `Ref<boolean>` |
| enter        | 全屏                                                                           | `() => void`   |
| exit         | 退出全屏                                                                       | `() => void`   |
| scaleValue   | 容器缩放值（某些组件库在外层容器缩放后导致弹出气泡位置不准，用此值去修正样式） | `Ref<number>`  |
