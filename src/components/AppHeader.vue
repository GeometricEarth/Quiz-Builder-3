<template>
  <v-main>

    <v-toolbar class="primary">
      <v-toolbar-title>QuizBuilder 3</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <!-- <v-btn text fab to="/"> -->
          <v-btn :disabled="disableHomeBtn" text fab @click="goHome">
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <v-btn text fab to='/save-project'>
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-toolbar-items>
        </v-toolbar>
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title class=" grey lighten-2">Похоже есть не схорнаненные изменения</v-card-title>
            <v-card-text>Удалить несохраненные изменения перед переходом?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click.native="dialog = false">Отменить</v-btn>
              <v-btn text color="primary" @click.native="reset">Удалить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-main>
</template>

<script>
/* eslint-disable no-console */

export default {
  data() {
    return {
      disableHomeBtn: false,
      dialog: false
    };
  },
  // beforeMount(){
  //   if (this.$route.path == '/') {
  //     this.disableHomeBtn = true;
  //     console.log('true')
  //   }
  // },
  methods: {
    save() {
      this.$bus.emit("saveProject");
    },
    goHome() {
      if(this.$store.getters.questions.length > 0){
        this.dialog = true;
        return
      }
      this.$router.push('/')
    },
    reset(){
      this.dialog = false;
      this.$store.commit('RESET_STORE');
      this.$router.push('/')
    }
  }
};
</script>

<style>
</style>