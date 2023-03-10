<template>
    <default-template class="bg-white">
        <template #main>
            <router-view></router-view>
        </template>
    </default-template>
</template>

<script>
import DefaultTemplate from './components/templates/default-template/default-template.vue';

export default {
    name: 'App',
    components: {
        DefaultTemplate,
    },
};
</script>
