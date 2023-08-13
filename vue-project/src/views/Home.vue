<script>
import { ref, onMounted, computed } from 'vue'
import { NCard, NPagination, NInput, NButton, NBackTop } from 'naive-ui'
import { useStore } from 'vuex'
import useSearch from '../useSearch/'

export default {
  components: {
    NCard,
    NInput,
    NButton,
    NBackTop
  },
  props: {
    searchQuery: String
  },
  methods: {
    async generatePDF(item, timeStamp) {
      try {
        const response = await fetch(`/pdf?id=${item.id}&timestamp=${timeStamp}`)
        const blob = await response.blob()

        const a = document.createElement('a')
        a.href = window.URL.createObjectURL(blob)
        a.download = `details-${item.nom_raison_sociale}.pdf`
        a.click()
      } catch (error) {
        console.error('Error generating PDF:', error)
      }
    }
  },
  setup() {
    const store = useStore() // Use the Vuex store instance

    const data = computed(() => store.state.dataModule.data)
    const dataLoading = computed(() => store.state.dataModule.dataLoading)

    const searchQuery = ref('')

    const filteredData = computed(() => {
      if (!searchQuery.value) {
        return data.value
      }

      return data.value.filter((item) =>
        item.nom_raison_sociale.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })
    const handleFilterChange = () => {
      store.dispatch('updateFilterKeyword', searchQuery.value)
    }
    onMounted(() => {
      store.dispatch('fetchData')
    })
    return {
      dataLoading,
      filteredData,
      searchQuery,
      handleFilterChange
    }
  }
}
</script>
<template>
  <div>
    <h1>Donnée des sociétées</h1>
    <div v-if="dataLoading">Loading...</div>
    <div v-else>
      <NInput
        v-model="searchQuery"
        @input="handleFilterChange"
        placeholder="Recherche par nom ou adresse"
      />
      <NCard v-for="item in filteredData" :key="item.id" :title="item.nom_raison_sociale">
        Adresse :{{ item.adresse }}
        <template #cover><img src="https://source.unsplash.com/100x60" /> </template>
        <template #footer>N° SIREN: {{ item.siren }} </template>
        <template #action>
          <router-link :to="{ name: 'DetailsPage', params: { id: item.id } }"
            ><NButton>Détails</NButton></router-link
          >
          <NButton @click="generatePDF(item, Date.now())">PDF</NButton>
        </template>
      </NCard>
    </div>
    <NBackTop :right="100" />
  </div>
</template>

<style scoped>
.n-card {
  margin-bottom: 10px;
  max-width: 500px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
