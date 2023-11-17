<template>
  <pre></pre>
  <div
    class="lp-LayoutPicker"
    @mouseleave="hoverCell = DEFAULT_HOVER_CELL"
    @mouseover="onMouseOver"
  >
    <v-tooltip activator="parent" location="right" offset="8">{{ currentGrid }}</v-tooltip>
    <label
      v-for="item in GRID"
      :key="item.index"
      :ref="data => setReference(item.index, data as HTMLElement)"
      :class="{
        'lp-LayoutPicker_Cell-active': isItemActive({ item }),
        'lp-LayoutPicker_Cell-exact-active': isItemExactActive({ item })
      }"
      :for="`cell-${item.index}`"
      class="lp-LayoutPicker_Cell"
    >
      <input
        :id="`cell-${item.index}`"
        v-model="localSelectedGrid"
        :value="item.index"
        hidden
        name="grid-picker"
        type="radio"
      />
    </label>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'LayoutPicker',
  inheritAttrs: false
})
import isEmpty from 'lodash/isEmpty'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Ref, ComputedRef, PropType } from 'vue'
import { VTooltip } from 'vuetify/components/VTooltip'

import {
  DEFAULT_CELL_BY_SELECTED_GRID,
  MAX_COLUMNS,
  DEFAULT_GRID_ID,
  getCellBySelectedGrid,
  GRID,
  selectedGridValidator
} from '@/components/ui/LayoutPicker/helpers.js'
import type { GRID_CELL } from '@/components/ui/LayoutPicker/helpers.js'

const props = defineProps({
  modelValue: {
    type: Number as PropType<number>,
    required: true,
    default: DEFAULT_GRID_ID,
    validator: selectedGridValidator
  }
})

const emit = defineEmits(['update:model-value'])

const localSelectedGrid = computed<number>({
  get: () => props.modelValue,
  set: (value: number) => {
    emit('update:model-value', value)
  }
})

interface HOVER_CELL extends Partial<GRID_CELL> {}

const DEFAULT_HOVER_CELL: HOVER_CELL = {}

const hoverCell: Ref<HOVER_CELL> = ref(DEFAULT_HOVER_CELL)
const onMouseOver = (e: Event): void => {
  const target = e.target as HTMLElement
  if (!target) return

  const currentMouseOverCellIndex: [string, HTMLElement] | undefined = Object.entries(
    cellReferences.value
  ).find(([, cell]: [string, HTMLElement]) => {
    return cell === target
  })

  if (!currentMouseOverCellIndex) return

  const [index]: [string, HTMLElement] = currentMouseOverCellIndex as [string, HTMLElement]

  hoverCell.value = GRID[Number(index) - 1] as GRID_CELL
}

const cellBySelectedGrid = computed(() => {
  return getCellBySelectedGrid({
    selectedGridId: props.modelValue
  })
}) as ComputedRef<GRID_CELL>

const cellForCalculation = computed(() => {
  return isEmpty(hoverCell.value)
    ? cellBySelectedGrid.value
    : hoverCell.value || DEFAULT_CELL_BY_SELECTED_GRID
}) as ComputedRef<GRID_CELL>

const checkIsItemActive = ({
  item,
  cellForCompare
}: {
  item: GRID_CELL
  cellForCompare: GRID_CELL
}): boolean => {
  const { row, column } = cellForCompare
  return item.row <= row && item.column <= column
}
const isItemActive = ({ item }: { item: GRID_CELL }): boolean => {
  if (isEmpty(hoverCell.value) && !cellBySelectedGrid.value) return false

  return checkIsItemActive({
    item,
    cellForCompare: cellForCalculation.value
  })
}

const isItemExactActive = ({ item }: { item: GRID_CELL }): boolean => {
  if (isEmpty(hoverCell.value)) {
    return checkIsItemActive({
      item,
      cellForCompare: cellBySelectedGrid.value
    })
  }

  return false
}

const currentGrid = computed<string>(() => {
  if (isEmpty(hoverCell.value) && !cellBySelectedGrid.value) return ''

  const { row, column } = cellForCalculation.value
  return `${row} × ${column}`
})

const validateSelectedGrid = (): void => {
  const isValidSelectedGrid: boolean = selectedGridValidator(props.modelValue)
  if (!isValidSelectedGrid) {
    emit('update:model-value', DEFAULT_GRID_ID)
  }
}

const cellReferences: Ref<Record<number, HTMLElement>> = ref({})
const setReference = (index: number, reference: HTMLElement | null): void => {
  if (reference && !cellReferences.value[index]) {
    cellReferences.value[index] = reference
  }
}

onMounted(() => {
  validateSelectedGrid()
})

onBeforeUnmount(() => {
  cellReferences.value = {}
})
</script>

<style lang="scss" scoped>
.lp-LayoutPicker {
  gap: 6px;
  display: grid;
  grid-template-columns: repeat(v-bind(MAX_COLUMNS), 1fr);
  width: max-content;
  position: relative;
  --overlay-shift: 1rem;

  &:before {
    content: '';
    position: absolute;
    right: calc(var(--overlay-shift) * -1);
    top: calc(var(--overlay-shift) * -1);
    height: calc(100% + var(--overlay-shift) * 2);
    width: calc(100% + var(--overlay-shift) * 2);
  }
}

.lp-LayoutPicker_Cell {
  z-index: 1;
  height: calc(var(--overlay-shift) * 2);
  width: calc(var(--overlay-shift) * 2);
  border-radius: 6px;
  border: 1px solid rgba(var(--v-theme-secondary), var(--v-disabled-opacity));
  cursor: pointer;

  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;

  &-active,
  &:hover {
    border-color: rgba(var(--v-theme-secondary), var(--v-disabled-opacity));
    background-color: rgba(var(--v-theme-secondary), var(--v-disabled-opacity));
  }

  &-exact-active {
    border-color: rgba(var(--v-theme-secondary), var(--v-high-emphasis-opacity));
    background-color: rgba(var(--v-theme-secondary), var(--v-high-emphasis-opacity));
  }
}
</style>
