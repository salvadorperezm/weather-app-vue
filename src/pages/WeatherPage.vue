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
                <div class="page__bottom"></div>
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
            return Math.round(Number(temp))
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
        }
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
</style>