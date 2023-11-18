<template>
  <pre></pre>
  <div
    class="lp-LayoutPicker"
    @mouseleave="hoverCell = DEFAULT_HOVER_CELL"
    @mouseover="onMouseOver"
  >
    <VTooltip activator="parent" location="right" offset="8">{{ currentLayout }}</VTooltip>
    <label
      v-for="item in LAYOUT_CELLS"
      :key="item.index"
      :ref="data => setReference(item.index, data as HTMLElement)"
      :class="{
        'lp-LayoutPicker_Cell-active': isItemActive({ item }),
        'lp-LayoutPicker_Cell-exact-active': isItemExactActive({ item })
      }"
      :data-test-id="CELL_ITEM_TEST_ID"
      :for="`cell-${item.index}`"
      class="lp-LayoutPicker_Cell"
    >
      <input
        :id="`cell-${item.index}`"
        v-model="localModelValue"
        :data-test-id="CELL_ITEM_RADIO_TEST_ID"
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

import { isEmpty } from 'lodash-es'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Ref, ComputedRef, PropType } from 'vue'
import { VTooltip } from 'vuetify/components/VTooltip'

import {
  DEFAULT_CELL_BY_SELECTED_LAYOUT,
  MAX_COLUMNS,
  DEFAULT_SELECTED_LAYOUT_ID,
  getCellBySelectedLayout,
  LAYOUT_CELLS,
  selectedLayoutValidator
} from '@/components/ui/LayoutPicker/helpers.js'
import type { GridCell } from '@/components/ui/LayoutPicker/helpers.js'
import {
  CELL_ITEM_RADIO_TEST_ID,
  CELL_ITEM_TEST_ID
} from '@/components/ui/LayoutPicker/test-helpers.js'

const props = defineProps({
  modelValue: {
    type: Number as PropType<number>,
    required: true,
    default: DEFAULT_SELECTED_LAYOUT_ID,
    validator: selectedLayoutValidator
  }
})

const emit = defineEmits<{
  (e: 'update:model-value', id: number): void
}>()

const localModelValue = computed<number>({
  get: () => props.modelValue,
  set: (value: number) => {
    emit('update:model-value', value)
  }
})

interface HoverCell extends Partial<GridCell> {}

const DEFAULT_HOVER_CELL: HoverCell = {}

const hoverCell: Ref<HoverCell> = ref(DEFAULT_HOVER_CELL)
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

  hoverCell.value = LAYOUT_CELLS[Number(index) - 1] as GridCell
}

const cellBySelectedLayout = computed(() => {
  return getCellBySelectedLayout({
    selectedLayoutId: props.modelValue
  })
}) as ComputedRef<GridCell>

const cellForCalculation = computed(() => {
  return isEmpty(hoverCell.value)
    ? cellBySelectedLayout.value
    : hoverCell.value || DEFAULT_CELL_BY_SELECTED_LAYOUT
}) as ComputedRef<GridCell>

const checkIsItemActive = ({
  item,
  cellForCompare
}: {
  item: GridCell
  cellForCompare: GridCell
}): boolean => {
  const { row, column } = cellForCompare
  return item.row <= row && item.column <= column
}
const isItemActive = ({ item }: { item: GridCell }): boolean => {
  if (isEmpty(hoverCell.value) && !cellBySelectedLayout.value) return false

  return checkIsItemActive({
    item,
    cellForCompare: cellForCalculation.value
  })
}

const isItemExactActive = ({ item }: { item: GridCell }): boolean => {
  if (isEmpty(hoverCell.value)) {
    return checkIsItemActive({
      item,
      cellForCompare: cellBySelectedLayout.value
    })
  }

  return false
}

const currentLayout = computed<string>(() => {
  if (isEmpty(hoverCell.value) && !cellBySelectedLayout.value) return ''

  const { row, column } = cellForCalculation.value
  return `${row} × ${column}`
})

const validateSelectedLayout = (): void => {
  const isValidSelectedGrid: boolean = selectedLayoutValidator(props.modelValue)
  if (!isValidSelectedGrid) {
    emit('update:model-value', DEFAULT_SELECTED_LAYOUT_ID)
  }
}

const cellReferences: Ref<Record<number, HTMLElement>> = ref({})
const setReference = (index: number, reference: HTMLElement | null): void => {
  if (reference && !cellReferences.value[index]) {
    cellReferences.value[index] = reference
  }
}

onMounted(() => {
  validateSelectedLayout()
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
