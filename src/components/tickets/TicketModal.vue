<template>
    <transition name="fade">
        <div 
            v-if="show" 
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4" 
            @click.self="$emit('close')"
        >
            <div class="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">{{ editingTicket ? 'Edit Ticket' : 'Create Ticket' }}</h2>
                    <button 
                        @click="$emit('close')" 
                        class="text-gray-500 hover:text-gray-700 transition"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            
                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Title <span class="text-red-500">*</span></label>
                        <input 
                            v-model="localForm.title"
                            type="text" 
                            placeholder="Enter ticket title"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                        <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
                    </div>
            
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea 
                            v-model="localForm.description"
                            rows="4" 
                            placeholder="Enter ticket description (optional)"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                        />
                    </div>
            
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Status <span class="text-red-500">*</span></label>
                        <select 
                            v-model="localForm.status"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="closed">Closed</option>
                        </select>
                        <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
                    </div>

                    <div class="flex gap-4">
                        <button 
                            type="submit" 
                            class="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            {{ editingTicket ? 'Update Ticket' : 'Create Ticket' }}
                        </button>
                        <button 
                            type="button" 
                            @click="$emit('close')" 
                            class="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    editingTicket: {
        type: Object,
        default: null
    },
    ticketForm: {
        type: Object,
        required: true
    },
    errors: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['close', 'save'])

const localForm = reactive({
    title: '',
    description: '',
    status: 'open'
})

watch(() => props.ticketForm, (newVal) => {
    if (newVal) {
        localForm.title = newVal.title || ''
        localForm.description = newVal.description || ''
        localForm.status = newVal.status || 'open'
    }
}, { deep: true, immediate: true })

const handleSubmit = () => {
    emit('save', { ...localForm })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

input:focus, textarea:focus, select:focus {
    outline: none;
}

button {
    transition: all 0.2s ease;
}
</style>