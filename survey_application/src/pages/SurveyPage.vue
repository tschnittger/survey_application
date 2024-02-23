<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Survey</q-toolbar-title>
        <q-btn @click="$router.push('admin')">Admin</q-btn>
      </q-toolbar>
    </q-header>
    <div id="question">
      <div id="question_header">
        <h2 id="question_number">Survey</h2>
        <div class="circle-and-label">
          <q-circular-progress
            :value="progress"
            size="90px"
            :thickness="0.2"
            color="light-blue"
            center-color="grey-9"
            track-color="transparent"
          />
          <label id="survey_question_number_label">{{question_number+'/'+question_amount}}</label>
        </div>
      </div>
      <div class="question_component"></div>
      <question-component :QuestionData="QuestionData"> </question-component>
      <div id="question_fooder">
        <q-linear-progress
          :value="progress"
          color="info"
          class="q-mt-md"
          rounded
          size="10px"
        />
        <div id="navigation_buttons">
          <q-btn
            id="btn_prev"
            @click="previous()"
            color="secondary"
            icon=""
            label="zurück"
          />
          <q-btn
            id="btn_next"
            @click="next()"
            color="secondary"
            icon-right=""
            label="weiter"
          />
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import QuestionComponent from 'src/components/QuestionComponent.vue';

var question_counter = ref('1');
var currQuestion = ref('');

export default {
  components: {
    QuestionComponent,
  },
  setup() {
    const progress = ref(0.0);
    if (window.localStorage.Q1) {
      currQuestion.value = window.localStorage.Q1;
    }
    return {
      progress,
      QuestionData: currQuestion,
      question_number: ref(question_counter),
      question_amount: window.localStorage.length
    };
  },
  methods: {
    //Counts question counter up and updates progress
    next() {
      if (question_counter.value < window.localStorage.length) {
        question_counter.value++;
      }
      if (window.localStorage.getItem('Q' + question_counter.value)) {
        currQuestion.value = window.localStorage.getItem(
          'Q' + question_counter.value
        );
        console.log(currQuestion.value);
      }
    },
    //Counts question counter down and updates progress
    previous() {
      if (question_counter.value > 0) {
        question_counter.value--;
      }
      if (window.localStorage.getItem('Q' + question_counter.value)) {
        currQuestion.value = window.localStorage.getItem(
          'Q' + question_counter.value
        );
        console.log(currQuestion.value);
      }
    },
  },
};
</script>
