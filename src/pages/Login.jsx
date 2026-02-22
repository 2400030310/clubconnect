import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiMail, 
  FiLock, 
  FiArrowRight, 
  FiEye, 
  FiEyeOff,
  FiUser,
  FiShield
} from 'react-icons/fi'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student', // 'student' or 'admin'
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call based on user type
    setTimeout(() => {
      setIsLoading(false)
      if (formData.userType === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/student/dashboard')
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Brand Message */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block pr-12"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-light text-gray-900 mb-2">
              Welcome back to
            </h1>
            <h2 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ClubConnect
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light italic mt-2">
              Beyond Academics
            </p>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Continue your journey of professional growth and connect with ambitious students and administrators worldwide.
          </p>

          <div className="space-y-4">
            {[
              'Access exclusive industry events',
              'Connect with 50,000+ professionals',
              'Track your career milestones',
              formData.userType === 'admin' ? 'Manage students and activities' : 'Get personalized recommendations'
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3 text-gray-700"
              >
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-purple-600" />
                </div>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100"
          >
            <p className="text-gray-600 italic mb-4">
              "ClubConnect transformed my career path. I found my dream internship through their network."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                SJ
              </div>
              <div>
                <p className="font-medium text-gray-900">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Student at IIT Delhi</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-10"
        >
          <div className="text-center lg:text-left mb-8">
            <h3 className="text-2xl font-light text-gray-900 mb-1">Sign In</h3>
            <p className="text-gray-500">Welcome back! Please enter your details.</p>
          </div>

          {/* User Type Selector - Admin/Student Toggle */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I am a
            </label>
            <div className="flex gap-4 p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: 'student' }))}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                  formData.userType === 'student'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <FiUser className="w-5 h-5" />
                Student
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: 'admin' }))}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                  formData.userType === 'admin'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <FiShield className="w-5 h-5" />
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={formData.userType === 'admin' ? 'admin@example.com' : 'student@example.com'}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-900 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Demo Credentials Hint */}
            <div className="bg-purple-50 rounded-lg p-3 text-sm">
              <p className="text-purple-700 font-medium mb-1">Demo Credentials:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-semibold text-gray-900">Student:</span> 
                  <span className="text-gray-600 ml-1">student@example.com</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Admin:</span> 
                  <span className="text-gray-600 ml-1">admin@example.com</span>
                </div>
                <div className="col-span-2 text-purple-600 font-medium">
                  Password: any password (demo mode)
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <Link 
                to="/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-600/30 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In as {formData.userType === 'admin' ? 'Admin' : 'Student'}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
              >
                Create one now
              </Link>
            </p>

            {/* Back to Home */}
            <div className="text-center">
              <Link 
                to="/" 
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Login