<template>
  <VLoading :active="isLoading" />
  <div class="container-fluid">
    <div class="p-5">
      <div class="card">
        <div class="card-body px-5 py-4">
          <table class="table align-middle">
            <thead>
              <tr>
                <th width="250">購買時間</th>
                <th >Email</th>
                <th >購買款項</th>
                <th width="150">應付金額</th>
                <th width="150">是否付款</th>
                <th width="150">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="oItem in remoteOrdersData"
              :key="oItem.id">
                <td>{{new Date(oItem.create_at * 1000).toLocaleDateString()}}</td>
                <td>{{oItem.user.email}}</td>
                <td>
                  <ol>
                    <li v-for="item in oItem.products"
                    :key="item.id">
                      {{item.product.title}} 數量：{{item.qty}}
                      {{ item.product.unit }}
                    </li>
                  </ol>
                </td>
                <td>
                  {{oItem.total}}
                </td>
                <td>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :id="`switch${oItem.id}`"
                      v-model="oItem.is_paid"
                      @change="updateOrder(oItem)"
                    >
                    <label :for="`switch${oItem.id}`" class="form-check-label">
                      <span v-if="oItem.is_paid"
                        class="text-success">已付款</span>
                      <span v-else
                        class="text-danger">未付款</span>
                    </label>
                  </div>
                </td>
                <td>
                  <div class="d-flex gap-3">
                    <i style="cursor: pointer;"
                      class="fs-3 text-primary bi bi-calendar-check"
                      @click="openModal('check', oItem)"
                      ></i>
                    <i style="cursor: pointer;"
                      class="fs-3 text-danger bi bi-x-circle"
                      @click="openModal('delete', oItem)"
                      ></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <PaginationComponent
            :pages="pages"
            @change-page="getOrdersData"
            :get-products="getOrdersData"
          ></PaginationComponent>
        </div>
      </div>
    </div>
    <!-- orderModal -->
    <OrderModal
      ref="orderModal"
      :order="tempOrder"
      :order-data-update="updateOrder"
    ></OrderModal>
    <!-- delModal -->
    <DelModal
      ref="delModal"
      :temp-Product="tempOrder"
      :del-Product="delOrder"
    ></DelModal>
</div>
</template>

<script>
import { mapActions } from 'pinia';
import userToastMessageStore from '@/stores/toastStore';
import OrderModal from '@/components/OrderModal.vue';
import DelModal from '@/components/DelModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      remoteOrdersData: [],
      tempOrder: {},
      pages: [],
    };
  },
  components: {
    OrderModal,
    DelModal,
    PaginationComponent,
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    getOrdersData(pages = 1) {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${pages}`)
        .then((res) => {
          // console.log('已取得訂單資料：', res); // eslint-disable-line no-console
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '成功取得訂單資訊',
            content: res.data.message,
          });
          this.remoteOrdersData = res.data.orders;
          this.pages = res.data.pagination;
        })
        .catch((err) => {
          this.isLoading = false;
          // console.log('未取得訂單:', err.response); // eslint-disable-line no-console
          this.pushMessage({
            style: 'danger',
            title: '無法取得訂單資訊',
            content: err.response.data.message,
          });
        });
    },
    openModal(status, order) {
      if (status === 'check') {
        this.tempOrder = { ...order };
        this.$refs.orderModal.show();
      } else if (status === 'delete') {
        this.tempOrder = { ...order };
        this.$refs.delModal.show();
      }
    },
    updateOrder(item) {
      this.isLoading = true;
      const paid = {
        is_paid: item.is_paid,
      };
      this.$http.put(`${VITE_URL}/api/${VITE_PATH}/admin/order/${item.id}`, { data: paid })
        .then((res) => {
          this.isLoading = false;
          this.$refs.orderModal.hide();
          this.pushMessage({
            style: 'success',
            title: '更新付款狀態',
            content: res.data.message,
          });
          this.getOrdersData();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.orderModal.hide();
          this.pushMessage({
            style: 'danger',
            title: '錯誤訊息',
            content: err.response.data.message,
          });
        });
    },
    delOrder() {
      this.isLoading = true;
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`)
        .then(() => {
          this.isLoading = false;
          this.$refs.delModal.hide();
          this.getOrdersData();
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '錯誤訊息',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getOrdersData();
  },
};
</script>
