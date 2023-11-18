<template>
  <VCard :loading="loading" :subtitle="subtitle" :title="title" :variant="variant">
    <template v-if="$slots.title" #title>
      <slot name="title">
        {{ title }}
      </slot>
    </template>

    <template v-if="$slots.subtitle" #subtitle>
      <slot name="subtitle">
        {{ subtitle }}
      </slot>
    </template>
    <template #text>
      <slot />
    </template>
  </VCard>
</template>

<script lang="ts" setup>
import { VCard, VCardItem } from 'vuetify/components/VCard'

defineOptions({
  name: 'FormField',
  inheritAttrs: false
})

interface PROPS {
  title?: string
  subtitle?: string
  variant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  loading?: boolean
}

withDefaults(defineProps<PROPS>(), {
  variant: () => 'flat'
})
</script>

<style lang="scss" scoped>
.ff-Field {
  display: grid;
  gap: 8px;
}
</style>
