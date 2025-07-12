import api from '@/lib/axios';

const state = {
  callLogs: [],
  filter: {},
  pagination: {},
  callLog: null,
};

const mutations = {
  SET_CALL_LOGS(state, callLogs) {
    state.callLogs = callLogs;
  },
  SET_FILTER(state, filter) {
    state.filter = filter;
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = pagination;
  },
  START_CALL(state, contact) {
    state.callLog = contact;
  },
  END_CALL(state) {
    state.callLog = null;
  },
};

const actions = {
  setContacts({ commit }, callLogs) {
    commit('SET_CALL_LOGS', callLogs);
  },
  setFilter({ commit }, filter) {
    commit('SET_FILTER', filter);
  },
  setPagination({ commit }, pagination) {
    commit('SET_PAGINATION', pagination);
  },
  async fetchCallLogs({ commit, state }) {
    const response = await api.get('/call-logs', { params: state.filter });
    commit('SET_CALL_LOGS', response.data.data);
    commit('SET_PAGINATION', response.data.meta);
  },
  async startCall({ commit }, contact) {
    const response = await api.post('/call-logs', {contact_id:contact.id});
    commit('START_CALL', response.data.data);
  },
  endCall({ commit }) {
    commit('END_CALL');
  },
};

const getters = {
  callLogs: (state) => state.callLogs,
  currentFilter: (state) => state.filter,
  pagination: (state) => state.pagination,
  callLog: (state) => state.callLog,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
