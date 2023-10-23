<template>
  <v-container grid-list-sm>
    <div class="mb-2">Выберете .xml файл и изображения викторины</div>
    <v-file-input
      v-model="itemsInForm"
      accept="image/*, text/xml"
      color="deep-purple accent-4"
      counter
      multiple
      label="Загрузка файлов"
      placeholder="Выберете файлы викторины"
      prepend-inner-icon="mdi-paperclip"
      prepend-icon=""
      outlined
      clearable
      :show-size="1000"
    >
      <template v-slot:selection="{ index, text }">
        <v-chip
          v-if="index < 25"
          color="deep-purple accent-4"
          dark
          label
          small
          >{{ text }}</v-chip
        >
        <span
          v-else-if="index === 25"
          class="overline grey--text text--darken-3 mx-2"
          >+{{ files.length - 25 }} File(s)</span
        >
      </template>
    </v-file-input>
    <v-btn @click="checkFiles">Добавить выбраные файлы</v-btn>
    <v-list>
      <v-row class="my-1">
        <v-col
          v-for="(fileItem, k) in images"
          :key="k"
          cols="6"
          sm="3"
          xl="2"
          align="center"
        >
          <v-card>
            <v-img contain height="80px" :src="fileItem.imageURL"></v-img>
            <v-chip label small class="ma-2"
              >{{ fileItem.imageName
              }}<v-icon right small dark color="green"
                >mdi-checkbox-marked-circle</v-icon
              ></v-chip
            >
          </v-card>
        </v-col>
      </v-row>
    </v-list>
    <v-btn block color="primary" @click="prepareQuiz">Продолжить</v-btn>
  </v-container>
</template>
<script>
/* eslint-disable no-console */
import defaultImage from "@/assets/defaultImage.js";
import { readAsDataURL, readAsTextXML } from "../modules/fileSistem.js";
export default {
  data() {
    return {
      itemsInForm: [],
      images: [],
      quize: {},
      xmlFind: false,
    };
  },
  methods: {
    checkFiles() {
      if (!this.itemsInForm.length) {
        console.log("В форме нет файлов");
        return;
      }
      this.itemsInForm.forEach((file) => {
        if (file.type === "text/xml") {
          readAsTextXML(file);
          this.xmlFind = true;
        }
        if (file.type === "image/jpeg" || file.type === "image/png") {
          let imageName = file.name;
          readAsDataURL(file).then((imageURL) => {
            this.images.push({ imageURL, imageName });
          });
        }
      });
      this.itemsInForm = [];
    },
    prepareQuiz() {
      if (!this.xmlFind) return;
      let questions = this.$store.getters.questions;
      questions.forEach((element) => {
        this.images.forEach((img) => {
          // console.log(img.imageName + " элемент в xml " + element.image);
          if (element.image == img.imageName) {
            element.image = img.imageURL;
            // array.splice(index, 1);
          }
        });
        if (!element.image) {
          console.log("no img");
          element.image = defaultImage;
          // src = './assets/logo.png';
        }
      });

      this.$router.push("/editor");
    },
  },
  computed: {
    // questions() {
    //   let result = this.$store.getters.questions
    //   .map((question) => {
    //     let imageName = question.image.split('\\')[3];
    //     let questionText = question.questionText;
    //     // Добавить поиск в this.images по imageName
    //     return {imageName, questionText}
    //   });
    //   return result
    // }
  },
};
</script>
