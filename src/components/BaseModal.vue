<template>
    <div class="modal" @click="((event) => closeModal(event))">
        <section class="modal__container">
            <div class="input__container">
                <font-awesome-icon :icon="'fa-solid fa-magnifying-glass'" class="input__icon"></font-awesome-icon>
                <input type="text" placeholder="Search for a location..." class="input__text" v-model.trim="location"
                    v-debounce:1000ms="fetchData" />
            </div>
            <div class="modal__menu">
                <div class="modal__item" @click="setCurrentLocation">
                    <font-awesome-icon :icon="'fa-solid fa-location-crosshairs'" class="item__icon"></font-awesome-icon>
                    <p class="item__text">Current Location</p>
                </div>
                <div class="modal__spinner" v-if="isSpinnerLoading">
                    <the-spinner></the-spinner>
                </div>
                <div class="modal__item" v-if="!isSpinnerLoading && results && results.length > 0" v-for="result in results"
                    :key="result.lat" @click="chooseLocation(result)">
                    <font-awesome-icon :icon="'fa-solid fa-location-dot'" class="item__icon"></font-awesome-icon>
                    <p class="item__text">{{ result.name }}, {{ result.state }}, {{ result.country }}</p>
                </div>
            </div>
        </section>
        <transition name="toast" mode="out-in">
            <base-toast v-if="isToastOpen" @close-modal="handleCloseToast" :title="'Error.'" :description="errorMessage"
                :type="'error'" :duration="'4000'"></base-toast>
        </transition>
    </div>
</template>

<script>
import { vue3Debounce } from "vue-debounce"
import { getCurrentPosition } from "../utils/utils"
import TheSpinner from "./TheSpinner.vue"
import axios from 'axios'
import BaseToast from "./BaseToast.vue"

export default {
    created() {
        this.appSettings = JSON.parse(localStorage.getItem('weather-app-settings'))
    },
    directives: {
        debounce: vue3Debounce({ lock: true })
    },
    emits: ['close-modal', 'refetch-data'],
    components: {
        TheSpinner,
        BaseToast
    },
    data() {
        return {
            isSpinnerLoading: false,
            location: null,
            results: [],
            appSettings: null,
            isToastOpen: false,
            errorMessage: null
        }
    },
    methods: {
        closeModal(event) {
            const clickedComponent = event.target.classList[0]
            this.$emit('close-modal', clickedComponent)
        },
        async fetchData() {
            this.isSpinnerLoading = true;
            try {
                const locationsUrl = import.meta.env.VITE_GEOCODING_API_URL
                const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
                if (this.location !== '') {
                    const response = await axios.get(`${locationsUrl}?q=${this.location}&limit=5&appid=${apiKey}`)
                    this.results = response.data
                } else {
                    this.results = []
                }
                this.isSpinnerLoading = false;
            } catch (error) {
                this.errorMessage = 'Verify your internet location or try again later.'
                this.isSpinnerLoading = false
                this.isToastOpen = true
            }
        },
        async chooseLocation(result) {
            this.isSpinnerLoading = true
            try {
                const weatherUrl = import.meta.env.VITE_WEATHER_API_URL
                const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
                const response = await axios.get(`${weatherUrl}?lat=${result.lat}&lon=${result.lon}&appid=${apiKey}&units=${this.appSettings.units_of_measure}&lang=${this.appSettings.lang}`)
                localStorage.setItem('weather-app-data', JSON.stringify({ ...response.data, lastUpdated: new Date() }))
                this.isSpinnerLoading = false
                this.$emit('refetch-data')
                this.$router.push('/weather-app-vue/weather')
            } catch (error) {
                this.errorMessage = 'Verify your internet location or try again later.'
                this.isSpinnerLoading = false
                this.isToastOpen = true
            }
        },
        async setCurrentLocation() {
            this.isSpinnerLoading = true
            try {
                const { coords } = await getCurrentPosition()
                const result = {
                    lat: coords.latitude,
                    lon: coords.longitude
                }
                this.isSpinnerLoading = false
                this.chooseLocation(result)
            } catch (error) {
                this.errorMessage = 'Verify your internet connection or allow all GPS permissions.'
                this.isSpinnerLoading = false
                this.isToastOpen = true
            }
        },
        handleCloseToast() {
            this.errorMessage = null
            this.isToastOpen = false
        }
    }
}
</script>

<style scoped>
.modal {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, .5);
    top: 0;
    left: 0;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal__container {
    flex: 1;
    max-width: 480px;
    background-color: var(--white);
    padding: 16px;
    border-radius: 16px;
    z-index: 9999;
}

.input__container {
    padding: 8px 16px;
    display: flex;
}

.input__icon {
    margin-inline-end: 16px;
}

.input__text {
    border: none;
    font-size: 14px;
    width: 100%;
}

.input__text:focus {
    outline: none;
}

.modal__menu {
    margin-block-start: 16px;
}

.modal__item {
    padding: 16px;
    color: var(--font-color);
    font-size: 14px;
    display: flex;
    cursor: pointer;
}

.modal__item:hover {
    background-color: var(--hover);
}

.item__icon {
    margin-inline-end: 16px;
}

.item__text {
    flex: 1;
}

.modal__spinner {
    display: flex;
    justify-content: center;
    padding: 16px;
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