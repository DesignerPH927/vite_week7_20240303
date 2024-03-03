import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      modal: '',
    };
  },
  methods: {
    show() {
      this.modal.show();
    },
    hide() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
