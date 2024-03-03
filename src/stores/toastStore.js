import { defineStore } from 'pinia';

export default defineStore('toastStore', {
  state: () => ({
    messages: [],
  }),
  actions: {
    toastShow() {
      setTimeout(() => {
        this.messages.shift();
      }, 4000);
    },
    clearToast(index) {
      this.messages.splice(index, 1);
    },
    pushMessage(message) {
      const { style = 'success', title, content } = message;
      this.messages.push({
        style, title, content,
      });
      this.toastShow();
    },
  },
});
