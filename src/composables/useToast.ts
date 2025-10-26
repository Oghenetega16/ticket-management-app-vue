import { ref, readonly } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
    message: string
    type: ToastType
    id?: number
}

const toast = ref<Toast | null>(null)
let timeoutId: number | null = null

export function useToast() {
    const showToast = (
        message: string, 
        type: ToastType = 'success', 
        duration: number = 3000
    ): void => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }

        toast.value = {
            message,
            type,
            id: Date.now()
        }

        timeoutId = window.setTimeout(() => {
            hideToast()
        }, duration)
    }

    const success = (message: string, duration?: number): void => {
        showToast(message, 'success', duration)
    }

    const error = (message: string, duration?: number): void => {
        showToast(message, 'error', duration)
    }

    const info = (message: string, duration?: number): void => {
        showToast(message, 'info', duration)
    }

    const warning = (message: string, duration?: number): void => {
        showToast(message, 'warning', duration)
    }

    const hideToast = (): void => {
        toast.value = null
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
    }

    const isVisible = (): boolean => {
        return toast.value !== null
    }

    return {
        toast: readonly(toast),
        showToast,
        success,
        error,
        info,
        warning,
        hideToast,
        isVisible
    }
}

export const globalToast = useToast()