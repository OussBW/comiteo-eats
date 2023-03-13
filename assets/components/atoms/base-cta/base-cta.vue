<template>
    <component
        :is="component"
        :class="[
            'bg-white text-red-600',
            'hover:bg-gray-100 hover:text-red-900 hover:border-red-900',
            'p-1.5 rounded-md',
            !isBorderless && 'border border-red-600 m-2',
            isBorderless && 'border-none my-0',
        ]"
        :disabled="disabled"
        :aria-disabled="disabled"
        :aria-label="ariaLabelValue"
        :to="to"
        @click="$emit('click')"
    >
        <span class="cta-icon">
            <font-awesome-icon
                v-if="variant !== 'simple'"
                :icon="['fas', icon]"
            />
            <slot></slot>
        </span>
    </component>
</template>
<script>
export default {
    name: 'BaseCta',
    props: {
        to: { type: Object, default: null },
        iconClass: { type: String, default: null },
        disabled: { type: Boolean, default: false },
        isBorderless: { type: Boolean, default: false },
        variant: {
            type: String,
            default: 'simple',
            validator: (val) => [
                'simple',
                'goToCart',
                'removeFromCart',
                'addToCart',
                'increment',
                'decrement',
            ].includes(val),
        },
    },
    data() {
        return {
            iconList: {
                goToCart: 'cart-shopping',
                removeFromCart: 'trash',
                addToCart: 'cart-plus',
                increment: 'plus',
                decrement: 'minus',
            },
        };
    },
    computed: {
        component() {
            return this.to ? 'router-link' : 'button';
        },
        ariaLabelValue() {
            return 'aria-label';
        },
        icon() {
            return `${this.iconList[this.variant]}`;
        },
    },
};
</script>
