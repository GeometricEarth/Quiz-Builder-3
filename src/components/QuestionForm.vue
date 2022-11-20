
<template>
  <v-row>
    <v-col cols="12">
      <v-form ref="addQuestion">
        <v-container>
          <v-row justify="center">
            <v-col v-if="quiz.image" cols="12" class="my-auto grey lighten-3 py-2">
              <v-img :src="quiz.image" max-width="280" max-height="150" contain class="mx-auto"></v-img>
            </v-col>
            <v-col>
              <v-slider
                v-model="quiz.timeout"
                label="Таймер"
                track-color="grey"
                always-dirty
                max="60"
                thumb-label="always"
                class="pt-2"
                dense
                hide-details
              >
                <template v-slot:label>
                  <label>Таймер: </label>
                  <v-icon @click="decrement">mdi-minus</v-icon>
                </template>
                <template v-slot:append>
                  <v-icon @click="increment">mdi-plus</v-icon>
                </template>
              </v-slider>
              <v-file-input
                @change="addImage"
                accept="image/*"
                label="Добавить изображение"
                prepend-icon="mdi-camera-plus"
                small-chips
              ></v-file-input>
              <v-textarea
                v-model="quiz.questionText"
                :rules="quesitonLenght"
                :counter="120"
                class="ml-8"
                name="question"
                label="Вопрос"
                outlined
                rows="1"
                auto-grow
                lazy-validation
                dense
              ></v-textarea>
              <v-textarea
                v-for="(answer, id) in 4"
                v-model="quiz.answers[id]"
                :key="`answer${id}`"
                :name="`answer${id}`"
                :label="`Ответ${id+1}`"
                :counter="80"
                outlined
                rows="1"
                auto-grow
                lazy-validation
                dense
              >
                <template v-slot:prepend>
                  <v-icon
                    v-if="quiz.trueAnswer === id"
                    color="primary"
                    style="cursor:pointer;"
                  >mdi-checkbox-marked-circle</v-icon>
                  <v-icon
                    v-else
                    @click="checked(id)"
                    style="cursor:pointer;"
                  >mdi-checkbox-blank-circle-outline</v-icon>
                </template>
              </v-textarea>
              <v-card-actions class="d-flex align-center justify-center">
                <v-btn v-if="!isEdeting" :disabled="!valid" @click="add" color="primary">Добавить</v-btn>
                <v-btn v-else :disabled="!valid" @click="mutateQuestion" color="primary">Изменить</v-btn>
                <v-btn @click="clearForm" class="lime lighten-4">Очистить</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
/* eslint-disable no-console */
// const defultImage = require("");
import defaultImage from '@/assets/defaultImage.js'
export default {
  data() {
    return {
      panel: 0,
      quiz: this.question,
      quesitonLenght: [
        v => !!v || "Викторина без вопросов невозможна",
        v =>
          (v && v.length <= 120) ||
          "Длинна вопроса должнаа быть менее 120 символов"
      ]
      // answerLenght: [
      //   v =>v && v.length <= 120 || "Длинна ответа должнаа быть менее 80 символов"
      // ]
    };
  },
  props: {
    question: {
      type: Object,
      default: () => {
        return {
          image: "",
          questionText: "",
          answers: ["", "", "", ""],
          trueAnswer: -1,
          timeout: 15
        };
      }
    },
    isEdeting: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    valid() {
      return this.quiz.questionText && this.quiz.trueAnswer >= 0 ? true : false;
    }
  },
  watch: {
    question(newValue) {
      this.quiz = newValue;
    }
  },
  methods: {
    add() {
      if (!this.quiz.image) this.quiz.image = defaultImage;
      this.$store.commit("ADD_QUESTION", this.quiz);
      this.clearForm();
      // this.quiz = {
      //   image: null,
      //   questionText: null,
      //   answers: [],
      //   trueAnswer: -1
      // };
      
    },
    mutateQuestion() {
      this.$store.commit("CHANGE_QUESTION", this.quiz);
      this.$emit("mutationIsDone");
      this.clearForm();
    },
    clearForm() {
      this.quiz = {
        image: "",
        questionText: "",
        answers: [],
        trueAnswer: -1,
        timeout: 15
      };
      this.$refs.addQuestion.resetValidation();
      // this.$refs.addQuestion.reset();
    },
    addImage(file) {
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        let reader = new FileReader();
        reader.onload = () => {
          this.quiz.image = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.quiz.image = "";
      }
    },
    checked(pyload) {
      this.quiz.trueAnswer = pyload;
    },
    decrement() {
      this.quiz.timeout--;
    },
    increment() {
      this.quiz.timeout++;
    }
  }
};
</script>
