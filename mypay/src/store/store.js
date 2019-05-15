import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);



const state = {
  isPaid: false,
 
}


const getters = {
  getPaidMethod(state) {
    return state.isPaid;
  }
}


const actions = {
  paidMethod({
    commit
  }) {
    commit('changeIsPaid')
  }
}


const mutations = {
 changeIsPaid(state) {
    state.isPaid = true;
  }
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
