<!-- eslint-disable vue/html-self-closing -->
<template>
    <div class="main-app">
        <header>
            <slot name="header" />
        </header>
        <main class="mx-6 mt-24">
            <slot name="main" />
        </main>
        <footer>
            <slot name="footer" />
        </footer>
    </div>
</template>
<script>
export default {
    name: 'DefaultTemplate',
};
</script>
