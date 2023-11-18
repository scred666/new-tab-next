import { describe, it, expect, test } from 'vitest'

import {
  DEFAULT_CELL_BY_SELECTED_LAYOUT,
  getCellBySelectedLayout,
  LAYOUT_CELLS,
  LAYOUT_CELLS_COUNT,
  MAX_COLUMNS,
  MAX_ROWS,
  MIN_LAYOUT_CELLS_COUNT,
  selectedLayoutValidator
} from '@/components/ui/LayoutPicker/helpers.js'
import type { GridCell } from '@/components/ui/LayoutPicker/helpers.js'
import { LAYOUT_PICKER_ENTITY_KEYS } from '@/utils/entity-keys.js'

import { TEST_CASES_KEYS } from '@/utils/vitest'

const { ROW, COLUMN, INDEX } = LAYOUT_PICKER_ENTITY_KEYS
const { VALUE, EXPECTED } = TEST_CASES_KEYS
describe('LayoutPicker helpers', () => {
  it('DEFAULT_CELL_BY_SELECTED_LAYOUT is correct', () => {
    expect(DEFAULT_CELL_BY_SELECTED_LAYOUT).toEqual({
      index: 11,
      row: 3,
      column: 3
    })
  })

  it('LAYOUT_CELLS is correct', () => {
    LAYOUT_CELLS.forEach((cell: GridCell, index: number) => {
      expect(cell[INDEX]).toBe(index + 1)
      expect(cell[INDEX]).toBeGreaterThanOrEqual(MIN_LAYOUT_CELLS_COUNT)
      expect(cell[INDEX]).toBeLessThanOrEqual(LAYOUT_CELLS_COUNT)
      expect(cell[ROW]).toBeGreaterThanOrEqual(1)
      expect(cell[ROW]).toBeLessThanOrEqual(MAX_ROWS)
      expect(cell[COLUMN]).toBeGreaterThanOrEqual(1)
      expect(cell[COLUMN]).toBeLessThanOrEqual(MAX_COLUMNS)
    })
  })

  describe('selectedLayoutValidator works properly', () => {
    interface TestCase {
      [VALUE]: any
      [EXPECTED]: boolean
    }

    const ALLOWED_CELLS_CASES: TestCase[] = [...Array(LAYOUT_CELLS_COUNT).keys()].map(
      (i: number) => {
        return {
          [VALUE]: i + 1,
          [EXPECTED]: true
        }
      }
    )
    const testCases: TestCase[] = [
      ...ALLOWED_CELLS_CASES,
      {
        [VALUE]: 0,
        [EXPECTED]: false
      },
      {
        [VALUE]: LAYOUT_CELLS_COUNT + 1,
        [EXPECTED]: false
      },
      {
        [VALUE]: -1,
        [EXPECTED]: false
      },
      {
        [VALUE]: 1.1,
        [EXPECTED]: false
      },
      {
        [VALUE]: NaN,
        [EXPECTED]: false
      },
      {
        [VALUE]: Infinity,
        [EXPECTED]: false
      },
      {
        [VALUE]: -Infinity,
        [EXPECTED]: false
      },
      {
        [VALUE]: null,
        [EXPECTED]: false
      },
      {
        [VALUE]: {},
        [EXPECTED]: false
      },
      {
        [VALUE]: [],
        [EXPECTED]: false
      },
      {
        [VALUE]: () => {},
        [EXPECTED]: false
      },
      {
        [VALUE]: 'a',
        [EXPECTED]: false
      }
    ]

    test.each(testCases)(`validate correctly for $value`, ({ value, expected }) => {
      expect(selectedLayoutValidator(value)).toBe(expected)
    })
  })

  describe('getCellBySelectedLayout works properly', () => {
    const testCases = [
      {
        [EXPECTED]: DEFAULT_CELL_BY_SELECTED_LAYOUT
      },
      {
        [VALUE]: DEFAULT_CELL_BY_SELECTED_LAYOUT.index,
        [EXPECTED]: DEFAULT_CELL_BY_SELECTED_LAYOUT
      },
      {
        [VALUE]: MIN_LAYOUT_CELLS_COUNT,
        [EXPECTED]: {
          [INDEX]: MIN_LAYOUT_CELLS_COUNT,
          [ROW]: MIN_LAYOUT_CELLS_COUNT,
          [COLUMN]: MIN_LAYOUT_CELLS_COUNT
        }
      },
      {
        [VALUE]: 17,
        [EXPECTED]: DEFAULT_CELL_BY_SELECTED_LAYOUT
      }
    ]

    test.each(testCases)(
      `getCellBySelectedLayout works correctly for $value`,
      ({ value, expected }) => {
        expect(getCellBySelectedLayout({ selectedLayoutId: value })).toEqual(expected)
      }
    )
  })
})
