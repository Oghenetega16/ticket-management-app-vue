<template>
    <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-gray-600 text-sm font-medium">{{ label }}</p>
                <p class="text-3xl font-bold mt-2" :class="valueColor">{{ value }}</p>
            </div>
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="bgColor">
                <svg class="w-6 h-6" :class="iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        required: true
    },
    value: {
        type: [Number, String],
        required: true
    },
    icon: {
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
    },
    valueColor: {
        type: String,
        default: 'text-gray-900'
    }
})
</script>

<style scoped>
div {
    transition: box-shadow 0.3s ease;
}
</style>
