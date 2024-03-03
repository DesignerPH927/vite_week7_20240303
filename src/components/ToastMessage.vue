<template>
  <div class="toast-container position-fixed pe-3 top-8 end-5"
  style="z-index: 1500;">
    <div class="toast show" role="alert"
      aria-live="assertive"
      aria-atomic="true"
      v-for="(msg, key) in messages"
      :key="key"
      >
      <div class="toast-header">
        <i v-if="msg.style === 'success'"
          class="bi bi-check-circle-fill fs-4 me-2"
          :class="`text-${msg.style}`"
        ></i>
        <i v-else
          class="bi bi-x-circle-fill fs-4 me-2"
          :class="`text-${msg.style}`"
        ></i>
        <strong class="me-auto fw-bold">{{msg.title}}</strong>
        <button type="button" class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="clearToast(key)"
          ></button>
      </div>
      <div class="toast-body" v-if="msg.content">
        {{msg.content}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userToastMessage from '../stores/toastStore';

export default {
  computed: {
    ...mapState(userToastMessage, ['messages']),
  },
  methods: {
    ...mapActions(userToastMessage, ['clearToast']),
  },
};
</script>
