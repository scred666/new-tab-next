<template>
  <v-dialog :scrim="false">
    <template #activator="{ props }">
      <v-btn class="sm-ModalTrigger" icon="$vuetify" v-bind="props" />
    </template>

    <template #default="{ isActive }">
      <v-card title="Dialog">
        <div>
          <div class="text-caption">Custom thumb size</div>
          <v-slider
            v-model="opacity"
            :max="MAX_OPACITY"
            :min="MIN_OPACITY"
            :step="STEP"
            thumb-label
          >
            <template #thumb-label="{ modelValue }"> {{ modelValue }}%</template>
          </v-slider>
        </div>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </v-card-text>
        <v-btn text="Close Dialog" @click="isActive.value = false" />
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { PropType } from 'vue'
import { VBtn } from 'vuetify/components/VBtn'
import { VCard, VCardText } from 'vuetify/components/VCard'
import { VDialog } from 'vuetify/components/VDialog'
import { VSlider } from 'vuetify/components/vSlider'

import { SETTINGS_ENTITY_KEYS } from '@/utils/entity-keys.js'
import type { LINKS_SETTINGS } from '@/utils/links-settings.js'

const props = defineProps({
  settings: {
    type: Object as PropType<LINKS_SETTINGS>,
    required: true
  }
})

const MIN_OPACITY: number = 0
const MAX_OPACITY: number = 100
const STEP: number = 1

const emit = defineEmits(['update:settings'])

const opacity = computed({
  get: () => props.settings[SETTINGS_ENTITY_KEYS.OPACITY],
  set: (value: number) => {
    emit('update:settings', {
      ...props.settings,
      [SETTINGS_ENTITY_KEYS.OPACITY]: value
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
