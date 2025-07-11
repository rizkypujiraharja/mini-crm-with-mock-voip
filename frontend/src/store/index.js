import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import contacts from './contacts';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    contacts
  },
});
