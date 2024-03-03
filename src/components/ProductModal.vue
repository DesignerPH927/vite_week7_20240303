<template>
  <div class="modal fade" tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div v-if="isNew"
          class="modal-header bg-primary">
          <h1 class="modal-title fs-5 text-white
          fw-bold" id="exampleModalLabel">
          新增產品</h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div v-else
          class="modal-header bg-warning">
          <h1 class="modal-title fs-5 fw-bold"
            id="exampleModalLabel">編輯產品</h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label for="majorPhoto"
                class="form-label
                fw-bold fs-5">主要圖片</label>
                <input type="text"
                class="form-control"
                placeholder="請輸入圖片網址"
                id="majorPhoto"
                v-model="tempProductModal.imageUrl"
                ></div>
              <div class="mb-3">
                <label for="updateFile" class="form-label fw-bold fs-5">
                  或 上傳圖片
                </label>
                <input type="file" class="form-control" id="updateFile"
                ref="fileInput" @change="updateFile">
                <img :src="tempProductModal.imageUrl"
                :alt="tempProductModal.title"
                class="img-fluid
                mt-3">
              </div>
              <div class="my-4">
                <div class="card-title fw-bold
                fs-5">
                  多圖新增
                </div>
                <div v-if="Array.isArray(tempProductModal.imagesUrl)">
                  <template
                    v-for="(img, key) in tempProductModal.imagesUrl"
                    :key="img">
                    <input type="text"
                    class="form-control mb-2"
                    placeholder="請輸入圖片網址"
                    v-model="tempProductModal.imagesUrl[key]">
                    <img :src="img" :alt="tempProductModal.title"
                    class="img-fluid
                    mb-3">
                  </template>
                  <button
                    v-if="!tempProductModal.imagesUrl.length ||
                    tempProductModal.imagesUrl[tempProductModal.imagesUrl.length - 1]"
                    class="btn
                    btn-outline-primary
                    w-100 fw-bold"
                    type="button"
                    @click="tempProductModal.imagesUrl.push('')"
                  >新增圖片</button>
                  <button
                    v-else
                    class="btn
                    btn-outline-danger
                    w-100 fw-bold"
                    type="button"
                    @click="tempProductModal.imagesUrl.pop()"
                  >刪除圖片</button>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="mb-3">
                <label for="title"
                class="form-label fw-bold
                fs-5">
                  標題
                </label>
                <input type="text"
                class="form-control"
                placeholder="必填標題" id="title"
                v-model="tempProductModal.title"
                >
              </div>
              <div class="mb-4">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="category"
                    class="form-label
                    fw-bold fs-5">分類</label>
                    <input type="text"
                    class="form-control"
                    placeholder="必填分類"
                    id="category"
                    v-model="tempProductModal.category"
                    >
                  </div>
                  <div class="col-md-6">
                    <label for="unit"
                    class="form-label
                    fw-bold fs-5">單位</label>
                    <input type="text"
                    class="form-control"
                    placeholder="必填單位" id="unit"
                    v-model="tempProductModal.unit">
                  </div>
                  <div class="col-md-6">
                    <label for="originPrice"
                    class="form-label
                    fw-bold fs-5">原價</label>
                    <input type="number"
                    class="form-control"
                    placeholder="必填原價"
                    id="originPrice"
                    min="0"
                    v-model.number="tempProductModal.origin_price"
                    >
                  </div>
                  <div class="col-md-6">
                    <label for="price"
                    class="form-label
                    fw-bold fs-5">售價</label>
                    <input type="number"
                    class="form-control"
                    placeholder="必填售價"
                    id="price"
                    min="0"
                    v-model.number="tempProductModal.price"
                    >
                  </div>
                </div>
              </div>
              <div class="my-3">
                <hr>
              </div>
              <div class="mb-3">
                <label for="description"
                class="form-label
                fw-bold fs-5">產品描述</label>
                <textarea id="description" rows="2"
                class="form-control"
                v-model="tempProductModal.description"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label
                fw-bold fs-5">產品內容</label>
                <textarea id="content" rows="2"
                class="form-control"
                v-model="tempProductModal.content"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input type="checkbox"
                  class="form-check-input"
                  id="isEnabled"
                  v-model="tempProductModal.is_enabled"
                  :true-value="1"
                  :false-value="0"
                  >
                  <label for="isEnabled"
                  class="form-check-label
                  fw-bold">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal">
            取消</button>
          <button v-if="isNew"
            type="button" class="btn
            btn-primary fw-bold"
            @click="updateProduct(tempProductModal)"
            >新增確認</button>
          <button v-else
            type="button" class="btn
          btn-warning fw-bold"
          @click="updateProduct(tempProductModal)"
          >編輯確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import userToastMessageStore from '@/stores/toastStore';
import modalMixins from '../mixins/modalMixins';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ['isNew', 'tempProduct', 'updateProduct'],
  mixins: [modalMixins],
  data() {
    return {
      tempProductModal: {},
    };
  },
  watch: {
    tempProduct() {
      this.tempProductModal = this.tempProduct;
    },
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    updateFile() {
      // console.log('上傳圖片', this.$refs.fileInput.files[0]);
      const file = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file);

      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/admin/upload`, formData)
        .then((res) => {
          this.tempProductModal.imageUrl = res.data.imageUrl;
          this.$refs.fileInput.value = '';
          this.pushMessage({
            style: 'success',
            title: '圖片上傳成功',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '圖片上傳失敗',
            content: err.response.data.message,
          });
        });
    },
  },
};
</script>
