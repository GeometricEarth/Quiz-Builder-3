<template>
  <v-content>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(question) in questions"
            :key="question.id"
            dark
            expand
            focusable
            inset
            popout
          >
            <v-expansion-panel-header>
              <v-row>
                <v-col clos="1">
                <div>
                  {{question.id+1}}
                </div>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="11"> <div>{{question.questionText}}</div></v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-3">
              <v-row class="grey lighten-3">
                <v-col cols="12" class="my-auto" style="position: relative; font-size:20px;">
                  <div class="hidden-sm-and-up">
                    <v-img :src="question.image" max-width="280" contain class="mx-auto"></v-img>
                    <div class="text-center pt-3">
                      <v-icon class="primary--text">mdi-timer</v-icon>
                      {{question.timeout + 'сек.'}}
                    </div>
                  </div>
                  <div class="hidden-xs-only">
                    <div style="position:absolute; bottom:25px;">
                      <v-progress-circular
                        :value="100/26 * question.timeout"
                        size="75"
                        width="6"
                        rotate="-90"
                        color="blue"
                      >
                        <div class="mx-auto text-center">
                          <v-icon>mdi-timer</v-icon>
                          <p class="mb-0">{{question.timeout + 'с'}}</p>
                        </div>
                      </v-progress-circular>
                    </div>
                    <v-img
                      :src="question.image"
                      max-width="260"
                      contain
                      class="mx-auto"
                    ></v-img>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="px-0">
                  <v-list disabled dense>
                    <v-list-item-group v-model="question.trueAnswer" color="primary">
                      <v-list-item v-for="(answer, k) in question.answers" :key="k" class="px-2">
                        <v-list-item-icon class="mr-2 my-auto">
                          <v-icon v-if="question.trueAnswer==(k)" color="primary">mdi-checkbox-marked-circle</v-icon>
                          <v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <p class="my-auto text-sm-justify">{{answer}}</p>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>
              </v-row>
              <div class="float-right">
                <v-icon @click="$emit('showOverlay', question.id)">mdi-pencil-outline</v-icon>
                <v-icon
                  :data-id="question.id"
                  @click="deleteQuestion"
                  style="cursor: pointer;"
                >mdi-trash-can-outline</v-icon>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-content>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    questions() {
      return this.$store.getters.questions;
    }
  },
  methods: {
    deleteQuestion(evt) {
      this.$store.commit("DELETE_QUESTION", evt.target.dataset.id);
    }
  }
};
</script>