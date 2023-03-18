<template>
  <div class="app__container">
    <router-view></router-view>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from "./components/TheFooter.vue"

export default {
  components: {
    TheFooter
  }
}
</script>

<style scoped>
.app__container {
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
}
</style>
