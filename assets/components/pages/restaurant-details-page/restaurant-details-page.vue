<template>
    <div class="restaurant-details-page mt-0">
        <div class="w-full mb-8">
            <img
                :src="image"
                class="w-full"
            />
        </div>
        <h1 class="capitalize font-bold text-4xl mb-4">
            {{ restaurantName }}
        </h1>
        <div class="text-lg font-semibold uppercase mb-0">
            {{ address }}
        </div>
        <div class="text-lg font-semibold uppercase mt-0 mb-6">
            {{ zipAndCity }}
        </div>
        <menu-list
            :menu-list="dishList"
            :restaurant-id="restaurantId"
        />
    </div>
</template>
<script>
import { mapActions } from 'vuex';
// Organisms
import menuList from '../../organisms/menu-list/menu-list.vue';

export default {
    name: 'RestaurantDetailsPage',
    components: {
        menuList,
    },
    data() {
        return {
            restaurant: {},
        };
    },
    computed: {
        restaurantName() {
            return this.restaurant?.name ?? '';
        },
        restaurantId() {
            return this.restaurant?.id ?? '';
        },
        image() {
            return this.restaurant?.cover_picture ?? '';
        },
        address() {
            return this.restaurant?.street_address ?? '';
        },
        zipAndCity() {
            // eslint-disable-next-line camelcase
            const { zip_code, city } = this.restaurant;

            // eslint-disable-next-line camelcase
            return `${zip_code ?? ''} ${city ?? ''}`;
        },
        dishList() {
            return this.restaurant?.dishes?.data ?? [];
        },
    },
    async beforeMount() {
        this.restaurant = await this.fetchRestaurantById(this.$route.params.id);
    },
    methods: {
        ...mapActions({
            fetchRestaurantById: 'restaurants/fetchRestaurantById',
        }),
    },
};
</script>
