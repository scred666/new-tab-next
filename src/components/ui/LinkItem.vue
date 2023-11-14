<template>
  <a v-ripple :href="link[URL]" class="li-Item">
    {{ link[NAME] }}
  </a>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'LinkItem'
})

import { computed } from 'vue'
import type { PropType } from 'vue'
import { Ripple as vRipple } from 'vuetify/directives'

import { LINK_ENTITY_KEYS, SETTINGS_ENTITY_KEYS } from '@/utils/entity-keys.js'
import type { LINK_ITEM } from '@/utils/link-item.js'
import type { LINKS_SETTINGS } from '@/utils/links-settings.js'

const { NAME, URL } = LINK_ENTITY_KEYS

const props = defineProps({
  link: {
    type: Object as PropType<LINK_ITEM>,
    required: true
  },

  settings: {
    type: Object as PropType<LINKS_SETTINGS>,
    required: true
  }
})

const opacity = computed<string>(() => {
  return `${props.settings[SETTINGS_ENTITY_KEYS.OPACITY]}%`
})
</script>

<style lang="scss" scoped>
.li-Item {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  opacity: v-bind(opacity);
  transition: 0.2s ease-in-out;
  color: white;
  text-decoration: none;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
}
</style>
