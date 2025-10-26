export const STORAGE_KEYS = {
    SESSION: 'ticketapp_session',
    TICKETS: 'ticketapp_tickets',
} as const

export interface User {
    email: string
    name: string
}

export interface Ticket {
    id: string
    title: string
    description: string
    status: 'open' | 'in_progress' | 'closed'
}

export const getItem = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
    } catch (error) {
        console.error(`Error reading from localStorage: ${key}`, error)
        return null
    }
}

export const setItem = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.error(`Error writing to localStorage: ${key}`, error)
    }
}

export const removeItem = (key: string): void => {
    try {
        localStorage.removeItem(key)
    } catch (error) {
        console.error(`Error removing from localStorage: ${key}`, error)
    }
}

export const clearAll = (): void => {
    try {
        localStorage.clear()
    } catch (error) {
        console.error('Error clearing localStorage', error)
    }
}

export const isStorageAvailable = (): boolean => {
    try {
        const test = '__storage_test__'
        localStorage.setItem(test, test)
        localStorage.removeItem(test)
        return true
    } catch {
        return false
    }
}

export const getSession = (): User | null => {
    return getItem<User>(STORAGE_KEYS.SESSION)
}

export const setSession = (user: User): void => {
    setItem(STORAGE_KEYS.SESSION, user)
}

export const clearSession = (): void => {
    removeItem(STORAGE_KEYS.SESSION)
}

export const isAuthenticated = (): boolean => {
    return getSession() !== null
}

export const getTickets = (): Ticket[] => {
    return getItem<Ticket[]>(STORAGE_KEYS.TICKETS) || []
}

export const saveTickets = (tickets: Ticket[]): void => {
    setItem(STORAGE_KEYS.TICKETS, tickets)
}

export const addTicket = (ticket: Ticket): void => {
    const tickets = getTickets()
    tickets.push(ticket)
    saveTickets(tickets)
}


export const updateTicket = (
    id: string, 
    updates: Partial<Omit<Ticket, 'id'>>
): void => {
    const tickets = getTickets()
    const index = tickets.findIndex(t => t.id === id)
    if (index !== -1) {
        tickets[index] = { ...tickets[index], ...updates, id } as Ticket
        saveTickets(tickets)
    }
}

export const deleteTicket = (id: string): void => {
    const tickets = getTickets()
    const filtered = tickets.filter(t => t.id !== id)
    saveTickets(filtered)
}

export const clearTickets = (): void => {
    removeItem(STORAGE_KEYS.TICKETS)
}
