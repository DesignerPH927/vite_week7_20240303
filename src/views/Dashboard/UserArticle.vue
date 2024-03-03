<template>
  <VLoading :active="isLoading" />
  <div class="pt-3">
    <div class="container">
      <nav style="--bs-breadcrumb-divider:
        url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'
        width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z'
        fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/user/articles">部落格列表</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{article.title}}
          </li>
        </ol>
      </nav>
      <div class="row justify-content-center">
        <article class="col-md-8">
          <h2 class="fw-bold">{{article.title}}</h2>
          <p>
            <small class="text-muted me-3">{{new Date(article.create_at * 1000)
            .toLocaleDateString()}}</small>
            <small class="text-muted">作者：{{article.author}}</small>
          </p>
          <img :src="article.imageUrl" :alt="article.title"
          class="img-fluid mb-3">
          <p v-html="article.content"></p>
        </article>
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
      article: {},
      id: '',
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    getArticle() {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/admin/article/${this.id}`)
        .then((res) => {
          this.isLoading = false;
          // console.log('已取得單一貼文', res); // eslint-disable-line no-console
          this.article = res.data.article;
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '取得文章資訊失敗',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.id = this.$route.params.articleId;
    this.getArticle();
  },
};
</script>

<style lang="scss">
.active {
  color: #ff4a29 !important;
  font-weight: bold;
}
</style>
