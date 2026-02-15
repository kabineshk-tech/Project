# Architecture Documentation

## Project Structure

```
my-app/
├── app/                          # Next.js App Router directory
│   ├── globals.css              # Global styles and animations
│   ├── icon.svg                 # App favicon
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Root page (redirects to HomePage)
│   ├── home/
│   │   └── page.tsx            # Home route page
│   └── registerform/
│       └── page.tsx            # Registration form route
│
├── components/                   # Reusable React components
│   ├── home/
│   │   ├── HomePage.tsx        # Main landing page component
│   │   ├── data.ts             # Mock data (courses, features, testimonials)
│   │   └── types.ts            # TypeScript interfaces
│   └── form/
│       ├── RigisterForm.tsx    # Registration form component
│       └── icons.tsx           # Custom icon components
│
├── public/                       # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── docs/                         # Documentation (this folder)
│   ├── PROJECT_OVERVIEW.md
│   ├── ARCHITECTURE.md
│   ├── COMPONENTS.md
│   ├── SETUP_GUIDE.md
│   └── IMPROVEMENTS.md
│
├── node_modules/                 # Dependencies (not tracked in git)
├── .next/                        # Next.js build output
├── .git/                         # Git repository
│
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── next-env.d.ts                # Next.js TypeScript declarations
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Locked dependency versions
├── postcss.config.mjs           # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── .gitignore                   # Git ignore rules
└── README.md                    # Basic project readme

```

---

## Architecture Patterns

### 1. Next.js App Router Architecture

This project uses the **Next.js 14+ App Router** architecture:

**File-System Based Routing**:
- `app/page.tsx` → `/` (root)
- `app/home/page.tsx` → `/home`
- `app/registerform/page.tsx` → `/registerform`

**Layout System**:
- `app/layout.tsx` - Root layout wrapping all pages
- Provides consistent font loading and base HTML structure

**Server/Client Components**:
- Pages are Server Components by default
- Components using hooks marked with `'use client'`
- Optimal for performance and SEO

### 2. Component Organization Pattern

**Separation of Concerns**:
```
components/
  ├── [feature]/
  │   ├── Component.tsx    # Main component
  │   ├── data.ts         # Data/constants
  │   ├── types.ts        # TypeScript types
  │   └── icons.tsx       # Related icons
```

**Benefits**:
- Feature-based organization
- Easy to locate related files
- Scalable for larger applications
- Clear separation of logic, data, and types

### 3. Data Management Pattern

**Static Data Approach**:
- Mock data defined in `data.ts` files
- Easy to replace with API calls
- Type-safe with TypeScript interfaces
- Ideal for development and prototyping

**Example Flow**:
```
types.ts → defines interfaces
    ↓
data.ts → implements typed data
    ↓
Component.tsx → consumes typed data
```

### 4. Styling Architecture

**Tailwind CSS Utility-First Approach**:
- Inline utility classes for most styling
- Custom CSS in `globals.css` for:
  - CSS variables (theme colors)
  - Keyframe animations
  - Utility class extensions
  - Reusable animation classes

**CSS Custom Properties Strategy**:
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

Benefits:
- Easy theme switching
- Consistent colors across app
- Future dark mode support

---

## Design Patterns Used

### 1. Custom Hooks Pattern

**Location**: Defined inline in components

**useTypewriter Hook**:
```typescript
Purpose: Creates typewriter animation effect
Input: text, speed
Output: { displayedText, isComplete }
Pattern: Effect hook with interval management
```

**useScrollReveal Hook**:
```typescript
Purpose: Reveals elements on scroll into view
Output: { ref, isVisible }
Pattern: Intersection Observer API wrapper
```

**Benefits**:
- Reusable logic
- Separation of concerns
- Easy to test
- Clean component code

### 2. Compound Component Pattern

**Example**: CourseCard, FeatureCard, TestimonialCard
- Self-contained components
- Props-driven configuration
- Reusable across different contexts

### 3. Inline Component Pattern

**Location**: HomePage.tsx

**Components Defined Inside Main Component**:
- `FloatingShapes`
- `TypewriterText`
- `CourseCard`
- `FeatureCard`
- `TestimonialCard`

**Rationale**:
- Only used in one place
- Access to parent state/props
- Reduces file complexity
- Easy to split out later if needed

### 4. Controlled Component Pattern

**Example**: RigisterForm.tsx
- Form state managed in React state
- Controlled inputs with value props
- Event handlers for state updates
- Centralized validation logic

---

## Configuration Files

### TypeScript Configuration (`tsconfig.json`)

**Key Settings**:
```json
{
  "compilerOptions": {
    "target": "ES2017",           // Modern JavaScript
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,                // Strict type checking
    "jsx": "react-jsx",           // New JSX transform
    "moduleResolution": "bundler", // Modern resolution
    "paths": {
      "@/*": ["./*"]              // Path alias for imports
    }
  }
}
```

**Benefits**:
- Type safety throughout codebase
- Better IDE support
- Catches errors at compile time
- Self-documenting code

### Next.js Configuration (`next.config.ts`)

**Current State**: Minimal configuration
```typescript
const nextConfig: NextConfig = {
  /* config options here */
};
```

**Future Additions Possible**:
- Image domains for external images
- Environment variables
- Redirects and rewrites
- Custom webpack config

### ESLint Configuration (`eslint.config.mjs`)

**Setup**:
- Next.js core web vitals rules
- TypeScript-specific rules
- Custom ignore patterns

**Purpose**:
- Code quality enforcement
- Consistency across team
- Catch common mistakes
- Best practices compliance

