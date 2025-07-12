<template>
  <div class="w-full bg-gray-900 flex flex-col">
    <!-- Main content -->
    <div
      class="flex-1 flex flex-col items-center justify-center text-center px-8 mt-16"
    >
      <!-- Avatar -->
      <div
        class="w-32 h-32 bg-gray-700 rounded-full mb-8 flex items-center justify-center"
      >
       <div
        v-if="ringing"
        class="absolute inset-0 rounded-full border-4 border-green-400 animate-ping"
      ></div>
        <svg
          class="w-16 h-16 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <!-- Info -->
      <div class="mb-12">
        <h1 class="text-white text-3xl font-semibold mb-2">{{ call?.contact?.name }}</h1>
        <p class="text-gray-300 text-lg mb-1">{{ call?.phone }}</p>
        <p class="text-gray-400 text-base">{{ call?.company?.name }}</p>
      </div>

      <!-- Timer -->
      <div class="text-gray-300 text-lg mb-16">{{ timer }}</div>
    </div>

    <!-- Bottom controls -->
    <div class="pb-12">
      <div class="flex items-center justify-center space-x-16">
        <!-- Mute -->
        <button
          class="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
        >
          <svg
            class="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 10-2 2-2-2"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19v3"
            />
          </svg>
        </button>

        <!-- End Call -->
        <button
          class="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
          @click="closeModal"
        >
          <svg
            class="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </button>
      </div>
    </div>

    <audio ref="ringtone" src="/ringing.wav" loop></audio>
    <audio ref="successCall" src="/success-call.wav"></audio>
    <audio ref="failedCall" src="/failed-call.wav"></audio>
  </div>
</template>

<script>
export default {
  name: "VoipCall",
  data() {
    return {
      seconds: 0,
      interval: null,
      ringing: true,
    }
  },
  props: {
    call: {
      requred: true
    }
  },
  computed: {
    timer() {
      const min = String(Math.floor(this.seconds / 60)).padStart(2, "0");
      const sec = String(this.seconds % 60).padStart(2, "0");
      return `${min}:${sec}`;
    },
  },
  mounted() {
    this.$refs.ringtone.play().catch(() => {});
    setTimeout(() => {
      this.ringing = false;
      this.$refs.ringtone.pause();
      this.$refs.ringtone.currentTime = 0;
      console.log(this.call)
      if (this.call.status === "completed") {
        this.$refs.successCall.play().catch(() => {});
        this.interval = setInterval(() => {
          this.seconds++;
        }, 1000);
      } else {
        this.$refs.failedCall.play().catch(() => {});
        setTimeout(() => {
          this.closeModal();
        }, 1000);
      }
    }, 4000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    closeModal() {
      this.$store.dispatch("callLogs/endCall");
    },
  },
};
</script>
