<template>
  <VLoading :active="isLoading" />
  <div class="container">
    <div class="p-3">
      <div class="row justify-content-center">
        <div class="col-8">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="chItem in order.products"
              :key="chItem.id">
                <td>{{chItem.product.title}}</td>
                <td>{{chItem.qty}}
                  {{chItem.product.unit}}</td>
                <td colspan="2" class="text-end">
                  {{chItem.total}}
                </td>
              </tr>
            </tbody>
          </table>
          <p class="text-end fw-bold">
            總計：{{order.total}}元
          </p>
          <div class="my-4">
            <hr>
          </div>
          <table class="table align-middle">
            <tbody>
              <tr>
                <th>Email</th>
                <td>{{order.user.email}}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{order.user.name}}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{order.user.tel}}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{order.user.address}}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="order.is_paid"
                    class="text-success fw-bold">已付款</span>
                  <span v-else
                    class="text-danger fw-bold">尚未付款</span>
                </td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-danger
          ms-auto d-block fw-bold"
          type="button"
          @click="payOrder"
          >確認付款</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions } from 'pinia';
import userToastMessageStore from '@/stores/toastStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      order: {
        user: {},
      },
      orderId: '',
    };
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    getOrder() {
      this.isLoading = true;
      // 以下為取這一筆訂單資訊，故要使用有id的order api
      this.$http(`${VITE_URL}/api/${VITE_PATH}/order/${this.orderId}`)
        .then((res) => {
          this.isLoading = false;
          this.order = res.data.order;
          // console.log('取得訂單', res); // eslint-disable-line no-console
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '取得訂單失敗',
            content: err.response.data.message,
          });
        });
    },
    payOrder() {
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/pay/${this.orderId}`)
        .then(() => {
          // console.log('已付款成功', res);
          this.getOrder();
          Swal.fire({
            icon: 'success',
            title: '付款成功',
            showConfirmButton: true,
          });
          setTimeout(() => {
            this.$router.push('/user/cart');
          }, 8000);
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '付款失敗',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.orderId = this.$route.params.checkId;
    this.getOrder();
  },
};
</script>
