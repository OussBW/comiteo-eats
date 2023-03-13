<template>
    <span
        :class="[
            'bg-white text-red-600 border border-red-600',
            'm-2 rounded-md flex flex-row items-center',
        ]"
    >
        <base-cta
            variant="decrement"
            is-borderless
            @click="$emit('decrement')"
        />
        <span class="mx-2">
            {{ quantity }}
        </span>
        <base-cta
            variant="increment"
            is-borderless
            @click="$emit('increment')"
        />
    </span>
</template>
<script>
// atoms
import BaseCta from '../../atoms/base-cta/base-cta.vue';

export default {
    name: 'QuantityCounter',
    components: {
        BaseCta,
    },
    props: {
        quantity: { type: Number, default: 0 },
    },
};
</script>
