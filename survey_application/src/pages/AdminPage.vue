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
    <body>
      <q-dialog v-model="alert_confirm">
        <q-card>
          <q-card-section>
            <div class="text-h6">Sind Sie mit dieser Frage zufrieden?</div>
          </q-card-section>

          <q-card-section>
            <question-component
              :QuestionData="QuestionData"
              :user-i-d="-1"
              :is-interactible="false"
            ></question-component>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="OK"
              color="primary"
              v-close-popup
              @click="confirmQuestion()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div id="new_question_container">
        <div id="new_question_input">
          <q-form>
            <div class="q-pa-md q-gutter-sm">
              <q-banner
                id="failed_alert"
                inline-actions
                dense
                class="bg-negative text-white"
                v-show="failed_model"
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
            <div class="q-pa-md">
              <div id="question_type_container" class="q-gutter-md">
                <q-select
                  id="question_type"
                  @update:model-value="onTypeChanged($event)"
                  v-model="model"
                  :options="options"
                  label="Typ:"
                  :rules="[(val) => val.length > 0]"
                />
              </div>
              <div id="question_container">
                <span class="label">Frage:</span>
                <q-input
                  id="question_text_input"
                  filled
                  v-model="question_text"
                  label="Filled"
                  :rules="[(val) => val.length > 0 && val.length < 400]"
                />
              </div>
              <q-slide-transition>
                <div v-show="visible">
                  <div
                    id="answer_container"
                    class="form-group"
                    v-for="(answer, k) in answers"
                    :key="k"
                  >
                    <span class="label">Antwort:</span>
                    <div id="answer_line">
                      <q-input
                        id="answer_input"
                        ref="answerRef"
                        @input="handleInput($event)"
                        class="form-control"
                        v-model="answer.text"
                        label="Filled"
                        type="text"
                        :rules="[(val) => val.length > 0 && val.length < 200]"
                      />

                      <span>
                        <!--Button to add answers. Add button only allows a maximun of 10 answers, not including the custom answer.-->
                        <q-btn
                          @click="addAnwser()"
                          v-show="k == answers.length - 1 && k < 9"
                          >+</q-btn
                        >
                        <!--Button to remove answers.-->
                        <q-btn
                          @click="removeAnswer(k)"
                          v-show="k || (!k && answers.length > 2)"
                          >-</q-btn
                        >
                      </span>
                    </div>
                  </div>
                  <div id="multiple_choice_container">
                    <q-checkbox
                      id="multiple_choice"
                      left-label
                      v-model="multiple_choice_checkbox"
                      label="Mehrere Antworten möglich?"
                    />
                  </div>
                  <div id="custon_answer_container">
                    <q-checkbox
                      id="custom_question"
                      left-label
                      v-model="custom_question_checkbox"
                      label="Eigene Antwort hinzufügen?"
                    />
                  </div>
                </div>
              </q-slide-transition>
              <div id="submit_container">
                <q-btn @click="onSubmit()" color="secondary" type="submit">Absenden</q-btn>
                <q-btn @click="onReset()" color="negative" type="reset">Zurücksetzen</q-btn>
              </div>
              <div>
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </body>
    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list> </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import QuestionComponent from 'src/components/QuestionComponent.vue';

var leftDrawerOpen = ref(false);
const first_ID = 1;
var curr_id = first_ID;
var type_options = ['Auswahlfrage', 'Textfrage'];
var dialog_text = [
  'Ein unbekannter Fehler ist aufgetreten, bitte versuchen Sie es erneut.',
  'Bitte wählen Sie einen Fragen-Typ aus.',
  'Bitte Geben Sie eine Frage ein.',
  'Bitte Geben Sie mindesten 2 Antworten an.',
  'Die Antworten dürfen nicht leer oder zu lange sein.',
  'Frage erfolgreich hinzugefügt!',
];
var current_dialog = 0;
var is_failed_visible = false;

var QuestionData = ref('');

