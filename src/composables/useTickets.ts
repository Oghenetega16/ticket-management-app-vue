import { ref, computed } from 'vue'

export interface Ticket {
  id: string
  status: 'open' | 'closed'
  title: string
  description?: string
  // Add other ticket properties as needed
}

export function useTickets() {
    const tickets = ref<Ticket[]>([])

    const loadTickets = () => {
        const saved = localStorage.getItem('ticketapp_tickets')
        if (saved) {
            try {
                tickets.value = JSON.parse(saved)
            } catch (e) {
                console.error('Error loading tickets')
            }
        }
    }

    const saveTickets = () => {
        localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets.value))
    }

    const createTicket = (ticketData: Omit<Ticket, 'id'>): Ticket => {
        const newTicket: Ticket = {
            ...ticketData,
            id: Date.now().toString()
        }
        tickets.value.push(newTicket)
        saveTickets()
        return newTicket
    }

    const updateTicket = (id: string, ticketData: Omit<Ticket, 'id'>) => {
        const index = tickets.value.findIndex(t => t.id === id)
        if (index !== -1) {
            tickets.value[index] = { ...ticketData, id }
            saveTickets()
        }
    }

    const deleteTicket = (id: string) => {
        tickets.value = tickets.value.filter(t => t.id !== id)
        saveTickets()
    }

    const stats = computed(() => ({
        total: tickets.value.length,
        open: tickets.value.filter(t => t.status === 'open').length,
        resolved: tickets.value.filter(t => t.status === 'closed').length
    }))

    return {
        tickets,
        stats,
        loadTickets,
        createTicket,
        updateTicket,
        deleteTicket
    }
}