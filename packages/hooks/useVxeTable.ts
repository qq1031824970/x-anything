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

    watch(() => gridRef.value?.data, () => setTimeout(virtualScroll))
    useEventListener(window, 'scroll', virtualScroll)

    onMounted(() => {
      getElements()
      setParentElementSticky()
      setObserver()
    })
  }

  if (columns?.value?.length) {
    let _fixedColumns = {} as Record<string, {
      fixed?: 'left' | 'right',
      className?: Record<string, boolean>
      renderWidth?: number,
      left?: number,
      right?: number,
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
        .right-scrolling--middle .first-fixed-right {
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

    const resizableChange = ({ column }: any) => {
      const colId = column.id
      if (_fixedColumns[colId]) {
        const difference = column.renderWidth - (_fixedColumns[colId].renderWidth || 0)
        _fixedColumns[colId].renderWidth = column.renderWidth
        const parentId = column.parentId
        if (_fixedColumns[parentId]?.renderWidth) {
          _fixedColumns[parentId].renderWidth += difference
        }
        const { collectColumn } = gridRef.value?.getTableColumn()
        setColumnsLeftOrRight(collectColumn)
        setHeaderCellClassNameAndLeftOrRight()
        setBodyCellClassNameAndLeftOrRight()
      }
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

    function getColumnId(column: any) {
      return column?.field || column?.type || column?.title
    }


    function initBorderColumnClassName(columns: any[]) {
      let lastFixedLeft = null;
      for (let i = columns.length - 1; i >= 0; i--) {
        if (columns[i].fixed === 'left') {
          lastFixedLeft = columns[i];
          break;
        }
      }
      if (lastFixedLeft) {
        const lastFixedLeftColumnId = getColumnId(lastFixedLeft)
        const { children } = lastFixedLeft
        _fixedColumns[lastFixedLeftColumnId] = {
          className: {
            'last-fixed-left': true
          }
        }
        if (children?.length) {
          children.forEach((child: any) => child.fixed = 'left')
          initBorderColumnClassName(lastFixedLeft.children)
        }

        // 虚拟滚动下
        lastFixedLeft.className = {
          ...lastFixedLeft?.className || {},
          'last-fixed-left': true
        }
      }

      const firstFixedRight = columns.find((item: any) => (item.fixed === 'right'))
      if (firstFixedRight) {
        const lastFixedLeftColumnId = getColumnId(firstFixedRight)
        const { children } = firstFixedRight
        _fixedColumns[lastFixedLeftColumnId] = {
          className: {
            'first-fixed-right': true
          }
        }
        if (children?.length) {
          children.forEach((child: any) => child.fixed = 'right')
          initBorderColumnClassName(firstFixedRight.children)
        }


        // 虚拟滚动下
        firstFixedRight.className = {
          ...firstFixedRight.className || {},
          'first-fixed-right': true
        }
      }
    }

    function initColumnsFixed(columns: any[]) {
      columns.forEach(item => {
        const { fixed, children } = item
        const columnId = getColumnId(item)
        if (fixed) {
          _fixedColumns[columnId] = {
            ..._fixedColumns[columnId] || {},
            fixed,
          }
          if (children?.length) {
            children.forEach((child: any) => child.fixed = fixed)
            initColumnsFixed(children)
          }
          delete item.fixed
        }
      })
    }

    function setFixedColumnsClassNameAndRenderWidth(columnInfos: any[]) {
      for (let i = 0; i < columnInfos.length; i++) {
        const columnInfo = columnInfos[i]
        const columnId = getColumnId(columnInfo)
        const item = _fixedColumns[columnId]

        if (item) {
          const { fixed } = item
          const { id, children } = columnInfo
          let { renderWidth } = columnInfo

          if (!renderWidth) {
            const th = gridElement?.querySelector(`.vxe-table--main-wrapper .vxe-header--column.${id}`) as HTMLElement
            th && (renderWidth = th.clientWidth)
          }

          _fixedColumns[id] = {
            fixed,
            className: {
              ...item.className,
              [`fixed-${fixed}`]: true
            },
            renderWidth,
          }

          if (children?.length) {
            setFixedColumnsClassNameAndRenderWidth(children)
          }

          delete _fixedColumns[columnId]

          // 虚拟滚动下
          columnInfo.className = {
            ...columnInfo?.className || {},
            [`fixed-${fixed}`]: true
          }
        }
      }
    }

    function setColumnsLeftOrRight(columnInfos: any[], parentLeftOrRight?: number) {
      for (let i = 0; i < columnInfos.length; i++) {
        const columnInfo = columnInfos[i]
        const columnId = columnInfo.id
        const item = _fixedColumns[columnId]

        if (item) {
          const { fixed } = item
          const { id, children } = columnInfo
          if (fixed === 'left') {
            let left = parentLeftOrRight || 0
            for (let j = 0; j < i; j++) {
              const colId = columnInfos[j].id
              if (_fixedColumns[colId]) {
                left += _fixedColumns[colId]?.renderWidth || columnInfos[j].width || 0
              }
            }
            _fixedColumns[id].left = left

            if (children?.length) {
              setColumnsLeftOrRight(children, left)
            }

          } else if (fixed === 'right') {
            let right = parentLeftOrRight || 0
            for (let j = columnInfos.length - 1; j > i; j--) {
              const colId = columnInfos[j].id
              if (_fixedColumns[colId]) {
                right += _fixedColumns[colId]?.renderWidth || columnInfos[j].width || 0
              }
            }
            _fixedColumns[id].right = right

            if (children?.length) {
              setColumnsLeftOrRight(children, right)
            }
          }
        }
      }
    }

    function setHeaderCellClassNameAndLeftOrRight() {
      Object.keys(_fixedColumns).forEach((key) => {
        const { className, fixed } = _fixedColumns[key]
        const ths = gridElement?.querySelectorAll(`.vxe-table--main-wrapper .vxe-header--column.${key}`) as NodeListOf<HTMLElement>
        if (ths && ths.length) {
          let headerGutterWidth = 0
          if (fixed === 'right') {
            if (!virtualSticky && tableBodyWrapper.value) {
              // 如果没开页面虚拟滚动表头会有右边一块 // 也要等data加载了看有没有滚动条再调用一次
              headerGutterWidth = tableBodyWrapper.value.offsetWidth - tableBodyWrapper.value.clientWidth
            }
          }
          ths[0].classList.add(...Object.keys(className || {}))
          ths[0].style[fixed!] = `${(_fixedColumns[key][fixed!] || 0) + headerGutterWidth}px`
        }
      })
    }

    function setBodyCellClassNameAndLeftOrRight() {
      Object.keys(_fixedColumns).forEach((key) => {
        const { className, fixed } = _fixedColumns[key]
        const tds = gridElement?.querySelectorAll(`.vxe-table--body-wrapper .vxe-body--column.${key}`) as NodeListOf<HTMLElement>
        if (tds && tds.length) {
          tds.forEach(item => {
            item.classList.add(...Object.keys(className || {}))
            item.style[fixed!] = `${_fixedColumns[key][fixed!] || 0}px`
          })
        }
      })
    }


    function clearCellClassNameAndLeftOrRight() {
      Object.keys(_fixedColumns).forEach((key) => {
        const { fixed } = _fixedColumns[key]
        const ths = gridElement?.querySelectorAll(`.vxe-table--main-wrapper .vxe-header--column.${key}`) as NodeListOf<HTMLElement>
        if (ths && ths.length) {
          ths[0].style[fixed!] = ''
        }
      })
      Object.keys(_fixedColumns).forEach((key) => {
        const { fixed } = _fixedColumns[key]
        const tds = gridElement?.querySelectorAll(`.vxe-table--body-wrapper .vxe-body--column.${key}`) as NodeListOf<HTMLElement>
        if (tds && tds.length) {
          tds.forEach(item => {
            item.style[fixed!] = ''
          })
        }
      })
    }

    function observer() {
      if (ResizeObserver && gridElement) {
        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width } = entry.contentRect
            if (width) {
              setHeaderCellClassNameAndLeftOrRight()
              setFixedClass()
            }
          }
        })
        resizeObserver.observe(gridElement)
      }
    }

    // 虚拟滚动下
    const cellStyle = ({ column }: any): any => {
      const colId = column.id
      const item = _fixedColumns[colId]
      if (item) {
        const fixed = item.fixed
        return {
          [fixed!]: item[fixed!] + 'px',
        }
      }
    }

    watch(() => gridRef.value?.data, () => {
      setTimeout(() => {
        setHeaderCellClassNameAndLeftOrRight()
        setBodyCellClassNameAndLeftOrRight()
        setFixedClass()
      })
    })
    watch(() => columns.value, () => {
      clearCellClassNameAndLeftOrRight()
      _fixedColumns = {}
      initBorderColumnClassName(columns.value || [])
      initColumnsFixed(columns.value || [])
      setTimeout(() => {
        const { collectColumn } = gridRef.value?.getTableColumn()
        setFixedColumnsClassNameAndRenderWidth(collectColumn)
        setColumnsLeftOrRight(collectColumn)
        setHeaderCellClassNameAndLeftOrRight()
        setBodyCellClassNameAndLeftOrRight()
        setFixedClass()
      })
    })
    watch(() => gridRef.value, () => {
      init()
    })

    const init = () => {
      if (!gridRef.value) return
      getElements()
      setStyle() // 需要在getElements之后
      setTimeout(() => {
        const { collectColumn } = gridRef.value?.getTableColumn()
        setFixedColumnsClassNameAndRenderWidth(collectColumn)
        setColumnsLeftOrRight(collectColumn)
        setHeaderCellClassNameAndLeftOrRight()
        setBodyCellClassNameAndLeftOrRight()
      });
      observer()
      setTimeout(setFixedClass);
    }

    useEventListener(tableBodyWrapper, 'scroll', setFixedClass)
    initBorderColumnClassName(columns.value)
    initColumnsFixed(columns.value)
    onUnmounted(() => {
      removeStyle()
    })

    return {
      resizableChange,
      cellStyle
    }
  }

  return { columns: [] }
}
