<template>
    <div class="w-full shadow shadow-black p-4 rounded-xl mb-4">
        <h3 class="text-lg font-semibold capitalize">
            {{ categoryName }}
        </h3>
        <ul class="list-none w-full">
            <li
                v-for="(dish, index) in dishList"
                :key="'dish '+index"
                class="flex justify-between items-center"
            >
                <span>{{ dish.name }}</span>
                <span class="ml-auto">
                    {{ dish.price | currencyFormat }}
                </span>
                <span class="w-40 flex justify-center">
                    <quantity-counter
                        v-if="getQuantity(index)"
                        :quantity="getQuantity(index)"
                        @increment="incrementQuantity(index, dish)"
                        @decrement="decrementQuantity(index)"
                    />
                    <base-cta
                        v-else
                        variant="addToCart"
                        @click="incrementQuantity(index, dish)"
                    />
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
// atoms
import BaseCta from '../../atoms/base-cta/base-cta.vue';
// molecules
import QuantityCounter from '../quantity-counter/quantity-counter.vue';

export default {
    name: 'FoodCard',
    components: {
        BaseCta,
        QuantityCounter,
    },
    props: {
        categoryName: { type: String, required: true },
        dishList: { type: Array, required: true },
        restaurantId: { type: String, required: true },
    },
    data() {
        return {
            quantity: 0,
        };
    },
    computed: {
        ...mapGetters({
            cartDishes: 'cart/dishes',
        }),
    },
    methods: {
        ...mapActions({
            addToCart: 'cart/addToCart',
            removeFromCart: 'cart/removeFromCart',
        }),
        incrementQuantity(index, dish) {
            const { getDishId, addToCart } = this;
            const dishToAdd = {
                id: getDishId(index),
                price: dish.price,
            };
            addToCart(dishToAdd);
            console.log(this.cartDishes);
        },
        decrementQuantity(index) {
            const { getDishId, removeFromCart } = this;
            removeFromCart(getDishId(index));
            console.log(this.cartDishes);
        },
        getQuantity(index) {
            const id = this.getDishId(index);
            console.log(id);
            return this.cartDishes.find((cartDish) => id === cartDish.id)?.quantity ?? 0;
        },
        getDishId(index) {
            return `${this.restaurantId}-${this.categoryName}-${index}`;
        },
    },
};
</script>
