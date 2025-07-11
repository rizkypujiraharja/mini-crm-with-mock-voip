<template>
  <div class="w-full">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl">Contacts</h1>
      <FormFilter></FormFilter>
    </div>
    <div class="mt-4">
      <ContactsTable></ContactsTable>
    </div>
    <div class="mt-4" v-if="allContacts.length">
      <a-pagination :current="pagination?.current_page" :total="pagination?.total" :pageSize="pagination?.per_page" @change="setPage" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import FormFilter from '../components/contacts/Filter.vue';
import ContactsTable from '../components/contacts/Table.vue';

export default {
  data() {
    return {}
  },
  components: {
    FormFilter,
    ContactsTable
  },
  computed: {
    ...mapGetters("contacts", ["pagination", "allContacts", ]),
  },
  created() {
    const query = { ...this.$route.query };
    this.$store.dispatch("contacts/setFilter", query)
    this.$store.dispatch("contacts/fetchContacts");
  },
  methods: {
    setPage(page) {
      const query = { ...this.$route.query, page };
      this.$router.replace({query});
      this.$store.dispatch("contacts/setFilter", query)
      this.$store.dispatch("contacts/fetchContacts");
    }
  }
};
</script>
