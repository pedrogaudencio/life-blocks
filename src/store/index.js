import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  state: {
    activities: null,
    event: null,
    lifeView: 'days'
  },
  getters: {},
  actions: {
    selectEvent({ commit }, event) {
      commit('SELECT_EVENT', event)
    },
    setLifeView({ commit }, view) {
      commit('SET_LIFE_VIEW', view)
    }
  },
  mutations: {
    SELECT_EVENT(state, event) {
      state.event = event
    },
    ADD_EVENT(state, event) {
      EventService.postEvent(event).then(() => {
        state.activities.push(event)
      })
    },
    UPDATE_EVENT(state, event) {

    },
    REMOVE_EVENT(state, event) {

    },
    SET_LIFE_VIEW(state, view) {
      state.lifeView = view
    }
  },
})
