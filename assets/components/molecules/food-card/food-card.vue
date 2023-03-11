<template>
    <div class="w-full shadow shadow-black p-4 rounded-xl mb-4">
        <h3 class="text-lg font-semibold capitalize">
            {{ categoryName }}
        </h3>
        <ul class="list-none w-full">
            <li
                v-for="(dish, index) in dishList"
                :key="'dish '+index"
                class="flex justify-between"
            >
                <span>{{ dish.name }}</span>
                <span>{{ dish.price | currencyFormat }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'DishCard',
    components: {
    },
    props: {
        categoryName: { type: String, required: true },
        dishList: { type: Array, required: true },
    },
};
</script>
