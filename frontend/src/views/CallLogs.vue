<template>
  <div class="w-full">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl">Call Logs</h1>
      <FormFilter></FormFilter>
    </div>
    <div class="mt-4">
      <CallLogsTable></CallLogsTable>
    </div>
    <div class="mt-4" v-if="callLogs.length">
      <a-pagination :current="pagination?.current_page" :total="pagination?.total" :pageSize="pagination?.per_page" @change="setPage" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import FormFilter from '../components/call-logs/Filter.vue';
import CallLogsTable from '../components/call-logs/Table.vue';

export default {
  data() {
    return {
    }
  },
  components: {
    FormFilter,
    CallLogsTable,
  },
  computed: {
    ...mapGetters("callLogs", ["callLogs", "pagination"]),
  },
  created() {
    const query = { ...this.$route.query };
    this.$store.dispatch("callLogs/setFilter", query)
    this.$store.dispatch("callLogs/fetchCallLogs");
  },
  methods: {
    setPage(page) {
      const query = { ...this.$route.query, page };
      this.$router.replace({query});
      this.$store.dispatch("callLogs/setFilter", query)
      this.$store.dispatch("callLogs/fetchCallLogs");
    },
  }
};
</script>
