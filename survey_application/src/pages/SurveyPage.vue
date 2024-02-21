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
      </div>
      <div class="question_component"></div>
      <div id="question_fooder">
        <div id="navigation_buttons">
          <q-btn id="btn_prev" color="secondary" icon="" label="zurück" />
          <q-btn id="btn_next" color="secondary" icon-right="" label="weiter" />
        </div>
        <q-linear-progress
          :value="progress"
          color="info"
          class="q-mt-md"
          rounded
          size="10px"
        />
        <div id="send_container">
          <q-btn id="btn_send" color="primary" label="Absenden" />
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const progress = ref(0.4);

    return {
      progress,
      randomize() {
        progress.value = Math.random();
      },
    };
  },
};
</script>
