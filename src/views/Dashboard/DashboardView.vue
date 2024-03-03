<template>
  <NavbarComponent></NavbarComponent>
  <div class="mt-5">
    <toastMessage></toastMessage>
    <RouterView v-if="status"></RouterView>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import userToastMessageStore from '@/stores/toastStore';

import toastMessage from '@/components/ToastMessage.vue';
import NavbarComponent from '@/components/NavbarComponent.vue';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      status: false,
    };
  },
  components: {
    toastMessage,
    NavbarComponent,
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    checkAdmin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)vite_week7\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = token;

      this.$http.post(`${VITE_URL}/api/user/check`)
        .then((res) => {
          // console.log('已驗證', res); // eslint-disable-line no-console
          this.pushMessage({
            style: 'success',
            title: '登入成功',
            content: res.data.message,
          });
          this.status = true;
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '驗證失敗',
            content: err.response.data.message,
          });
          this.$router.push('/');
        });
    },
  },
  mounted() {
    this.checkAdmin();
  },
};
</script>
