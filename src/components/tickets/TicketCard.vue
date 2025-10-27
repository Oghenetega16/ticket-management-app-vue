<template>
    <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-bold text-gray-900">{{ ticket.title }}</h3>
            <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="statusColor">
                {{ statusLabel }}
            </span>
        </div>

        <p v-if="ticket.description" class="text-gray-600 mb-4 line-clamp-3">
        {{ ticket.description }}
        </p>

        <div class="flex gap-2">
            <button 
                @click="$emit('edit', ticket)" 
                class="flex items-center cursor-pointer gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
            </button>
            <button 
                @click="$emit('delete', ticket.id)" 
                class="flex items-center cursor-pointer gap-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    ticket: {
        type: Object,
        required: true
    }
})

defineEmits(['edit', 'delete'])

const statusColor = computed(() => {
    const colors = {
        open: 'bg-green-100 text-green-800',
        in_progress: 'bg-amber-100 text-amber-800',
        closed: 'bg-gray-100 text-gray-800'
    }
    return colors[props.ticket.status] || 'bg-gray-100 text-gray-800'
})

const statusLabel = computed(() => {
    const labels = {
        open: 'Open',
        in_progress: 'In Progress',
        closed: 'Closed'
    }
    return labels[props.ticket.status] || props.ticket.status
})
</script>
