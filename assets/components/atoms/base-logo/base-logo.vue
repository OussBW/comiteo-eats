<template>
    <div class="base-logo max-w-max">
        <h3 class="capitalize font-normal">
            {{ logoTitle }}
        </h3>
        <p class="uppercase font-semibold -mt-3">
            {{ logoSlogan }}
        </p>
    </div>
</template>
<script>
export default {
    name: 'BaseLogo',
    computed: {
        logoTitle() {
            return 'comiteo eats';
        },
        logoSlogan() {
            return 'we bring joy to your meals';
        },
    },
};
</script>
<style scoped>
.base-logo h3 {
    color: #e74c3c;
    font-family: 'Open', sans-serif;
    font-weight: 300;
    font-size: 40px;
    line-height:1.3;
}
.base-logo p {
    font-size: 12px;
    letter-spacing: 2px;
    padding-left: 10px;
    color: #34495e;
}
</style>
