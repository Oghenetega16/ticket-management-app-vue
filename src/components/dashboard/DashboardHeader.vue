<template>
  <div class="flex justify-between items-center mb-8">
    <div>
      <h1 class="text-4xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-2">Welcome back, {{ userName }}!</p>
    </div>
    <button 
      @click="$emit('logout')" 
      class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
        />
      </svg>
      Logout
    </button>
  </div>
</template>

<script setup>
defineProps({
  userName: {
    type: String,
    default: 'User'
  }
})

defineEmits(['logout'])
</script>
