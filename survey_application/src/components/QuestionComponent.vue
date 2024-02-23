<template>
  <div id="MC_Question">
    <label>{{ question }}</label>
    <ul id="MC_true_list" v-show="MultipleChoice" style="padding-inline-start: 20px;">
      <li v-for="(answer, index) in answers" :key="index">
        <q-checkbox
          id="multiple_choice"
          right-label
          v-model="multiple_choice_checkboxes[index]"
          >{{ answer[0] }}</q-checkbox
        >
      </li>
      <q-input v-model="text" filled v-show="custom" dense/>
    </ul>
    <div id="MC_false_list" v-show="!MultipleChoice && !Text_answer">
      <q-option-group :options="answers" type="radio" v-model="radio" />
      <q-input v-model="text" filled v-show="custom" dense/>
    </div>
    <div id="Text_Answer" v-show="!MultipleChoice && Text_answer">
      <q-input v-model="text" filled type="textarea" />
    </div>
  </div>
  <div id="send_container" style="margin-top: 0%; margin-bottom: 10px">
    <q-btn id="btn_send" @click="onClick()" color="primary" label="Absenden" />
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  name: 'QuestionComponent',
  props: ['QuestionData'],
  data() {
    return {
      question: '',
      answers: [],
      MultipleChoice: ref(false),
      Text_answer: ref(false),
      radio: ref(null),
      text: ref(null),
      multiple_choice_checkboxes: [],
      custom: ref(false)
    };
  },
  methods: {
    onClick() {
      this.deconstructQuestionData(JSON.parse(this.QuestionData));
    },
    deconstructQuestionData(QuestionData) {
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
              var answer = ['Eigene Antwort: ']
              this.answers.push(answer);
              console.log(this.answers)
              this.custom = true;
              this.multiple_choice_checkboxes.push(false);
            }else{
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
            if (QuestionData.CQ==true) {
              var answer = {
                label: 'Eigene Antwort:',
                value: '',
              };
              this.answers.push(answer);
              this.custom = true;
              this.multiple_choice_checkboxes.push(false);
            }else{
              this.custom = false;
            }
          }
        }
      }
    },
  },
  watch: {
    QuestionData(newVal) {
      console.log('neu');
      this.deconstructQuestionData(JSON.parse(newVal));
    },
  },
};
</script>
