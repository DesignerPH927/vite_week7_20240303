<template>
  <VLoading :active="isLoading" />
  <div class="container-fluid">
    <div class="p-5">
      <div class="card">
        <div class="card-body px-5 py-4">
          <div class="d-flex
          justify-content-end mb-3">
            <button class="btn btn-primary
            fs-5 fw-bold"
            type="button"
            @click="openModal('new')"
            >新增產品</button>
          </div>
          <table class="table align-middle">
            <thead>
              <tr>
                <th width="250">分類</th>
                <th >產品名稱</th>
                <th width="150">原價</th>
                <th width="150">售價</th>
                <th width="150">是否啟用</th>
                <th width="150"
                class="text-center"
                >編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pItem in remoteData"
              :key="pItem.id">
                <th>{{pItem.category}}</th>
                <th>{{pItem.title}}</th>
                <td>{{pItem.origin_price}}</td>
                <td>{{pItem.price}}</td>
                <td>
                  <span v-if="pItem.is_enabled"
                  class="text-success"
                  >啟用</span>
                  <span v-else
                  class="text-danger"
                  >未啟用</span>
                </td>
                <td class="text-center">
                  <i class="bi bi-pencil-square
                  text-warning fs-2 fw-bold
                  me-3"
                  style="cursor:pointer"
                  @click="openModal('edit', pItem)"
                  ></i>
                  <i class="bi bi-x-square
                  text-danger fs-3 fw-bold"
                  style="cursor:pointer"
                  @click="openModal('delete', pItem)"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- pagination分頁 -->
          <PaginationComponent
          :pages="pages"
          @change-page="getProducts"
          :get-products="getProducts"
          ></PaginationComponent>
        </div>
      </div>
    </div>
  </div>
  <!-- productModal -->
  <ProductModal
    ref="pModal"
    :is-new="isNew"
    :temp-product="tempProduct"
    :update-product="updateProduct"
  ></ProductModal>
  <!-- delProductModal -->
  <DelModal
    ref="delModal"
    :temp-product="tempProduct"
    :del-product="delProduct"
  ></DelModal>
</template>

<script>
import { mapActions } from 'pinia';
import userToastMessageStore from '@/stores/toastStore';
import ProductModal from '@/components/ProductModal.vue';
import DelModal from '@/components/DelModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      isNew: false, // 辨別新、舊資料使用
      remoteData: [],
      tempProduct: {},
      pages: {}, // 建立分頁
    };
  },
  components: {
    ProductModal,
    DelModal,
    PaginationComponent,
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    // 注意：製作分頁時，/?page ← 這裡只能使用page，若是用別的名稱則不會動做
    getProducts(pages = 1) {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/admin/products/?page=${pages}`)
        .then((res) => {
          this.pushMessage({
            style: 'success',
            title: '成功取得產品資訊',
            content: res.data.message,
          });
          this.isLoading = false;
          this.remoteData = res.data.products;
          this.pages = res.data.pagination;
        })
        .catch((err) => {
          alert('未取得', err.response.data.message); // eslint-disable-line no-alert
        });
    },
    openModal(status, item) {
      // console.log(status, item);
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.$refs.pModal.show();
        this.isNew = true;
      } else if (status === 'edit') {
        this.tempProduct = { ...item };
        this.$refs.pModal.show();
        this.isNew = false;
      } else if (status === 'delete') {
        this.tempProduct = { ...item };
        this.$refs.delModal.show();
      }
    },
    updateProduct(item) {
      this.tempProduct = item;
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/product`;
      let http = 'post';
      let status = '新增產品';
      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
        http = 'put';
        status = '更新產品';
      }

      this.$http[http](url, { data: this.tempProduct })
        .then((res) => {
          // alert('已更新', res); // eslint-disable-line no-alert
          this.pushMessage({
            style: 'success',
            title: status,
            content: res.data.message,
          });
          this.$refs.pModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          // alert('未更新', err.response.data.message); // eslint-disable-line no-alert
          this.pushMessage({
            style: 'success',
            title: status,
            content: err.response.data.message,
          });
        });
    },
    delProduct() {
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          // alert('已刪除', res); // eslint-disable-line no-alert
          this.pushMessage({
            style: 'success',
            title: '刪除產品',
            content: res.data.message,
          });
          this.$refs.delModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          // alert('未刪除', err.response.data.message); // eslint-disable-line no-alert
          this.pushMessage({
            style: 'danger',
            title: '刪除產品',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
