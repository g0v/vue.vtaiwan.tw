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
    { path: '/', 
      name: 'home',
      component: Home },
    { path: '/how-to-use', 
      name: 'howTo',
      component: HowToUse },
    { path: '/intro', 
      name: 'intro', 
      component: Intro },
    { path: '/login', 
      name: 'login', 
      component: Login },
    { path: '/track', 
      name: 'track', 
      component: Track },
    { path: '/topic/:tRouteName', 
      name: 'topic', 
      component: Detail_Topic },
    { path: '/topic/:tRouteName/step/:sId', 
      name: 'topic_step', 
      component: Detail_Topic },
    { path: '/catagory/:cRouteName',  
      name: 'catagory', 
      component: Detail_Catagory }
  ]
})
