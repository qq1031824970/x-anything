import { ref, onBeforeUnmount } from "vue";

export default function (cb: (...args: any[]) => Promise<any>, options?: {
  delPending?: boolean
  retryCount?: number
  interval?: number
}) {
  const { delPending, retryCount: originRetryCount, interval } = options || {}
  let retryCount: number

  const loading = ref(false)
  const error = ref(false)
  let activeRequests = 0
  let controller: AbortController | void
  let timer: ReturnType<typeof setTimeout>;

  const _getData = async (manual: boolean, ...args: any[]) => {
    if (delPending) {
      controller && controller.abort('ERR_CANCELED')
      controller = new AbortController()
    }

    activeRequests++;

    manual && (loading.value = true)
    error.value = false
    try {
      const res = await cb(...args, controller)
      if (interval) {
        timer = setTimeout(() => {
          _getData(false, ...args)
        }, interval);
      }

      return res
    } catch (err: any) {
      if (err === 'ERR_CANCELED' || err?.code === 'ERR_CANCELED') {
      } else {
        if (retryCount > 0) {
          retryCount--
          await _getData(false, ...args)
        } else {
          error.value = true
          throw err
        }
      }
    } finally {
      activeRequests--;
      if (activeRequests === 0) {
        loading.value = false
      }
    }
  }

  const getData = (...args: any[]) => {
    timer && clearTimeout(timer)
    retryCount = originRetryCount || 0

    if (args[0] instanceof MouseEvent) {
      args.shift();  // 移除事件对象
    }

    return _getData(true, ...args)
  }

  onBeforeUnmount(() => {
    timer && clearTimeout(timer)
    controller && controller.abort('ERR_CANCELED');
  });

  return {
    loading,
    error,
    getData,
  }
}
