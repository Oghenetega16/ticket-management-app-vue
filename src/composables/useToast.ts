import { ref, readonly } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  message: string
  type: ToastType
  id?: number
}

// Shared state across all components
const toast = ref<Toast | null>(null)
let timeoutId: number | null = null

export function useToast() {
  const showToast = (
    message: string, 
    type: ToastType = 'success', 
    duration: number = 3000
  ): void => {
    // Clear existing timeout if any
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    // Set new toast
    toast.value = {
      message,
      type,
      id: Date.now()
    }

    // Auto-hide after duration
    timeoutId = window.setTimeout(() => {
      hideToast()
    }, duration)
  }

  /**
   * Show success toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds (default: 3000)
   */
  const success = (message: string, duration?: number): void => {
    showToast(message, 'success', duration)
  }

  /**
   * Show error toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds (default: 3000)
   */
  const error = (message: string, duration?: number): void => {
    showToast(message, 'error', duration)
  }

  /**
   * Show info toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds (default: 3000)
   */
  const info = (message: string, duration?: number): void => {
    showToast(message, 'info', duration)
  }

  /**
   * Show warning toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds (default: 3000)
   */
  const warning = (message: string, duration?: number): void => {
    showToast(message, 'warning', duration)
  }

  /**
   * Hide current toast
   */
  const hideToast = (): void => {
    toast.value = null
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  /**
   * Check if toast is currently visible
   */
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

// Export a singleton instance for global use
export const globalToast = useToast()