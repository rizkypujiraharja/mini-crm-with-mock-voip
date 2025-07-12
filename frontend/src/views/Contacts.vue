<template>
  <div class="w-full">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl">Contacts</h1>
      <FormFilter></FormFilter>
    </div>
    <div class="mt-4">
      <ContactsTable></ContactsTable>
    </div>
    <div class="mt-4" v-if="contacts.length">
      <a-pagination :current="pagination?.current_page" :total="pagination?.total" :pageSize="pagination?.per_page" @change="setPage" />
    </div>

    <a-modal
      :visible="callLog != null"
      :closable="false"
      :footer="null"
      :bodyStyle="{padding:0}"
    >
      <ModalCall v-if="callLog" :call="callLog" />
    </a-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import FormFilter from '../components/contacts/Filter.vue';
import ContactsTable from '../components/contacts/Table.vue';
import ModalCall from '../components/contacts/ModalCall.vue';

export default {
  data() {
    return {
    }
  },
  components: {
    FormFilter,
    ContactsTable,
    ModalCall
  },
  computed: {
    ...mapGetters("contacts", ["pagination", "contacts"]),
    ...mapGetters("callLogs", ["callLog"]),
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
    },
  }
};
</script>
