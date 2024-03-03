<template>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  ref="modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div v-if="status"
        class="modal-header bg-primary">
        <h1 class="modal-title fs-5 text-white"
        id="exampleModalLabel">新增優惠卷</h1>
        <button type="button" class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"></button>
      </div>
      <div v-else
        class="modal-header bg-warning">
        <h1 class="modal-title fs-5"
        id="exampleModalLabel">編輯優惠卷</h1>
        <button type="button" class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="title" class="form-label">標題</label>
          <input type="text" class="form-control"
          placeholder="請輸入標題" id="title"
          v-model="tempCouponsModal.title"
          >
        </div>
        <div class="mb-3">
          <label for="coupon" class="form-label">優惠碼</label>
          <input type="text" class="form-control"
          placeholder="請輸入優惠碼" id="coupon"
          v-model="tempCouponsModal.code"
          >
        </div>
        <div class="mb-3">
          <label for="date" class="form-label">到期日</label>
          <input type="date" class="form-control" id="date"
          v-model="due_date">
        </div>
        <div class="mb-3">
          <label for="percent" class="form-label">折扣百分比</label>
          <input type="number" class="form-control" id="percent" min="0"
          placeholder="請輸入折扣百分比"
          v-model.number="tempCouponsModal.percent"
          >
        </div>
        <div class="mb-2">
          <div class="form-check">
            <input type="checkbox" class="form-check-input"
            id="enabled"
            v-model="tempCouponsModal.is_enabled"
            :true-value="1"
            :false-value="0"
            >
            <label for="enabled" class="form-check-label">
              是否啟用
            </label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary"
          data-bs-dismiss="modal">關閉</button>
        <button v-if="status" type="button"
          class="btn btn-outline-primary"
          @click="updateData(tempCouponsModal)"
          >新增優惠卷</button>
          <button v-else type="button"
          class="btn btn-outline-warning"
          @click="updateData(tempCouponsModal)"
          >編輯優惠卷</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import modalMixins from '../mixins/modalMixins';

export default {
  props: ['status', 'tempCoupons', 'updateData'],
  mixins: [modalMixins],
  data() {
    return {
      tempCouponsModal: {},
      due_date: '',
    };
  },
  watch: {
    tempCoupons() {
      this.tempCouponsModal = this.tempCoupons;
      const dateAndTime = new Date(this.tempCouponsModal.due_date * 1000)
        .toISOString().split('T');
      [this.due_date] = dateAndTime;
    },
    due_date() {
      this.tempCouponsModal.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
};
</script>
