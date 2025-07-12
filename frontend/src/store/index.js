import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import contacts from './contacts';
import callLogs from './call-logs';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    contacts,
    callLogs
  },
});
