import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import HowToUse from '../components/HowToUse.vue'
import Intro from '../components/Intro.vue'
import Detail_Topic from '../components/Detail_Topic.vue'
import contactus from '../components/ContactUs.vue'
import Search from '../components/app_navbar_search.vue'
import subscribe from '../components/Subscribe.vue'

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
    { path: '/topic/:tRouteName', 
      name: 'topic', 
      component: Detail_Topic },
    { path: '/topic/:tRouteName/step/:sId', 
      name: 'topic_step', 
      component: Detail_Topic },
    { path: '/contactus',  
      name: 'contactus', 
      component: contactus },
    { path: '/search',
      name: 'search',
      component: Search },
    { path: '/subscribe',
      name: 'subscribe',
      component: subscribe },
    { path: '/*',
      redirect: '/'
    }
  ]
})