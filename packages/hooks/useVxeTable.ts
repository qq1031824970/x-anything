import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import useEventListener from './useEventListener'

interface UseVxeTableParams {
  sticky?: boolean
  virtualSticky?: boolean
}

export default function (gridRef: Ref<any>, options: UseVxeTableParams) {
  const { sticky, virtualSticky } = options || {}

  if (sticky || virtualSticky) {
    const scrollbar = document.createElement('div')
    let scrollerContainer = document.createElement('div')
    let gridElement: HTMLElement | null = null
    const tableBodyWrapper = ref<HTMLElement | void>()
    let resizeObserver: ResizeObserver | null

    function setStyle() {
      if (!gridElement) return
      gridElement.setAttribute('data-table-sticky', 'true');
      if (document.getElementById('x-vxe-table-style')) return;
      const style = document.createElement('style');
      style.id = 'x-vxe-table-style';
      style.innerHTML = `
        [data-table-sticky="true"] .vxe-grid--table-wrapper {
          overflow: initial;
          min-width: 0;
        }
        [data-table-sticky="true"] .vxe-table--header-wrapper {
          position: sticky !important;
          top: 0;
          z-index: 1;
        }
        [data-table-sticky="true"] .vxe-table--fixed-left-wrapper,
        [data-table-sticky="true"] .vxe-table--fixed-right-wrapper {
          overflow: initial;
          overflow-x: clip;
        }
        [data-table-sticky="true"] .vxe-table--body-wrapper.fixed-left--wrapper {
          overflow: hidden ;
        }
        [data-table-sticky="true"] .vxe-table--render-default .vxe-table--fixed-left-wrapper .vxe-table--body-wrapper {
          width: 100%;
        }
        [data-table-sticky="true"] .vxe-table--body-wrapper.fixed-right--wrapper {
          width: inherit;
          transform: scaleX(-1);
        }
        [data-table-sticky="true"] .vxe-table--body-wrapper.fixed-right--wrapper .vxe-table--body {
          transform: scaleX(-1);
        }
        [data-table-sticky="true"] .vxe-table--header-wrapper.fixed-right--wrapper {
          transform: scaleX(-1);
        }
        [data-table-sticky="true"] .vxe-table--header-wrapper.fixed-right--wrapper .vxe-table--header {
          transform: scaleX(-1);
        }
        [data-table-sticky="true"] .vxe-table--body-wrapper {
          overflow-y: hidden !important;
          overflow-x: hidden;
        }
        .x-vxetable--scrollbar {
          position: sticky;
          bottom: 0;
          z-index: 5;
          background-color: transparent;
          overflow-x: auto;
        }
        .x-vxetable--scrollbar .x-vxetable--scrollbar-container {
          height: 1px;
          pointer-events: none;
          background-color: transparent;
        }
        [data-table-sticky="true"] .vxe-grid--table-container {
          position: sticky;
          top: 0;
        }
      `
      document.head.appendChild(style);
    }


    function getElements() {
      if (!gridRef.value) return
      gridElement = gridRef.value.$el as HTMLElement
      tableBodyWrapper.value = gridElement.querySelector(
        '.vxe-table--body-wrapper'
      ) as HTMLElement
    }

    function createScrollbar() {
      if (!gridElement) return
      const tableElement = gridElement.querySelector('.vxe-table') as HTMLElement
      scrollbar.classList.add('x-vxetable--scrollbar')
      scrollerContainer.classList.add('x-vxetable--scrollbar-container')
      scrollbar.appendChild(scrollerContainer)
      tableElement.appendChild(scrollbar)
    }

    function setScrollbarWidth(entries: ResizeObserverEntry[]) {
      for (const entry of entries) {
        scrollerContainer.style.width = `${entry.target.clientWidth}px`
      }
    }

    function setObserver() {
      if (!gridElement) return
      const tableBodyElement = gridElement.querySelector(
        '.vxe-table--body'
      ) as HTMLElement
      if (ResizeObserver) {
        resizeObserver = new ResizeObserver(setScrollbarWidth)
        resizeObserver.observe(tableBodyElement)
      }
    }

    function barScroll() {
      if (!tableBodyWrapper.value) return
      tableBodyWrapper.value.scrollLeft = scrollbar.scrollLeft
    }

    useEventListener(scrollbar, 'scroll', barScroll)

    function removeStyle() {
      const style = document.getElementById('x-vxe-table-style');
      style && style.remove()
    }

    onMounted(() => {
      getElements()
      setStyle() // 需在getElements后
      createScrollbar()
      setObserver()
    })
    onUnmounted(() => {
      removeStyle()
      resizeObserver && resizeObserver.disconnect()
    })
  }

  if (virtualSticky) {
    let gridElement: HTMLElement | null = null
    let vxeBodyYSpace: HTMLElement | null = null
    let resizeObserver: ResizeObserver | null = null
    let vxeTableHeader: HTMLElement | null = null

    function getElements() {
      if (!gridRef.value) return
      gridElement = gridRef.value.$el as HTMLElement
      vxeBodyYSpace = gridElement.querySelector('.vxe-table--main-wrapper .vxe-body--y-space') as HTMLElement
      vxeTableHeader = gridElement.querySelector('.vxe-table--header-wrapper') as HTMLElement
    }

    function setGridElementHeight(entries: ResizeObserverEntry[]) {
      // setTimeout可以减少滚动条不在顶部时f5的闪烁及修正错误的动态行高
      setTimeout(() => {
        for (const entry of entries) {
          if (!entry.contentRect.height) return
          if (!gridElement) return
          const vxeBodyYSpaceHeight = vxeBodyYSpace?.clientHeight || 0
          const vxeTableHeaderHeight = vxeTableHeader?.clientHeight || 0
          const gridElementHeight = vxeBodyYSpaceHeight + vxeTableHeaderHeight
          gridElement.style.height = gridElementHeight ? `${gridElementHeight}px` : 'auto'
          // 设置后同步一次滚动条
          virtualScroll()
        }
      });

    }

    function setObserver() {
      if (!vxeBodyYSpace) return
      if (ResizeObserver) {
        resizeObserver = new ResizeObserver(setGridElementHeight)
        resizeObserver.observe(vxeBodyYSpace)
      }
    }

    function virtualScroll() {
      if (requestAnimationFrame) {
        requestAnimationFrame(() => {
          const distanceToTop = gridElement!.getBoundingClientRect().top
          gridRef.value?.scrollTo(null, -distanceToTop)
        })
      } else {
        const distanceToTop = gridElement!.getBoundingClientRect().top
        gridRef.value?.scrollTo(null, -distanceToTop)
      }

    }

    useEventListener(window, 'scroll', virtualScroll)

    onMounted(() => {
      getElements()
      setObserver()
    })
  }
}