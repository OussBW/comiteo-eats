<template>
    <div
        :class="['w-full shadow-xl fixed bg-white top-0 py-2',
                 'z-50 px-4 flex justify-between items-center']"
    >
        <router-link
            class="block max-w-max"
            to="/"
        >
            <base-logo />
        </router-link>
        <span class="float-right">
            <base-cta
                variant="goToCart"
                href="/cart"
            >
                <span v-if="cartTotal">
                    {{ cartTotal | currencyFormat }}
                </span>
                <span v-else>
                    Panier
                </span>
            </base-cta>
        </span>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
// atoms

// Organisms
import BaseLogo from '../../atoms/base-logo/base-logo.vue';
import BaseCta from '../../atoms/base-cta/base-cta.vue';

export default {
    name: 'BaseHeader',
    components: {
        BaseLogo,
        BaseCta,
    },
    computed: {
        ...mapGetters({
            cartTotal: 'cart/total',
        }),
    },
};
</script>
