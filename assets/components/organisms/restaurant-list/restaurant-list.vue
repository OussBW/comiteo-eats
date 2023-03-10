<template>
    <div class="grid grid-cols-2 gap-4">
        <div
            v-for="(restaurant, index) in restaurantList"
            :key="index"
        >
            <restaurant-card :restaurant="restaurant" />
        </div>
    </div>
</template>
<script>
// Molecules
import RestaurantCard from '../../molecules/restaurant-card/restaurant-card.vue';

export default {
    name: 'RestaurantList',
    components: {
        RestaurantCard,
    },
    props: {
        restaurantList: { type: Array, required: true },
    },
};
</script>
