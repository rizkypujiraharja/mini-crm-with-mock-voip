<template>
  <a-table
    :pagination="false"
    :columns="columns"
    :data-source="contacts"
    :rowKey="(record) => record.id"
  >
    <div slot="name" slot-scope="contact" class="flex items-center">
      <a-icon
        type="star"
        class="mr-2 cursor-pointer"
        :theme="contact.is_favourite ? 'filled' : 'outlined'"
        :class="{ 'text-yellow-500': contact.is_favourite }"
        @click="toggleFavourite(contact)"
      />
      <div>{{ contact.name }}</div>
    </div>
    <a-tag slot="role" slot-scope="role" :color="contactRoles[role].color">
      {{ contactRoles[role].label }}
    </a-tag>
    <a-button
      slot="action"
      slot-scope="contact"
      class="flex items-center"
      type="primary"
      icon="phone"
      @click="call(contact)"
    >
      Call
    </a-button>
  </a-table>
</template>

<script>
import { mapGetters } from "vuex";
import { contactRoles } from "@/lib/static";

export default {
  data() {
    return {
      contactRoles,
    };
  },
  computed: {
    ...mapGetters("contacts", ["contacts"]),
    columns() {
      return [
        {
          title: "Name",
          key: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Company",
          dataIndex: "company.name",
          key: "company.name",
        },
        {
          title: "Role",
          key: "role",
          dataIndex: "role",
          scopedSlots: { customRender: "role" },
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" },
        },
      ];
    },
  },
  methods: {
    call(contact) {
      this.$store.dispatch("callLogs/startCall", contact);
    },
    toggleFavourite(contact) {
      this.$store.dispatch("contacts/toggleFavourite", contact);
    }
  },
};
</script>
