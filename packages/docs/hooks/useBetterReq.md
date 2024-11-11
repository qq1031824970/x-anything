---
title: useClickOutside
description: useClickOutside hooks文档

prev:
  link: /hooks/useClickOutside
  text: useClickOutside 外部点击

next:
  link: /hooks/useAgGrid
  text: useAgGrid ag-grid 工具
---

# useBetterReq 更好的请求

用于包装请求方法，更好的处理加载中，加载失败，请求取消，重试，轮询等场景

## 基础用法

`useBetterReq`接收两个参数，第一个参数是异步方法，第二个参数是可选配置。返回`getData`方法、`loading`请求状态、`error`请求失败。

多次连续请求只有在最后一个请求结束后 loading 才置为 false，当请求失败时 error 置为 true，当再次调用 getData 时 error 状态会重置。

可以在控制台中查看请求情况，可以离线模式验证请求错误。

::: preview
demo-preview=../demo/useBetterReq/Basic.vue
:::

## 请求取消

在实际开发中，我们常常会遇到根据输入框输入的内容，实时去请求接口并将拿到的数据渲染到页面上，但是由于接口响应时间不可控，简单来说就是请求的顺序和响应的顺序不一致，就会导致你可能输入了 12，但实际返回给你的是 34。这种需求用防抖和节流是解决不了的，所以就需要用到请求取消。

请求取消采用 fetch API 方式--AbortController 取消请求，axios 版本需大于等于 v0.22.0，可选配置中加入 `delPending: true,`，此时回调方法中会返回`controller`参数，将控制信号传入 fetch 或 axios 的配置中`signal: controller.signal,`，当连续发送请求时会取消上一次的未完成请求，只返回最后一次的结果。

::: preview
demo-preview=../demo/useBetterReq/DelPending.vue
:::

## 轮询

可选配置中加入 `interval: 2000,`，在调用后会按照设置的时间进行轮询，请求失败时停止

::: preview
demo-preview=../demo/useBetterReq/Interval.vue
:::

## 失败重试

可选配置中加入 `retryCount: 2`，在请求失败时进行重试，重试次数为配置的值，重试期间 loading 不会置为 false，error 不会置为 true，重试次数用完之后停止

::: preview
demo-preview=../demo/useBetterReq/Retry.vue
:::

## 传参

`getData`的参数会传递给回调函数。若开启请求取消，回调函数的最后一个参数仍为 controller

::: preview
demo-preview=../demo/useBetterReq/Params.vue
:::

## 错误处理

useBetterReq 的第三个参数是 `catch` 回调，第四个参数是 `finally` 回调

::: preview
demo-preview=../demo/useBetterReq/ErrCallback.vue
:::

## 完整功能

::: preview
demo-preview=../demo/useBetterReq/All.vue
:::
