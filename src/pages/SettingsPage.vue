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
                            <option value="metric">Metric (°C)</option>
                            <option value="standard">Standard (K)</option>
                            <option value="imperial">Imperial (℉)</option>
                        </select>
                    </div>
                </div>
                <div class="spinner-container" v-if="isDataFetching">
                    <the-spinner></the-spinner>
                </div>
            </div>
        </section>
        <transition name="toast">
            <base-toast v-if="isToastOpen" @close-modal="isToastOpen = false" :title="'Error.'"
                :description="'Verify your internet connection or try again later.'" :type="'error'"
                :duration="'4000'"></base-toast>
        </transition>
    </div>
</template>

<script>
import axios from 'axios'

import BaseToast from '../components/BaseToast.vue'
import TheSpinner from '../components/TheSpinner.vue'

export default {
    components: {
        BaseToast,
        TheSpinner
    },
    created() {
        this.appSettings = JSON.parse(localStorage.getItem('weather-app-settings'))
        this.unitOfMeasure = this.appSettings.units_of_measure
        this.information = JSON.parse(localStorage.getItem('weather-app-data'))
    },
    data() {
        return {
            appSettings: null,
            isDataFetching: false,
            unitOfMeasure: null,
            information: null,
            isToastOpen: false
        }
    },
    methods: {
        async setNewUnitOfMeasure(newUnit) {
            const newAppSettings = { ...this.appSettings, units_of_measure: newUnit }
            localStorage.setItem('weather-app-settings', JSON.stringify(newAppSettings))
            this.isDataFetching = true
            try {
                const weatherUrl = import.meta.env.VITE_WEATHER_API_URL
                const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
                const response = await axios.get(`${weatherUrl}?lat=${this.information.coord.lat}&lon=${this.information.coord.lon}&appid=${apiKey}&units=${newUnit}&lang=${this.appSettings.lang}`)
                localStorage.setItem('weather-app-data', JSON.stringify({ ...response.data, lastUpdated: new Date() }))
                this.isDataFetching = false
            } catch (error) {
                this.isDataFetching = false
                this.isToastOpen = true
            }
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

.spinner-container {
    display: flex;
    justify-content: center;
    padding-block: 16px;
}

.toast-enter-active {
    animation: toast .3s ease;
}

.toast-leave-active {
    animation: toast .3s ease reverse;
}

@keyframes toast {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>