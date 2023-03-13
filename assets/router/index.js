import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/pages/home-page/home-page.vue';
import CartPage from '../components/pages/cart-page/cart-page.vue';
import RestaurantDetailsPage from '../components/pages/restaurant-details-page/restaurant-details-page.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: HomePage, name: 'home-page' },
    { path: '/restaurants/:id', component: RestaurantDetailsPage, name: 'restaurant-details' },
    { path: '/cart', component: CartPage, name: 'cart-page' },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
