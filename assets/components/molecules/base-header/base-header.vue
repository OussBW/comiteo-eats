<template>
    <div class="w-full shadow-xl fixed bg-white top-0 py-2 z-50 px-4">
        <router-link
            class="block max-w-max"
            to="/"
        >
            <base-logo />
        </router-link>
    </div>
</template>
<script>
// Organisms
import BaseLogo from '../../atoms/base-logo/base-logo.vue';

export default {
    name: 'BaseHeader',
    components: {
        BaseLogo,
    },
};
</script>
