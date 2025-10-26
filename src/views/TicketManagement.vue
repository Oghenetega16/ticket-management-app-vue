<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <!-- Header -->
      <div class="flex flex-col gap-4 mb-6 sm:mb-8">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Ticket Management</h1>
            <button 
              @click="$router.push('/dashboard')" 
              class="text-indigo-600 hover:underline mt-2 text-sm sm:text-base"
            >
              ← Back to Dashboard
            </button>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button 
              @click="openCreateModal" 
              class="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              New Ticket
            </button>
            <button 
              @click="handleLogout" 
              class="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm sm:text-base"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="tickets.length === 0" class="text-center py-12 sm:py-16">
        <svg class="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
        <p class="text-gray-600 text-base sm:text-lg px-4">No tickets yet. Create your first ticket!</p>
      </div>

      <!-- Tickets Grid -->
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

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-6 sm:py-8 mt-12 sm:mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-sm sm:text-base">&copy; {{ new Date().getFullYear() }} TicketFlow. All rights reserved.</p>
      </div>
    </footer>

    <!-- Ticket Modal -->
    <TicketModal
      :show="showModal"
      :editing-ticket="editingTicket"
      :ticket-form="ticketForm"
      :errors="ticketErrors"
      @close="closeModal"
      @save="handleSaveTicket"
    />

    <!-- Delete Confirmation Modal -->
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
import TicketCard from '../components/tickets/TicketCard.vue'
import TicketModal from '../components/tickets/TicketModal.vue'
import DeleteConfirmModal from '../components/common/DeleteConfirmModal.vue'

const { logout } = useAuth()
const { tickets, loadTickets, createTicket, updateTicket, deleteTicket } = useTickets()
const showToast = inject('showToast')

// Modal state
const showModal = ref(false)
const editingTicket = ref(null)
const deleteConfirmId = ref(null)

// Ticket form data
const ticketForm = reactive({
  title: '',
  description: '',
  status: 'open'
})

// Ticket form errors
const ticketErrors = reactive({
  title: '',
  status: ''
})

// Load tickets on mount
onMounted(() => {
  loadTickets()
})

// Clear errors
const clearErrors = () => {
  ticketErrors.title = ''
  ticketErrors.status = ''
}

// Reset form
const resetForm = () => {
  ticketForm.title = ''
  ticketForm.description = ''
  ticketForm.status = 'open'
  clearErrors()
}

// Validate ticket form
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

// Open create modal
const openCreateModal = () => {
  editingTicket.value = null
  resetForm()
  showModal.value = true
}

// Open edit modal
const openEditModal = (ticket) => {
  editingTicket.value = ticket
  ticketForm.title = ticket.title
  ticketForm.description = ticket.description || ''
  ticketForm.status = ticket.status
  clearErrors()
  showModal.value = true
}

// Close modal
const closeModal = () => {
  showModal.value = false
  editingTicket.value = null
  resetForm()
}

// Save ticket (create or update)
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


// Open delete confirmation
const openDeleteConfirm = (ticketId) => {
  deleteConfirmId.value = ticketId
}

// Handle ticket deletion
const handleDeleteTicket = () => {
  try {
    deleteTicket(deleteConfirmId.value)
    showToast('Ticket deleted successfully!', 'success')
    deleteConfirmId.value = null
  } catch (error) {
    showToast('Failed to delete ticket.', 'error')
  }
}

// Handle logout
const handleLogout = () => {
  logout()
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>