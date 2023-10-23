<template>
  <div class="quiz">
    <v-btn class="print-btn" color="info" @click="print">print</v-btn>
    <h1 class="quiz__name" v-text="quizName"></h1>
    <p class="quiz__duration">
      Продолжительность викторины: {{ quizDuration }}
    </p>
    <div class="pageToPrint_contaiter" id="printThis">
      <div class="card" v-for="question in this.questions" :key="question.id">
        <img class="card__image" :src="question.image" alt="" max-width="200" />
        <div class="card__wrapper">
          <div class="card__question-wrapper">
            <span class="card__number">{{ question.id + 1 }}</span>
            <!-- <h2 class="card__question">{{ question.questionText }}</h2> -->
            <textarea
              class="card__field card__question"
              type="text"
              v-model="question.questionText"
              v-on:keyup="autoGrow"
              v-on:keydown="autoGrow"
            ></textarea>
          </div>
          <div
            class="answer"
            v-for="(answer, index) in question.answers"
            :key="index"
          >
            <span v-if="question.trueAnswer == index" class="answer__icon">
            </span>
            <span v-else class="answer__icon answer__icon_wrong"></span>

            <p class="answer__text">{{ answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    print() {},
    autoGrow(e) {
      const element = e.target;
      if (element.clientHeight === element.scrollHeight) {
        element.style.height = "auto";
        return;
      }
      element.style.height = `${element.scrollHeight}px`;
    },
  },
  computed: {
    ...mapGetters(["questions", "quizName"]),
    quizDuration() {
      const duration = this.questions.reduce((acc, question) => {
        return (acc = acc + 3 + parseInt(question.timeout));
      }, 0);
      const min = parseInt(duration / 60);
      const sec = duration % 60;
      return `${min} мин ${sec}`;
    },
  },
};
</script>

<style scoped>
.quiz {
  padding: 0 32px;
  margin: 0 auto;
  /* max-width: 1024px; */
}
.pageToPrint_contaiter {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.quiz__name {
  text-align: center;
  margin: 32px 0;
}
.quiz__duration {
  font-size: 18px;
  margin-bottom: 18px;
}
.card {
  display: flex;
  gap: 16px;
  padding: 16px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
.card__wrapper {
  width: 100%;
}
.card__image {
  break-inside: avoid;
  max-width: 200px;
  object-fit: contain;
}
.card__question-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
}
.card__number {
  min-width: 36px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
}
.card__field {
  border: none;
  background: transparent;
  width: 100%;
}
.card__question {
  font-size: 24px;
  font-weight: normal;
  border: 1px solid transparent;
  border-left: 1px solid black;
  padding: 15px;
  overflow-wrap: anywhere;
  resize: none;
  /* outline: none; */
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.card__question:focus {
  border-radius: 10px;
  border-color: #434242;
}
.card__question::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.answer {
  display: flex;
  font-size: 24px;
  align-items: center;
}
.answer__text {
  padding-left: 8px;
  margin: 0;
}
.answer__icon {
  background: no-repeat url("../assets/checkbox-marked-circle.svg");
  background-position: center;
  background-size: 22px;
  height: 22px;
  width: 36px;
}
.answer__icon_wrong {
  background-image: url("../assets/checkbox-blank-circle-outline.svg");
}

@media print {
  .print-btn {
    display: none;
  }
  .quiz {
    padding: 0;
  }
  .card {
    break-inside: avoid;
  }
}
</style>
