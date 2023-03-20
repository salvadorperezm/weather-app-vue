<template>
    <div class="modal" @click="((event) => closeModal(event))">
        <section class="modal__container">
            <div class="input__container">
                <font-awesome-icon :icon="'fa-solid fa-magnifying-glass'" class="input__icon"></font-awesome-icon>
                <input type="text" placeholder="Search for a location..." class="input__text" v-model="location"
                    v-debounce:1000ms="fetchData" />
            </div>
        </section>
    </div>
</template>

<script>
import { vue3Debounce } from "vue-debounce"

export default {
    directives: {
        debounce: vue3Debounce({ lock: true })
    },
    emits: ['close-modal'],
    data() {
        return {
            location: null,
            typingLocation: false
        }
    },
    methods: {
        closeModal(event) {
            const clickedComponent = event.target.classList[0]
            this.$emit('close-modal', clickedComponent)
        },
        fetchData() {
            console.log(this.location)
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
</style>