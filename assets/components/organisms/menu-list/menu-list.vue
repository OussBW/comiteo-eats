<template>
    <div class="w-full">
        <h1 class="text-xl font-bold">
            {{ menuTitle }}
        </h1>
        <food-card
            v-for="(category, index) in menuCategories"
            :key="'food-card '+index"
            :category-name="category"
            :category-label="getCategoryLabel(category)"
            :dish-list="getMenuByCategory(category)"
            :restaurant-id="restaurantId"
        />
    </div>
</template>
<script>
// Molecules
import FoodCard from '../../molecules/food-card/food-card.vue';

export default {
    name: 'MenuList',
    components: {
        FoodCard,
    },
    props: {
        menuList: { type: Array, required: true },
        restaurantId: { type: String, required: true },
    },
    data() {
        return {
            categoryLabels: {
                starter: 'Entrées',
                main: 'Plats',
                dessert: 'Desserts',
                drink: 'Boissons',
            },
        };
    },
    computed: {
        menuCategories() {
            return Object.keys(this.categoryLabels);
        },
        menuTitle() {
            return 'Menu';
        },
    },
    methods: {
        getMenuByCategory(category) {
            return this.menuList.reduce((objectsByKeyValue, dish) => {
                const value = dish.type;
                // eslint-disable-next-line no-param-reassign
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(dish);
                return objectsByKeyValue;
            }, {})[category] ?? [];
        },
        getCategoryLabel(category) {
            return this.categoryLabels[category];
        },
    },
};
</script>
