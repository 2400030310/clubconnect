import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiBriefcase,
  FiCalendar,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiGithub
} from 'react-icons/fi'

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    graduationYear: '',
    agreeTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
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
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      navigate('/login')
    }, 1500)
  }

  const nextStep = () => {
    setCurrentStep(2)
  }

  const prevStep = () => {
    setCurrentStep(1)
  }

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Side - Benefits */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block pr-12 sticky top-8"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-light text-gray-900 mb-2">
              Join the
            </h1>
            <h2 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#06B6D4] to-[#0891b2] bg-clip-text text-transparent">
                ClubConnect
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light italic mt-2">
              Beyond Academics
            </p>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Create your profile and unlock a world of professional opportunities.
          </p>

          <div className="space-y-6">
            {[
              {
                icon: '🎯',
                title: 'Personalized Recommendations',
                description: 'Get matched with opportunities that fit your goals'
              },
              {
                icon: '🌐',
                title: 'Global Network',
                description: 'Connect with peers from 30+ countries'
              },
              {
                icon: '📈',
                title: 'Career Analytics',
                description: 'Track your professional growth with insights'
              },
              {
                icon: '🏆',
                title: 'Exclusive Events',
                description: 'Access invite-only workshops and networking'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex gap-4"
              >
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#0891b2] border-2 border-white" />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">1,500+</span> students joined this week
              </p>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FiCheckCircle className="text-green-500" /> 100% free for students • No credit card required
            </p>
          </motion.div>
        </motion.div>

        {/* Right Side - Registration Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-10"
        >
          <div className="text-center lg:text-left mb-8">
            <h3 className="text-2xl font-light text-gray-900 mb-1">Create Account</h3>
            <p className="text-gray-500">Join our community of ambitious students</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2].map((step) => (
              <React.Fragment key={step}>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? 'bg-gradient-to-r from-[#06B6D4] to-[#0891b2] text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  <span className={`ml-2 text-sm hidden sm:block ${
                    currentStep >= step ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step === 1 ? 'Basic Info' : 'Professional Details'}
                  </span>
                </div>
                {step === 1 && (
                  <div className={`flex-1 h-px mx-4 ${
                    currentStep > 1 ? 'bg-gradient-to-r from-[#06B6D4] to-[#0891b2]' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20 focus:border-[#06B6D4] transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20 focus:border-[#06B6D4] transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20 focus:border-[#06B6D4] transition-all text-gray-900 placeholder-gray-400"
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

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20 focus:border-[#06B6D4] transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-gradient-to-r from-[#06B6D4] to-[#0891b2] text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-[#06B6D4]/20 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Continue
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {/* Step 2: Professional Details */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Institution */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution / University <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      placeholder="Stanford University"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20 focus:border-[#06B6D4] transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Graduation Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Graduation Year <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20 focus:border-[#06B6D4] transition-all appearance-none bg-white text-gray-900"
                      required
                    >
                      <option value="" className="text-gray-500">Select year</option>
                      {years.map(year => (
                        <option key={year} value={year} className="text-gray-900">{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-[#06B6D4] focus:ring-[#06B6D4]"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms" className="text-[#06B6D4] hover:underline">Terms of Service</Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-[#06B6D4] hover:underline">Privacy Policy</Link>
                    </span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !formData.agreeTerms}
                    className="flex-1 bg-gradient-to-r from-[#06B6D4] to-[#0891b2] text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-[#06B6D4]/20 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Create Account
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Social Registration */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-[#06B6D4] transition-all group"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-[#06B6D4]" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm text-gray-700 group-hover:text-[#06B6D4]">Google</span>
              </button>
              <button
                className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-[#06B6D4] transition-all group"
              >
                <FiGithub className="w-5 h-5 text-gray-600 group-hover:text-[#06B6D4]" />
                <span className="text-sm text-gray-700 group-hover:text-[#06B6D4]">GitHub</span>
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-6">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-[#06B6D4] hover:text-[#0891b2] font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Register