import api from '@/lib/axios';

const state = {
  token: localStorage.getItem('token') || '',
  user: null,
};

const mutations = {
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
};

const actions = {
  async login({ commit }, payload) {
    try {
      const response = await api.post('/auth/login', payload);
      const access_token = response.data.access_token;
      localStorage.setItem('token', access_token);
      commit('SET_TOKEN', access_token);

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
};

const getters = {
  isAuthenticated: state => !!state.token,
  getUser: state => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
