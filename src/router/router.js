import { createRouter, createWebHistory } from 'vue-router';

import Main from '@/pages/Main';
import PostsPage from '@/pages/PostsPage';
import PostPage from '@/pages/PostPage';
import PostsPageWithStore from '@/pages/PostsPageWithStore';
import About from '@/pages/About.vue';
import PostPageWithCompositionApiVue from '@/pages/PostPageWithCompositionApi.vue';

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/posts',
    component: PostsPage,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/posts/:id',
    component: PostPage,
  },
  {
    path: '/posts-with-store',
    component: PostsPageWithStore,
  },
  {
    path: '/composition-api',
    component: PostPageWithCompositionApiVue,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
