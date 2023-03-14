<template>
    <div class="cart-page mx-auto px-4 sm:px-8 py-6">
        <h2 class="text-2xl font-semibold leading-tight">
            {{ orderListTitle }}
        </h2>
        <order-list
            :order-list="cartDishes"
            :restaurant-list="restaurantList"
        />
        <h2 class="text-2xl font-semibold leading-tight mt-6">
            {{ contactFormTitle }}
        </h2>
        <order-form
            :delivery-methods="deliveryMethods"
            @invalid-data="showAlert"
            @submit="submitOrder"
        />
        <alert-banner
            v-if="alert"
            :title="alert.title"
            :description="alert.description"
            class="mb-4"
            @close="alert = null"
        />
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import apiClient from '../../../api';
// atoms
import AlertBanner from '../../atoms/alrt-banner/alert-banner.vue';
// Organisms
import OrderList from '../../organisms/order-list/order-list.vue';
import OrderForm from '../../organisms/order-form/order-form.vue';

export default {
    name: 'CartPage',
    components: {
        OrderList,
        OrderForm,
        AlertBanner,
    },
    data() {
        return {
            alert: null,
            deliveryMethods: [],
        };
    },
    computed: {
        ...mapGetters({
            cartDishes: 'cart/dishes',
            restaurantList: 'restaurants/restaurantList',
        }),
        orderListTitle() {
            return 'Mon Panier';
        },
        contactFormTitle() {
            return 'Mes coordonnées';
        },
    },
    async beforeMount() {
        if (!this.restaurantList.length) {
            await this.fetchRestaurants();
        }

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
            fetchRestaurants: 'restaurants/fetchRestaurants',
        }),
        showAlert(fields) {
            let description = `Veuillez renseigner les champs suivants: ${fields.join(', ')}`;
            if (!this.cartDishes.length) {
                description = 'Vous n\'avez pas encore de plats dans votre panier';
            }
            this.alert = {
                title: 'Oops il y a un petit souci!',
                description,
            };
        },
        async submitOrder(form) {
            console.log('submitting order...');
            const order = {
                ...form,
                items: {
                    ...this.cartDishes,
                },
            };
            await apiClient.post('/orders', order).then(({ data }) => {
                this.$router.push({ name: 'order-summary', query: { id: data.id } });
            }).catch((error) => {
                console.log('submit error!');
                console.log(error);
            });

            console.log('scuccess!');
        },
    },
};
</script>