### PostCSS Configuration (`postcss.config.mjs`)

**Purpose**: Process Tailwind CSS
- Imports Tailwind directives
- Processes custom CSS
- Optimizes output

---

## Routing Strategy

### File-Based Routing

**Current Routes**:
1. `/` → Root page (imports HomePage component)
2. `/home` → Same HomePage component
3. `/registerform` → Registration form

**Route Files**:
```typescript
// app/page.tsx
import HomePage from '@/components/home/HomePage'
export default function page() {
  return <HomePage />
}

// app/registerform/page.tsx
import RigisterFormPage from '@/components/form/RigisterForm'
export const metadata: Metadata = { /* ... */ }
export default function page() {
  return <RigisterFormPage />
}
```

**Benefits**:
- No router configuration needed
- Automatic code splitting
- Built-in lazy loading
- SEO-friendly

---

## State Management

### Current Approach: Local Component State

**Using React Hooks**:
- `useState` for component state
- `useEffect` for side effects
- `useRef` for DOM references

**Example from HomePage**:
```typescript
const [isScrolled, setIsScrolled] = useState(false)
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
```

**Example from RegisterForm**:
```typescript
const [formData, setFormData] = useState<FormData>({ /* ... */ })
const [errors, setErrors] = useState<Record<string, string>>({})
const [touched, setTouched] = useState<Record<string, boolean>>({})
```

**Why Local State?**:
- Application is relatively simple
- No shared state between pages
- Each component manages its own data
- Easy to reason about
- No extra dependencies

**Future Considerations**:
- If state needs to be shared: Context API
- For complex state: Zustand or Jotai
- For server state: TanStack Query (React Query)

---

## Data Flow

### Current Data Flow Architecture

```
Static Data (data.ts)
        ↓
Component Import
        ↓
Component State (useState)
        ↓
Props to Child Components
        ↓
Render UI
```

### Future API Integration Flow

```
API Endpoint
        ↓
Async Data Fetch (Server Component or useEffect)
        ↓
Component State or Server Props
        ↓
Props to Child Components
        ↓
Render UI
```

---

## Performance Considerations

### 1. Code Splitting
- Automatic per-route splitting by Next.js
- Each page loads only necessary code
- Lazy loading for optimal performance

### 2. Font Optimization
- Using `next/font` for Google Fonts
- Fonts self-hosted and optimized
- No flash of unstyled text

### 3. Animation Performance
- CSS transforms for 60fps animations
- `will-change` property for optimized layers
- Intersection Observer for scroll animations
- RequestAnimationFrame for smooth transitions

### 4. Bundle Size
- Minimal dependencies
- Tree-shaking with ES modules
- Production build optimizations

---

## Security Considerations

### Current Implementation

**Client-Side Validation**:
- Input sanitization for special characters
- Email format validation
- Password strength requirements
- XSS prevention with React's built-in escaping

**Areas for Improvement**:
- Add CSRF protection (when API added)
- Implement rate limiting
- Add server-side validation
- Secure authentication tokens
- Environment variable protection

---

## Scalability Patterns

### Current Architecture Scales To:
- Hundreds of pages (Next.js routing)
- Dozens of components (component organization)
- Multiple developers (TypeScript + ESLint)

### Recommended When Scaling:
1. **State Management**: Introduce global state solution
2. **Component Library**: Extract components to separate package
3. **API Layer**: Add service layer for API calls
4. **Testing**: Add Jest + React Testing Library
5. **Storybook**: Document and test components in isolation
6. **Monorepo**: Use Turborepo or Nx for multiple apps

---

## Build Process

### Development
```bash
npm run dev
# Starts development server on http://localhost:3000
# Hot Module Replacement (HMR) enabled
# Fast Refresh for React components
```

### Production Build
```bash
npm run build
# Creates optimized production build
# TypeScript type checking
# CSS optimization and purging
# Code splitting and minification
```

### Production Server
```bash
npm run start
# Serves production build
# Server-Side Rendering
# Optimized performance
```

---

## Error Handling Strategy

### Current Approach

**Form Validation Errors**:
- Field-level validation
- Real-time error display
- Accessibility announcements

**Future Additions**:
- Error boundaries for component crashes
- Global error handling
- Logging service integration
- User-friendly error pages

---

## Testing Strategy (Future)

### Recommended Testing Stack

**Unit Tests**:
- Jest + React Testing Library
- Test custom hooks
- Test validation functions

**Integration Tests**:
- Test component interactions
- Test form submissions
- Test navigation flows

**E2E Tests**:
- Playwright or Cypress
- Test critical user journeys
- Test across browsers

---

## Deployment Architecture (Recommended)

### Vercel (Recommended)
- Zero-config deployment
- Automatic HTTPS
- Edge network CDN
- Preview deployments

### Alternative Options
- **Netlify**: Similar to Vercel
- **AWS Amplify**: AWS integration
- **Docker**: Self-hosted solution

---

## Environment Management

### Current Setup
- No environment variables yet

### Future Setup
```
.env.local          # Local development (git ignored)
.env.development    # Development environment
.env.production     # Production environment
```

**Recommended Variables**:
```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GITHUB_CLIENT_ID=
DATABASE_URL=
JWT_SECRET=
```

---

## Version Control Strategy

### Current Setup
- Git repository initialized
- `.gitignore` configured for:
  - node_modules
  - .next build directory
  - Environment files
  - System files

### Recommended Workflow
- **Main branch**: Production-ready code
- **Develop branch**: Integration branch
- **Feature branches**: Individual features
- **Pull requests**: Code review process

---

Last Updated: February 2026
