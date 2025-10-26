<template>
  <transition name="fade">
    <div 
      v-if="show" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4" 
      @click.self="$emit('cancel')"
    >
      <div class="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
        <!-- Header -->
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900">{{ title }}</h3>
        </div>

        <!-- Message -->
        <p class="text-gray-600 mb-6">{{ message }}</p>

        <!-- Action Buttons -->
        <div class="flex gap-4">
          <button 
            @click="$emit('confirm')" 
            class="flex-1 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
          >
            {{ confirmText }}
          </button>
          <button 
            @click="$emit('cancel')" 
            class="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            {{ cancelText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirm Delete'
  },
  message: {
    type: String,
    default: 'Are you sure you want to delete this ticket? This action cannot be undone.'
  },
  confirmText: {
    type: String,
    default: 'Delete'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  }
})

defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

button {
  transition: all 0.2s ease;
}
</style>