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
            >新增貼文</button>
          </div>
          <table class="table align-middle">
            <thead>
              <tr>
                <th width="150">標題</th>
                <th width="150">作者</th>
                <th>描述</th>
                <th width="150">建立時間</th>
                <th width="150">是否公開</th>
                <th width="150" class="text-center">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="aItem in remoteArticle"
              :key="aItem.id">
                <td>{{aItem.title}}</td>
                <td>{{aItem.author}}</td>
                <td>{{aItem.description}}</td>
                <td>{{new Date(aItem.create_at * 1000)
                .toLocaleDateString()}}</td>
                <td>
                  <span v-if="aItem.isPublic"
                    class="text-success">已上架</span>
                  <span v-else
                    class="text-danger">未上架</span>
                </td>
                <td class="text-center">
                  <i class="bi bi-pencil-square
                  text-warning fs-2 fw-bold
                  me-3"
                  @click="openModal('edit', aItem)"
                  style="cursor:pointer"
                  ></i>
                  <!-- @click="getArticle(aItem.id)" -->
                  <i class="bi bi-x-square
                  text-danger fs-3 fw-bold"
                  style="cursor:pointer"
                  @click="openModal('delete', aItem)"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- articleModal -->
  <ArticleModal
    ref="article"
    :status="status"
    :temp-article="tempArticle"
    :update-article-modal="updateArticle"
  ></ArticleModal>
  <!-- delModal -->
  <DelModal
    ref="delModal"
    :temp-product="tempArticle"
    :del-product="delArticle"
  ></DelModal>
</template>

<script>
import { mapActions } from 'pinia';
import userToastMessageStore from '@/stores/toastStore';
import ArticleModal from '@/components/ArticleModal.vue';
import DelModal from '@/components/DelModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      status: false,
      remoteArticle: [],
      tempArticle: {},
    };
  },
  components: {
    ArticleModal,
    DelModal,
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    getArticles() {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/admin/articles`)
        .then((res) => {
          // console.log('已取得文章', res); // eslint-disable-line no-console
          this.isLoading = false;
          this.remoteArticle = res.data.articles;
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '失敗訊息',
            content: err.response.data.message,
          });
        });
    },
    // 為什麼要再取得單一文章，原因是因為內部有content這屬性，故必須再取得單一產品。
    getArticle(item) {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/admin/article/${item.id}`)
        .then((res) => {
          this.isLoading = false;
          this.tempArticle = { ...res.data.article };
          this.status = false;
          this.$refs.article.show();
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '取得單一文章失敗',
            content: err.response.data.message,
          });
        });
    },
    openModal(status, item) {
      if (status === 'new') {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: [],
        };
        this.status = true;
        this.$refs.article.show();
      } else if (status === 'edit') {
        this.getArticle(item);
      } else if (status === 'delete') {
        this.tempArticle = { ...item };
        this.$refs.delModal.show();
      }
    },
    // 當modal有資料變更並傳出時，就必須給參數才能正確地接收
    updateArticle(item) {
      this.tempArticle = item;
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/article`;
      let http = 'post';
      let info = '新增貼文';

      if (!this.status) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`;
        http = 'put';
        info = '更新貼文';
      }
      this.isLoading = true;
      this.$http[http](url, { data: this.tempArticle })
        .then((res) => {
          this.isLoading = false;
          this.$refs.article.hide();
          this.getArticles();
          this.pushMessage({
            style: 'success',
            title: info,
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.$refs.article.hide();
          this.isLoading = false;
          console.log('無法更新', err.response); // eslint-disable-line no-console
          this.pushMessage({
            style: 'danger',
            title: info,
            content: err.response.data.message,
          });
        });
    },
    delArticle() {
      this.isLoading = true;
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`)
        .then((res) => {
          this.isLoading = false;
          this.$refs.delModal.hide();
          this.getArticles();
          this.pushMessage({
            style: 'success',
            title: '刪除貼文',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.delModal.hide();
          this.pushMessage({
            style: 'danger',
            title: '刪除貼文',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>
