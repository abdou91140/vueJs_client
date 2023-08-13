import { createStore } from 'vuex'

const store = createStore({
  modules: {
    dataModule: {
      state: {
        data: [],
        dataLoading: true,
        filterKeyword: ''
      },
      mutations: {
        setData(state, data) {
          state.data = data
          state.dataLoading = false
        },
        setFilterKeyword(state, keyword) {
          state.filterKeyword = keyword
        }
      },
      actions: {
        async fetchData({ commit }) {
          try {
            const response = await fetch('http://localhost:3001/api/data')
            const jsonData = await response.json()
            commit('setData', jsonData[0])
          } catch (error) {
            console.error('Error fetching data from backend:', error)
          }
        },
        async filterData({ commit, state }) {
          const filteredData = state.data.filter(item =>
            item.nom_raison_sociale.toLowerCase().includes(state.filterKeyword.toLowerCase())
          )
          commit('setData', filteredData)
        },
        async updateFilterKeyword({ commit, dispatch }, keyword) {
          commit('setFilterKeyword', keyword)
          dispatch('filterData')
        }
      }
    }
  }
})

export default store
