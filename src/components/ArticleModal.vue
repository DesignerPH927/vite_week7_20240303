<template>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  ref="modal">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div v-if="status" class="modal-header bg-primary">
        <h1 class="modal-title fs-5 text-white fw-bold"
          id="exampleModalLabel">
          新增貼文
        </h1>
        <button type="button" class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"></button>
      </div>
      <div v-else class="modal-header bg-warning">
        <h1 class="modal-title fs-5 fw-bold"
          id="exampleModalLabel">
          編輯貼文
        </h1>
        <button type="button" class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-4">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input type="text" class="form-control"
              placeholder="請輸入標題" id="title"
              v-model="tempArticleModal.title">
            </div>
            <div class="mb-3">
              <label for="photo" class="form-label">輸入圖片網址</label>
              <input type="text" class="form-control"
              placeholder="請輸入圖片連結" id="photo"
              v-model="tempArticleModal.imageUrl">
            </div>
            <div class="mb-3">
              <label for="author" class="form-label">作者</label>
              <input type="text" class="form-control"
              placeholder="請輸入作者" id="author"
              v-model="tempArticleModal.author">
            </div>
            <div class="mb-3">
              <label for="articleDate" class="form-label">文章建立日期</label>
              <input type="date" class="form-control"
              v-model="create_at" id="articleDate">
            </div>
          </div>
          <div class="col-md-8">
            <div class="mb-3">
              <label for="tag" class="form-label">標籤</label>
              <div class="row gx-1">
                <div class="col-md-2" v-for="(label, key) in tempArticleModal.tag"
                :key="key">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control" id="tag"
                    v-model="tempArticleModal.tag[key]"
                    placeholder="請輸入標籤">
                    <button class="btn btn-outline-danger"
                    @click="tempArticleModal.tag.splice(key, 1)"
                    type="button">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
                <div v-if="!tempArticleModal.tag.length ||
                  tempArticleModal.tag[tempArticleModal.tag.length -1]"
                  class="col-md-2">
                  <button class="btn btn-outline-primary btn-sm w-100 fw-bold"
                  @click="tempArticleModal.tag.push('')"
                  type="button">
                    新增標籤
                  </button>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">文章描述</label>
              <textarea id="description" rows="3" class="form-control"
                v-model="tempArticleModal.description"
                placeholder="請輸入文章描述"></textarea>
            </div>
            <!-- ckEdit -->
            <div class="mb-3">
              <ckeditor :editor="editor" :config="editorConfig"
                v-model="tempArticleModal.content"
              ></ckeditor>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input type="checkbox" class="form-check-input"
                id="enable"
                v-model="tempArticleModal.isPublic"
                :true-value="true"
                :false-value="false"
                >
                <label for="enable" class="form-check-label">是否公開</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary"
          data-bs-dismiss="modal">取消</button>
        <button v-if="status" type="button"
          class="btn btn-primary"
          @click="updateArticleModal(tempArticleModal)"
          >確認</button>
        <button v-else type="button"
          class="btn btn-warning"
          @click="updateArticleModal(tempArticleModal)"
        >確認</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import modalMixins from '../mixins/modalMixins';

export default {
  props: ['status', 'tempArticle', 'updateArticleModal'],
  mixins: [modalMixins],
  data() {
    return {
      editor: ClassicEditor,
      // editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link'],
      },
      tempArticleModal: {
        tag: [''],
      },
      create_at: 0,
    };
  },
  watch: {
    tempArticle() {
      this.tempArticleModal = {
        ...this.tempArticle,
        tag: this.tempArticle.tag || [],
        isPublic: this.tempArticle.isPublic || false,
      };
      [this.create_at] = new Date(this.tempArticleModal.create_at * 1000)
        .toISOString().split('T');
    },
    create_at() {
      this.tempArticleModal.create_at = Math.floor(new Date(this.create_at) / 1000);
    },
  },
};
</script>

<style lang="scss">
.ck-editor__editable_inline {
  min-height: 300px;
}
</style>
