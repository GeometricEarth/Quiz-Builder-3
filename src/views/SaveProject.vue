<template>
  <v-container grid-list-sm>
    <v-text-field v-model="quizName" label="Введите название викторины"></v-text-field>
    <v-btn @click.stop="save" outlined>Сохранить</v-btn>
    <v-btn @ckik="goBack" outlined>Назад</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      quizName: ""
    };
  },
  methods: {
    save() {
      this.$bus.emit("saveProject", this.$data.quizName);
    },
    goBack(){
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>