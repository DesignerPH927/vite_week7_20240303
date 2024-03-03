<template>
  <div class="modal fade" tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h1 class="modal-title fs-5
          text-white"
            id="exampleModalLabel">刪除品項</h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <span class="text-danger fw-bold
          fs-5">
            {{tempProduct.title}}
          </span>
          <span class="text-danger fw-bold
          fs-5">
            (刪除後將無法恢復)
          </span>。
        </div>
        <div class="modal-footer">
          <button type="button"
            class="btn btn-secondary fw-bold"
            data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn
            btn-outline-danger"
            @click="delProduct"
            >刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixins from '../mixins/modalMixins';

export default {
  props: ['tempProduct', 'delProduct'],
  mixins: [modalMixins],
};
</script>
