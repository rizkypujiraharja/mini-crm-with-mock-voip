import Vue from 'vue';
import Vuex from 'vuex';
import api from '../axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.token = '';
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const response = await api.post('/auth/login', payload);
        const access_token = response.data.access_token;
        localStorage.setItem('token', access_token);
        commit('SET_TOKEN', access_token);
        // opsional: get profile
        const user = response.data.user;
        commit('SET_USER', user);
        return true;
      } catch (error) {
        return false;
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('LOGOUT');
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user,
  },
});
