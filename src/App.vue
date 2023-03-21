<template>
  <div class="app__container">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
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

.fade-enter-active {
  animation: fade .5s ease;
}

@keyframes fade {
  from {
    opacity: 0;
    scale: 0.9;
  }

  to {
    opacity: 1;
    scale: 1;
  }
}
</style>
