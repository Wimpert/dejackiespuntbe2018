import Vue from 'vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import App from './App.vue'
import VueRouter from 'vue-router'


import Overview from './components/Overview.vue'
import MyTeam from './components/MyTeam.vue'
import MyTeamPicker from './components/MyTeamPicker.vue'

import dotenv from 'dotenv'
dotenv.config()

Vue.config.productionTip = false


Vue.use(VueMaterial);
Vue.use(VueRouter);



const routes = [
  { path: '/', component: Overview },
  { path: '/overview', component: Overview },
  { path: '/my-team', component: MyTeamPicker },
  { path: '/my-team/:id', component: MyTeam },
  { path:'*', redirect: '/'}

]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
