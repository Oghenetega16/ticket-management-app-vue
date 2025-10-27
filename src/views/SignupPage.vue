<template>
    <div class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div class="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
            <h2 class="text-3xl font-bold text-center mb-8">Create Account</h2>
        
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                        v-model="form.email" 
                        type="email" 
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="you@example.com"
                    >
                    <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input 
                        v-model="form.password" 
                        type="password" 
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="••••••••"
                    >
                    <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <input 
                        v-model="form.confirmPassword" 
                        type="password" 
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="••••••••"
                    >
                    <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
                </div>

                <button 
                    type="submit" 
                    class="w-full py-3 bg-indigo-600 text-white cursor-pointer rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                Sign Up
                </button>
            </form>

            <p class="text-center mt-4 text-gray-600">
                Already have an account? 
                <button 
                    @click="$router.push('/login')" 
                    class="text-indigo-600 hover:underline font-medium cursor-pointer"
                >
                    Login
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
const { signup } = useAuth()
const showToast = inject('showToast')

const form = reactive({
    email: '',
    password: '',
    confirmPassword: ''
})

const errors = reactive({
    email: '',
    password: '',
    confirmPassword: ''
})

const clearErrors = () => {
    errors.email = ''
    errors.password = ''
    errors.confirmPassword = ''
}

// Validate form
const validateForm = () => {
    clearErrors()
    let isValid = true

    if (!form.email) {
        errors.email = 'Email is required'
        isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Please enter a valid email address'
        isValid = false
    }

    if (!form.password) {
        errors.password = 'Password is required'
        isValid = false
    } else if (form.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
        isValid = false
    }

    if (!form.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password'
        isValid = false
    } else if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
        isValid = false
    }

    return isValid
}

const handleSubmit = () => {
    if (!validateForm()) {
        return
    }

    try {
        signup(form.email, form.password)
        showToast('Account created successfully!', 'success')
        
        setTimeout(() => {
            router.push('/dashboard')
        }, 1000)
    } catch (error) {
        showToast('Signup failed. Please try again.', 'error')
    }
}
</script>

<style scoped>
input:focus {
    outline: none;
}
</style>