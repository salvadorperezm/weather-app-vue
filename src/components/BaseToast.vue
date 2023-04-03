<template>
    <div class="toast__container">
        <div :class="['toast', type]">
            <font-awesome-icon :icon="'fa-solid fa-circle-exclamation'" class="toast__icon"></font-awesome-icon>
            <div class="toast__text">
                <h3 class="toast__title">{{ title }}</h3>
                <p class="toast__description">{{ description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'description', 'type', 'duration'],
    emits: ['close-modal'],
    created() {
        this.closeModalAfterExpiry()
    },
    methods: {
        closeModalAfterExpiry() {
            setInterval(() => {
                this.$emit('close-modal')
            }, parseInt(this.duration))
        }
    }
}
</script>

<style scoped>
.toast__container {
    position: fixed;
    top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.toast {
    flex: 1;
    padding: 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    max-width: 400px;
    margin-inline: 16px;
}

.toast__icon {
    margin-inline-end: 15px;
}

.error {
    color: var(--white);
    background-color: var(--error);
}
</style>