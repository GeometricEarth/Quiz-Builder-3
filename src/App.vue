<template>
  <v-app id="app">
    <v-main fill-height fluid>
      <app-header />
      <router-view style="height:90%;"></router-view>
    </v-main>
  </v-app>
</template>

<style>
</style>

<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  data() {
    return {}
  },
  components: {
    AppHeader
  }
}
</script>
