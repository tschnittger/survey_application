<template>
  <div id="MC_Question">
    <label style="font-size: x-large;">{{ question }}</label>
    <ul
      id="MC_true_list"
      v-show="MultipleChoice"
      style="padding-inline-start: 20px"
    >
      <li v-for="(answer, index) in answers" :key="index">
        <q-checkbox
          id="multiple_choice"
          right-label
          v-model="multiple_choice_checkboxes[index]"
          >{{ answer[0] }}</q-checkbox
        >
      </li>
      <q-input v-model="multiple_choice_text" filled v-show="custom" dense />
    </ul>
    <div id="MC_false_list" v-show="!MultipleChoice && !Text_answer">
      <q-option-group :options="answers" type="radio" v-model="radio" />
      <q-input v-model="radio_text" filled v-show="custom" dense />
    </div>
    <div id="Text_Answer" v-show="!MultipleChoice && Text_answer">
      <q-input v-model="textanswer_text" filled type="textarea" />
    </div>
  </div>
  <div
    id="send_container"
    style="margin-top: 0%; margin-bottom: 10px"
    v-show="isInteractible"
  >
    <q-btn
      id="btn_send"
      @click="onSaveClicked()"
      color="primary"
      label="Absenden"
    />
  </div>
</template>
<script>
import { ref } from 'vue';

var CurrAnswerID = 1;
var QuestionID;

var currentQuestionJSON;

