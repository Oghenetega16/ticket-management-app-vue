<template>
    <div class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col">
        <div class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 w-full">
            <TicketHeader 
                @create="openCreateModal"
                @logout="handleLogout"
            />

            <div v-if="tickets.length === 0" class="text-center py-12 sm:py-16">
                <svg class="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                <p class="text-gray-600 text-base sm:text-lg px-4">No tickets yet. Create your first ticket!</p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <TicketCard
                    v-for="ticket in tickets"
                    :key="ticket.id"
                    :ticket="ticket"
                    @edit="openEditModal"
                    @delete="openDeleteConfirm"
                />
            </div>
        </div>

        <Footer />

        <TicketModal
            :show="showModal"
            :editing-ticket="editingTicket"
            :ticket-form="ticketForm"
            :errors="ticketErrors"
            @close="closeModal"
            @save="handleSaveTicket"
        />

        <DeleteConfirmModal
            :show="!!deleteConfirmId"
            @confirm="handleDeleteTicket"
            @cancel="deleteConfirmId = null"
        />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useTickets } from '../composables/useTickets'
import TicketHeader from '../components/tickets/TicketHeader.vue'
import TicketCard from '../components/tickets/TicketCard.vue'
import TicketModal from '../components/tickets/TicketModal.vue'
import Footer from '../components/common/Footer.vue'
import DeleteConfirmModal from '../components/common/DeleteConfirmModal.vue'

const { logout } = useAuth()
const { tickets, loadTickets, createTicket, updateTicket, deleteTicket } = useTickets()
const showToast = inject('showToast')

const showModal = ref(false)
const editingTicket = ref(null)
const deleteConfirmId = ref(null)

const ticketForm = reactive({
    title: '',
    description: '',
    status: 'open'
})

const ticketErrors = reactive({
    title: '',
    status: ''
})

onMounted(() => {
    loadTickets()
})

const clearErrors = () => {
    ticketErrors.title = ''
    ticketErrors.status = ''
}

const resetForm = () => {
    ticketForm.title = ''
    ticketForm.description = ''
    ticketForm.status = 'open'
    clearErrors()
}

const validateTicketForm = () => {
    clearErrors()
    let isValid = true

    if (!ticketForm.title.trim()) {
        ticketErrors.title = 'Title is required'
        isValid = false
    }

    if (!ticketForm.status) {
        ticketErrors.status = 'Status is required'
        isValid = false
    }

    if (!['open', 'in_progress', 'closed'].includes(ticketForm.status)) {
        ticketErrors.status = 'Invalid status'
        isValid = false
    }

    return isValid
}

const openCreateModal = () => {
    editingTicket.value = null
    resetForm()
    showModal.value = true
}

const openEditModal = (ticket) => {
    editingTicket.value = ticket
    ticketForm.title = ticket.title
    ticketForm.description = ticket.description || ''
    ticketForm.status = ticket.status
    clearErrors()
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingTicket.value = null
    resetForm()
}

const handleSaveTicket = (formData) => {
    ticketForm.title = formData.title
    ticketForm.description = formData.description
    ticketForm.status = formData.status

    if (!validateTicketForm()) {
        return
    }

    try {
        if (editingTicket.value) {
            updateTicket(editingTicket.value.id, {
                title: ticketForm.title,
                description: ticketForm.description,
                status: ticketForm.status
            })
            showToast('Ticket updated successfully!', 'success')
        } else {
            createTicket({
                title: ticketForm.title,
                description: ticketForm.description,
                status: ticketForm.status
            })
            showToast('Ticket created successfully!', 'success')
        }
        closeModal()
    } catch (error) {
        showToast('An error occurred. Please try again.', 'error')
    }
}

const openDeleteConfirm = (ticketId) => {
    deleteConfirmId.value = ticketId
}

const handleDeleteTicket = () => {
    try {
        deleteTicket(deleteConfirmId.value)
        showToast('Ticket deleted successfully!', 'success')
        deleteConfirmId.value = null
    } catch (error) {
        showToast('Failed to delete ticket.', 'error')
    }
}

const handleLogout = () => {
    logout()
}
</script>