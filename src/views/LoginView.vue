<template>
  <VLoading :active="isLoading" />
  <toastMessage></toastMessage>
  <VForm action="#" class="mx-auto mt-5"
  style="width: 20rem"
  ref="form"
  v-slot="{ errors }" @submit="loginAdmin">
    <h3 class="fw-bold fs-3 text-center">請登入</h3>
    <div class="mb-3">
      <div class="form-floating">
        <VField
          id="email"
          name="email"
          type="email"
          class="form-control"
          rules="email|required"
          placeholder="Email Address"
          :class="{ 'is-invalid': errors['email'] }"
          v-model.trim="user.username"></VField>
          <error-message name="email" class="invalid-feedback"></error-message>
        <label for="email" class="form-label">
          Email Address
        </label>
      </div>
    </div>
    <div class="mb-3">
      <div class="form-floating">
        <VField
          id="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          rules="required"
          :class="{ 'is-invalid': errors['password'] }"
          v-model="user.password"></VField>
          <error-message name="password" class="invalid-feedback"></error-message>
        <label for="password" class="form-label">
          Password
        </label>
      </div>
    </div>
    <div class="mb-3">
      <div class="d-flex gap-3">
        <button class="btn btn-outline-secondary
        w-100 fw-bold" type="button"
        @click.prevent="resetLogin"
        >
          重置
        </button>
        <button class="btn btn-outline-primary
        w-100 fw-bold" type="submit">
          登入
        </button>
      </div>
    </div>
  </VForm>
</template>

<script>
import { mapActions } from 'pinia';
import toastMessage from '../components/ToastMessage.vue';
import userToastMessageStore from '../stores/toastStore';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      user: {
        username: '',
        password: '',
      },
    };
  },
  components: {
    toastMessage,
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    loginAdmin() {
      this.isLoading = true;
      this.$http.post(`${VITE_URL}/admin/signin`, this.user)
        .then((res) => {
          this.isLoading = false;
          // console.log('已登入', res); // eslint-disable-line no-console
          const { token, expired } = res.data;
          document.cookie = `vite_week7=${token}; expires=${new Date(expired)};`;
          this.$router.push('/admin/products');
        })
        .catch((err) => {
          // console.log('未登入', err.response); // eslint-disable-line no-console
          this.pushMessage({
            style: 'danger',
            title: '登入失敗',
            content: err.response.data.message,
          });
        });
    },
    resetLogin() {
      this.$refs.form.resetForm();
    },
  },
};
</script>
