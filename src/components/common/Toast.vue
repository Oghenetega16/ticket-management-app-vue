<template>
    <transition name="fade">
        <div 
        v-if="toast" 
        class="fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3"
        :class="toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'"
        >
            <svg 
                v-if="toast.type === 'error'" 
                class="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ toast.message }}</span>
        </div>
    </transition>
</template>

<script setup>
defineProps({
    toast: {
        type: Object,
        default: null
    }
})
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>