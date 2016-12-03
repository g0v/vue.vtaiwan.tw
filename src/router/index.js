import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import HowToUse from '../components/HowToUse.vue'
import Intro from '../components/Intro.vue'
import Login from '../components/Login.vue'
import Track from '../components/Track.vue'
import Detail_Topic from '../components/Detail_Topic.vue'
import Detail_Catagory from '../components/Detail_Catagory.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: Home },
    { path: '/how-to-use', component: HowToUse },
    { path: '/intro', component: Intro },
    { path: '/login', component: Login },
    { path: '/track', component: Track },
    { path: '/topic/:tId', component: Detail_Topic },
    { path: '/topic/:tId/step/:sId', component: Detail_Topic },
    { path: '/catagory/:cId', component: Detail_Catagory }
  ]
})
