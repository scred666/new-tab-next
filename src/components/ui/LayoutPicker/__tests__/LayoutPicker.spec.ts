import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, test } from 'vitest'

import type { GRID_CELL } from '@/components/ui/LayoutPicker/helpers.js'
import {
  DEFAULT_CELL_BY_SELECTED_GRID,
  DEFAULT_GRID_ID,
  GRID,
  GRID_CELLS_COUNT
} from '@/components/ui/LayoutPicker/helpers.js'
import {
  CELL_ITEM_RADIO_TEST_ID,
  CELL_ITEM_TEST_ID
} from '@/components/ui/LayoutPicker/test-helpers.js'
import type { ExtendedVueWrapper } from '@/utils/vitest.js'
import { extendedWrapper } from '@/utils/vitest.js'

import LayoutPicker from '@/components/ui/LayoutPicker/LayoutPicker.vue'

vi.mock('vuetify/components/VTooltip', () => {
  return {
    VTooltip: {
      inheritAttrs: false,
      render: () => '<div></div>'
    }
  }
})
const createComponent = (propsData = {}): ExtendedVueWrapper => {
  return extendedWrapper(
    mount(LayoutPicker, {
      propsData: {
        modelValue: DEFAULT_GRID_ID,
        ...propsData
      }
    })
  )
}
describe('LayoutPicker', () => {
  it('renders properly', () => {
    const wrapper = createComponent()

    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correct count of grid cells', () => {
    const wrapper = createComponent()

    expect(wrapper.findAllByTestId(CELL_ITEM_TEST_ID)).toHaveLength(GRID_CELLS_COUNT)
  })

  const testCases = [...Array(GRID_CELLS_COUNT).keys()].map((i: number) => (i += 1))

  test.each(testCases)(
    `renders correct count of active grid cells if modelValue is %i`,
    (id: number) => {
      const wrapper = createComponent({
        modelValue: id
      })

      const cellById = GRID.find((cell: GRID_CELL) => cell.index === id)
      const { row, column } = cellById || DEFAULT_CELL_BY_SELECTED_GRID
      const expectedActiveCellsCount: number = row * column

      expect(wrapper.findAll('.lp-LayoutPicker_Cell-active')).toHaveLength(expectedActiveCellsCount)
      expect(wrapper.findAll('.lp-LayoutPicker_Cell-exact-active')).toHaveLength(
        expectedActiveCellsCount
      )
    }
  )

  const invalidModelValueCases = [
    0,
    17,
    Infinity,
    -Infinity,
    -1,
    1.5,
    'a',
    '1,5',
    null,
    NaN,
    {},
    [],
    () => {}
  ]

  test.each(invalidModelValueCases)(
    `renders in default state if modelValue is %j`,
    (testCase: any) => {
      const wrapper = createComponent({
        modelValue: testCase
      })

      expect(wrapper.emitted<'update:model-value'>()['update:model-value'][0][0]).toBe(
        DEFAULT_GRID_ID
      )
      expect(wrapper.findAll('.lp-LayoutPicker_Cell-active')).toHaveLength(9)
      expect(wrapper.findAll('.lp-LayoutPicker_Cell-exact-active')).toHaveLength(9)
    }
  )

  it('emits correct event on cell click', () => {
    const wrapper = createComponent()
    const radioButtons = wrapper.findAllByTestId(CELL_ITEM_RADIO_TEST_ID)

    expect(radioButtons).toHaveLength(GRID_CELLS_COUNT)

    radioButtons.at(0).setChecked()

    expect(wrapper.emitted<'update:model-value'>()!['update:model-value'][0][0]).toBe(1)

    radioButtons.at(6).setChecked()

    expect(wrapper.emitted<'update:model-value'>()['update:model-value'][1][0]).toBe(7)

    radioButtons.at(13).setChecked()
    expect(wrapper.emitted<'update:model-value'>()['update:model-value'][2][0]).toBe(14)
  })
})
