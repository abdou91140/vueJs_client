<template>
  <div id="app">
    <header>
      <TheNavigationVue />
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer></footer>
  </div>
</template>

<script>
import TheNavigationVue from './components/TheNavigation.vue'

export default {
  components: { TheNavigationVue }
}
</script>

<style>
#app {
  max-width: 100vw;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
