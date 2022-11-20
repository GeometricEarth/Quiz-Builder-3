<template>
  
    <v-container fill-height class="justify-center mt-3">
      <v-row justify="center">
        <v-col xs="12" sm="10" md="8" lg="8">
          <question-list @showOverlay="editQuestion"></question-list>
          <v-expansion-panels class="mt-3" v-model="editorPanelState">
            <v-expansion-panel expand focusable>
              <v-expansion-panel-header>
                <template v-slot:default="{ open }">
                  <v-row no-gutters>
                    <v-col class="d-flex align-center justify-center">
                      <h2>Добавить вопрос</h2>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <question-form class="justify-center"></question-form>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-dialog v-model="edeting" @click:outside="mutationIsDone" max-width="650px" >
            <v-row no-gutters justify="center">
              <v-col cols="12">
                <v-card>
                  <v-card-title>{{edeting ? 'Редактировать вопрос':'Добавить вопрос'}}</v-card-title>
                  <v-card-text >
                    <!-- <v-virtual-scroll height="800" item-height="750"> -->
                    <question-form
                      class="justify-center"
                      :question="editableQuestion"
                      :isEdeting="edeting"
                      @mutationIsDone="mutationIsDone"
                    ></question-form>
                  <!-- </v-virtual-scroll> -->
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  
</template>

<script>
/* eslint-disable no-console */
import QuestionList from "@/components/QuestionList.vue";
import QuestionForm from "@/components/QuestionForm.vue";

export default {
  data() {
    return {
      edeting: false,
      editableQuestion: {},
      editorPanelState: 0,
    };
  },
  components: {
    QuestionList,
    QuestionForm
  },
  methods: {
    editQuestion(id) {
      this.editableQuestion = this.$store.getters.getQuestionByID(id);
      this.edeting = true;
    },
    mutationIsDone() {
      this.edeting = false;
      // this.editableQuestion = {}
    },
  }
};
</script>