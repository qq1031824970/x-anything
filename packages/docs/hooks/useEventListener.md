---
title: useEventListener
description: useEventListener hooks文档

next:
  link: /hooks/useClickOutside
  text: useClickOutside 外部点击

prev:
  link: /components/fullScreenContainer
  text: FullScreenContainer 全屏容器
---

# useEventListener 事件监听

用于 vue 组件内监听事件，较原生的事件监听添加了在适当时机移除监听器，避免了重复书写。

## 基础用法

```
useEventListener(window, 'resize', () => {
// do something
})
```

## useEventListener TYPE

`function useClickOutside(elementRef: Ref<HTMLElement | void>, callback: (e: Event) => void): void;
`
