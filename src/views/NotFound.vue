<template>
  <VLoading :active="isLoading" />
  <div class="bgImage">
    <div class="container">
      <div class="p-5">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <h2 class="fw-bold text-center">404頁面</h2>
            <p class=" text-center mb-0">找不到此網頁唷!!!</p>
            <a href="#" @click.prevent="returnProduct"
            class="d-block text-center fs-3 fw-bold">
              回到後台產品
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    returnProduct() {
      this.$router.push('/admin/products');
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  },
};
</script>

<style lang="scss">
.bgImage {
  width: 100%;
  height: 100vh;
  background-image: url(https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-10996.jpg?t=st=1709311999~exp=1709315599~hmac=ff8bf60d0e489f0d0ea504dddad28b117dec12365b53844ae1d0d7ea1b5493bd&w=1024);
  background-size: cover;
  background-position: 50% 60%;
  background-repeat: no-repeat;
}
</style>
