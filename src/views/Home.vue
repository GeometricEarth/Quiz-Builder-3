<template>
  <v-container fluid fill-height>
        <v-row  align="center" justify="center">
          <v-col cols="12" sm="4" md="2"  align="center"  class="grey lighten-3">
            <div >
              <v-btn fab large class="mb-2" to="/editor">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <p>Создать проект</p>
            </div>
            <div >
               <v-btn fab large class="mb-2" to="/open_project">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <p>Редактировать проект</p>
            </div>
          </v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>
