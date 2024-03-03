<template>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  ref="modal">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <h1 class="modal-title fs-5 text-white
        fw-bold" id="exampleModalLabel">訂單細節</h1>
        <button type="button" class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-4">
            <h3 class="fw-bold fs-3">用戶資料</h3>
            <table class="table align-middle">
              <tbody v-if="tempOrderModal.user">
                <tr>
                  <th style="width: 100px">姓名</th>
                  <td>{{ tempOrderModal.user.name }}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{{ tempOrderModal.user.email}}</td>
                </tr>
                <tr>
                  <th>電話</th>
                  <td>{{ tempOrderModal.user.tel }}</td>
                </tr>
                <tr>
                  <th>地址</th>
                  <td>{{ tempOrderModal.user.address }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-8">
            <div class="mb-3">
              <h3 class="fw-bold fs-3">訂單細節</h3>
              <table class="table align-middle">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempOrderModal.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ new Date(tempOrderModal.create_at * 1000).toLocaleDateString() }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrderModal.paid_date">
                        {{ new Date(tempOrderModal.paid_date * 1000).toLocaleDateString() }}
                      </span>
                      <span v-else>
                        時間不正確唷
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrderModal.is_paid"
                        class="text-success">已付款</strong>
                      <strong v-else
                        class="text-danger">未付款</strong>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ $filters.currency(tempOrderModal.total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mb-3">
              <h3 class="fw-bold fs-3">選購商品</h3>
              <table class="table align-middle">
                <tbody>
                  <tr v-for="item in tempOrderModal.products"
                  :key="item.id">
                    <th>{{item.product.title}}</th>
                    <td>{{item.qty}} / {{item.product.unit}}</td>
                    <td class="text-end">
                      {{ $filters.currency(item.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input"
                  id="paid" v-model="tempOrderModal.is_paid">
                  <label for="paid" class="form-check-label">
                    <span v-if="tempOrderModal.is_paid"
                      class="text-success">已付款</span>
                    <span v-else
                      class="text-danger">未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary"
          data-bs-dismiss="modal">取消</button>
        <button type="button"
        class="btn btn-primary"
        @click="orderDataUpdate(tempOrderModal)"
        >修改付款狀態</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import modalMixins from '../mixins/modalMixins';

export default {
  props: ['order', 'orderDataUpdate'],
  mixins: [modalMixins],
  data() {
    return {
      tempOrderModal: {},
    };
  },
  watch: {
    order() {
      this.tempOrderModal = this.order;
    },
  },
};
</script>
