<template>
  <div id="MC_Question">
    <div class="q-pa-md q-gutter-sm">
      <!--Banner do display error message-->
      <q-banner
        id="failed_alert"
        inline-actions
        dense
        class="bg-negative text-white"
        v-show="failed_banner"
      >
        {{ DialogTextRef }}
        <template v-slot:action>
          <q-btn
            flat
            color="white"
            label="Dismiss"
            @click="closeFailedAlert()"
          />
        </template>
      </q-banner>
    </div>
    <!--Question-->
    <label style="font-size: x-large">{{ question }}</label>
    <!--Multiple Choice Question-->
    <div
      id="multiple_choice_list"
      v-show="MultipleChoice">
      <ul
      style="padding-inline-start: 20px"
      >
        <li v-for="(answer, index) in answersOnScreen" :key="index">
          <q-checkbox
            id="multiple_choice"
            right-label
            v-model="multiple_choice_checkboxes[index]"
            >{{ answer[0] }}</q-checkbox
          >
        </li>
        <q-input v-model="multiple_choice_text" filled v-show="custom" dense />
      </ul>
    </div>
    <!--Single Choice Question-->
    <div id="radio_list" v-show="!MultipleChoice && !Text_answer">
      <q-option-group :options="answersOnScreen" type="radio" v-model="radio" />
      <q-input v-model="radio_text" filled v-show="custom" dense />
    </div>
    <!--Text Question-->
    <div id="Text_Answer" v-show="!MultipleChoice && Text_answer">
      <q-input v-model="textanswer_text" filled type="textarea" />
    </div>
  </div>
  <!--Send button-->
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
  // Get current question, bool to determine if question is interactable and the current user
  name: 'QuestionComponent',
  props: ['QuestionData', 'isInteractible', 'userID'],
  mounted() {
    this.initialize();
  },
  data() {
    return {
      question: '',
      answersOnScreen: [],
      MultipleChoice: ref(false),
      Text_answer: ref(false),
      radio: ref(null),
      textanswer_text: ref(null),
      radio_text: ref(null),
      multiple_choice_text: ref(null),
      multiple_choice_checkboxes: [],
      custom: ref(false),
      failed_banner: ref(false),
      DialogTextRef: ref('Bitte geben Sie etwas ein!'),
    };
  },
  methods: {
    /**
     * Tries to load first question when component is initialized
     */
    initialize() {
      if (window.localStorage.Q1 || !this.isInteractible) {
        this.deconstructQuestionData(JSON.parse(this.QuestionData));
      }
    },

    /**
     * Saves answer and sends signal to update progress afterwards
     */
    onSaveClicked() {
      this.saveAnswer(this.buildAnswer());
      this.$emit('answer-saved', true);
    },

    closeFailedAlert() {
      this.failed_banner = false;
    },

    /**
     * Determins if a given user answered a certain question
     * @param {*} questionID ID of question to check
     * @param {*} userID ID of user to look for
     */
     checkForAnswerOfUser(questionID, userID) {
      if (this.isInteractible) {
        for (var i = 0; i < window.localStorage.length; i++) {
          var currentAnswer = JSON.parse(
            window.localStorage.getItem('Q' + questionID + 'A' + i)
          );
          if (currentAnswer != null && currentAnswer.USER_ID == userID) {
            return 'Q' + questionID + 'A' + i;
          }
        }
      }
      return null;
    },

    /**
     * Clears all input fields, radio buttons and checkboxes
     */
    clearInputs() {
      this.textanswer_text = '';
      this.radio_text = '';
      this.multiple_choice_text = '';
      for (var i = 0; i < this.multiple_choice_checkboxes.length; i++) {
        this.multiple_choice_checkboxes[i] = false;
      }
      this.radio = null;
    },

    /**
     * Updates the answerID.
     * Return ID of the answer the user gave,
     * if the user didn't answer the question,
     * returns the next free ID
     */
    updateAnswerID() {
      CurrAnswerID = 1;
      for (var i = 1; i <= window.localStorage.length; i++) {
        var tempAnswer = window.localStorage.getItem(
          'Q' + QuestionID + 'A' + i
        );
        if (tempAnswer != null) {
          if (JSON.parse(tempAnswer).USER_ID == this.userID) {
            CurrAnswerID = i;
            return null;
          } else {
            CurrAnswerID++;
          }
        }
      }
    },

    /**
     * Deconstructs the Questiondata, displays it afterwards
     * @param {*} QuestionData JSON with Questiondata
     */
     deconstructQuestionData(QuestionData) {
      currentQuestionJSON = QuestionData;
      // Save id for answer
      QuestionID = QuestionData.ID;
      // Set question-label
      this.question = QuestionData.QUESTION;
      // Set question-type
      if (QuestionData.TYP == 'Textfrage') {
        this.Text_answer = true;
        this.MultipleChoice = false;
      } else {
        if (QuestionData.TYP == 'Auswahlfrage') {
          this.Text_answer = false;
          this.answersOnScreen = [];
          if (QuestionData.MC) {
            this.fillMultipleChoiceQuestion(QuestionData);
          } else {
            this.fillRadioQuestion(QuestionData);
          }
        }
      }
      // Check if question has already been answered
      var savedAnswer = this.checkForAnswerOfUser(QuestionID, this.userID);
      if (savedAnswer != null) {
        this.setSavedAnswer(
          savedAnswer,
          currentQuestionJSON.TYP,
          currentQuestionJSON.MC
        );
      }
    },

    /**
     * Handles displaying questions of multiple choice type
     * @param {*} QuestionData JSON with Questiondata
     */
    fillMultipleChoiceQuestion(QuestionData){
      // Set right question div
      this.MultipleChoice = true;
      // Build answers
      this.multiple_choice_checkboxes = [];
      for (var i = 0; i < QuestionData.answers.length; i++) {
        this.answersOnScreen.push([QuestionData.answers[i]]);
        this.multiple_choice_checkboxes.push(false);
      }
      // Handle custom answer
      if (QuestionData.CQ) {
        var answer = ['Eigene Antwort: '];
        this.answersOnScreen.push(answer);
        this.custom = true;
        this.multiple_choice_checkboxes.push(false);
      } else {
        this.custom = false;
      }
    },

    /**
     * Handles displaying questions of radio type
     * @param {*} QuestionData JSON with Questiondata
     */
    fillRadioQuestion(QuestionData){
      // Set right question div
      this.MultipleChoice = false;
      // Build answers
      for (var i = 0; i < QuestionData.answers.length; i++) {
        var answer = {
          label: QuestionData.answers[i],
          value: QuestionData.answers[i],
        };
        this.answersOnScreen.push(answer);
      }
      // Handle custom answer
      if (QuestionData.CQ == true) {
        var answer = {
          label: 'Eigene Antwort:',
          value: '',
        };
        this.answersOnScreen.push(answer);
        this.custom = true;
        this.multiple_choice_checkboxes.push(false);
      } else {
        this.custom = false;
      }
    },

    /**
     * Builds the answer from current input, if answers are viable
     */
    buildAnswer() {
      var answers = [];
      var customAnswer = false;
      // Check type of question to save from the right input
      if (this.Text_answer == true) {
        if (this.validateAnswer(this.textanswer_text)) {
          answers.push(this.textanswer_text);
        }
      } else {
        if (this.MultipleChoice == true) {
          // Multiple choice answer
          var arr = this.buildMultipleChoiceAnswer(
            this.multiple_choice_checkboxes,
            this.multiple_choice_text
          );
          if (arr != 0) {
            customAnswer = arr[0];
            answers = arr[1];
          }else{
            return arr;
          }
        } else {
          // Radio answer
          var arr = this.buildRadioAnswer(this.radio, this.radio_text);
          if (arr != -1) {
            customAnswer = arr[0];
            answers = arr[1];
          }else{
            return arr;
          }
        }
      }
      //If there already is an answer, and no answers are given currently, return -1 to delete answer
      if (
        this.checkForAnswerOfUser(QuestionID, this.userID) &&
        answers.length == 0
      ) {
        return -1;
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

    /**
     * Builds answers of type multiple choice.
     * Returns answers and bool to determine if there is a custom answer.
     * Return 0 if custom answer was chosen, but nothing was entered.
     * @param {bool[]} MC_Checkboxes values of the boxes, true if box is marked
     * @param {String} MC_Text text in custom answer field
     */
    buildMultipleChoiceAnswer(MC_Checkboxes, MC_Text) {
      var customAnswer = false;
      var answers = [];
      var returnArray = [];
      for (var i = 0; i < MC_Checkboxes.length; i++) {
        //Check for marked checkboxes
        if (MC_Checkboxes[i] == true) {
          //Check if answer is a custom answer
          if (i == MC_Checkboxes.length - 1 && currentQuestionJSON.CQ) {
            if (this.validateAnswer(MC_Text)) {
              answers.push(MC_Text);
              customAnswer = true;
            } else {
              this.failed_banner = true;
              return 0;
            }
          } else {
            //Add normal answers
            answers.push(this.answersOnScreen[i][0]);
          }
        }
      }
      returnArray.push(customAnswer);
      returnArray.push(answers);
      return returnArray;
    },

    /**
     * Builds answer of type radio.
     * Returns the answer and bool to determine if its custom.
     * Return -1 if there is no answer.
     * @param {*} radio
     * @param {*} radio_text
     */
    buildRadioAnswer(radio, radio_text) {
      var customAnswer = false;
      var answers = [];
      var returnArray = [];
      //Add normal answer
      if (this.validateAnswer(radio)) {
        answers.push(radio);
      } else {
        //Add custom answer
        if (this.validateAnswer(radio_text)) {
          answers.push(radio_text);
          customAnswer = true;
        } else {
          return -1;
        }
      }
      returnArray.push(customAnswer);
      returnArray.push(answers);
      console.log(returnArray);
      return returnArray;
    },
    /**
     * Saves/updates or deletes Answer based on input.
     * @param {*} data -1 to delete last Answer, JSON with answer to save answer, 0 if something went wrong
     */
    saveAnswer(data) {
      this.updateAnswerID();
      //Catch non JSON values of data could be
      if (data != 0 && data != -1) {
          try {
            // Save Answer as (Q + QuestionID + A + AnswerID) so answers can be evaluated easier
            window.localStorage.setItem(
              'Q' + QuestionID + 'A' + CurrAnswerID,
              data
            );
          } catch (e) {
          }
      } else {
        //Remove answer if user removed answers and saved
        if (data == -1) {
          window.localStorage.removeItem('Q' + QuestionID + 'A' + CurrAnswerID);
        }
      }
    },

    /**
     * Checking answers for certain criteria
     * @param {String} answer a single answer
     */
    validateAnswer(answer) {
      if (answer != null && answer != '') {
        return true;
      }
      return false;
    },

    /**
     * Puts a saved answer into the right question
     * @param {*} savedAnswer the answer to display
     * @param {*} questionType the type of question the answer answers
     * @param {*} isMultipleChoice if the question is multiple choice
     */
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

    /**
     * Fills questions of type multiple choice with a given answer
     * @param {*} savedAnswer given answer
     */
    setMultipleChoiceAnswer(savedAnswer) {
      //Compare answers currently displayed to saved answers
      for (var i = 0; i < this.answersOnScreen.length; i++) {
        for (var y = 0; y < savedAnswer.ANSWER.length; y++) {
          if (this.answersOnScreen[i] == savedAnswer.ANSWER[y]) {
            this.multiple_choice_checkboxes[i] = true;
          }
          //Check if custom answer was added
          if (i == this.answersOnScreen.length - 1 && savedAnswer.HAS_CUSTOM_ANSWER) {
            this.multiple_choice_checkboxes[i] = true;
            this.multiple_choice_text = savedAnswer.ANSWER[y];
          }
        }
      }
    },

    /**
     * Fills questions of type radio with a given answer
     * @param {*} savedAnswer given answer
     */
    setRadioAnswer(savedAnswer) {
      //Tick the chosen radio box
      for (var i = 0; i < this.answersOnScreen.length; i++) {
        if (this.answersOnScreen[i].value == savedAnswer.ANSWER[0]) {
          this.radio = this.answersOnScreen[i].value;
        }
        if (savedAnswer.HAS_CUSTOM_ANSWER) {
          this.radio = this.answersOnScreen[i].value;
          this.radio_text = savedAnswer.ANSWER[0];
        }
      }
    }
  },
  //Update if question or user changes
  watch: {
    userID() {
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
