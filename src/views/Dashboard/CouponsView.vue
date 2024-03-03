<template>
  <VLoading :active="isLoading" />
  <div class="container-fluid">
    <div class="p-5">
      <div class="card">
        <div class="card-body px-5 py-4">
          <div class="d-flex
          justify-content-end mb-3">
            <button class="btn btn-primary
            fs-5 fw-bold" type="button"
            @click="openModal('new')"
            >新增優惠卷</button>
          </div>
          <table class="table align-middle">
            <thead>
              <tr>
                <th width="250">名稱</th>
                <th width="150">折扣百分比</th>
                <th width="150">到期日</th>
                <th width="100">是否啟用</th>
                <th width="250" class="text-center">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="coupon in remoteCoupons"
              :key="coupon.id">
                <td>{{coupon.title}}</td>
                <td>{{coupon.percent}}</td>
                <td>2024/2/27</td>
                <td>
                  <span v-if="coupon.is_enabled"
                    class="text-success">啟用</span>
                  <span v-else
                    class="text-danger">未啟用</span>
                </td>
                <td class="text-center">
                  <i class="bi bi-pencil-square
                  text-warning fs-2 fw-bold
                  me-3"
                  style="cursor:pointer"
                  @click="openModal('edit', coupon)"
                  ></i>
                  <i class="bi bi-x-square
                  text-danger fs-3 fw-bold"
                  style="cursor:pointer"
                  @click="openModal('delete', coupon)"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
          <PaginationComponent
          :pages="pages"
          @change-page="getRemoteCoupons"
          :get-products="getRemoteCoupons"
          ></PaginationComponent>
        </div>
      </div>
    </div>
  </div>
  <!-- couponModal -->
  <CouponsModal
    ref="coupon"
    :status="status"
    :temp-coupons="tempCoupon"
    :update-data="updateData"
  ></CouponsModal>
  <!-- delModal -->
  <DelModal
    ref="delModal"
    :temp-Product="tempCoupon"
    :del-Product="delCoupon"
  ></DelModal>
</template>

<script>
import { mapActions } from 'pinia';
import userToastMessageStore from '@/stores/toastStore';
import CouponsModal from '@/components/CouponModal.vue';
import DelModal from '@/components/DelModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      remoteCoupons: [],
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
      status: false,
      pages: [],
    };
  },
  components: {
    CouponsModal,
    DelModal,
    PaginationComponent,
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    openModal(status, item) {
      // console.log(status, item); // eslint-disable-line no-console
      if (status === 'new') {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
        this.status = true;
        this.$refs.coupon.show();
      } else if (status === 'edit') {
        this.tempCoupon = {
          ...item,
        };
        this.status = false;
        this.$refs.coupon.show();
      } else if (status === 'delete') {
        this.tempCoupon = {
          ...item,
        };
        this.$refs.delModal.show();
      }
    },
    updateData(item) {
      this.tempCoupon = item;
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon`;
      let http = 'post';

      if (!this.status) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`;
        http = 'put';
      }

      this.$http[http](url, { data: this.tempCoupon })
        .then((res) => {
          // console.log('已更新', res); // eslint-disable-line no-console
          this.$refs.coupon.hide();
          this.getRemoteCoupons();
          this.pushMessage({
            style: 'success',
            title: '優惠券狀態',
            content: res.data.message,
          });
        })
        .catch((err) => {
          // console.log('未更新', err.response); // eslint-disable-line no-console
          this.pushMessage({
            style: 'danger',
            title: '優惠券狀態',
            content: err.response.data.message,
          });
        });
    },
    getRemoteCoupons(pages = 1) {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/admin/coupons?page=${pages}`)
        .then((res) => {
          // console.log('取得優惠卷', res); // eslint-disable-line no-console
          this.remoteCoupons = res.data.coupons;
          this.pages = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '取得優惠券',
            content: err.response.data.message,
          });
        });
    },
    delCoupon() {
      this.isLoading = true;
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`)
        .then((res) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '優惠卷狀態',
            content: res.data.message,
          });
          this.$refs.delModal.hide();
          this.getRemoteCoupons();
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '優惠卷狀態',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getRemoteCoupons();
  },
};
</script>
