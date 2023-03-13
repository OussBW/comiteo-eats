<template>
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th
                            v-for="(header, index) in headers"
                            :key="'header '+index"
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="({ id, quantity }, i) in orderList"
                        :key="'order-item-'+i"
                    >
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 w-10 h-10 hidden sm:table-cell">
                                    <img
                                        class="w-full h-full rounded-full"
                                        :src="getRestaurantPicture(id)"
                                        alt=""
                                    />
                                </div>
                                <div class="ml-3">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        {{ getDishName(id) }}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap text-center">
                                <router-link :to="{name:'restaurant-details', params: { id: getRestaurantId(id) }}">
                                    {{ getRestaurantName(id) }}
                                </router-link>
                            </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-center">
                            <quantity-counter
                                :quantity="quantity"
                                @increment="incrementQuantity(id)"
                                @decrement="decrementQuantity(id)"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
// molecules
import QuantityCounter from '../../molecules/quantity-counter/quantity-counter.vue';

export default {
    name: 'OrderList',
    components: {
        QuantityCounter,
    },
    props: {
        restaurantList: { type: Array, default: () => [] },
        orderList: { type: Array, default: () => [] },
    },
    data() {
        return {
            headers: ['Plat', 'Restaurant', 'Quantité'],
        };
    },
    methods: {
        ...mapActions({
            addToCart: 'cart/addToCart',
            removeFromCart: 'cart/removeFromCart',
        }),
        getRestaurantPicture(id) {
            return this.getRestaurantByDishId(id)?.profile_picture ?? '';
        },
        getDishName(id) {
            return this.getDishById(id)?.name;
        },
        getRestaurantName(id) {
            return this.getRestaurantByDishId(id)?.name;
        },
        getRestaurantByDishId(id) {
            const restaurantId = id.split('-')[0];
            return this.restaurantList.find((restaurant) => restaurant.id === restaurantId);
        },
        getRestaurantId(id) {
            return this.getRestaurantByDishId(id)?.id;
        },
        getDishById(id) {
            const dishIndex = id.split('-')[2];
            const category = id.split('-')[1];
            const dishes = this.getRestaurantByDishId(id)?.dishes.data;
            return this.getMenuByCategory(dishes, category)[dishIndex];
        },
        getMenuByCategory(dishes, category) {
            if (!dishes) {
                return [];
            }
            return dishes.reduce((objectsByKeyValue, dish) => {
                const value = dish.type;
                // eslint-disable-next-line no-param-reassign
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(dish);
                return objectsByKeyValue;
            }, {})[category] ?? [];
        },
        incrementQuantity(id) {
            const { addToCart } = this;
            addToCart({ id });
        },
        decrementQuantity(id) {
            const { removeFromCart } = this;
            removeFromCart(id);
        },
    },
};
</script>
