<template>
    <div id="app">
        <Toast :toast="toast" />
        <router-view />
    </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import Toast from './components/common/Toast.vue'

const toast = ref(null)

const showToast = (message, type = 'success') => {
    toast.value = { message, type }
    setTimeout(() => {
        toast.value = null
    }, 3000)
}

// Provide toast globally
provide('showToast', showToast)
</script>