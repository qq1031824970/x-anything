import { vLoading } from './directive'
import { Loading } from './service'
import type { App } from 'vue'

export const XLoading = {
  name: 'XLoading',
  install(app: App) {
    app.directive('loading', vLoading)
    app.config.globalProperties.$loading = Loading
  },
  directive: vLoading,
  service: Loading
}

export default XLoading

export {
  vLoading,
  vLoading as XLoadingDirective,
  Loading as XLoadingService
}

export * from './types'