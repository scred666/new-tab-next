import { LINK_ENTITY_KEYS } from '@/utils/entity-keys.js'

export type LINK_ITEM = {
  [LINK_ENTITY_KEYS.NAME]: string
  [LINK_ENTITY_KEYS.ID]: string | number
  [LINK_ENTITY_KEYS.URL]: string
}
