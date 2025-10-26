export interface ValidationResult {
  isValid: boolean
  error?: string
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email is required' }
  }

  if (!email.trim()) {
    return { isValid: false, error: 'Email cannot be empty' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }

  return { isValid: true }
}

export const validatePassword = (
  password: string, 
  minLength: number = 6
): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' }
  }

  if (password.length < minLength) {
    return { 
      isValid: false, 
      error: `Password must be at least ${minLength} characters` 
    }
  }

  return { isValid: true }
}

export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' }
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' }
  }

  return { isValid: true }
}

export const validateRequired = (
  value: string, 
  fieldName: string = 'This field'
): ValidationResult => {
  if (!value || !value.trim()) {
    return { isValid: false, error: `${fieldName} is required` }
  }

  return { isValid: true }
}

export const validateTicketTitle = (
  title: string, 
  maxLength: number = 100
): ValidationResult => {
  const requiredCheck = validateRequired(title, 'Title')
  if (!requiredCheck.isValid) {
    return requiredCheck
  }

  if (title.length > maxLength) {
    return { 
      isValid: false, 
      error: `Title must be less than ${maxLength} characters` 
    }
  }

  return { isValid: true }
}

export const validateTicketDescription = (
  description: string,
  maxLength: number = 500
): ValidationResult => {
  // Description is optional, so empty is valid
  if (!description || !description.trim()) {
    return { isValid: true }
  }

  if (description.length > maxLength) {
    return { 
      isValid: false, 
      error: `Description must be less than ${maxLength} characters` 
    }
  }

  return { isValid: true }
}

export const validateTicketStatus = (status: string): ValidationResult => {
  const validStatuses = ['open', 'in_progress', 'closed']
  
  if (!status) {
    return { isValid: false, error: 'Status is required' }
  }

  if (!validStatuses.includes(status)) {
    return { isValid: false, error: 'Invalid status value' }
  }

  return { isValid: true }
}

export const validateLoginForm = (email: string, password: string) => {
  return {
    email: validateEmail(email),
    password: validatePassword(password)
  }
}

export const validateSignupForm = (
  email: string, 
  password: string, 
  confirmPassword: string
) => {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validatePasswordConfirmation(password, confirmPassword)
  }
}

export const validateTicketForm = (
  title: string,
  description: string,
  status: string
) => {
  return {
    title: validateTicketTitle(title),
    description: validateTicketDescription(description),
    status: validateTicketStatus(status)
  }
}

export const hasValidationErrors = (
  validationResults: Record<string, ValidationResult>
): boolean => {
  return Object.values(validationResults).some(result => !result.isValid)
}

export const getValidationErrors = (
  validationResults: Record<string, ValidationResult>
): Record<string, string> => {
  const errors: Record<string, string> = {}
  
  Object.entries(validationResults).forEach(([key, result]) => {
    if (!result.isValid && result.error) {
      errors[key] = result.error
    }
  })
  
  return errors
}