<template>
  <VLoading :active="isLoading" />
  <div class="container">
    <div class="p-5">
      <div class="row row-cols-2 g-5">
        <template v-for="uItem in remoteArticles"
          :key="uItem.id">
          <div class="col" v-if="uItem.isPublic">
            <div class="card">
              <img :src="uItem.imageUrl" class="card-img-top" :alt="uItem.title">
              <div class="card-body">
                <h5 class="card-title">{{uItem.title}}</h5>
                <p class="card-text">{{uItem.description}}</p>
              </div>
              <div class="card-footer">
                <RouterLink :to="`/user/article/${uItem.id}`"
                class="btn btn-outline-primary">詳細內容</RouterLink>
              </div>
            </div>
          </div>
        </template>
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
      isLoading: false,
      remoteArticles: [],
    };
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    getArticlesData() {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/admin/articles`)
        .then((res) => {
          this.isLoading = false;
          // console.log('已取得', res); // eslint-disable-line no-console
          this.remoteArticles = res.data.articles;
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
    this.getArticlesData();
  },
};
</script>

<style lang="scss">
.card-img-top {
  height: 450px;
  object-fit: cover;
}
</style>
