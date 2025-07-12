import api from '@/lib/axios';

const state = {
  contacts: [],
  filter: {},
  pagination: {},
};

const mutations = {
  SET_CONTACTS(state, contacts) {
    state.contacts = contacts;
  },
  SET_FILTER(state, filter) {
    state.filter = filter;
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = pagination;
  },
};

const actions = {
  setContacts({ commit }, contacts) {
    commit('SET_CONTACTS', contacts);
  },
  setFilter({ commit }, filter) {
    commit('SET_FILTER', filter);
  },
  setPagination({ commit }, pagination) {
    commit('SET_PAGINATION', pagination);
  },
  async fetchContacts({ commit }) {
    const response = await api.get('/contacts', { params: state.filter });
    commit('SET_CONTACTS', response.data.data);
    commit('SET_PAGINATION', response.data.meta);
  },
};

const getters = {
  contacts: state => state.contacts,
  currentFilter: state => state.filter,
  pagination: state => state.pagination,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
