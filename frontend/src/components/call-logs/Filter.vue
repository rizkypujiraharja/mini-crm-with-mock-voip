<template>
  <a-form layout="inline">
    <a-range-picker @change="dateChanged"/>
  </a-form>
</template>

<script>

import { mapGetters } from "vuex";
import debounce from "lodash.debounce";
import moment from "moment"

export default {
  data() {
    return {
      initialized: false,
      start_date: null,
      end_date:null,
    };
  },
  created() {
    const query = { ...this.$route.query };
    this.start_date = query.start_date
    this.end_date = query.end_date

    setTimeout(() => {
      this.initialized = true
    }, 700);
  },
  methods: {
    moment,
    dateChanged(range) {
      this.start_date = range[0].format('YYYY-MM-DD')
      this.end_date = range[1].format('YYYY-MM-DD')

      this.applyFilter()
    },
    applyFilter: debounce( function () {
      const query = {
        start_date: this.start_date,
        end_date: this.end_date,
      };
      if (this.initialized) {
        this.$router.replace({query});
        this.$store.dispatch("callLogs/setFilter", query)
        this.$store.dispatch("callLogs/fetchCallLogs");
      }
    }, 500)
  },
  computed: {
    ...mapGetters("callLogs", ["currentFilter"]),
  }
};
</script>

<style></style>
