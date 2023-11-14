<template>
  <main>
    <TabLayout />
  </main>
</template>

<script lang="ts" setup>
import TabLayout from '@/components/TabLayout.vue'
</script>
<style lang="scss" scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    gap: 40px;
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
