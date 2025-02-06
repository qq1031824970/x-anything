import { ref, onBeforeUnmount } from 'vue'

export default function (
  cb: (...args: any[]) => Promise<any>,
  options?: {
    delPending?: boolean
    retryCount?: number
    interval?: number
  },
  errCallback?: (err: Error) => void,
  finallyCallback?: () => void
) {
  const { delPending, retryCount: originRetryCount, interval } = options || {}

  let controller: AbortController | void
  let retryCount: number = originRetryCount || 0
  let activeRequests = 0
  const loading = ref(false)
  const error = ref(false)
  const pollIsActive = ref(false) // 为false时不轮询
  let timer: ReturnType<typeof setTimeout> | null = null

  function clearTimer() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  // 给原始回调包装请求取消和失败重试及加载状态
  const _cb = async (manual: boolean, ...args: any[]) => {
    error.value = false
    activeRequests++
    manual && (loading.value = true)
    if (delPending) {
      controller && controller.abort('ERR_CANCELED')
      controller = new AbortController()
    }
    try {
      return await cb(...args, controller)
    } catch (err: any) {
      if (err === 'ERR_CANCELED' || err?.code === 'ERR_CANCELED') {
        // 不做处理
      } else {
        if (retryCount > 0) {
          retryCount--
          await _cb(manual, ...args)
        } else {
          error.value = true
          pollIsActive.value = false
          if (errCallback) {
            errCallback(err)
          } else {
            throw err
          }
        }
      }
    } finally {
      activeRequests--
      if (activeRequests === 0) {
        loading.value = false
      }
      finallyCallback && finallyCallback()
    }
  }

  // 添加轮询
  const _getData = async (manual: boolean, ...args: any[]) => {
    clearTimer()
    const res = await _cb(manual, ...args)
    if (interval && activeRequests === 0 && pollIsActive.value) { // activeRequests === 0 最后一个请求结束在轮询 // pollIsActive.value激活时才轮询
      timer = setTimeout(() => {
        _getData(false, ...args)
      }, interval)
    }
    return res
  }

  const getData = (...args: any[]) => {
    retryCount = originRetryCount || 0
    pollIsActive.value = true

    if (args[0] instanceof MouseEvent) {
      args.shift() // 移除事件对象
    }

    return _getData(true, ...args)
  }

  const stopPolling = () => {
    pollIsActive.value = false
    clearTimer()
  }

  const startPolling = (...args: any[]) => {
    if (!pollIsActive.value) {
      pollIsActive.value = true
      retryCount = originRetryCount || 0
      _getData(false, ...args)
    }
  }

  onBeforeUnmount(() => {
    timer && clearTimeout(timer)
    controller && controller.abort('ERR_CANCELED')
  })

  return {
    loading,
    error,
    getData,
    stopPolling,
    startPolling,
  }
}
