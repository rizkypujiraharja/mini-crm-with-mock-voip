<template>
  <a-form layout="inline">
    <a-form-item>
      <a-input placeholder="Company Name" v-model="company" />
    </a-form-item>
    <a-form-item>
      <a-select
        show-search
        placeholder="Select a role"
        option-filter-prop="children"
        style="width: 200px"
        v-model="role"
      >
        <a-select-option value="">All Role</a-select-option>
        <a-select-option v-for="role, key in contactRoles" :key="key" :value="key"> {{ role.label }} </a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script>

import { mapGetters } from "vuex";
import debounce from "lodash.debounce";
import { contactRoles } from "@/lib/static"

export default {
  data() {
    return {
      contactRoles,
      company: '',
      role: '',
      initialized: false,
    };
  },
  watch: {
    company: "applyFilter",
    role: "applyFilter",
  },
  created() {
    const query = { ...this.$route.query };
    this.company = query.company
    this.role = query.role
    setTimeout(() => {
      this.initialized = true
    }, 700);
  },
  methods: {
    applyFilter: debounce( function () {
      const query = {
        company: this.company,
        role: this.role,
      };
      if (this.initialized) {
        this.$router.replace({query});
        this.$store.dispatch("contacts/setFilter", query)
        this.$store.dispatch("contacts/fetchContacts");
      }
    }, 500)
  },
  computed: {
    ...mapGetters("contacts", ["currentFilter"]),
  }
};
</script>

<style></style>
