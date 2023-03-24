<template>
    <section class="page__container">
        <div class="page">
            <div class="page__top-container" :class="determineTime">
                <div class="page__top">
                    <div class="page__actions">
                        <div class="page__location">
                            <font-awesome-icon :icon="'fa-solid fa-location-dot'"
                                class="location__icon"></font-awesome-icon>
                            <p class="location__text">{{ information.name }}</p>
                        </div>
                        <font-awesome-icon :icon="'fa-solid fa-rotate'" class="page__reload"></font-awesome-icon>
                    </div>
                    <div class="page__summary">
                        <div class="summary__info">
                            <h2 class="summary__temperature">{{ roundTemp(information.main.temp) }}</h2>
                            <p class="summary__feels">Feels like {{ roundTemp(information.main.feels_like) }}</p>
                            <p class="summary__description">{{ information.weather[0].description }}</p>
                        </div>
                        <img class="summary__icon" :src="iconUrl" alt="Weather icon">
                    </div>
                </div>
            </div>
            <div class="page__bottom-container">
                <div class="page__bottom">
                    <div class="bottom__header">
                        <h3 class="bottom__title">today</h3>
                    </div>
                    <div class="bottom__body">
                        <div>
                            <p>Max</p>
                            <p>{{ roundTemp(information.main.temp_max) }}</p>
                        </div>
                        <div>
                            <p>Min</p>
                            <p>{{ roundTemp(information.main.temp_min) }}</p>
                        </div>
                        <div>
                            <p>Humidity</p>
                            <p>{{ `${information.main.humidity}%` }}</p>
                        </div>
                        <div>
                            <p>Sunrise</p>
                            <p>{{ convertTime(information.sys.sunrise) }} AM</p>
                        </div>
                        <div>
                            <p>Sunset</p>
                            <p>{{ convertTime(information.sys.sunset) }} PM</p>
                        </div>
                        <div>
                            <p>Pressure</p>
                            <p>{{ `${information.main.pressure}hPa` }}</p>
                        </div>
                        <div>
                            <p>Visibility</p>
                            <p>{{ information.visibility }}m</p>
                        </div>
                        <div>
                            <p>Wind</p>
                            <p>{{ convertWind(information.wind.speed) }}</p>
                        </div>
                        <div>
                            <p>Weather</p>
                            <p>{{ information.weather[0].main }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    created() {
        this.information = JSON.parse(localStorage.getItem('weather-app-data'))
    },
    data() {
        return {
            information: null,
        }
    },
    methods: {
        roundTemp(temp) {
            const settings = JSON.parse(localStorage.getItem('weather-app-settings'))
            console.log(settings)
            if (settings.units_of_measure === 'metric') {
                return `${Math.round(Number(temp))}°C`
            }
        },
        convertTime(time) {
            const convertedTime = new Date(time)
            return `${convertedTime.getHours()}:${convertedTime.getMinutes()}`
        },
        convertWind(windSpeed) {
            const settings = JSON.parse(localStorage.getItem('weather-app-settings'))
            if (settings.units_of_measure === 'metric' || settings.units_of_measure === 'standard') {
                return `${windSpeed}m/s`
            } else {
                return `${windSpeed}miles/h`
            }
        }
    },
    computed: {
        iconUrl() {
            const iconsUrl = import.meta.env.VITE_WEATHER_ICONS_URL
            return `${iconsUrl}/${this.information.weather[0].icon}@2x.png`
        },
        determineTime() {
            const weatherIconCode = this.information.weather[0].icon
            const weatherIconCodeToArray = weatherIconCode.split('')
            if (weatherIconCodeToArray[weatherIconCodeToArray.length - 1] === 'd') {
                return 'top__scheme--day'
            } else {
                return 'top__scheme--night'
            }
        },
    }
}
</script>

<style scoped>
.page__container {
    border: 1px solid red;
}

.page {
    display: flex;
    flex-direction: column;
    height: 100%;
}


.page__top-container {
    flex: 1;
}

.page__top {
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    border: 1px solid green;
    display: flex;
    flex-direction: column;
}


.page__bottom-container {
    flex: 1;
}

.page__bottom {
    height: 100%;
    border: 1px solid blue;
    max-width: 1200px;
    margin: 0 auto;
}

.page__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
}

.page__location {
    display: flex;
    align-items: center;
    padding: 8px;
}

.location__icon,
.page__reload {
    width: 21px;
    height: 21px;
}

.location__text {
    font-size: 14px;
    margin-inline-start: 8px;
}

.page__reload {
    padding: 8px;
}

.page__summary {
    flex: 1;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 32px 32px;
}

.summary__temperature {
    font-size: 64px;
    font-weight: 500;
    margin-block-end: 16px;
}

.summary__feels,
.summary__description {
    font-size: 12.25px;
    text-transform: capitalize;
}

.summary__feels {
    margin-block-end: 5px;
}


.top__scheme--day {
    background-color: var(--primary);
    color: var(--white);
}

.top__scheme--night {
    background-color: #44296a;
    color: var(--white)
}

.bottom__header {
    padding: 16px 32px;
}

.bottom__title {
    text-transform: uppercase;
    font-size: 12.25px;
}

.bottom__body {
    height: calc(100% - 46px);
    padding-inline: 32px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 16px;
}
</style>