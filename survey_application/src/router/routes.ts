import { RouteRecordRaw } from 'vue-router';

//TODO Add startpage
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      { path: '', component: () => import('pages/SurveyPage.vue') },
      { path: '/survey', component: () => import('pages/SurveyPage.vue') },
      { path: '/admin', component: () => import('pages/AdminPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