export default {
  components: {
    QuestionComponent,
  },
  //Add a second answer-prompt when the page is loaded, to signal users there have to be at least 2 anwers
  beforeMount() {
    this.addAnwser();
  },
  //Sets values to default when the page is loaded
  setup() {
    return {
      leftDrawerOpen,
      model: ref(''),
      options: ['Auswahlfrage', 'Textfrage'],
      multiple_choice_checkbox: ref(false),
      question_text: ref(''),
      custom_question_checkbox: ref(false),
      visible: ref(true),
      alert_confirm: ref(false),
      failed_model: ref(is_failed_visible),
      DialogTextRef: ref(''),
      QuestionData: QuestionData,
    };
  },
  //Inherits the current answers
  data() {
    return {
      answers: [
        {
          text: '',
        },
      ],
    };
  },
  methods: {
    //Changes the state of the left drawer
    toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    },
    //Changes visibility according to question-type
    onTypeChanged(selectedType) {
      if (selectedType == 'Textfrage') {
        this.visible = false;
      } else {
        this.visible = true;
      }
    },
    //Adds a new answer to array, which also adds a new answer prompt
    addAnwser() {
      this.answers.push({ text: '' });
    },
    //Removes an answer from array, which also removes an answer prompt
    removeAnswer(index) {
      this.answers.splice(index, 1);
    },
    //Spawnes the verification popup or a failed alert on submit, depending on validation of data
    onSubmit() {
      QuestionData.value = this.buildQuestion(
        this.model,
        this.question_text,
        this.answers,
        this.multiple_choice_checkbox,
        this.custom_question_checkbox
      );
      if (QuestionData.value == null) {
        this.DialogTextRef = dialog_text[current_dialog];
        this.failed_model = true;
      } else {
        this.alert_confirm = true;
      }
    },

    onReset(){
      this.type = '';
      this.question_text = null;
      this.answers = [{
          text: '',
        },];
      this.addAnwser();
      this.multiple_choice_checkbox = false;
      this.custom_question_checkbox = false;
    },

    /**
     * Handles saving the question if confirmed
     */
    confirmQuestion() {
      this.updateID();
      window.localStorage.setItem('Q' + curr_id, QuestionData.value);
      curr_id++;
    },

    /**
     * Closes the failed banner
     */
    closeFailedAlert() {
      this.failed_model = false;
    },

    /**
     * Adds text into the answers array
     * @param {*} event
     */
    handleInput(event) {
      answers.push(event);
    },

    /**
     * Makes sure the current QuestionID is the next free ID, to prevent storage issues
     */
     updateID() {
      if (window.localStorage.length > 1) {
        curr_id = first_ID;
        for (var i = 1; i <= localStorage.length; i++) {
          if (localStorage.getItem('Q' + i)) {
            curr_id++;
          }
        }
      }
    },

    /**
     * Builds and return a JSON containing all the question data, or null if the data is not valid.
     * @param {string} type Question type, needs to be an entry of "type_options" array
     * @param {string} question The question itself
     * @param {string[]} answers Array of answers, not needed for every type of question
     * @param {bool} multiple_choice Bool wether the question is multiple choice
     * @param {bool} custom_question Bool wether the question has a custom answer option
     */
    buildQuestion(
      type,
      question,
      answers,
      multiple_choice,
      custom_question
    ) {
      if (this.validateData(type, question, answers, custom_question)) {
        this.updateID();
        //Build JSON based on questiontype
        if (type == type_options[1]) {
          //Build JSON containing question data
          const data = JSON.stringify({
            ID: curr_id,
            TYP: type,
            QUESTION: question,
          });
          return data;
        } else {
          //Extract answers into a simpler array, for easier access
          var ans = [];
          for (var i = 0; i < answers.length; i++) {
            ans[i] = answers[i].text;
          }
          //Build JSON containing question data
          const data = JSON.stringify({
            ID: curr_id,
            TYP: type,
            MC: multiple_choice,
            CQ: custom_question,
            QUESTION: question,
            answers: ans,
          });
          return data;
        }
      } else {
        //Return null if validation failed
        return null;
      }
    },

    /**
     * The function validates the input data of the form and sets the appropriate error message if necessary
     *
     * @param {String} type Question type, needs to be an entry of "type_options" array
     * @param {String} question The Question itself, can't be empty
     * @param {String[]} answers Answers for the question, if the question is multiple-choice-type, they cant be empty and there must be at least 2
     * @param {bool} custom_question Bool to determine, wether the question has the option to add a custom answer
     */
    validateData(type, question, answers, custom_question) {
      if (
        this.validateType(type) &&
        this.validateQuestion(question) &&
        this.validateAnswers(type, answers, custom_question)
      ) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * Validates the question-type, returns false and sets the appropriate error message if necessary
     * @param {*} type Question type, needs to be an entry of "type_options" array
     */
    validateType(type) {
      var temp_verification = false;
      for (var i = 0; i < type_options.length; i++) {
        if (type == type_options[i]) {
          temp_verification = true;
        }
      }
      if (temp_verification == false) {
        current_dialog = 1;
        return false;
      } else {
        return true;
      }
    },

    /**
     * Validates the question, returns false and sets the appropriate error message if necessary
     * @param {*} question Question itself, can't be empty
     */
    validateQuestion(question) {
      if (question == '') {
        current_dialog = 2;
        return false;
      } else {
        return true;
      }
    },

    /**
     * Validates the answers, returns false and sets the appropriate error message if necessary
     * @param {*} type Question-type, to check if the question needs answers
     * @param {*} answers Answers for the question, if the question is multiple-choice-type, they cant be empty and there must be at least 2
     */
    validateAnswers(type, answers, custom_question) {
      //Dont check text-questions
      if (type == type_options[1]) {
        return true;
      }
      //Check every answer for input
      for (var i = 0; i < answers.length; i++) {
        if (type == type_options[0] && (answers[i].text == '' || answers[i].text.length > 200)) {
          current_dialog = 4;
          return false;
        }
      }
      //Check if there are at least 2 answers
      if (
        type == type_options[0] &&
        (answers.length >= 2 || (answers.length >= 1 && custom_question))
      ) {
        return true;
      } else {
        current_dialog = 3;
        return false;
      }
    },
  },
};
</script>
