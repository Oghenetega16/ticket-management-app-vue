<template>
    <div class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        <HeroSection />

        <FeaturesSection />

        <Footer />
    </div>
</template>

<script setup>
import HeroSection from '../components/landing/HeroSection.vue'
import FeaturesSection from '../components/landing/FeaturesSection.vue'
import Footer from '../components/common/Footer.vue'
</script>