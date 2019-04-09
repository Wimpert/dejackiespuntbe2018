import Vue from 'vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import './assets/style.css'

import App from './App.vue'
import VueRouter from 'vue-router'

import Team from './components/Team.vue'
import MyTeamPicker from './components/MyTeamPicker.vue'
import Group from './components/Group.vue'
import Round from './components/Round.vue'

import dotenv from 'dotenv'
dotenv.config()

Vue.config.productionTip = false


Vue.use(VueMaterial);
Vue.use(VueRouter);



const routes = [
  { path: '/team', component: MyTeamPicker },
  { path: '/team/:id', name:'team', component: Team },
  { path: '/group/:id?', component: Group, name: "group" },
  { path: '/round/:id?', component: Round, name: "round" },
  { path:'*', redirect: `/team${window.localStorage.getItem(process.env.VUE_APP_LOCALSTORAGE_TEAM_ID_KEY_NAME)?'/'+window.localStorage.getItem(process.env.VUE_APP_LOCALSTORAGE_TEAM_ID_KEY_NAME):''}`}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
