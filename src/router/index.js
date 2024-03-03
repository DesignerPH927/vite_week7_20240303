import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: '登入頁',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/admin',
    name: '後台頁',
    component: () => import('@/views/Dashboard/DashboardView.vue'),
    children: [
      {
        path: 'products',
        name: '產品列表',
        component: () => import('@/views/Dashboard/ProductsView.vue'),
      },
      {
        path: 'orders',
        name: '訂單列表',
        component: () => import('@/views/Dashboard/OrdersView.vue'),
      },
      {
        path: 'coupons',
        name: '優惠卷',
        component: () => import('@/views/Dashboard/CouponsView.vue'),
      },
      {
        path: 'article',
        name: '貼文',
        component: () => import('@/views/Dashboard/ArticleView.vue'),
      },
    ],
  },
  {
    path: '/user',
    name: '使用者',
    component: () => import('@/views/Dashboard/DashboardView.vue'),
    children: [
      {
        path: 'articles',
        name: '使用者文章',
        component: () => import('@/views/Dashboard/UserArticles.vue'),
      },
      {
        path: 'article/:articleId',
        name: '單一使用者文章',
        component: () => import('@/views/Dashboard/UserArticle.vue'),
      },
      {
        path: 'cart',
        name: '購物車',
        component: () => import('@/views/Dashboard/UserCart.vue'),
      },
      {
        path: 'product/:productId',
        name: '單一產品',
        component: () => import('@/views/Dashboard/UserProduct.vue'),
      },
      {
        path: 'check/:checkId',
        name: '單一產品確認',
        component: () => import('@/views/Dashboard/UserCheck.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404頁面',
    component: () => import('@/views/NotFound.vue'),
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('../views/HomeView.vue'),
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/AboutView.vue'),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'textActive',
  routes,
});

export default router;
