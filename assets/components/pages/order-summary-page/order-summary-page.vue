<template>
    <div class="order-symmary-page">
        <h1 class="text-4xl font-semibold leading-tight mb-6">
            Détails de ma commande
        </h1>
        <div class="grid grid-cols-2 gap-2">
            <div class="bg-gray-100 rounded-md p-4">
                <h2 class="text-2xl font-semibold leading-tight">
                    Plats:
                </h2>
                <order-list
                    :order-list="cartDishes"
                    :restaurant-list="restaurantList"
                    :delivery-cost="10"
                    is-summary
                />
            </div>
            <div class="bg-gray-100 rounded-md p-4">
                <h2 class="text-2xl font-semibold leading-tight">
                    Coordonnées de facturation/livraison:
                </h2>
                <order-form
                    v-if="orderData"
                    :order-data="orderData"
                    disabled
                />
                <div>
                    <span class="font-semibold">
                        Date/heure estimée de livraison:
                    </span>
                    <span>
                        {{ deliveryTime }}
                    </span>
                </div>
                <div>
                    <span class="font-semibold">
                        Livraison dans:
                    </span>
                    <span>
                        <simple-timer :offset="deliveryDuration">Livré!</simple-timer>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { DateTime } from 'luxon';
import apiClient from '../../../api';
// atoms
import SimpleTimer from '../../atoms/simple-timer/simple-timer.vue';
// Organisms
import OrderList from '../../organisms/order-list/order-list.vue';
import OrderForm from '../../organisms/order-form/order-form.vue';

export default {
    name: 'HomePage',
    components: {
        OrderList,
        OrderForm,
        SimpleTimer,
    },
    data() {
        return {
            alert: null,
            deliveryMethods: [],
            orderData: null,
        };
    },
    computed: {
        ...mapGetters({
            cartDishes: 'cart/dishes',
            restaurantList: 'restaurants/restaurantList',
        }),
        deliveryDuration() {
            if (!this.orderData) {
                return null;
            }
            return this.deliveryMethods.find((method) => method.value === this.orderData.delivery_method)?.eta;
        },
        deliveryTime() {
            if (!this.orderData) {
                return null;
            }
            return DateTime.local({ zone: 'system' })
                .plus({ minutes: this.deliveryDuration })
                .setLocale('fr')
                .toLocaleString(DateTime.DATETIME_SHORT);
        },
    },
    async beforeMount() {
        await this.fetchRestaurants();
        await apiClient.get(`/orders/${this.$route.query.id}`).then(({ data }) => {
            this.orderData = data;
            this.setCartDishes(data?.items);
        }).catch((error) => {
            console.log(error);
        });

        // await apiClient.get('/delivery_methods').then(({ data }) => {
        //     this.deliveryMethods = data;
        // }).catch((error) => {
        //     console.log(error);
        // });

        // Due to api mock limits I replaced the commented api call above by this static value ^^'
        this.deliveryMethods = [
            { value: 'walk', label: 'pied', price: 1000, eta: 15 },
            { value: 'bike', label: 'vélo', price: 300, eta: 7 },
            { value: 'car', label: 'voiture', price: 1000, eta: 5 },
            { value: 'scooter', label: 'scooter', price: 500, eta: 3 },
            { value: 'electric_scooter', label: 'trottinette électrique', price: 400, eta: 4 },
        ];
    },
    methods: {
        ...mapActions({
            setCartDishes: 'cart/setCartDishes',
            fetchRestaurants: 'restaurants/fetchRestaurants',
        }),
    },
};
</script>
