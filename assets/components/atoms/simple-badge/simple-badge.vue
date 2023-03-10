<template>
    <div :class="['p-2 text-center capitalize-first whitespace-nowrap', shapeClasses]">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'SimpleBadge',
    props: {
        variant: {
            type: String,
            default: 'rectangular',
            validator: (value) => ['round', 'rectangular'].includes(value),
        },
    },
    computed: {
        shapeClasses() {
            return this.variant === 'round'
                ? 'rounded-full w-10 h-10 flex justify-center items-center' : 'rounded-lg max-w-min';
        },
    },
};
</script>
