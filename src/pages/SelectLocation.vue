<template>
    <div class="select-location">
        <section class="select-location__container">
            <img src="/vuejs.svg" alt="Vue logo" class="select-location__logo">
            <h3 class="select-location__title">Welcome to Vue Weather App.</h3>
            <p class="select-location__text">Get started by setting a location.</p>
            <p class="select-location__text">You can set a location by either searching for a place you know or using your
                current GPS position.</p>
            <base-button :title="'Set location'" />
        </section>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
.select-location__container {
    text-align: center;
    padding: 32px;
    line-height: 1.5;
}

.select-location__logo {
    max-width: 192px;
}

.select-location__title {
    font-size: 16px;
    color: var(--font-color);
}

.select-location__text {
    color: var(--font-color);
    font-size: 14px;
    margin-block: 14px;
}
</style>