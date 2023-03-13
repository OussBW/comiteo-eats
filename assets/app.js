import Vue from 'vue';
import InstantSearch from 'vue-instantsearch';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCartPlus, faShoppingCart, faTrash, faPlus, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';
import store from './store';
// custom filter
import { currencyFormat } from './filters';

import './styles.css';

library.add(faCartPlus, faShoppingCart, faTrash, faPlus, faMinus, faXmark);
Vue.component('FontAwesomeIcon', FontAwesomeIcon);
Vue.config.productionTip = false;

Vue.use(InstantSearch);
Vue.filter('currencyFormat', currencyFormat);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
