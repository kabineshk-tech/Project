# Components Documentation

## Table of Contents
1. [HomePage Component](#homepage-component)
2. [RegisterForm Component](#registerform-component)
3. [Layout Component](#layout-component)
4. [Custom Hooks](#custom-hooks)
5. [Type Definitions](#type-definitions)
6. [Icon Components](#icon-components)

---

## HomePage Component

**Location**: `components/home/HomePage.tsx`

**Type**: Client Component (`'use client'`)

**Purpose**: Main landing page showcasing frontend development courses with animated sections, course cards, features, and testimonials.

### Features

#### 1. Sticky Navigation Header
- **Behavior**:
  - Transparent initially
  - Becomes glass-morphic on scroll (>50px)
  - Responsive mobile menu
- **State**:
  - `isScrolled`: boolean
  - `isMobileMenuOpen`: boolean

#### 2. Hero Section
- **Typewriter Effect**: Animated text "Master Frontend Development"
- **Floating Shapes**: 4 animated gradient orbs in background
- **Statistics Display**: 50K+ Students, 100+ Courses, 4.9/5 Rating
- **CTA Buttons**: "Explore Courses" and "Learn More"

#### 3. Courses Section
- **Grid Layout**: Responsive grid (1/2/3 columns)
- **Course Cards**:
  - 3D hover effect with perspective transform
  - Mouse-tracking rotation
  - Scroll-reveal animation
  - Course details (price, rating, duration, students)
  - Color-coded by neon theme

#### 4. Features Section
- **Alternating Layout**: Zig-zag pattern for visual interest
- **6 Key Features**:
  - Lifetime Access
  - Expert Instructors
  - Hands-On Projects
  - Certificate of Completion
  - Community Support
  - Regular Updates
- **Animations**: Slide in from left/right based on position

#### 5. Testimonials Section
- **Grid Layout**: 3-column responsive grid
- **6 Student Reviews**:
  - Avatar placeholder
  - Star ratings
  - Verified badge
  - Hover lift effect

#### 6. Footer
- **Brand Logo**
- **Social Links**: Twitter, GitHub, LinkedIn, YouTube
- **Navigation Columns**: About, Courses, Resources, Contact
- **Copyright Notice**

### Sub-Components (Inline)

#### FloatingShapes
```typescript
Purpose: Animated background gradient orbs
Features: 4 floating circles with blur effect
Animation: Custom float animations with delays
```

#### TypewriterText
```typescript
Props: { text: string, className?: string }
Behavior: Types text character by character
Uses: useTypewriter custom hook
Includes: Blinking cursor while typing
```

#### CourseCard
```typescript
Props: { course: Course, index: number }
Features:
  - 3D transform on mouse move
  - Scroll reveal animation
  - Color-coded neon badges
  - Price display with discount
  - Rating and student count
  - "Enroll Now" button
```

#### FeatureCard
```typescript
Props: { feature: Feature, index: number }
Features:
  - Icon with emoji mapping
  - Alternating layout (left/right)
  - Slide-in animations
  - Glow pulse effect on icon
```

#### TestimonialCard
```typescript
Props: { testimonial: Testimonial, index: number }
Features:
  - Avatar circle with initial
  - Star rating display
  - Quote text
  - Verified badge
  - Glass-morphic background
  - Hover lift effect
```

### State Management

```typescript
const [isScrolled, setIsScrolled] = useState(false)
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
```

### Effects

```typescript
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50)
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

### Data Dependencies

```typescript
import { courses, features, testimonials, navLinks } from './data'
import type { Course, Feature, Testimonial } from './types'
```

### Styling Approach

- **Utility Classes**: Tailwind CSS for most styling
- **Custom CSS Variables**:
  - `--neon-cyan`, `--neon-magenta`, `--neon-purple`, etc.
  - `--bg-primary`, `--bg-secondary`
  - `--text-secondary`
- **Animations**: Custom keyframes in globals.css
- **Glass Effect**: `backdrop-blur` with semi-transparent backgrounds

### Accessibility Features

- Semantic HTML elements
- Proper heading hierarchy
- ARIA labels on buttons
- Keyboard navigation support
- Responsive mobile menu

---

## RegisterForm Component

**Location**: `components/form/RigisterForm.tsx`

**Type**: Client Component (`'use client'`)

**Purpose**: Advanced registration form with validation, password strength indicator, and social authentication UI.

### Features

#### 1. Form Fields

**Full Name**:
- Pattern: `[a-zA-Z\s'-]+`
- Min length: 2 characters
- Validation: Real-time on blur

**Email**:
- Pattern: Standard email regex
- Validation: Format check on blur
- Error messages for invalid format

**Phone Number**:
- Country code selector dropdown
- 10 supported countries with flags
- Numeric input only (10-15 digits)
- International format ready

**Password**:
- Min length: 8 characters
- Requirements:
  - Uppercase letter
  - Lowercase letter
  - At least one number
- Toggle visibility button
- Real-time strength indicator

**Confirm Password**:
- Match validation
- Toggle visibility button
- Real-time comparison

**Terms & Conditions**:
- Custom checkbox design
- Required for submission
- Link to terms page

#### 2. Password Strength Indicator

**Calculation Logic**:
```typescript
calculatePasswordStrength(password: string): number {
  let strength = 0
  if (password.length >= 8) strength++    // Length 8+
  if (password.length >= 12) strength++   // Length 12+
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++  // Mixed case
  if (/\d/.test(password)) strength++     // Numbers
  if (/[^a-zA-Z0-9]/.test(password)) strength++  // Special chars
  return Math.min(strength, 4)            // Max 4
}
```

**Visual Feedback**:
- 0: Very Weak (red, 20%)
- 1: Weak (orange, 40%)
- 2: Fair (yellow, 60%)
- 3: Strong (lime, 80%)
- 4: Very Strong (green, 100%)

#### 3. Country Code Selector

**Features**:
- Dropdown with 10 countries
- Flag emojis for visual recognition
- Country name and code display
- Click outside to close
- Keyboard escape to close
- Scrollable list with custom scrollbar

**Countries Included**:
```typescript
US (+1), UK (+44), India (+91), China (+86), Japan (+81),
Germany (+49), France (+33), Australia (+61), Brazil (+55), Russia (+7)
```

#### 4. Social Authentication

**Buttons**:
- Google OAuth (white background)
- GitHub OAuth (dark background)
- Icons imported from icons.tsx
- Hover effects and transitions
- Ready for OAuth integration

**Current Behavior**:
- Alert with "coming soon" message
- Console log for debugging
- Placeholder for real OAuth flow

#### 5. Form Validation

**Validation Strategy**:
- **On Blur**: Validate field when focus leaves
- **On Change**: Clear errors as user types
- **On Submit**: Validate all fields before submission

**Validation Functions**:
```typescript
validateEmail(email: string): string | null
validateFullName(name: string): string | null
validatePassword(password: string): string | null
validateConfirmPassword(password: string, confirm: string): string | null
validatePhone(phone: string): string | null
validateTerms(accepted: boolean): string | null
```

**Error Display**:
- Red text below field
- Only shown after field is touched
- Cleared when field is corrected
- ARIA live regions for screen readers

### State Management

```typescript
interface FormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  countryCode: string
  acceptTerms: boolean
}

const [formData, setFormData] = useState<FormData>({ /* defaults */ })
const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
const [passwordStrength, setPasswordStrength] = useState(0)
const [errors, setErrors] = useState<Record<string, string>>({})
const [touched, setTouched] = useState<Record<string, boolean>>({})
const [isSubmitting, setIsSubmitting] = useState(false)
const [showCountrySelector, setShowCountrySelector] = useState(false)
```

### Event Handlers

```typescript
handleChange(field: keyof FormData, value: string | boolean)
handleBlur(field: keyof FormData)
handleSubmit(e: React.FormEvent)
handleGoogleAuth()
handleGitHubAuth()
handleCountrySelect(country: Country)
handleKeyDown(e: React.KeyboardEvent)
```

### Effects

```typescript
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
```

### Accessibility Features

**ARIA Attributes**:
- `aria-label` on all inputs
- `aria-required` for required fields
- `aria-invalid` for error states
- `aria-describedby` linking errors to fields
- `aria-pressed` for toggle buttons
- `aria-expanded` for dropdowns
- `aria-live="polite"` for screen reader announcements

**Screen Reader Support**:
```typescript
<div role="status" aria-live="polite" className="sr-only">
  {isSubmitting && "Submitting registration..."}
  {Object.keys(errors).length > 0 && `Form has ${Object.keys(errors).length} errors`}
</div>
```

**Keyboard Navigation**:
- Tab order follows logical flow
- Escape key closes dropdown
- Enter submits form
- Space toggles checkbox

### Visual Design

**Glassmorphism**:
- `backdrop-blur-xl` for form container
- Semi-transparent backgrounds
- Layered glass effect

**Animated Background**:
- 3 gradient orbs
- Blob animations
- Staggered animation delays

**Floating Labels**:
- Label inside input initially
- Floats up on focus/filled
- Gradient background on focus
- Smooth transitions

**Form Container**:
```css
backdrop-blur-xl
bg-white/30 dark:bg-black/30
border border-white/20
rounded-3xl
shadow-2xl
```

### Form Submission Flow

```
User fills form
    ↓
Clicks "Create Account"
    ↓
Validate all fields
    ↓
If errors → Show errors & mark touched
    ↓
If valid → Set isSubmitting = true
    ↓
Simulate API call (2 second delay)
    ↓
Log data to console
    ↓
Show success alert
    ↓
Set isSubmitting = false
```

**Future Implementation**:
```typescript
// Replace simulation with real API call
const response = await fetch('/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

---

## Layout Component

**Location**: `app/layout.tsx`

**Type**: Server Component (default)

**Purpose**: Root layout wrapper for all pages, provides fonts and base HTML structure.

### Features

#### Font Loading
```typescript
import { Geist, Geist_Mono } from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})
```

#### Metadata
```typescript
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}
```

#### HTML Structure
```typescript
<html lang="en">
  <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    {children}
  </body>
</html>
```

### Future Enhancements

1. **Update Metadata**:
```typescript
export const metadata: Metadata = {
  title: "Frontend Courses - Learn React, Next.js & More",
  description: "Master frontend development with expert-led courses...",
  keywords: ["React", "Next.js", "Frontend", "Web Development"],
  openGraph: { /* OG tags */ },
}
```

2. **Add Theme Provider**:
```typescript
import { ThemeProvider } from 'next-themes'
// Wrap children in ThemeProvider
```

3. **Add Analytics**:
```typescript
import { Analytics } from '@vercel/analytics/react'
// Add <Analytics /> component
```

---

## Custom Hooks

### useTypewriter Hook

**Location**: `components/home/HomePage.tsx` (inline)

**Purpose**: Creates typewriter animation effect for text

**Interface**:
```typescript
const useTypewriter = (
  text: string,
  speed: number = 100
) => {
  displayedText: string
  isComplete: boolean
}
```

**Implementation**:
```typescript
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return { displayedText, isComplete }
}
```

**Usage**:
```typescript
const { displayedText, isComplete } = useTypewriter("Master Frontend Development", 80)

<h1>
  {displayedText}
  {!isComplete && <span className="animate-pulse">|</span>}
</h1>
```

**Features**:
- Character-by-character animation
- Configurable speed
- Completion detection
- Cleanup on unmount
- Cursor blink effect

### useScrollReveal Hook

**Location**: `components/home/HomePage.tsx` (inline)

**Purpose**: Reveals elements when they scroll into viewport

**Interface**:
```typescript
const useScrollReveal = () => {
  ref: RefObject<HTMLDivElement>
  isVisible: boolean
}
```

**Implementation**:
```typescript
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()  // Only trigger once
        }
      },
      {
        threshold: 0.1,      // Trigger at 10% visibility
        rootMargin: '50px'   // Start 50px before entering
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}
```

**Usage**:
```typescript
const { ref, isVisible } = useScrollReveal()

<div
  ref={ref}
  className={`${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
>
  Content here
</div>
```

**Features**:
- Intersection Observer API
- Configurable threshold
- One-time trigger (performance)
- Early detection with rootMargin
- Auto cleanup

---

## Type Definitions

**Location**: `components/home/types.ts`

### Course Interface
```typescript
export interface Course {
  id: string                    // Unique identifier
  title: string                 // Course name
  description: string           // Course description
  price: number                 // Current price
  originalPrice?: number        // Crossed-out price (optional)
  duration: string              // "8 weeks", "12 weeks"
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  thumbnail: string             // Image path
  rating: number                // 0-5 stars
  students: number              // Enrollment count
  lessons: number               // Lesson count
  category: string              // "React", "JavaScript", etc.
  neonColor: 'cyan' | 'magenta' | 'purple' | 'pink' | 'blue' | 'green'
}
```

### Feature Interface
```typescript
export interface Feature {
  id: string
  title: string
  description: string
  icon: string                  // Icon name for mapping
  iconColor: string             // Neon color name
  delay: number                 // Animation delay in ms
}
```

### Testimonial Interface
```typescript
export interface Testimonial {
  id: string
  name: string                  // Student name
  role: string                  // "Frontend Developer", etc.
  avatar: string                // Avatar image path
  rating: number                // 1-5 stars
  quote: string                 // Testimonial text
  verified: boolean             // Show verified badge
}
```

### NavLink Interface
```typescript
export interface NavLink {
  label: string                 // Display text
  href: string                  // URL or hash link
}
```

### SocialLink Interface
```typescript
export interface SocialLink {
  platform: 'Twitter' | 'GitHub' | 'LinkedIn' | 'Discord' | 'YouTube'
  url: string
}
```

---

## Icon Components

**Location**: `components/form/icons.tsx`

**Purpose**: Custom SVG icon components for the registration form

### Available Icons

#### EyeIcon
```typescript
export const EyeIcon = ({ className }: IconProps) => (
  <svg className={className} /* ... */ >
    {/* Eye SVG path */}
  </svg>
)
```
**Usage**: Show password toggle

#### EyeOffIcon
```typescript
export const EyeOffIcon = ({ className }: IconProps) => (
  <svg className={className} /* ... */ >
    {/* Eye with slash SVG path */}
  </svg>
)
```
**Usage**: Hide password toggle

#### ChevronDownIcon
```typescript
export const ChevronDownIcon = ({ className }: IconProps) => (
  <svg className={className} /* ... */ >
    {/* Down arrow SVG path */}
  </svg>
)
```
**Usage**: Dropdown indicator

#### CheckIcon
```typescript
export const CheckIcon = ({ className }: IconProps) => (
  <svg className={className} /* ... */ >
    {/* Checkmark SVG path */}
  </svg>
)
```
**Usage**: Checkbox checked state

#### LoadingSpinner
```typescript
export const LoadingSpinner = ({ className }: IconProps) => (
  <svg className={`animate-spin ${className}`} /* ... */ >
    {/* Spinner circle SVG path */}
  </svg>
)
```
**Usage**: Form submission loading state

#### GoogleIcon
```typescript
export const GoogleIcon = ({ className }: IconProps) => (
  <svg className={className} /* ... */ >
    {/* Google "G" logo SVG paths */}
  </svg>
)
```
**Usage**: Google OAuth button

#### GitHubIcon
```typescript
export const GitHubIcon = ({ className }: IconProps) => (
  <svg className={className} /* ... */ >
    {/* GitHub Octocat logo SVG path */}
  </svg>
)
```
**Usage**: GitHub OAuth button

### Icon Props Interface
```typescript
interface IconProps {
  className?: string
}
```

### Usage Example
```typescript
import { EyeIcon, EyeOffIcon } from './icons'

<button onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
</button>
```

---

## Component Reusability

### Extract for Reuse

**Components Ready to Extract**:
1. **CourseCard** → Can be used in course listing pages
2. **TestimonialCard** → Can be used in about pages
3. **FormInput** → Create reusable form input component
4. **PasswordInput** → Reusable password field with strength meter
5. **CountryCodeSelector** → Reusable phone input component

**Example Extraction**:
```typescript
// components/ui/CourseCard.tsx
export interface CourseCardProps {
  course: Course
  index?: number
  onEnroll?: (courseId: string) => void
}

export function CourseCard({ course, index = 0, onEnroll }: CourseCardProps) {
  // Component implementation
}
```

---

## Component Testing Recommendations

### Unit Tests

**Test Files Structure**:
```
components/
  ├── home/
  │   ├── HomePage.tsx
  │   ├── HomePage.test.tsx
  │   ├── data.ts
  │   └── types.ts
```

**Example Tests**:
```typescript
describe('HomePage', () => {
  it('renders hero section', () => { /* ... */ })
  it('displays all courses', () => { /* ... */ })
  it('opens mobile menu on click', () => { /* ... */ })
})

describe('useTypewriter', () => {
  it('types text character by character', () => { /* ... */ })
  it('completes after full text', () => { /* ... */ })
})

describe('RegisterForm', () => {
  it('validates email format', () => { /* ... */ })
  it('shows password strength', () => { /* ... */ })
  it('requires all fields', () => { /* ... */ })
  it('submits valid form', () => { /* ... */ })
})
```

---

Last Updated: February 2026
