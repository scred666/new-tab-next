import { LAYOUT_PICKER_ENTITY_KEYS } from '@/utils/entity-keys.js'

const MAX_ROWS: number = 4
export const MAX_COLUMNS: number = 4
export const GRID_CELLS_COUNT: number = MAX_ROWS * MAX_COLUMNS
export const DEFAULT_ROW: number = 3
export const DEFAULT_COLUMN: number = 3

export const MIN_GRID_CELLS_COUNT: number = 1
export const DEFAULT_GRID_ID: number = (DEFAULT_ROW - 1) * MAX_COLUMNS + DEFAULT_COLUMN
const { ROW, COLUMN, INDEX } = LAYOUT_PICKER_ENTITY_KEYS

export const DEFAULT_CELL_BY_SELECTED_GRID: GRID_CELL = {
  [ROW]: DEFAULT_ROW,
  [COLUMN]: DEFAULT_COLUMN,
  [INDEX]: DEFAULT_GRID_ID
}

export interface GRID_CELL {
  [INDEX]: number
  [ROW]: number
  [COLUMN]: number
}

export const GRID: GRID_CELL[] = [...Array(GRID_CELLS_COUNT).keys()].map((i: number) => {
  const index: number = i + 1
  return {
    index,
    [ROW]: Math.ceil(index / MAX_COLUMNS),
    [COLUMN]: index % MAX_COLUMNS || MAX_COLUMNS
  }
})

export const selectedGridValidator = (value: number): boolean => {
  const asNumber: number = Number(value)
  return (
    !isNaN(asNumber) &&
    Number.isInteger(asNumber) &&
    asNumber >= MIN_GRID_CELLS_COUNT &&
    asNumber <= GRID_CELLS_COUNT
  )
}

export const getCellBySelectedGrid = ({
  selectedGridId = DEFAULT_GRID_ID
}: {
  selectedGridId: number
}): GRID_CELL => {
  const cell = GRID.find((cell: GRID_CELL) => cell.index === selectedGridId)
  return cell || DEFAULT_CELL_BY_SELECTED_GRID
}
