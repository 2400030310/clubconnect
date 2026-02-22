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
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data
      const userData = {
        id: 1,
        name: email.split('@')[0],
        email,
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=6366f1&color=fff&size=128`,
        role: type
      }
      
      setUser(userData)
      setUserType(type)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('userType', type)
      
      toast.success(`Welcome back, ${userData.name}!`)
      return { success: true }
    } catch (error) {
      toast.error('Login failed. Please try again.')
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Registration successful! Please login.')
      return { success: true }
    } catch (error) {
      toast.error('Registration failed. Please try again.')
      return { success: false, error }
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