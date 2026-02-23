import React, { createContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user')
    const savedUserType = localStorage.getItem('userType')
    
    if (savedUser && savedUserType) {
      setUser(JSON.parse(savedUser))
      setUserType(savedUserType)
    }
    setLoading(false)
  }, [])

  const login = async (email, password, type) => {
    try {
      setLoading(true)
      
      // Trim whitespace
      const trimmedEmail = email.trim().toLowerCase()
      const trimmedPassword = password.trim()
      
      // Validation
      if (!trimmedEmail || !trimmedPassword || !type) {
        return { success: false, error: 'Missing required fields' }
      }
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(trimmedEmail)) {
        return { success: false, error: 'Invalid email format' }
      }
      
      // Password validation
      if (trimmedPassword.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' }
      }
      
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock demo credentials
      const demoCredentials = {
        'student@example.com': 'password123',
        'admin@example.com': 'password123'
      }
      
      // Check credentials (demo) - case insensitive for email
      const storedPassword = demoCredentials[trimmedEmail]
      if (storedPassword && storedPassword === trimmedPassword) {
        // Mock user data
        const userName = trimmedEmail.split('@')[0].charAt(0).toUpperCase() + trimmedEmail.split('@')[0].slice(1)
        const userData = {
          id: 1,
          name: userName,
          email: trimmedEmail,
          avatar: `https://ui-avatars.com/api/?name=${userName}&background=6366f1&color=fff&size=128`,
          role: type
        }
        
        setUser(userData)
        setUserType(type)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('userType', type)
        localStorage.setItem('rememberMe', true)
        
        return { success: true, user: userData }
      } else {
        return { success: false, error: 'Invalid email or password' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message || 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      
      // Validation
      if (!userData.fullName || !userData.email || !userData.password) {
        throw new Error('Missing required fields')
      }
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userData.email)) {
        throw new Error('Invalid email format')
      }
      
      // Password validation
      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match')
      }
      
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store registration data (in real app, send to backend)
      const registrationData = {
        ...userData,
        createdAt: new Date().toISOString()
      }
      localStorage.setItem('registrations', JSON.stringify([
        ...(JSON.parse(localStorage.getItem('registrations') || '[]')),
        registrationData
      ]))
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message || 'Registration failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setUserType(null)
    localStorage.removeItem('user')
    localStorage.removeItem('userType')
    toast.success('Logged out successfully!')
  }

  const value = {
    user,
    userType,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}