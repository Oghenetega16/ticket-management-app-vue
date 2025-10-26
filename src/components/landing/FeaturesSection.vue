<template>
    <div class="max-w-7xl mx-auto px-4 py-20">
        <div class="grid md:grid-cols-3 gap-8">
            <FeatureCard
                icon="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                title="Easy Ticket Management"
                description="Create, update, and track tickets with an intuitive interface designed for efficiency."
                bg-color="bg-indigo-100"
                icon-color="text-indigo-600"
            />
            <FeatureCard
                icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                title="Real-time Updates"
                description="Stay informed with instant notifications and status updates on all your tickets."
                bg-color="bg-green-100"
                icon-color="text-green-600"
            />
            <FeatureCard
                icon="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                title="Smart Prioritization"
                description="Organize tickets by priority and status to focus on what matters most."
                bg-color="bg-amber-100"
                icon-color="text-amber-600"
            />
        </div>
    </div>
</template>

<script setup>
import FeatureCard from './FeatureCard.vue'
</script>