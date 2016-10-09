import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Join from '../components/Join.vue'
import Live from '../components/Live.vue'
import Track from '../components/Track.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: Home },
    { path: '/join', component: Join },
    { path: '/live', component: Live },
    { path: '/track', component: Track }
  ]
})
