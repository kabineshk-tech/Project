'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { EyeIcon, EyeOffIcon, ChevronDownIcon, CheckIcon, LoadingSpinner, GoogleIcon, GitHubIcon, ArrowLeftIcon } from './icons'

interface FormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  countryCode: string
  acceptTerms: boolean
}

interface Country {
  code: string
  country: string
  flag: string
  name: string
}

const countryCodes: Country[] = [
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
  { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
  { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
  { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
  { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brazil' },
  { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
]

const strengthConfig = {
  0: { label: 'Very Weak', color: 'bg-red-500', width: '20%' },
  1: { label: 'Weak', color: 'bg-orange-500', width: '40%' },
  2: { label: 'Fair', color: 'bg-yellow-500', width: '60%' },
  3: { label: 'Strong', color: 'bg-lime-500', width: '80%' },
  4: { label: 'Very Strong', color: 'bg-green-500', width: '100%' },
}

export default function RigisterForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    countryCode: '+1',
    acceptTerms: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCountrySelector, setShowCountrySelector] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedCountry = countryCodes.find(c => c.code === formData.countryCode) || countryCodes[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountrySelector(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Calculate password strength
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0

    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    return Math.min(strength, 4)
  }

  // Validation functions
  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return 'Email is required'
    if (!emailRegex.test(email)) return 'Please enter a valid email'
    return null
  }

  const validateFullName = (name: string): string | null => {
    if (!name.trim()) return 'Full name is required'
    if (name.trim().length < 2) return 'Name must be at least 2 characters'
    if (!/^[a-zA-Z\s'-]+$/.test(name)) return 'Name contains invalid characters'
    return null
  }

  const validatePassword = (password: string): string | null => {
    if (!password) return 'Password is required'
    if (password.length < 8) return 'Password must be at least 8 characters'
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      return 'Password must contain uppercase and lowercase letters'
    }
    if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number'
    return null
  }

  const validateConfirmPassword = (password: string, confirm: string): string | null => {
    if (!confirm) return 'Please confirm your password'
    if (password !== confirm) return 'Passwords do not match'
    return null
  }

  const validatePhone = (phone: string): string | null => {
    const phoneRegex = /^[0-9]{10,15}$/
    if (!phone) return 'Phone number is required'
    if (!phoneRegex.test(phone.replace(/[\s-()]/g, ''))) {
      return 'Please enter a valid phone number (10-15 digits)'
    }
    return null
  }

  const validateTerms = (accepted: boolean): string | null => {
    if (!accepted) return 'You must accept the terms and conditions'
    return null
  }

  const validateField = (field: keyof FormData, value: any): string | null => {
    switch (field) {
      case 'fullName': return validateFullName(value)
      case 'email': return validateEmail(value)
      case 'password': return validatePassword(value)
      case 'confirmPassword': return validateConfirmPassword(formData.password, value)
      case 'phoneNumber': return validatePhone(value)
      case 'acceptTerms': return validateTerms(value)
      default: return null
    }
  }

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }

    if (field === 'password' && typeof value === 'string') {
      setPasswordStrength(calculatePasswordStrength(value))
    }
  }

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }))

    const error = validateField(field, formData[field])
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous status
    setSubmitStatus({ type: null, message: '' })

    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.keys(formData).forEach(field => {
      const error = validateField(field as keyof FormData, formData[field as keyof FormData])
      if (error) newErrors[field] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
      return
    }

    setIsSubmitting(true)
    try {
      // Send registration data to API (excluding passwords for security)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          countryCode: formData.countryCode,
          // Note: passwords are intentionally NOT sent to the email API
        }),
      })

      // Parse response with error handling
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        result = { error: 'Invalid response from server' };
      }

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a minute and try again.')
        } else if (response.status === 415) {
          throw new Error('Invalid request format. Please try again.')
        } else if (response.status === 400) {
          throw new Error('Invalid form data. Please check your information.')
        } else if (response.status === 500) {
          throw new Error(result.error || 'Server error. Please try again later.')
        } else {
          throw new Error(result.error || 'Registration failed. Please try again.')
        }
      }

      // Success
      console.log('Registration submitted successfully:', result)
      setSubmitStatus({
        type: 'success',
        message: 'Registration successful! Admin has been notified.'
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNumber: '',
          countryCode: '+1',
          acceptTerms: false,
        })
        setPasswordStrength(0)
        setTouched({})
        setSubmitStatus({ type: null, message: '' })
      }, 3000)

    } catch (error) {
      console.error('Submission error:', error)

      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setSubmitStatus({
          type: 'error',
          message: 'Network error. Please check your connection and try again.'
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: error instanceof Error ? error.message : 'Registration failed. Please try again.'
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleAuth = () => {
    console.log('Google authentication clicked')
    alert('Google OAuth integration coming soon!')
  }

  const handleGitHubAuth = () => {
    console.log('GitHub authentication clicked')
    alert('GitHub OAuth integration coming soon!')
  }

  const handleCountrySelect = (country: Country) => {
    setFormData(prev => ({ ...prev, countryCode: country.code }))
    setShowCountrySelector(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && showCountrySelector) {
      setShowCountrySelector(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 dark:from-purple-950 dark:via-gray-900 dark:to-blue-950">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
      <div className="absolute top-0 -right-40 w-80 h-80 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />

      {/* Main form container */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md sm:max-w-lg relative backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl shadow-black/10 dark:shadow-white/5 px-6 sm:px-8 py-8 sm:py-10 md:py-12 animate-[slideUpFade_0.5s_ease-out]">
          {/* Back Button */}
          <Link
            href="/"
            className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 px-4 py-2.5 bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-xl transition-all duration-300 hover:bg-white/70 dark:hover:bg-black/50 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 group z-10"
            aria-label="Navigate to homepage"
          >
            <ArrowLeftIcon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Home
            </span>
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Join us today and get started
            </p>
          </div>

          {/* Social Auth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-white/20 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
            >
              <GoogleIcon />
              <span className="font-medium text-gray-700 dark:text-gray-200">Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleGitHubAuth}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-gray-900/70 dark:bg-gray-100/10 backdrop-blur-md border border-gray-700/40 dark:border-gray-500/20 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:bg-gray-900/90 dark:hover:bg-gray-100/20 hover:shadow-lg hover:shadow-gray-900/30 active:scale-[0.98]"
            >
              <GitHubIcon className="text-white" />
              <span className="font-medium text-white dark:text-gray-200">Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <span className="px-4 text-sm font-medium text-gray-600 dark:text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} noValidate aria-label="Registration form" onKeyDown={handleKeyDown}>
            <div className="space-y-5">
              {/* Full Name */}
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  placeholder=" "
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  className="w-full px-4 py-3.5 bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-xl transition-all duration-300 focus:border-purple-400/60 focus:ring-4 focus:ring-purple-400/20 focus:bg-white/70 dark:focus:bg-black/50 placeholder-transparent peer text-gray-900 dark:text-gray-100"
                  aria-label="Full name"
                  aria-required="true"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
                <label
                  htmlFor="fullName"
                  className="absolute left-4 transition-all duration-300 ease-out pointer-events-none text-gray-600 dark:text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-gradient-to-r peer-focus:from-purple-500 peer-focus:to-pink-500 peer-focus:text-white peer-focus:rounded peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-gray-200 dark:peer-[:not(:placeholder-shown)]:bg-gray-700 peer-[:not(:placeholder-shown)]:rounded"
                >
                  Full Name
                </label>
                {errors.fullName && touched.fullName && (
                  <p id="fullName-error" className="text-red-500 text-sm mt-1" role="alert">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className="w-full px-4 py-3.5 bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-xl transition-all duration-300 focus:border-purple-400/60 focus:ring-4 focus:ring-purple-400/20 focus:bg-white/70 dark:focus:bg-black/50 placeholder-transparent peer text-gray-900 dark:text-gray-100"
                  aria-label="Email address"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 transition-all duration-300 ease-out pointer-events-none text-gray-600 dark:text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-gradient-to-r peer-focus:from-purple-500 peer-focus:to-pink-500 peer-focus:text-white peer-focus:rounded peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-gray-200 dark:peer-[:not(:placeholder-shown)]:bg-gray-700 peer-[:not(:placeholder-shown)]:rounded"
                >
                  Email Address
                </label>
                {errors.email && touched.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex gap-2">
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowCountrySelector(!showCountrySelector)}
                    className="flex items-center gap-2 px-3 py-3.5 bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-xl hover:bg-white/70 dark:hover:bg-black/50 transition-all duration-300"
                    aria-label="Select country code"
                    aria-expanded={showCountrySelector}
                  >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{selectedCountry.code}</span>
                    <ChevronDownIcon className="text-gray-600 dark:text-gray-400" />
                  </button>

                  {showCountrySelector && (
                    <div className="absolute top-full mt-2 left-0 z-50 w-64 max-h-64 overflow-y-auto bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-xl shadow-2xl animate-[slideUpFade_0.3s_ease-out] custom-scrollbar">
                      {countryCodes.map(country => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountrySelect(country)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-500/20 transition-colors border-b border-white/10 last:border-b-0"
                        >
                          <span className="text-xl">{country.flag}</span>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{country.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{country.code}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex-1 relative">
                  <input
                    type="tel"
                    id="phoneNumber"
                    placeholder=" "
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value.replace(/[^0-9]/g, ''))}
                    onBlur={() => handleBlur('phoneNumber')}
                    className="w-full px-4 py-3.5 bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-xl transition-all duration-300 focus:border-purple-400/60 focus:ring-4 focus:ring-purple-400/20 focus:bg-white/70 dark:focus:bg-black/50 placeholder-transparent peer text-gray-900 dark:text-gray-100"
                    aria-label="Phone number"
                    aria-required="true"
                    aria-invalid={!!errors.phoneNumber}
                    aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
                  />
                  <label
                    htmlFor="phoneNumber"
                    className="absolute left-4 transition-all duration-300 ease-out pointer-events-none text-gray-600 dark:text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-gradient-to-r peer-focus:from-purple-500 peer-focus:to-pink-500 peer-focus:text-white peer-focus:rounded peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-gray-200 dark:peer-[:not(:placeholder-shown)]:bg-gray-700 peer-[:not(:placeholder-shown)]:rounded"
                  >
                    Phone Number
                  </label>
                </div>
              </div>
              {errors.phoneNumber && touched.phoneNumber && (
                <p id="phoneNumber-error" className="text-red-500 text-sm mt-1" role="alert">{errors.phoneNumber}</p>
              )}

              {/* Password */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder=" "
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    className="w-full px-4 py-3.5 pr-12 bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-xl transition-all duration-300 focus:border-purple-400/60 focus:ring-4 focus:ring-purple-400/20 focus:bg-white/70 dark:focus:bg-black/50 placeholder-transparent peer text-gray-900 dark:text-gray-100"
                    aria-label="Password"
                    aria-required="true"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : "password-strength"}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 transition-all duration-300 ease-out pointer-events-none text-gray-600 dark:text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-gradient-to-r peer-focus:from-purple-500 peer-focus:to-pink-500 peer-focus:text-white peer-focus:rounded peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-gray-200 dark:peer-[:not(:placeholder-shown)]:bg-gray-700 peer-[:not(:placeholder-shown)]:rounded"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>

                {formData.password && (
                  <div className="space-y-1" id="password-strength">
                    <div className="h-2 w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strengthConfig[passwordStrength as keyof typeof strengthConfig].color} transition-all duration-600 ease-out`}
                        style={{ width: strengthConfig[passwordStrength as keyof typeof strengthConfig].width }}
                        role="progressbar"
                        aria-valuenow={passwordStrength}
                        aria-valuemin={0}
                        aria-valuemax={4}
                        aria-label="Password strength"
                      />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Strength: <span className="font-medium">{strengthConfig[passwordStrength as keyof typeof strengthConfig].label}</span>
                    </p>
                  </div>
                )}

                {errors.password && touched.password && (
                  <p id="password-error" className="text-red-500 text-sm" role="alert">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder=" "
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  className="w-full px-4 py-3.5 pr-12 bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-xl transition-all duration-300 focus:border-purple-400/60 focus:ring-4 focus:ring-purple-400/20 focus:bg-white/70 dark:focus:bg-black/50 placeholder-transparent peer text-gray-900 dark:text-gray-100"
                  aria-label="Confirm password"
                  aria-required="true"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute left-4 transition-all duration-300 ease-out pointer-events-none text-gray-600 dark:text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:left-3 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-gradient-to-r peer-focus:from-purple-500 peer-focus:to-pink-500 peer-focus:text-white peer-focus:rounded peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-gray-200 dark:peer-[:not(:placeholder-shown)]:bg-gray-700 peer-[:not(:placeholder-shown)]:rounded"
                >
                  Confirm Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  aria-pressed={showConfirmPassword}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p id="confirmPassword-error" className="text-red-500 text-sm mt-1" role="alert">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms and Conditions */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                    onBlur={() => handleBlur('acceptTerms')}
                    className="peer sr-only"
                    aria-required="true"
                    aria-invalid={!!errors.acceptTerms}
                    aria-describedby={errors.acceptTerms ? "acceptTerms-error" : undefined}
                  />
                  <div className="w-5 h-5 bg-white/50 dark:bg-black/30 backdrop-blur-md border-2 border-white/40 dark:border-white/20 rounded transition-all duration-300 peer-checked:bg-gradient-to-br peer-checked:from-purple-600 peer-checked:to-pink-600 peer-checked:border-transparent group-hover:scale-110 flex items-center justify-center">
                    {formData.acceptTerms && (
                      <CheckIcon className="text-white" />
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  I accept the{' '}
                  <a href="/terms" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
                    terms and conditions
                  </a>
                </span>
              </label>
              {errors.acceptTerms && touched.acceptTerms && (
                <p id="acceptTerms-error" className="text-red-500 text-sm" role="alert">{errors.acceptTerms}</p>
              )}

              {/* Status Notification */}
              {submitStatus.type && (
                <div
                  role="alert"
                  aria-live="polite"
                  className={`p-4 rounded-xl border transition-all duration-300 animate-[slideUpFade_0.3s_ease-out] ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50/80 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-red-50/80 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {submitStatus.type === 'success' ? (
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckIcon className="text-white" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                    )}
                    <p className={`text-sm font-medium ${
                      submitStatus.type === 'success'
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {submitStatus.message}
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.acceptTerms}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors hover:underline"
                >
                  Sign in
                </a>
              </p>
            </div>

            {/* Screen reader announcements */}
            <div role="status" aria-live="polite" className="sr-only">
              {isSubmitting && "Submitting registration..."}
              {submitStatus.type === 'success' && submitStatus.message}
              {submitStatus.type === 'error' && submitStatus.message}
              {Object.keys(errors).length > 0 && `Form has ${Object.keys(errors).length} errors`}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
