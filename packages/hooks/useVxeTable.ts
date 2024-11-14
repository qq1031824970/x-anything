// 必须套两层父盒子，因为发现vxetable会检测自身及父盒子高度的变化改变vxe-body--y-space的计算，高度会乱跳
import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue'
import useEventListener from './useEventListener'


interface UseVxeTableParams {
  sticky?: boolean
  virtualSticky?: boolean
  columns?: Ref<any[] | undefined>
}

export default function (gridRef: Ref<any>, options: UseVxeTableParams) {
  const { sticky, virtualSticky, columns } = options || {}

  if (sticky || virtualSticky) {
    const scrollbar = document.createElement('div')
    let scrollerContainer = document.createElement('div')
    let gridElement: HTMLElement | null = null
    const tableBodyWrapper = ref<HTMLElement | void>()
    let resizeObserver: ResizeObserver | null

    function setStyle() {
      if (!gridElement) return
      gridElement.setAttribute('data-table-sticky', 'true')
      if (document.getElementById('x-vxe-table-style')) return
      const style = document.createElement('style')
      style.id = 'x-vxe-table-style'
      style.innerHTML = `
        [data-table-sticky="true"] .vxe-grid--table-wrapper {
          overflow: initial;
          min-width: 0;
        }
        [data-table-sticky="true"] .vxe-table--header-wrapper {
          position: sticky !important;
          top: 0;
          z-index: 2;
        }
        [data-table-sticky="true"] .vxe-table--fixed-left-wrapper,
        [data-table-sticky="true"] .vxe-table--fixed-right-wrapper {
          overflow: initial;
          overflow-x: clip;
        }
        [data-table-sticky="true"] .vxe-table--body-wrapper.fixed-left--wrapper {
          overflow: hidden;
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
          scrollbar-height: none;
        }
        [data-table-sticky="true"] .vxe-table--body-wrapper::-webkit-scrollbar {
          display: none; 
          height: 0;
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
      `
      document.head.appendChild(style)
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
      const tableElement = gridElement.querySelector(
        '.vxe-table'
      ) as HTMLElement
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

    function tableBodyScroll() {
      if (!tableBodyWrapper.value) return
      scrollbar.scrollLeft = tableBodyWrapper.value.scrollLeft
    }

    useEventListener(scrollbar, 'scroll', barScroll)
    useEventListener(tableBodyWrapper, 'scroll', tableBodyScroll)

    function removeStyle() {
      const style = document.getElementById('x-vxe-table-style')
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
    let _parentElement: HTMLElement | null = null
    let _parentParentElement: HTMLElement | null = null

    function getElements() {
      if (!gridRef.value) return
      gridElement = gridRef.value.$el as HTMLElement
      vxeBodyYSpace = gridElement.querySelector(
        '.vxe-table--main-wrapper .vxe-body--y-space'
      ) as HTMLElement
      vxeTableHeader = gridElement.querySelector(
        '.vxe-table--header-wrapper'
      ) as HTMLElement
      _parentElement = gridElement.parentElement as HTMLElement
      _parentParentElement = _parentElement.parentElement as HTMLElement
    }

    function setParentElementSticky() {
      if (!_parentElement) return
      _parentElement.style.position = 'sticky'
      _parentElement.style.top = '0'
    }

    function setGridElementHeight(entries: ResizeObserverEntry[]) {
      for (const entry of entries) {
        if (!entry.contentRect.height) return
        if (!gridElement) return
        const vxeBodyYSpaceHeight = vxeBodyYSpace?.clientHeight || 0
        const vxeTableHeaderHeight = vxeTableHeader?.clientHeight || 0
        const gridElementHeight = vxeBodyYSpaceHeight + vxeTableHeaderHeight
        gridElement.parentElement!.parentElement!.style.height = gridElementHeight
          ? `${gridElementHeight}px`
          : 'auto'
        // 设置后同步一次滚动条
        virtualScroll()
      }
    }

    function setObserver() {
      if (!vxeBodyYSpace) return
      if (ResizeObserver) {
        resizeObserver = new ResizeObserver(setGridElementHeight)
        resizeObserver.observe(vxeBodyYSpace)
      }
    }

    function virtualScroll() {
      const distanceToTop = _parentParentElement!.getBoundingClientRect().top
      gridRef.value?.scrollTo(null, -distanceToTop)
    }

    useEventListener(window, 'scroll', virtualScroll)

    onMounted(() => {
      getElements()
      setParentElementSticky()
      setObserver()
    })
  }

  if (columns?.value?.length) {
    const _fixedColumns = {} as Record<string, {
      fixed: 'left' | 'right',
      renderWidth?: number,
      left?: number,
      right?: number
    }>

    let gridElement: HTMLElement | null = null
    const tableBodyWrapper = ref<HTMLElement | void>()

    function setStyle() {
      if (!gridElement) return
      gridElement.setAttribute('data-table-columns-sticky', 'true')
      if (document.getElementById('x-vxe-columns-sticky-style')) return
      const style = document.createElement('style')
      style.id = 'x-vxe-columns-sticky-style'
      style.innerHTML = `
        .vxe-table--render-default .vxe-body--column.fixed-left {
          position: sticky;
          left: 0;
          z-index: 1;
          background-color: #fff;
        }
        .vxe-table--render-default .vxe-body--column.fixed-right {
          position: sticky;
          right: 0;
          z-index: 1;
          background-color: #fff;
        }

        .vxe-table--render-default .vxe-header--column.fixed-left {
          position: sticky;
          left: 0;
          z-index: 1;
          background-color: var(--vxe-ui-table-header-background-color);
        }
        .vxe-table--render-default .vxe-header--column.fixed-right {
          position: sticky;
          right: 0;
          z-index: 1;
          background-color: var(--vxe-ui-table-header-background-color);
        }

        .left-scrolling--middle .last-fixed-left {
          box-shadow: 5px 0 3px -1px var(--vxe-ui-table-fixed-scrolling-box-shadow-color);
        }
        .right-scrolling--middle .last-fixed-right {
          box-shadow: -5px 0 3px -1px var(--vxe-ui-table-fixed-scrolling-box-shadow-color);
        }
        .vxe-header--gutter.col--gutter {
          position: sticky;
          right: 0;
          background-color: var(--vxe-ui-table-header-background-color);
        }
      `
      document.head.appendChild(style)
    }

    function removeStyle() {
      const style = document.getElementById('x-vxe-columns-sticky-style')
      style && style.remove()
    }

    function setColmunFixedClass(columns: any[]) {
      const lastFixedLeft = [...columns].reverse().find(item => (item.fixed === 'left'))
      if (lastFixedLeft) {
        lastFixedLeft.className = {
          'last-fixed-left': true
        }
        lastFixedLeft.headerClassName = {
          'last-fixed-left': true
        }
      }
      const lastFixedRight = columns.find((item: any) => (item.fixed === 'right'))
      if (lastFixedRight) {
        lastFixedRight.className = {
          'last-fixed-right': true
        }
        lastFixedRight.headerClassName = {
          'last-fixed-right': true
        }
      }

      for (let i = 0; i < columns.length; i++) {
        const { fixed } = columns[i]
        const colId = columns[i].field || columns[i].type || columns[i].title
        if (fixed === 'left') {
          delete columns[i].fixed
          columns[i].className = {
            ...columns[i].className,
            'fixed-left': true
          }
          columns[i].headerClassName = {
            ...columns[i].headerClassName,
            'fixed-left': true
          }
          _fixedColumns[colId] = {
            fixed: 'left'
          }
          if (columns[i].children) {
            columns[i].children.forEach((e: any) => e.fixed = 'left')
            setColmunFixedClass(columns[i].children)
          }
        } else if (fixed === 'right') {
          delete columns[i].fixed
          columns[i].className = {
            ...columns[i].className,
            'fixed-right': true
          }
          columns[i].headerClassName = {
            ...columns[i].headerClassName,
            'fixed-right': true
          }
          _fixedColumns[colId] = {
            fixed: 'right'
          }
          if (columns[i].children) {
            columns[i].children.forEach((e: any) => e.fixed = 'right')
            setColmunFixedClass(columns[i].children)
          }
        }
      }
    }

    const resizableChange = ({ column }: any) => {
      const colId = column.field || column.type || column.title
      if (_fixedColumns[colId]) {
        _fixedColumns[colId].renderWidth = column.renderWidth
        setColmunFixed(columns.value as any[])
      }
    }

    const _cellStyle = ({ column }: any, isHeader?: 'header'): any => {
      let headerGutterWidth = 0
      if (isHeader && !virtualSticky && tableBodyWrapper.value) {
        // 如果没开页面虚拟滚动表头会有右边一块
        headerGutterWidth = tableBodyWrapper.value.offsetWidth - tableBodyWrapper.value.clientWidth
      }

      const colId = column.field || column.type || column.title
      if (_fixedColumns.hasOwnProperty(colId)) {
        const fixed = _fixedColumns[colId].fixed
        if (fixed === 'left') {
          return {
            left: (_fixedColumns[colId].left || 0) + 'px',
          }
        } else {
          return {
            right: (_fixedColumns[colId].right || 0) + headerGutterWidth + 'px',
          }
        }
      }
    }

    function setColmunFixed(columns: any[], parentLeftorRight?: number) {
      columns.forEach((item, index) => {
        const colId = item.field || item.type || item.title
        if (_fixedColumns.hasOwnProperty(colId)) {
          if (_fixedColumns[colId].fixed === 'left') {
            let left = parentLeftorRight || 0
            for (let i = 0; i < index; i++) {
              const colId = columns[i].field || columns[i].type || columns[i].title
              left += _fixedColumns[colId].renderWidth || columns[i].width || 0
            }
            _fixedColumns[colId].left = left
            if (item.children) {
              setColmunFixed(item.children, left)
            }
          } else if (_fixedColumns[colId].fixed === 'right') {
            let right = parentLeftorRight || 0
            for (let i = columns.length - 1; i > index; i--) {
              const colId = columns[i].field || columns[i].type || columns[i].title
              right += _fixedColumns[colId].renderWidth || columns[i].width || 0
            }
            _fixedColumns[colId].right = right
            if (item.children) {
              setColmunFixed(item.children, right)
            }
          }
        }
      })
    }

    function getElements() {
      if (!gridRef.value) return
      gridElement = gridRef.value.$el as HTMLElement
      tableBodyWrapper.value = gridElement.querySelector(
        '.vxe-table--body-wrapper'
      ) as HTMLElement
    }

    function setFixedClass() {
      if (!tableBodyWrapper.value) return
      if (tableBodyWrapper.value.scrollLeft > 0) {
        gridElement?.classList.add('left-scrolling--middle')
      } else {
        gridElement?.classList.remove('left-scrolling--middle')
      }
      if (tableBodyWrapper.value.scrollLeft + tableBodyWrapper.value.clientWidth < tableBodyWrapper.value.scrollWidth) {

        gridElement?.classList.add('right-scrolling--middle')
      } else {
        gridElement?.classList.remove('right-scrolling--middle')
      }
    }

    function observer() {
      if (ResizeObserver && gridElement) {
        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width } = entry.contentRect
            if (width) {
              setFixedClass()
            }
          }
        })
        resizeObserver.observe(gridElement)
      }
    }

    watch(() => gridRef.value?.data, setFixedClass)
    watch(() => columns.value, () => {
      setColmunFixedClass(columns.value as any[])
      setColmunFixed(columns.value as any[])
      setTimeout(setFixedClass);
    })

    useEventListener(tableBodyWrapper, 'scroll', setFixedClass)

    setColmunFixedClass(columns.value as any[])
    onMounted(() => {
      getElements()
      setStyle() // 需要在getElements之后
      setColmunFixed(columns.value as any[])// 用到tableBodyWrapper，放onMounted里
      observer()
      setTimeout(setFixedClass);
    })
    onUnmounted(() => {
      removeStyle()
    })

    return {
      resizableChange,
      cellStyle: _cellStyle,
      headerCellStyle: (params: any) => _cellStyle(params, 'header')
    }
  }

  return { columns: [] }
}
