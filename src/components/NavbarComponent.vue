<template>
  <VLoading :active="isLoading" />
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">後台頁面</a>
      <button class="navbar-toggler" type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/admin/products" class="nav-link">產品</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/orders" class="nav-link">訂單</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/coupons" class="nav-link">優惠卷</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/article" class="nav-link">貼文</RouterLink>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout">登出</a>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink to="/user/articles" class="nav-link">Blog</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/user/cart" class="nav-link">購物車</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'pinia';
import userToastMessageStore from '@/stores/toastStore';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    logout() {
      this.isLoading = true;
      this.$http.post(`${VITE_URL}/logout`)
        .then((res) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '登出成功',
            content: res.data.message,
          });
          this.$router.push('/');
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '登出失敗',
            content: err.response.data.message,
          });
        });
    },
  },
};
</script>

<style lang="scss">
.textActive {
  font-weight: bold;
  color: #0e3 !important;
}
</style>
