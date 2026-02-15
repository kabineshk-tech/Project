// TypeScript interfaces for Frontend Courses Landing Page

export interface Course {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  thumbnail: string
  rating: number
  students: number
  lessons: number
  category: string
  neonColor: 'cyan' | 'magenta' | 'purple' | 'pink' | 'blue' | 'green'
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  iconColor: string
  delay: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  quote: string
  verified: boolean
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  platform: 'Twitter' | 'GitHub' | 'LinkedIn' | 'Discord' | 'YouTube'
  url: string
}
