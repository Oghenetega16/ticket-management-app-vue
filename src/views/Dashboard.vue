<template>
    <div class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col">
        <div class="flex-grow">
            <div class="max-w-7xl mx-auto px-4 py-8">
                <DashboardHeader 
                    :user-name="user?.name" 
                    @logout="handleLogout" 
                />

                <div class="grid md:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        label="Total Tickets"
                        :value="stats.total"
                        icon="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                        bg-color="bg-indigo-100"
                        icon-color="text-indigo-600"
                        value-color="text-gray-900"
                    />
                    <StatsCard
                        label="Open Tickets"
                        :value="stats.open"
                        icon="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        bg-color="bg-green-100"
                        icon-color="text-green-600"
                        value-color="text-green-600"
                    />
                    <StatsCard
                        label="Resolved Tickets"
                        :value="stats.resolved"
                        icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        bg-color="bg-gray-100"
                        icon-color="text-gray-600"
                        value-color="text-gray-600"
                    />
                </div>

                <div class="text-center">
                    <button 
                    @click="$router.push('/tickets')" 
                    class="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 cursor-pointer transition transform hover:scale-105"
                    >
                        Manage Tickets
                    </button>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useTickets } from '../composables/useTickets'
import DashboardHeader from '../components/dashboard/DashboardHeader.vue'
import StatsCard from '../components/dashboard/StatsCard.vue'
import Footer from '../components/common/Footer.vue'

const { user, checkAuth, logout } = useAuth()
const { stats, loadTickets } = useTickets()

onMounted(() => {
    checkAuth()
    loadTickets()
})

const handleLogout = () => {
    logout()
}
</script>

<style scoped>
button {
    transition: all 0.3s ease;
}
</style>