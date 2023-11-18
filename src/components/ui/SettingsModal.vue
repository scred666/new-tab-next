<template>
  <v-dialog
    v-model="isOpen"
    content-class="sm-Modal"
    scrollable
    transition="slide-x-reverse-transition"
    width="400"
  >
    <div class="qwe">
      <div class="sm-ModalBody gr-4 d-flex flex-column">
        <v-card title="Settings">
          <v-card-item>
            <div class="text-caption">Opacity</div>
            <v-slider
              v-model="opacity"
              :max="MAX_OPACITY"
              :min="MIN_OPACITY"
              :step="STEP"
              thumb-label
            >
              <template #thumb-label="{ modelValue }"> {{ modelValue }}%</template>
            </v-slider>
          </v-card-item>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </v-card-text>
          <v-btn text="Close Dialog" @click="isActive.value = false" />
          <v-btn text="Close Dialog" @click="isActive.value = false" />
        </v-card>

        <FormField title="Layout">
          <LayoutPicker v-model="grid" />
        </FormField>
        <FormField title="Layout">
          <LayoutPicker v-model="grid" />
        </FormField>
        <FormField title="Layout">
          <LayoutPicker v-model="grid" />
        </FormField>
        <FormField title="Layout">
          <LayoutPicker v-model="grid" />
        </FormField>
        <FormField title="Layout">
          <LayoutPicker v-model="grid" />
        </FormField>
        <FormField title="Layout">
          <LayoutPicker v-model="grid" />
        </FormField>
        <FormField title="Layout">
          <LayoutPicker v-model="grid" />
        </FormField>
      </div>
    </div>
  </v-dialog>

  <v-btn class="sm-ModalTrigger" icon="$vuetify" @click="isOpen = !isOpen" />
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import type { PropType, Ref } from 'vue'
import { VBtn } from 'vuetify/components/VBtn'
import { VCard, VCardText, VCardItem } from 'vuetify/components/VCard'
import { VDialog } from 'vuetify/components/VDialog'
import { VSlider } from 'vuetify/components/vSlider'

import { SETTINGS_ENTITY_KEYS } from '@/utils/entity-keys.js'

import FormField from '@/components/ui/FormField/FormField.vue'
import type { LinksSettings } from '@/utils/links-settings'

const props = defineProps({
  settings: {
    type: Object as PropType<LinksSettings>,
    required: true
  }
})

const LayoutPicker = defineAsyncComponent(
  () => import('@/components/ui/LayoutPicker/LayoutPicker.vue')
)

const MIN_OPACITY: number = 0
const MAX_OPACITY: number = 100
const STEP: number = 1

const isOpen: Ref<boolean> = ref(false)

const emit = defineEmits(['update:settings'])

const opacity = computed<number>({
  get: (): number => props.settings[SETTINGS_ENTITY_KEYS.OPACITY],
  set: (value: number): void => {
    emit('update:settings', {
      ...props.settings,
      [SETTINGS_ENTITY_KEYS.OPACITY]: value
    })
  }
})

const grid = computed<number>({
  get: (): number => props.settings[SETTINGS_ENTITY_KEYS.GRID],
  set: (value: number): void => {
    emit('update:settings', {
      ...props.settings,
      [SETTINGS_ENTITY_KEYS.GRID]: value
    })
  }
})
</script>

<style lang="scss" scoped>
.sm-ModalTrigger {
  position: absolute;
  top: 24px;
  right: 24px;
}

:deep(.sm-Modal) {
  right: 0;
  top: 0;
}

.sm-ModalBody {
}

.qwe {
  overflow-y: auto;
}
</style>
