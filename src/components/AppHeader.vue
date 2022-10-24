<template>
  <v-toolbar class="primary">
    <v-toolbar-title>Test</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <!-- <v-btn text fab to="/"> -->
      <v-btn text fab @click="goHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn text fab to='/save-project'>
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
/* eslint-disable no-console */

export default {
  data() {
    return {};
  },
  methods: {
    save() {
      this.$bus.emit("saveProject");
    },
    goHome() {
      this.$store.commit("RESET_STORE");
      this.$router.push({name:'home'})
    }
  }
};
</script>

<style>
</style>