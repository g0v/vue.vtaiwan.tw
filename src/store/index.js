import Vue from 'vue'
import Vuex from 'vuex'
import fetch from 'isomorphic-fetch'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeProposalMetadata: null,
  },

  actions: {
    FETCH_PROPOSAL_METADATA ({commit}, proposalName) {
      // TODO: construct url using proposalName
      //
      const url = 'https://raw.githubusercontent.com/g0v/vue.vtaiwan.tw/feature/proposal-page/metadata.json';

      // promise should be returned so that it can be dispatched in preFetch()
      //
      return fetch(url)
        .then(res => res.json())
        .then(({proposal}) => commit('SET_PROPOSAL_METADATA', proposal))
    }
  },

  mutations: {
    SET_PROPOSAL_METADATA (state, metadata) {
      state.activeProposalMetadata = metadata
    },
  },

  getters: {
  }
})

export default store
