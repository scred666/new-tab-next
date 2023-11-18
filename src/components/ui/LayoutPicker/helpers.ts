import { LAYOUT_PICKER_ENTITY_KEYS } from '@/utils/entity-keys.js'

export const MAX_ROWS: number = 4
export const MAX_COLUMNS: number = 4
export const LAYOUT_CELLS_COUNT: number = MAX_ROWS * MAX_COLUMNS
export const DEFAULT_ROW: number = 3
export const DEFAULT_COLUMN: number = 3

export const MIN_LAYOUT_CELLS_COUNT: number = 1
export const DEFAULT_SELECTED_LAYOUT_ID: number = (DEFAULT_ROW - 1) * MAX_COLUMNS + DEFAULT_COLUMN
const { ROW, COLUMN, INDEX } = LAYOUT_PICKER_ENTITY_KEYS

export const DEFAULT_CELL_BY_SELECTED_LAYOUT: GridCell = {
  [ROW]: DEFAULT_ROW,
  [COLUMN]: DEFAULT_COLUMN,
  [INDEX]: DEFAULT_SELECTED_LAYOUT_ID
}

export interface GridCell {
  [INDEX]: number
  [ROW]: number
  [COLUMN]: number
}

export const LAYOUT_CELLS: GridCell[] = [...Array(LAYOUT_CELLS_COUNT).keys()].map((i: number) => {
  const index: number = i + 1
  return {
    index,
    [ROW]: Math.ceil(index / MAX_COLUMNS),
    [COLUMN]: index % MAX_COLUMNS || MAX_COLUMNS
  }
})

export const selectedLayoutValidator = (value: number): boolean => {
  const asNumber: number = Number(value)
  return (
    !isNaN(asNumber) &&
    Number.isInteger(asNumber) &&
    asNumber >= MIN_LAYOUT_CELLS_COUNT &&
    asNumber <= LAYOUT_CELLS_COUNT
  )
}

export const getCellBySelectedLayout = ({
  selectedLayoutId = DEFAULT_SELECTED_LAYOUT_ID
}: {
  selectedLayoutId?: number
}): GridCell => {
  const cell = LAYOUT_CELLS.find((cell: GridCell) => cell.index === selectedLayoutId)
  return cell || DEFAULT_CELL_BY_SELECTED_LAYOUT
}
