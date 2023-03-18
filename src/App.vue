<template>
  <h1>App.vue</h1>
  <router-view></router-view>
  <the-footer></the-footer>
</template>

<script>
import TheFooter from "./components/TheFooter.vue"

export default {
  components: {
    TheFooter
  }
}
</script>

<style scoped></style>
