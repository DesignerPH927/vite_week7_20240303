<template>
  <VLoading :active="isLoading" />
  <div class="pt-3">
    <div class="container">
      <nav style="--bs-breadcrumb-divider:
        url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'
        width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z'
        fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/user/cart">購物車</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ product.title }}
          </li>
        </ol>
      </nav>
      <div class="row mt-5 gx-5">
        <div class="col-md-7">
          <h3 class="fw-bold">{{product.title}}</h3>
          <div v-if="product.content">內容：{{ product.content }}</div>
          <div v-if="product.description">描述：{{ product.description }}</div>
          <img :src="product.imageUrl" :alt="product.title" class="img-fluid mt-5">
        </div>
        <div class="col-md-5">
          <div v-if="product.origin_price === product.price">
            原價：{{ product.origin_price }} 元
          </div>
          <div v-else>
            <del class="text-muted">原價： {{ product.origin_price }} 元</del>
            <p>現在只要 {{ product.price }} 元</p>
          </div>
          <hr>
          <button class="btn btn-primary"
          @click="addToCart(product)"
          type="button">
          <span
            v-if="product.id === status.addToCartLoading"
            class="spinner-border
            spinner-border-sm"
            aria-hidden="true"></span>
          加入購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import userToastMessageStore from '@/stores/toastStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      product: {},
      id: '',
      status: {
        addToCartLoading: '',
      },
    };
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    getProduct() {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/product/${this.id}`)
        .then((res) => {
          this.isLoading = false;
          // console.log('單一產品', res);
          this.product = res.data.product;
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '失敗取得單一產品',
            content: err.response.data.message,
          });
        });
    },
    addToCart(product, qty = 1) {
      // this.isLoading = true;
      const productData = {
        product_id: product.id,
        qty,
      };
      // console.log(cartData, qty);
      this.status.addToCartLoading = product.id;
      this.$http
        .post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data: productData })
        .then((res) => {
          this.isLoading = false;
          this.status.addToCartLoading = '';
          this.pushMessage({
            style: 'success',
            title: '成功加入購物車',
            content: res.data.message,
          });
          this.$router.push('/user/cart');
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '加入購物車失敗',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.id = this.$route.params.productId;
    this.getProduct();
  },
};
</script>
