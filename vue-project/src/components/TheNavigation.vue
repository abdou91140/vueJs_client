<template>
  <n-menu :options="menuOptions" />
</template>

<script>
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'
import { NMenu, NIcon } from 'naive-ui'
import { HomeOutline as HomeIcon } from '@vicons/ionicons5'

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
export default defineComponent({
  components: {
    NMenu
  },

  data() {
    return {
      menuOptions: [
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: 'Home'
                }
              },
              { default: () => 'Acceuil' }
            ),
          key: 'go-back-home',
          icon: renderIcon(HomeIcon)
        }
      ]
    }
  }
})
</script>
