<template>
    <div class="home-page">
        <restaurant-list :restaurant-list="restaurantList" />
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
// Organisms
import RestaurantList from '../../organisms/restaurant-list/restaurant-list.vue';

export default {
    name: 'HomePage',
    components: {
        RestaurantList,
    },
    computed: {
        ...mapGetters({
            restaurantList: 'restaurants/restaurantList',
        }),
    },
    async beforeMount() {
        await this.fetchRestaurants();
    },
    methods: {
        ...mapActions({
            fetchRestaurants: 'restaurants/fetchRestaurants',
        }),
    },
};
</script>
