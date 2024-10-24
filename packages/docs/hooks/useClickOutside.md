---
title: useClickOutside
description: useClickOutside hooks文档

prev:
  link: /hooks/useEventListener
  text: useEventListener 事件监听

next:
  link: /hooks/useBetterReq
  text: useBetterReq 更好的请求
---

# useClickOutside 外部点击

用于监听外部点击事件，外部点击时触发

## 基础用法

```
useClickOutside(containerNode, () => {
  // do something
})
```

## useClickOutside TYPE

`function useClickOutside(elementRef: Ref<HTMLElement | void>, callback: (e: Event) => void): void;
`
