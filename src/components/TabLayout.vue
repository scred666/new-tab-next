<template>
  <section class="tl-Layout">
    <SettingsModal v-model:settings="settings" />
    <AppLinkItem v-for="link in filteredData" :key="link.id" :link="link" :settings="settings" />
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { Ref, ComputedRef } from 'vue'

defineOptions({
  name: 'TabLayout'
})

import {
  DEFAULT_SELECTED_LAYOUT_ID,
  getCellBySelectedLayout
} from '@/components/ui/LayoutPicker/helpers.js'
import type { GridCell } from '@/components/ui/LayoutPicker/helpers.js'
import { LINK_ENTITY_KEYS, SETTINGS_ENTITY_KEYS } from '@/utils/entity-keys.js'
import { uid } from '@/utils/uid.js'

import AppLinkItem from '@/components/ui/LinkItem.vue'
import SettingsModal from '@/components/ui/SettingsModal.vue'
import type { LinkItem } from '@/utils/link-item'
import type { LinksSettings } from '@/utils/links-settings'

const { ID, NAME, URL } = LINK_ENTITY_KEYS

const DATA: LinkItem[] = [
  {
    [NAME]: '',
    [ID]: 'mecjhrsxc',
    [URL]: ''
  },
  {
    [NAME]: 'Gmail',
    [ID]: '4wv7woca5',
    [URL]: 'https://mail.google.com/'
  },
  {
    [NAME]: 'AirDroid',
    [ID]: 'kb1hjr1d8',
    [URL]: 'https://web.airdroid.com/'
  },
  {
    [NAME]: 'RZTK',
    [ID]: 'ebbpmulq7',
    [URL]: 'https://rozetka.com.ua'
  },
  {
    [NAME]: '',
    [ID]: 'vpl5tkequ',
    [URL]: ''
  },
  {
    [NAME]: 'Google',
    [ID]: '22cvljssz',
    [URL]: 'https://www.google.com'
  },
  {
    [NAME]: '',
    [ID]: 'v1e09nrmi',
    [URL]: ''
  },
  {
    [NAME]: 'UkrSib',
    [ID]: 'ihwc4vndd',
    [URL]: 'https://business.ukrsibbank.com'
  },
  {
    [NAME]: 'YouTube',
    [ID]: 'r54s0y14f',
    [URL]: 'https://www.youtube.com'
  }
]

const PLUS_ITEM: LinkItem = {
  [NAME]: '+',
  [ID]: uid(),
  [URL]: ''
}

const settings: Ref<LinksSettings> = ref({
  [SETTINGS_ENTITY_KEYS.OPACITY]: 100,
  [SETTINGS_ENTITY_KEYS.GRID]: DEFAULT_SELECTED_LAYOUT_ID
})

const cellBySelectedGrid = computed(() => {
  return getCellBySelectedLayout({
    selectedLayoutId: settings.value[SETTINGS_ENTITY_KEYS.GRID]
  })
}) as ComputedRef<GridCell>

const availableLinksCount = computed<number>(() => {
  const { row, column } = cellBySelectedGrid.value
  return row * column
})

const filteredData = computed<LinkItem[]>(() => {
  return [...Array(availableLinksCount.value)].map((_, index) => {
    const link = DATA[index]
    return link || PLUS_ITEM
  })
})
</script>

<style lang="scss" scoped>
.tl-Layout {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background-image: url('https://cdn.wallpapersafari.com/10/89/MF8jno.jpg');
  background-size: cover;
  background-position: center;

  display: grid;
  grid-template-columns: repeat(v-bind('cellBySelectedGrid.column'), 1fr);
  grid-template-rows: repeat(v-bind('cellBySelectedGrid.row'), 1fr);
  padding: 80px;
  gap: 40px;
}
</style>
