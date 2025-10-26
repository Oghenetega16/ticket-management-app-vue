<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
      <h2 class="text-3xl font-bold text-center mb-8">Login to TicketFlow</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Email Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input 
            v-model="form.email" 
            type="email" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="you@example.com"
          >
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input 
            v-model="form.password" 
            type="password" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="••••••••"
          >
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ errors.password }}
          </p>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          class="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>

      <!-- Signup Link -->
      <p class="text-center mt-4 text-gray-600">
        Don't have an account? 
        <button 
          @click="$router.push('/signup')" 
          class="text-indigo-600 hover:underline font-medium"
        >
          Sign up
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()
const showToast = inject('showToast')

// Form data
const form = reactive({
  email: '',
  password: ''
})

// Form errors
const errors = reactive({
  email: '',
  password: ''
})

// Clear errors
const clearErrors = () => {
  errors.email = ''
  errors.password = ''
}

// Validate form
const validateForm = () => {
  clearErrors()
  let isValid = true

  // Email validation
  if (!form.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Password validation
  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  }

  return isValid
}

// Handle form submission
const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  try {
    login(form.email, form.password)
    showToast('Login successful!', 'success')
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  } catch (error) {
    showToast('Login failed. Please check your credentials.', 'error')
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
input:focus {
  outline: none;
}
</style>
