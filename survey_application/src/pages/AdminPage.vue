<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer()"
        />
        <q-toolbar-title title>Admin Page</q-toolbar-title>
        <q-btn @click="$router.push('survey')">Back</q-btn>
      </q-toolbar>
    </q-header>
    <q-body>

      <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Sind Sie mit dieser Frage zufrieden?</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          frage
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

      <div id="new_question_container">
        <div id="new_question_input">
          <div class="q-pa-md" >
            <div id="question_type_container" class="q-gutter-md">
              <q-select @update:model-value="onTypeChanged($event)" v-model="model" :options="options" label="Typ:" />
            </div>
            <div id="question_container">
              <span class="label">Frage:</span>
              <q-input filled v-model="question_text" label="Filled" />
            </div>
            <q-slide-transition>
              <div v-show="visible">
                <div id="answer_container" class="form-group" v-for="(answer, k) in answers" :key="k" >
                  <span class="label">Antwort:</span>
                  <div id="answer_line">
                    <q-input class="form-control" filled v-model="answer.text" label="Filled" type="text"/>
                    <span>
                      <q-btn @click="addAnwser(k)" v-show="k == answers.length-1">+</q-btn>
                      <q-btn @click="removeAnswer(k)" v-show="k || ( !k && answers.length > 1)">-</q-btn>
                    </span>
                  </div>
                </div>
                <div id="multiple_choice_container">
                  <q-checkbox left-label v-model="multiple_choice_checkbox" label="Mehrere Antworten möglich?" />
                </div>
                <div id="custon_answer_container">
                  <q-checkbox left-label v-model="custom_question_checkbox" label="Eigene Antwort hinzufügen?" />
                </div>
              </div>
            </q-slide-transition>
            <div id="submit_container">
              <q-btn @click="onSubmit()">Absenden</q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-body>
    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

</template>

<script>
/* eslint-disable*/
import { ref } from 'vue';

var leftDrawerOpen = ref(false);

export default {
  setup () {
    return {
      leftDrawerOpen,
      model: ref('Multiple-Choice Frage'),
      options: [
      'Multiple-Choice Frage', 'Textfrage'
      ],
      multiple_choice_checkbox: ref(false),
      question_text: ref(''),
      custom_question_checkbox: ref(false),
      visible: ref(true),
      alert: ref(false)
    }
  },
  data() {
    return{
      answers:[
        {
          text: ""
        }
      ]
    };
  },
  methods: {
    toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    },
    onTypeChanged(selectedType){
      console.log(selectedType)
      if(selectedType == 'Textfrage'){
        this.visible = false
      }else{
        this.visible = true
      }
    },
    addAnwser(index){
      this.answers.push({text:""})
    },
    removeAnswer(index){
      this.answers.splice(index, 1);
    },
    onSubmit(){
      this.alert = true
    }
  }
};

</script>
