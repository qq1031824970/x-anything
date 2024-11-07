---
title: ErrorContainer
description: ErrorContainer 组件文档

prev:
  link: /components/popconfirm
  text: Popconfirm 气泡确认框

next:
  link: /components/fullScreenContainer
  text: FullScreenContainer 全屏容器
---

# ErrorContainer 错误容器

一些场景下希望在接口请求失败时显示重试按钮，为了不重复书写，提供此组件，同时结合了 Loading，通常搭配 useBetterReq 使用。

## 基础用法

直接包裹需要提示重试的内容

::: preview
demo-preview=../demo/errorContainer/Basic.vue
:::

## ErrorContainer API

### Props

| Name       | Description    | Type       | Default              |
| ---------- | -------------- | ---------- | -------------------- |
| loading    | 加载状态       | `boolean`  | —                    |
| error      | 错误状态       | `boolean`  | —                    |
| retryFn    | 重试方法       | `Function` | —                    |
| buttonText | 重试按钮的文字 | `string`   | 加载失败，请稍后重试 |
