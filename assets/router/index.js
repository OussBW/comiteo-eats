import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/pages/home-page/home-page.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: HomePage, name: 'home-page' },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
