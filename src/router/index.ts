import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '../components/Index.vue';
import AdminPage from '../components/Admin.vue';
import CartPage from '../components/Cart.vue';

const routes = [
  { path: '/', component: IndexPage },
  { path: '/admin', component: AdminPage },
  { path: '/cart', component: CartPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
