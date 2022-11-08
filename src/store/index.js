/* eslint-disable no-console */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quizName: 'QuizBuilder 3',
    questions: [],
    images: []
  },
  mutations: {
    ADD_QUESTION(state, payload) {
      payload.id = state.questions.length
      state.questions.push(payload)
    },
    ADD_IMAGE(state, payload) {
      state.images.push(payload);
    },
    CHANGE_QUESTION(state, payload) {
      state.questions.find((item) => {
        if (item.id === payload.id) {
          Object.assign(item, payload)
          return true
        }
      })
    },
    CHANGE_quizName(state, payload) {
      state.quizName = payload
    },
    DELETE_QUESTION(state, id) {
      state.questions.splice(id, 1);
      state.questions.forEach((item, i) => {
        item.id = i;
      });
    },
    RESET_STORE(state) {
      state.questions = [];
      state.images = []
    },
  },
  actions: {
  },
  getters: {
    questions(state) {
      return state.questions
    },
    getQuestionByID: state => id => {
      let result = state.questions.find(item => {return item.id === id})
      return {...result, answers:[...result.answers]}
    },
    quizName(state) {
      return state.quizName
    }
  },
  modules: {
  }
})
