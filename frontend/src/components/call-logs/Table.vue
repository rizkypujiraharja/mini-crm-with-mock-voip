<template>
  <a-table
    :pagination="false"
    :columns="columns"
    :data-source="callLogs"
    :rowKey="(record) => record.id"
  >
    <div slot="contact" slot-scope="log">
      <div class="flex items-center space-x-4">
        <!-- Avatar placeholder -->
        <div class="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
          {{ initial(log.contact.name) }}
        </div>

        <!-- Contact Info -->
        <div>
          <div class="font-semibold text-gray-800 flex items-center">
            <a-icon
              v-if="log.contact.is_favourite"
              type="star"
              class="mr-2"
              theme="filled"
              :class="{ 'text-yellow-500': log.contact.is_favourite }"
            />
            {{ log.contact.name }}
          </div>
          <div class="text-xs text-gray-400">{{ log.company.name }}</div>
          <div class="text-xs text-gray-500">{{ log.phone }}</div>
        </div>
      </div>
    </div>

    <div slot="timestamp" slot-scope="log">
        {{ formatLocalTime(log.created_at) }}
    </div>

    <div slot="duration" slot-scope="log">
      {{ formattedDuration(log.duration_in_second) }}
    </div>

    <a-tag slot="status" slot-scope="status" :color="callLogStatuses[status].color">
      {{ callLogStatuses[status].label }}
    </a-tag>
  </a-table>
</template>

<script>
import { mapGetters } from "vuex";
import moment from 'moment';

import { callLogStatuses } from "@/lib/static";

export default {
  data() {
    return {
      callLogStatuses,
    };
  },
  computed: {
    ...mapGetters("callLogs", ["callLogs"]),
    columns() {
      return [
        {
          title: "Contact",
          key: "contact",
          scopedSlots: { customRender: "contact" },
        },
        {
          title: "Timestamp",
          key: "timestamp",
          scopedSlots: { customRender: "timestamp" },
        },
        {
          title: "Duration",
          key: "duration",
          scopedSlots: { customRender: "duration" },
        },
        {
          title: "Status",
          key: "status",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
      ];
    },
  },
  methods: {
    formattedDuration(durationInSeconds) {
      const duration = moment.duration(durationInSeconds, 'seconds');
      const minutes = String(duration.minutes()).padStart(2, '0');
      const seconds = String(duration.seconds()).padStart(2, '0');
      return `${minutes}:${seconds}`;
    },
    initial(name) {
      if (!name) return ''
      const words = name.trim().split(/\s+/) // pisahkan berdasarkan spasi
      const initials = words.slice(0, 2).map(word => word[0].toUpperCase()).join('')
      return initials
    },
    formatLocalTime(datetime) {
      return moment(datetime).local().format('YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>
