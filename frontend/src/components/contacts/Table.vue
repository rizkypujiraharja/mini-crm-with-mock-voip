<template>
  <a-table
    :pagination="false"
    :columns="columns"
    :data-source="allContacts"
    :rowKey="(record) => record.id"
  >
    <a-tag slot="role" slot-scope="text" :color="contactRoles[text].color">
      {{ contactRoles[text].label }}
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
    ...mapGetters("contacts", ["allContacts"]),
    columns() {
      return [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
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
      console.log(contact);
    },
  },
};
</script>
