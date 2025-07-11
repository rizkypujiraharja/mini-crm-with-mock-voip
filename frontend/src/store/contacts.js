import api from '@/lib/axios';

const state = {
  contacts: [],
  filter: {},
  pagination: {},
  selectedContact: {},
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
  SET_SELECTED_CONTACT(state, contact) {
    state.selectedContact = contact;
  },
  RESET_SELECTED_CONTACT(state) {
    state.selectedContact = {};
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
  selectContact({ commit }, contact) {
    commit('SET_SELECTED_CONTACT', contact);
  },
  clearSelectedContact({ commit }) {
    commit('RESET_SELECTED_CONTACT');
  },
  async fetchContacts({ commit }) {
    const response = await api.get('/contacts', { params: state.filter });
    commit('SET_CONTACTS', response.data.data);
    commit('SET_PAGINATION', response.data.meta);
  },
};

const getters = {
  allContacts: state => state.contacts,
  currentFilter: state => state.filter,
  pagination: state => state.pagination,
  selectedContact: state => state.selectedContact,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
