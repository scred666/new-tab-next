<template>
  <section class="tl-Layout">
    <SettingsModal v-model:settings="settings" />
    <LinkItem v-for="link in DATA" :key="link.id" :link="link" :settings="settings" />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'

defineOptions({
  name: 'TabLayout'
})

import { LINK_ENTITY_KEYS, SETTINGS_ENTITY_KEYS } from '@/utils/entity-keys.js'
import type { LINK_ITEM } from '@/utils/link-item.js'
import type { LINKS_SETTINGS } from '@/utils/links-settings.js'

import LinkItem from '@/components/ui/LinkItem.vue'
import SettingsModal from '@/components/ui/SettingsModal.vue'

const { ID, NAME, URL } = LINK_ENTITY_KEYS

const DATA: LINK_ITEM[] = [
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

const settings: Ref<LINKS_SETTINGS> = ref({
  [SETTINGS_ENTITY_KEYS.OPACITY]: 100
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
  grid-template-columns: repeat(3, 1fr);
  padding: 80px;
  gap: 40px;
}
</style>
