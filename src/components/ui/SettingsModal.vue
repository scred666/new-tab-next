<template>
  <v-dialog v-model="isOpen" width="400">
    <template #default="{ isActive }">
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

        <FormField title="Layout">
          <LayoutPicker v-model="grid" />
        </FormField>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </v-card-text>
        <v-btn text="Close Dialog" @click="isActive.value = false" />
        <v-btn text="Close Dialog" @click="isActive.value = false" />
      </v-card>
    </template>
  </v-dialog>

  <v-btn class="sm-ModalTrigger" icon="$vuetify" @click="isOpen = !isOpen" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { PropType, Ref } from 'vue'
import { VBtn } from 'vuetify/components/VBtn'
import { VCard, VCardText, VCardItem } from 'vuetify/components/VCard'
import { VDialog } from 'vuetify/components/VDialog'
import { VSlider } from 'vuetify/components/vSlider'

import { SETTINGS_ENTITY_KEYS } from '@/utils/entity-keys.js'
import type { LINKS_SETTINGS } from '@/utils/links-settings.js'

import FormField from '@/components/ui/FormField/FormField.vue'
import LayoutPicker from '@/components/ui/LayoutPicker/LayoutPicker.vue'

const props = defineProps({
  settings: {
    type: Object as PropType<LINKS_SETTINGS>,
    required: true
  }
})

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
  top: 20px;
  right: 20px;
}
</style>
