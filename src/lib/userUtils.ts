/**
 * Get userId from localStorage user object
 */
export function getUserIdFromStorage(): number | null {
  if (typeof window === 'undefined') return null
  try {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      return userData.userId || userData.id || null
    }
  } catch (e) {
    console.error('Failed to get userId from localStorage:', e)
  }
  return null
}

/**
 * Get token from localStorage user object
 */
export function getTokenFromStorage(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      return userData.token || null
    }
  } catch (e) {
    // Fallback to old authToken
    return localStorage.getItem('authToken')
  }
  return null
}

