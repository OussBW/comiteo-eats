<template>
    <div class="grid grid-cols-2 gap-4">
        <restaurant-card
            v-for="(restaurant, index) in restaurantList"
            :key="index"
            :restaurant="restaurant"
            has-routing
        />
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
