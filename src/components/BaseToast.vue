<template>
    <div class="toast__container">
        <div :class="['toast', type]">
            <div class="toast__header">
                <font-awesome-icon :icon="'fa-solid fa-xmark'" class="toast__close"
                    @click="$emit('close-modal')"></font-awesome-icon>
            </div>
            <div class="toast__body">
                <font-awesome-icon :icon="'fa-solid fa-circle-exclamation'" class="toast__icon"></font-awesome-icon>
                <div class="toast__text">
                    <h3 class="toast__title">{{ title }}</h3>
                    <p class="toast__description">{{ description }}</p>
                </div>
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
    max-width: 400px;
    margin-inline: 16px;
}

.toast__body {
    display: flex;
    align-items: center;
}

.toast__header {
    padding-block-end: 4px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.toast__close {
    cursor: pointer;
}

.toast__icon {
    margin-inline-end: 15px;
}

.error {
    color: var(--white);
    background-color: var(--error);
}
</style>