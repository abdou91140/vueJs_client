<script>
import { ref, onMounted, defineComponent } from 'vue'
import { NCard, NButton } from 'naive-ui'

import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  components: {
    NCard,
    NButton
  },
  setup() {
    const router = useRoute()
    const routerInstance = useRouter()
    const id = ref(router.params.id)
    const society = ref(null)

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/data/${id.value}`)
        const jsonData = await response.json()
        society.value = jsonData[0][0]
      } catch (error) {
        console.error('Error fetching society data:', error)
      }
    }

    const goBack = () => {
      routerInstance.go(-1)
    }

    onMounted(() => {
      fetchData()
    })
    return {
      society,
      goBack
    }
  },
  computed: {
    staticMapUrl() {
      if (this.society && this.society.coordonnees) {
        const coordinates = this.society.coordonnees.split(',')
        const lat = coordinates[0]
        const lng = coordinates[1]
        const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY
        const marker = `markers=color:red%7Clabel:M%7C${lat},${lng}`

        return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x400&${marker}&key=${apiKey}`
      }
      return null
    }
  }
})
</script>

<template>
  <div class="details-page">
    <NCard v-if="society" class="details-card" :title="society.nom_raison_sociale">
      <template #cover
        ><div class="map-container">
          <img v-if="staticMapUrl" :src="staticMapUrl" alt="Google Map" /></div
      ></template>
      <template #header-extra>N° SIREN: {{ society.siren }}</template>
      <template #footer>
        <div class="address">Adresse: {{ society.adresse }}</div>
      </template>
      <template #action>
        <NButton typr="info" class="back-button" @click="goBack">Retour</NButton></template
      >
    </NCard>
  </div>
</template>

<style scoped>
.details-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  width: 500px;
}

.details-card {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.address {
  margin-top: 10px;
  font-size: 14px;
}

img {
  max-width: 100%;
}

.back-button {
  align-self: flex-start;
  margin-top: 20px;
}
</style>
