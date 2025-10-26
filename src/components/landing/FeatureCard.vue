<template>
    <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
        <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4" :class="bgColor">
            <svg class="w-8 h-8" :class="iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
            </svg>
        </div>
        <h3 class="text-xl font-bold mb-2 text-gray-900">{{ title }}</h3>
        <p class="text-gray-600">{{ description }}</p>
    </div>
</template>

<script setup>
defineProps({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bgColor: {
        type: String,
        default: 'bg-indigo-100'
    },
    iconColor: {
        type: String,
        default: 'text-indigo-600'
    }
})
</script>

<style scoped>
div {
    transition: box-shadow 0.3s ease;
}
</style>