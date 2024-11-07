import { onActivated } from 'vue'

interface UseAggridParams {
  fitCellContents?: boolean
  maxWidth?: number
  breakpoint?: number
  pinned?: string[]
  resize?: boolean
  keepScroll?: boolean
  autoSizeColumns?: string[]
}

export default function useAggrid({ fitCellContents, maxWidth, breakpoint, pinned, resize, keepScroll, autoSizeColumns }: UseAggridParams) {
  let _gridApi: any
  let _defaultColDef: Record<string, any> | undefined
  let _columnState: any
  let _currentIndex: number = 0

  let firstDataRenderedFlag = false

  function setDefaultColDefMaxWidth() {
    if (!maxWidth) return
    _gridApi?.setGridOption('defaultColDef', {
      ..._defaultColDef,
      maxWidth
    })
  }

  function reomveDefaultColDefMaxWidth() {
    if (_defaultColDef?.maxWidth) return
    _gridApi?.setGridOption('defaultColDef', {
      ..._defaultColDef,
      maxWidth: null
    })
  }

  function setSizeColumnsToFit() {
    _gridApi.setGridOption('suppressColumnMoveAnimation', true)

    const gridId = _gridApi.getGridId()
    const gridElement = document.querySelector(`[grid-id="${gridId}"]`) as HTMLElement
    const verticalScroll = gridElement.querySelector('.ag-body-vertical-scroll-viewport') as HTMLElement

    // 有可能网格被rem化，此时需要切换类名使其变量值更新
    if (resize) {
      const el = gridElement.parentElement as HTMLElement
      el && el.classList.toggle('x-resize')
    }
    const gridWidth = gridElement.clientWidth
    const verticalScrollWidth = parseInt(verticalScroll.style.width)

    const columns = _gridApi.getColumns()
    const columnsWidth = columns.reduce((acc: number, cur: any) => acc + cur.actualWidth, 0)

    if (columnsWidth + verticalScrollWidth <= gridWidth) {
      let columnState = _gridApi.getColumnState()
      columnState = columnState.map((item: any) => {
        item.pinned = null
        // 设置回原本的flex
        const originState = _columnState.find((state: any) => state.colId === item.colId)
        item.flex = originState.flex
        return item
      })

      _gridApi.applyColumnState({
        state: columnState,
      })
    } else {
      let columnState = _gridApi.getColumnState()
      columnState = columnState.map((item: any) => {
        // 设置回原本的固定列
        const originState = _columnState.find((state: any) => state.colId === item.colId)
        item.pinned = originState.pinned
        if (breakpoint && gridWidth < breakpoint) {
          if (!pinned?.includes(item?.colId)) {
            item.pinned = null
          }
        }
        return item
      })
      _gridApi.applyColumnState({
        state: columnState,
      })
    }
    _gridApi.setGridOption('suppressColumnMoveAnimation', false)

  }

  const gridReady = (event: any) => {
    _gridApi = event.api
    _defaultColDef = _gridApi.getGridOption('defaultColDef')

    _gridApi.addEventListener('bodyScrollEnd', bodyScrollEnd)
    _gridApi.addEventListener('gridSizeChanged', gridSizeChanged)
    _gridApi.addEventListener('rowClicked', setCurrentIndex)
  }

  const firstDataRendered = () => {
    if (firstDataRenderedFlag) return
    fitCellContents && _gridApi.autoSizeAllColumns()
    setDefaultColDefMaxWidth() // 先限制最大宽度, setGridOption会触发actualWidth的更新, 刚好得到正确的值
    reomveDefaultColDefMaxWidth() // 原因不知, 确实下面的代码会被限制maxWidth, 先这么用
    _columnState = _gridApi.getColumnState() // gridReady里width还不是适应后的, 这里的width是适应后的
    //
    setSizeColumnsToFit()

    firstDataRenderedFlag = true
  }

  const gridSizeChanged = async () => {
    // 会在数据首次加载前运行一次, 可以不触发这次, 没啥用
    if (!firstDataRenderedFlag) return
    if (requestAnimationFrame) {
      requestAnimationFrame(setSizeColumnsToFit)
    } else {
      setSizeColumnsToFit()
    }
  }

  const setCurrentIndex = (e: any) => {
    _currentIndex = e.rowIndex
  }

  if (keepScroll) {
    onActivated(() => {
      if (_gridApi && _currentIndex) {
        _gridApi.ensureIndexVisible(_currentIndex, 'middle')
      }
    })
  }

  function bodyScrollEnd({ direction }: any) {
    if (direction === 'vertical') {
      if (autoSizeColumns) {
        if (requestAnimationFrame) {
          requestAnimationFrame(() => {
            _gridApi.autoSizeColumns(autoSizeColumns)
          })
        } else {
          _gridApi.autoSizeColumns(autoSizeColumns)
        }
      }
    }
  }

  return {
    gridReady,
    firstDataRendered
  }
}