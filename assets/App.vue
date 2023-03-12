<template>
    <default-template class="bg-white">
        <template #header>
            <base-header />
        </template>
        <template #main>
            <router-view></router-view>
        </template>
    </default-template>
</template>

<script>
import DefaultTemplate from './components/templates/default-template/default-template.vue';
import BaseHeader from './components/molecules/base-header/base-header.vue';

export default {
    name: 'App',
    components: {
        DefaultTemplate,
        BaseHeader,
    },
};
</script>
