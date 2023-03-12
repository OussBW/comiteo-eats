import Vue from 'vue';
import InstantSearch from 'vue-instantsearch';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
// custom filter
import { currencyFormat } from './filters';

import './styles.css';

Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.use(InstantSearch);
Vue.filter('currencyFormat', currencyFormat);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