export default {
  //Get current question and bool to determine if question is interactable
  name: 'QuestionComponent',
  props: ['QuestionData', 'isInteractible', 'userID'],
  mounted() {
    this.initialize();
  },
  data() {
    return {
      question: '',
      answers: [],
      MultipleChoice: ref(false),
      Text_answer: ref(false),
      radio: ref(null),
      textanswer_text: ref(null),
      radio_text: ref(null),
      multiple_choice_text: ref(null),
      multiple_choice_checkboxes: [],
      custom: ref(false),
    };
  },
  methods: {
    initialize() {
      //Load questions
      if (window.localStorage.Q1 || !this.isInteractible) {
        this.deconstructQuestionData(JSON.parse(this.QuestionData));
      }
    },
    onSaveClicked() {
      this.saveAnswer(this.buildAnswer());
      this.$emit('answer-saved', true);
    },
    buildAnswer() {
      var answers = [];
      var customAnswer = false;
      //Check type of question to save from the right input
      if (this.Text_answer == true) {
        if (this.validateAnswer(this.textanswer_text)) {
          answers.push(this.textanswer_text);
        }
      } else {
        //Multiple choice answer
        if (this.MultipleChoice == true) {
          for (var i = 0; i < this.multiple_choice_checkboxes.length; i++) {
            //Check for marked checkboxes
            if (this.multiple_choice_checkboxes[i] == true) {
              //Check if answer is a custom answer
              if (
                i == this.multiple_choice_checkboxes.length - 1 &&
                currentQuestionJSON.CQ
              ) {
                if (this.validateAnswer(this.multiple_choice_text)) {
                  answers.push(this.multiple_choice_text);
                  customAnswer = true;
                } else {
                  //Empty answer
                }
              } else {
                //Add normal answers
                answers.push(this.answers[i][0]);
              }
            }
          }
        } else {
          //Add normal answer
          if (this.validateAnswer(this.radio)) {
            answers.push(this.radio);
          } else {
            //Add custom answer
            if (this.validateAnswer(this.radio_text)) {
              answers.push(this.radio_text);
              customAnswer = true;
            } else {
              //Fehler, leeres Feld
            }
          }
        }
      }
      // Build answer containing userID, AnswerID, QuestionID and the answer(s)
      const data = JSON.stringify({
        USER_ID: this.userID,
        ANSWER_ID: CurrAnswerID,
        QUESTION_ID: QuestionID,
        ANSWER: answers,
        HAS_CUSTOM_ANSWER: customAnswer,
      });
      return data;
    },
    saveAnswer(data) {
      this.updateAnswerID();
      // Ensure that 1 userID only has 1 answer saved per question
      if(data.ANSWER != this.userID || !window.localStorage.getItem('Q' + QuestionID + 'A' + CurrAnswerID)){
        try {
          // Save Answer as (Q + QuestionID + A + AnswerID) so answers can be evaluated easier
          window.localStorage.setItem(
            'Q' + QuestionID + 'A' + CurrAnswerID,
            data
          );
        } catch (e) {
          //catch error
        }
      }
    },
    //Checking answers for certain criteria
    validateAnswer(answer) {
      if (answer != null && answer != '') {
        return true;
      }
      return false;
    },
    deconstructQuestionData(QuestionData) {
      currentQuestionJSON = QuestionData;
      //Save id for answer
      QuestionID = QuestionData.ID;
      //Set question
      this.question = QuestionData.QUESTION;
      //Set question-type
      if (QuestionData.TYP == 'Textfrage') {
        this.Text_answer = true;
        this.MultipleChoice = false;
      } else {
        if (QuestionData.TYP == 'Multiple-Choice Frage') {
          this.Text_answer = false;
          this.answers = [];
          if (QuestionData.MC) {
            this.MultipleChoice = true;
            //Set answers based on question type
            this.answers = [];
            this.multiple_choice_checkboxes = [];
            for (var i = 0; i < QuestionData.answers.length; i++) {
              this.answers.push([QuestionData.answers[i]]);
              this.multiple_choice_checkboxes.push(false);
            }
            //Add empty option for custom answer, based on answer-type
            if (QuestionData.CQ) {
              var answer = ['Eigene Antwort: '];
              this.answers.push(answer);
              console.log(this.answers);
              this.custom = true;
              this.multiple_choice_checkboxes.push(false);
            } else {
              this.custom = false;
            }
          } else {
            this.Text_answer = false;
            //Set answers based on question type
            this.MultipleChoice = false;
            for (var i = 0; i < QuestionData.answers.length; i++) {
              var answer = {
                label: QuestionData.answers[i],
                value: QuestionData.answers[i],
              };
              this.answers.push(answer);
            }
            //Add empty option for custom answer, based on answer-type
            if (QuestionData.CQ == true) {
              var answer = {
                label: 'Eigene Antwort:',
                value: '',
              };
              this.answers.push(answer);
              this.custom = true;
              this.multiple_choice_checkboxes.push(false);
            } else {
              this.custom = false;
            }
          }
        }
      }
      //Check if question has already been answered
      var savedAnswer = this.checkForAnswerOfUser(QuestionID, this.userID);
      if (savedAnswer != null) {
        this.setSavedAnswer(
          savedAnswer,
          currentQuestionJSON.TYP,
          currentQuestionJSON.MC,
          currentQuestionJSON.CQ
        );
      }
    },
    setSavedAnswer(savedAnswer, questionType, isMultipleChoice) {
      var savedAnswer = JSON.parse(window.localStorage.getItem(savedAnswer));
      if (questionType == 'Textfrage') {
        this.textanswer_text = savedAnswer.ANSWER[0];
      } else {
        if (isMultipleChoice) {
          this.setMultipleChoiceAnswer(savedAnswer);
        } else {
          this.setRadioAnswer(savedAnswer);
        }
      }
    },
    setMultipleChoiceAnswer(answer) {
      //Compare answers currently displayed to saved answers
      for (var i = 0; i < this.answers.length; i++) {
        for (var y = 0; y < answer.ANSWER.length; y++) {
          if (this.answers[i] == answer.ANSWER[y]) {
            this.multiple_choice_checkboxes[i] = true;
          }
          //Check if custom answer was added
          if (i == this.answers.length - 1 && answer.HAS_CUSTOM_ANSWER) {
            this.multiple_choice_checkboxes[i] = true;
            this.multiple_choice_text = answer.ANSWER[y];
          }
        }
      }
    },
    setRadioAnswer(answer) {
      //Tick the chosen radio box
      for (var i = 0; i < this.answers.length; i++) {
        if (this.answers[i].value == answer.ANSWER[0]) {
          this.radio = this.answers[i].value;
        }
        if (answer.HAS_CUSTOM_ANSWER) {
          this.radio = this.answers[i].value;
          this.radio_text = answer.ANSWER[0];
        }
      }
    },
    /**
     * Determins if a given user answered a certain question
     * @param {*} questionID ID of question to check
     * @param {*} userID ID of user to look for
     */
    checkForAnswerOfUser(questionID, userID) {
      if (this.isInteractible) {
        for (var i = 0; i < window.localStorage.length; i++) {
          var currentAnswer = JSON.parse(window.localStorage.getItem(
            'Q' + questionID + 'A' + i
          ));
          if (currentAnswer != null && currentAnswer.USER_ID == userID) {
            return 'Q' + questionID + 'A' + i;
          }
        }
      }
      return null;
    },
    clearInputs(){
      this.textanswer_text = '';
      this.radio_text = '';
      this.multiple_choice_text = '';
      for(var i=0;i<this.multiple_choice_checkboxes.length;i++){
        this.multiple_choice_checkboxes[i] = false
      }
      this.radio = null;
    },
    updateAnswerID(){
      CurrAnswerID = 1;
      for(var i=1;i<=window.localStorage.length;i++){
        var tempAnswer = window.localStorage.getItem('Q'+ QuestionID + 'A' + i)
        console.log(QuestionID)
        if(tempAnswer != null){
          console.log(this.userID);
          if(JSON.parse(tempAnswer).USER_ID == this.userID){
            console.log(CurrAnswerID)
            CurrAnswerID = i;
            return null
          }else{
            CurrAnswerID++;
          }
        }
      }
      console.log(CurrAnswerID)
    }
  },
  //Update if question is changed
  watch: {
    userID(){
      this.updateAnswerID();
      this.clearInputs();
    },
    QuestionData(newVal) {
      this.updateAnswerID();
      this.clearInputs();
      this.deconstructQuestionData(JSON.parse(newVal));
    },
  },
};
</script>
