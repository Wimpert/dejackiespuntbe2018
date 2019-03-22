import Vue from 'vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import './assets/style.css'

import App from './App.vue'
import VueRouter from 'vue-router'


import Overview from './components/Overview.vue'
import Team from './components/Team.vue'
import MyTeamPicker from './components/MyTeamPicker.vue'
import Group from './components/Group.vue'

import dotenv from 'dotenv'
dotenv.config()

Vue.config.productionTip = false


Vue.use(VueMaterial);
Vue.use(VueRouter);



const routes = [
  { path: '/', component: Overview },
  { path: '/overview', component: Overview },
  { path: '/team', component: MyTeamPicker },
  { path: '/team/:id', name:'team', component: Team },
  { path: '/group/:id', component: Group, name: "group" },
  { path:'*', redirect: '/'}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
