<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Umfrage</q-toolbar-title>
        <q-btn @click="nextUserClicked()"
          >Neuer User</q-btn
        >
        <q-btn @click="$router.push('admin')">Admin</q-btn>
      </q-toolbar>
    </q-header>
    <div id="question">
      <div id="question_header">
        <h2 id="question_number"></h2>
        <div class="circle-and-label">
          <q-circular-progress
            :value="progress"
            size="90px"
            :thickness="0.2"
            color="light-blue"
            center-color="grey-9"
            track-color="transparent"
          />
        </div>
      </div>
      <div class="question_component">
      <h6 v-show="areQuestionsAvailable">Es wurden noch keine Fragen erstellt!</h6>
      <question-component
        @answer-saved="caputreAnswerSaved"
        :QuestionData="QuestionData"
        :user-i-d="currentUserID"
        :is-interactible="true"
      >
      </question-component>
      </div>
    </div>
    <div id="question_fooder">
        <div id="navigation_buttons">
          <q-btn
            id="btn_prev"
            @click="previous()"
            color="secondary"
            icon=""
            label="zurück"
          />
          <label id="survey_question_number_label">{{
            question_number + '/' + question_amount
          }}</label>
          <q-btn
            id="btn_next"
            @click="next()"
            color="secondary"
            icon-right=""
            label="weiter"
          />
        </div>
      </div>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import QuestionComponent from 'src/components/QuestionComponent.vue';

var question_counter = ref('1');
var question_amount = ref('0');
var currQuestion = ref('');

var currentUserID = ref('');

/**
 * Updates the amount of questions and how many of them are answered by the current user.
 * Returns the progress by dividing answers by amount of questions
 */
function calculateProgress() {
  var Answers = 0;
  question_amount.value = 0;
  for (var i = 1; i <= window.localStorage.length; i++) {
    if (window.localStorage.getItem('Q' + i)) {
      question_amount.value++;
    }
    for (var y=1; y<=window.localStorage.length; y++) {
      var answer = JSON.parse(window.localStorage.getItem('Q'+ i + 'A' + y));
      if (answer!=null && answer.USER_ID == currentUserID.value) {
        Answers++;
      }
    }

  }
  return Answers / question_amount.value;
}

export default {
  components: {
    QuestionComponent,
  },
  mounted() {
    this.initialize();
  },
  setup() {
    calculateProgress();
    const progress = ref(0.0);
    if (window.localStorage.Q1) {
      currQuestion.value = window.localStorage.Q1;
    }
    return {
      progress,
      QuestionData: currQuestion,
      question_number: ref(question_counter),
      question_amount: ref(question_amount),
      currentUserID: currentUserID,
      areQuestionsAvailable: ref(true)
    };
  },
  methods: {
    initialize() {
      if (currentUserID.value == '') {
        this.registerNewUserID(this.getLowestFreeUserID());
        console.log('New User');
      }
      if(question_amount.value>0){
        this.areQuestionsAvailable = false
      }
    },
    //Returns the lowest userID, which is not registered yet
    getLowestFreeUserID() {
      var userID = 1;
      for (var i = 1; i <= window.localStorage.length; i++) {
        if (window.localStorage.getItem('U' + i)) {
          userID++;
        }
      }
      return 'U' + userID;
    },
    registerNewUserID(userID) {
      window.localStorage.setItem(userID, userID);
      currentUserID.value = userID;
      calculateProgress();
    },
    //Counts question counter up and updates progress
    next() {
      if (question_counter.value < question_amount.value) {
        question_counter.value++;
      }
      if (window.localStorage.getItem('Q' + question_counter.value)) {
        currQuestion.value = window.localStorage.getItem(
          'Q' + question_counter.value
        );
      }
      this.progress = calculateProgress()*100;
    },
    //Counts question counter down and updates progress
    previous() {
      if (question_counter.value > 1) {
        question_counter.value--;
      }
      if (window.localStorage.getItem('Q' + question_counter.value)) {
        currQuestion.value = window.localStorage.getItem(
          'Q' + question_counter.value
        );
      }
      this.progress = calculateProgress()*100;
    },
    nextUserClicked(){
      this.registerNewUserID(this.getLowestFreeUserID());
      this.progress = calculateProgress()*100;
    },
    caputreAnswerSaved(){
      this.progress = calculateProgress()*100;
    }
  },
  watch: {

  }
};
</script>
