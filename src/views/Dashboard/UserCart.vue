<template>
  <VLoading :active="isLoading" />
  <div class="container-fluid">
      <div class="py-5">
        <div class="card py-5 px-3">
          <div class="card-body">
            <!-- 產品、購物車列表 -->
            <div class="row">
              <!-- 產品列表 -->
              <div class="col-md-7">
                <table class="table align-middle
                text-center">
                  <thead>
                    <tr>
                      <th>商品圖片</th>
                      <th>商品名稱</th>
                      <th>商品價格</th>
                      <th>商品選項</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="pItem in remoteData"
                    :key="pItem.id">
                      <td style="width: 150px;">
                        <div
                        style="height: 100px;
                        background-size: cover;
                        background-position: center;"
                        :style="{'backgroundImage' :
                        `url(${pItem.imageUrl})`}"
                        ></div>
                      </td>
                      <td class="fw-bold">
                        {{pItem.title}}</td>
                      <td>
                        <div v-if="pItem.origin_price ==
                        pItem.price">
                          <p class="mb-0 fw-bold">
                            原價{{pItem.origin_price}}元
                          </p>
                        </div>
                        <div v-else>
                          <del class="mb-0
                          text-muted">
                            原價{{pItem.origin_price}}元
                          </del>
                          <p class="mb-0 fw-bold">
                            現在只要{{pItem.price}}元
                          </p>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex
                        justify-content-center">
                          <button class="btn fw-bold
                          btn-outline-success"
                          type="button"
                          @click="getProduct(pItem.id)"
                          >查看更多</button>
                          <button class="btn fw-bold
                          btn-outline-primary"
                          type="button"
                          @click="addToCart(pItem)">
                          <span
                          v-if="pItem.id ===
                          status.addToCartLoading"
                          class="spinner-border
                          spinner-border-sm"
                          aria-hidden="true"></span>
                          加入購物車</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 購物車列表 -->
              <div class="col-md-5">
                <table class="table align-middle text-center">
                  <thead>
                    <tr>
                      <th width="100">商品圖</th>
                      <th width="120">品名</th>
                      <th >數量</th>
                      <th width="120">單價</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="cItem in carts.carts"
                    :key="cItem.id">
                      <td style="width: 60px">
                        <div
                          style="height: 60px;
                          background-size: cover;
                          background-position: center;"
                          :style="{'backgroundImage' :
                          `url(${cItem.product.imageUrl})`}"
                        ></div>
                      </td>
                      <td>{{cItem.product.title}}</td>
                      <td>
                        <div class="d-flex flex-nowrap
                          justify-content-center">
                          <button
                          v-if="cItem.qty > 1"
                          class="btn
                          btn-outline-primary
                          shadow-none"
                          type="button"
                          @click="cItem.qty--;
                          changeQty(cItem,cItem.qty)"
                          >
                            <i class="bi bi-dash-lg"></i>
                          </button>
                          <button
                          v-else
                          class="btn
                          btn-outline-danger
                          shadow-none"
                          type="button"
                          @click="delCart(cItem.id)"
                          >
                            <i class="bi bi-trash-fill"></i>
                          </button>
                          <input type="number"
                          class="form-control
                          bg-transparent
                          shadow-none
                          text-center
                          text-end" readonly
                          v-model="cItem.qty"
                          >
                          <button
                          class="btn
                          btn-outline-primary
                          shadow-none"
                          type="button"
                          @click="cItem.qty++;
                          changeQty(cItem, cItem.qty)"
                          >
                            <i class="bi bi-plus-lg"></i>
                          </button>
                        </div>
                      </td>
                      <td class="text-end">
                        ${{cItem.total}}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr class="text-end fw-bold">
                      <td colspan="3">總價</td>
                      <td colspan="4">
                        {{carts.total}}元</td>
                    </tr>
                    <tr v-if="carts.final_total !==
                    carts.total"
                    class="text-success text-end
                    fw-bold">
                      <td colspan="3">優惠價</td>
                      <td colspan="4">
                        {{carts.final_total}}元</td>
                    </tr>
                  </tfoot>
                </table>
                <div class="row">
                  <div class="col-6">
                    <div class="input-group mb-3 input-group-sm">
                      <input type="text" class="form-control"
                      v-model="coupon_code" placeholder="請輸入優惠碼" />
                      <div class="input-group-append">
                        <button class="btn btn-outline-secondary"
                        type="button" @click="addCouponCode">
                          套用優惠碼
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <button class="btn
                      ms-auto
                      btn-outline-danger
                      d-block" type="button"
                      @click="delCarts">
                      <span
                      v-if="carts === status.delCartLoading"
                      class="spinner-border
                      spinner-border-sm"
                      aria-hidden="true"></span>
                      刪除全品項
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-5">
              <hr>
            </div>
            <!-- 表單驗證 -->
            <div class="mx-auto" style="width: 500px">
              <h3 class="fw-bold text-center">
                請填寫表單
              </h3>
              <VForm action="#" v-slot="{ errors }"
              @submit="onSubmit" ref="form">
                <div class="mb-3">
                  <label for="mail" class="form-label
                  fw-bold">
                    信箱
                  </label>
                  <VField
                    id="mail"
                    type="mail"
                    name="Email"
                    class="form-control"
                    placeholder="請輸入信箱"
                    rules="email|required"
                    v-model="form.user.email"
                    :class="{ 'is-invalid': errors['Email'] }"
                    ></VField>
                    <error-message name="Email"
                    class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                  <label for="name" class="form-label fw-bold">
                    姓名
                  </label>
                  <VField
                    id="name"
                    type="text"
                    name="Name"
                    class="form-control"
                    rules="required"
                    v-model="form.user.name"
                    placeholder="請輸入姓名"
                    :class="{ 'is-invalid': errors['Name'] }"
                    ></VField>
                    <error-message name="Name"
                    class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                  <label for="tel" class="form-label fw-bold">
                    電話
                  </label>
                  <VField
                    id="tel"
                    type="tel"
                    name="Telephone"
                    class="form-control"
                    :rules="isPhone"
                    v-model="form.user.tel"
                    :class="{ 'is-invalid': errors['Telephone'] }"
                    placeholder="請輸入電話"></VField>
                    <error-message name="Telephone"
                    class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label fw-bold">
                    地址
                  </label>
                  <VField
                    id="address"
                    name="Area"
                    class="form-control"
                    :class="{ 'is-invalid': errors['Area'] }"
                    placeholder="請輸入地區"
                    rules="required"
                    v-model="form.user.address"
                    as="select"
                    >
                    <option value="" selected disabled>請選擇地區</option>
                    <option value="台北市">台北市</option>
                    <option value="新北市">新北市</option>
                    <option value="桃園市">桃園市</option>
                    <option value="新竹市">新竹市</option>
                    <option value="台中市">台中市</option>
                  </VField>
                  <error-message name="Area"
                    class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                  <label for="message" class="form-label fw-bold">
                    留言
                  </label>
                  <VField
                  id="message"
                  rows="10"
                  name="Message"
                  class="form-control"
                  v-model="form.user.message"
                  as="textarea"
                  ></VField>
                  <error-message name="Message"
                    class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                  <div class="d-flex gap-2 justify-content-end">
                    <button class="btn btn-outline-secondary
                    w-25" type="button">取消</button>
                    <button class="btn btn-primary w-25"
                    type="submit">送出</button>
                  </div>
                </div>
              </VForm>
            </div>
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
      remoteData: [],
      tempProduct: {},
      carts: [],
      status: {
        addToCartLoading: '',
        delCartLoading: '',
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      coupon_code: '',
    };
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    getRemoteData() {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/products/all`)
        .then((res) => {
          // console.log('已取得產品', res);
          this.isLoading = false;
          this.remoteData = res.data.products;
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '取得產品資訊失敗',
            content: err.response.data.message,
          });
        });
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
    // 以下加入的是產品內容
    addToCart(product, qty = 1) {
      this.isLoading = true;
      const cartData = {
        product_id: product.id,
        qty,
      };
      this.status.addToCartLoading = product.id;
      // console.log(cartData);
      this.$http
        .post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data: cartData })
        .then((res) => {
          this.isLoading = false;
          this.status.addToCartLoading = '';
          this.pushMessage({
            style: 'success',
            title: '成功加入購物車',
            content: res.data.message,
          });
          this.getCarts();
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
    getCarts() {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/cart`)
        .then((res) => {
          this.isLoading = false;
          this.carts = res.data.data;
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '取得購物車資訊',
            content: err.response.data.message,
          });
        });
    },
    // 以下變更的是購物車內容
    changeQty(cart, qty = 1) {
      // console.log(cart, qty);
      this.isLoading = true;
      const cartData = {
        product_id: cart.product_id,
        qty,
      };
      // console.log(cartData);
      this.$http
        .put(`${VITE_URL}/api/${VITE_PATH}/cart/${cart.id}`, { data: cartData })
        .then((res) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '更新購物車',
            content: res.data.message,
          });
          this.getCarts();
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '更新購物車',
            content: err.response.data.message,
          });
        });
    },
    delCart(id) {
      // console.log(id);
      this.isLoading = true;
      this.$http
        .delete(`${VITE_URL}/api/${VITE_PATH}/cart/${id}`)
        .then((res) => {
          this.isLoading = false;
          this.getCarts();
          this.pushMessage({
            style: 'success',
            title: '移除購物車品項',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '移除購物車品項',
            content: err.response.data.message,
          });
        });
    },
    delCarts() {
      this.isLoading = true;
      this.status.delCartLoading = this.carts;
      this.$http
        .delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
        .then((res) => {
          this.isLoading = false;
          this.status.delCartLoading = '';
          this.getCarts();
          this.pushMessage({
            style: 'success',
            title: '清除購物車',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '清除購物車',
            content: err.response.data.message,
          });
        });
    },
    addCouponCode() {
      const couponCode = {
        code: this.coupon_code,
      };
      this.isLoading = true;
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/coupon`, { data: couponCode })
        .then((res) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '加入優惠券',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '加入優惠券',
            content: err.response.data.message,
          });
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
    onSubmit() {
      // console.log(this);
      this.isLoading = true;
      const sendData = this.form;
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/order`, { data: sendData })
        .then((res) => {
          // console.log('res:', res);
          this.isLoading = false;
          this.$refs.form.resetForm();
          this.$router.push(`/user/check/${res.data.orderId}`);
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '建立訂單',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getRemoteData();
    this.getCarts();
  },
};
</script>
