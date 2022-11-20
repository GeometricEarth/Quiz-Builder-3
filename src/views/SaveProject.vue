<template>
  <v-container grid-list-sm>
    <v-text-field v-model="quizName" label="Введите название викторины"></v-text-field>
    <v-btn class="mr-2" @click.stop="save" outlined>Сохранить</v-btn>
    <v-btn @click.stop="goBack" outlined>Назад</v-btn>
    <v-btn @click.stop="savePDF" outlined>Сохранить в PDF</v-btn>
    <v-row id="page" no-gutters>
      <v-col cols="12">
        <v-card dense v-for="(question) in questions"
            :key="question.id"
            class="mb-2">
            <div class="d-flex flex-no-wrap ">
            <v-avatar
                class="ma-3"
                size="200"
                tile
              >
              <v-img :src="question.image" max-width="280" contain class="mx-auto"></v-img>
              </v-avatar>
          <div >
          <v-card-title class="flex-nowrap">
            <div class="mr-2">{{question.id+1}}</div>
            <v-divider vertical></v-divider>
            <div class="headline text-wrap ml-2" v-text="question.questionText"></div> 
          </v-card-title>
          <v-list dense >
            <v-list-item v-for="(answer, index) in question.answers" :key="index">
                <v-list-item-icon class="mr-2 my-auto">
                  <v-icon v-if="question.trueAnswer==(index)" color="primary">mdi-checkbox-marked-circle</v-icon>
                  <v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon>
                </v-list-item-icon>
              <v-list-item-content v-text="answer" />
            </v-list-item>
          </v-list>
        </div>
        </div>
         </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      quizName: ""
    };
  },
  computed: {
    questions() {
      return this.$store.getters.questions;
    }
  },
   methods: {
    save() {
      this.$bus.emit("saveProject", this.$data.quizName);
    },
    goBack(){
      this.$router.go(-1);
<<<<<<< Updated upstream
=======
    },
    savePDF() {
      // this.$bus.emit('printJSPDF');
      window.print();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>