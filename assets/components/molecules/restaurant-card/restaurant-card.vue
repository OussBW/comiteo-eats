<template>
    <router-link
        :to="{ name: 'restaurant-details', params: { id: restaurant.id } }"
        class="flex flex-col w-full"
    >
        <div class="restaurant-card__cover h-96">
            <img
                class="w-full h-full rounded-2xl shadow-black shadow-md"
                :src="restaurant.profile_picture"
            />
        </div>
        <div class="-mt-16 px-8 pt-6 pb-3 rounded-2xl bg-white w-auto mx-10 shadow-lg shadow-black relative">
            <h1 class="capitalize font-bold text-4xl">
                {{ restaurant.name }}
            </h1>
            <h2 class="uppercase font-semibold text-xl -mt-1">
                {{ restaurant.city }}
            </h2>
            <simple-badge class="bg-blue-400 mt-4 font-semibold">
                {{ restaurant.category_label }}
            </simple-badge>
            <simple-badge
                class="bg-gray-300 absolute right-8 top-6 shadow-md text-lg font-medium"
                variant="round"
            >
                {{ restaurant.ratings_average }}
            </simple-badge>
        </div>
    </router-link>
</template>
<script>
// Atoms
import SimpleBadge from '../../atoms/simple-badge/simple-badge.vue';

export default {
    name: 'RestaurantCard',
    components: {
        SimpleBadge,
    },
    props: {
        restaurant: { type: Object, required: true },
    },
};
</script>
