<template>
    <div class="main-container">
        <section class="container">
            <h2 class="page__header">Settings</h2>
            <div class="page__body">
                <h3 class="block__header">Weather</h3>
                <div class="block__body">
                    <div class="body__item">
                        <label for="units" class="item__label">Units</label>
                        <select class="item__select" v-model="unitOfMeasure" @change="setNewUnitOfMeasure(unitOfMeasure)">
                            <option value="metric">Metric</option>
                            <option value="standard">Standard</option>
                            <option value="imperial">Imperial</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    created() {
        this.appSettings = JSON.parse(localStorage.getItem('weather-app-settings'))
        this.unitOfMeasure = this.appSettings.units_of_measure
    },
    data() {
        return {
            appSettings: null,
            unitOfMeasure: null
        }
    },
    methods: {
        setNewUnitOfMeasure(newUnit) {
            const newAppSettings = { ...this.appSettings, units_of_measure: newUnit }
            localStorage.setItem('weather-app-settings', JSON.stringify(newAppSettings))
        }
    }
}
</script>

<style scoped>
.main-container {
    display: flex;
    justify-content: center;
}

.container {
    flex: 1;
    max-width: 1024px;
}

.page__header {

    padding: 32px;
    color: var(--font-color);
    font-size: 14px;
}

.page__body {
    padding: 0px 16px;
}

.block__header {
    padding: 16px;
    color: var(--font-color-meta);
    font-size: 12.25px;
    text-transform: uppercase;
}

.block__body {
    padding-block: 16px;
}

.body__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
}

.item__select {
    outline: none;
    border: none;
    background-color: #fff;
}
</style>