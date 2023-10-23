<template>
  <v-container grid-list-sm>
    <v-text-field
      v-model="quizName"
      label="Введите название викторины"
    ></v-text-field>
    <v-btn class="mr-2" @click.stop="save" outlined>Сохранить</v-btn>
    <v-btn @click.stop="goBack" outlined>Назад</v-btn>
    <v-btn @click.stop="printPage" outlined>html2PDF</v-btn>
    <v-btn @click.stop="winPrint" outlined>win.print</v-btn>
    <v-btn @click.stop="savePDF" outlined>view1</v-btn>
    <v-row id="page" no-gutters>
      <v-col cols="12">
        <v-card
          dense
          v-for="question in questions"
          :key="question.id"
          class="mb-2"
        >
          <div class="d-flex flex-no-wrap">
            <v-img :src="question.image" max-width="200" contain></v-img>
            <div>
              <v-card-title class="flex-nowrap">
                <div class="question__number">{{ question.id + 1 }}</div>
                <v-divider vertical></v-divider>
                <div
                  class="headline text-wrap ml-2"
                  v-text="question.questionText"
                ></div>
              </v-card-title>
              <v-list dense>
                <v-list-item
                  v-for="(answer, index) in question.answers"
                  :key="index"
                >
                  <v-list-item-icon class="mr-2 my-auto">
                    <v-icon
                      v-if="question.trueAnswer == index"
                      class="saveProject_icon"
                      color="primary"
                      >mdi-checkbox-marked-circle</v-icon
                    >
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
/* eslint-disable no-console */
import html2pdf from "html2pdf.js";

export default {
  data() {
    return {
      quizName: "",
    };
  },
  computed: {
    questions() {
      return this.$store.getters.questions;
    },
  },
  methods: {
    save() {
      this.$bus.emit("saveProject", this.$data.quizName);
    },
    goBack() {
      this.$router.go(-1);
    },
    printPage() {
      this.$router.push("/page-to-print");
    },
    winPrint() {
      window.print();
    },
    savePDF() {
      // this.$bus.emit('printPDF');

      var opt = {
        // margin:       1,
        pagebreak: { mode: "avoid-all" },
        filename: "view1.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2, imageTimeout: 0 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      let element = document.getElementById("page");
      // html2pdf().from(element).save();
      html2pdf().set(opt).from(element).save();
      // html2pdf(element,opt);

      // window.print();
    },
  },
};
</script>

<style lang="scss" scoped>
.saveProject_icon {
  color: #1976d2;
}
.question__number {
  min-width: 20px;
  overflow-wrap: break-word;
}
</style>
