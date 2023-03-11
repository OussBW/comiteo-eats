<template>
    <div class="w-full">
        <food-card
            v-for="(category, index) in menuCategories"
            :key="'food-card '+index"
            :category-name="getCategoryLabel(category)"
            :dish-list="getMenuByCategory(category)"
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
