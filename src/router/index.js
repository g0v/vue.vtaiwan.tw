import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Join from '../components/Join.vue'
import Comment from '../components/Comment.vue'
import Live from '../components/Live.vue'
import Track from '../components/Track.vue'
import Proposal from '../components/Proposal/index.vue'
import ProposalDetail from '../components/Proposal/Detail.vue'
import ProposalTimeline from '../components/Proposal/Timeline.vue'
import ProposalDiscuss from '../components/Proposal/Discuss.vue'
import ProposalNext from '../components/Proposal/Next.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: Home },
    { path: '/join', component: Join },
    { path: '/comment', component: Comment },
    { path: '/live', component: Live },
    { path: '/track', component: Track },
    { path: '/proposals/:code', component: Proposal, children: [
      { path: '', component: ProposalDetail },
      { path: 'timeline', component: ProposalTimeline },
      { path: 'discuss', component: ProposalDiscuss },
      { path: 'next', component: ProposalNext },
    ] }
  ]
})
