import Vue from "vue"
import Vuex from "vuex"
import ActivityService from '@/services/ActivityService'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  state: {
    activities: null,
    activity: null
  },
  getters: {},
  actions: {
    selectActivity({ commit }, activity) {
      commit('SELECT_ACTIVITY', activity)
    }
  },
  mutations: {
    SELECT_ACTIVITY(state, activity) {
      state.activity = activity
    },
    ADD_ACTIVITY(state, activity) {
      ActivityService.postActivity(activity).then(() => {
        state.activities.push(activity)
      })
    },
    UPDATE_ACTIVITY(state, activity) {

    },
    REMOVE_ACTIVITY(state, activity) {

    }
  },
})
