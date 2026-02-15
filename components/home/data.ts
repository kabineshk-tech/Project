// Mock data for Frontend Courses Landing Page

import { Course, Feature, Testimonial, NavLink } from './types'

export const courses: Course[] = [
  {
    id: '1',
    title: 'Modern HTML & CSS Masterclass',
    description: 'Build stunning, responsive websites from scratch using the latest HTML5 and CSS3 techniques. Master Flexbox, Grid, animations, and responsive design principles.',
    price: 49.99,
    originalPrice: 99.99,
    duration: '8 weeks',
    level: 'Beginner',
    thumbnail: '/courses/html-css.jpg',
    rating: 4.8,
    students: 12543,
    lessons: 120,
    category: 'HTML/CSS',
    neonColor: 'cyan'
  },
  {
    id: '2',
    title: 'JavaScript Deep Dive',
    description: 'Master JavaScript ES6+ features, async programming, modern development patterns, and build interactive web applications with confidence.',
    price: 79.99,
    originalPrice: 149.99,
    duration: '12 weeks',
    level: 'Intermediate',
    thumbnail: '/courses/javascript.jpg',
    rating: 4.9,
    students: 18920,
    lessons: 180,
    category: 'JavaScript',
    neonColor: 'magenta'
  },
  {
    id: '3',
    title: 'React 19 Complete Guide',
    description: 'Build modern web applications with React 19. Learn hooks, context, state management, and advanced patterns to create production-ready apps.',
    price: 89.99,
    originalPrice: 179.99,
    duration: '10 weeks',
    level: 'Intermediate',
    thumbnail: '/courses/react.jpg',
    rating: 5.0,
    students: 25631,
    lessons: 200,
    category: 'React',
    neonColor: 'purple'
  },
  {
    id: '4',
    title: 'Vue.js Essentials',
    description: 'Discover the progressive JavaScript framework. Learn Vue 3 composition API, Vuex state management, and build scalable applications.',
    price: 69.99,
    originalPrice: 139.99,
    duration: '8 weeks',
    level: 'Intermediate',
    thumbnail: '/courses/vue.jpg',
    rating: 4.7,
    students: 8234,
    lessons: 150,
    category: 'Vue',
    neonColor: 'pink'
  },
  {
    id: '5',
    title: 'TypeScript for Developers',
    description: 'Add type safety to your JavaScript projects. Master TypeScript fundamentals, advanced types, and integrate with popular frameworks.',
    price: 59.99,
    originalPrice: 119.99,
    duration: '6 weeks',
    level: 'Intermediate',
    thumbnail: '/courses/typescript.jpg',
    rating: 4.8,
    students: 15789,
    lessons: 100,
    category: 'TypeScript',
    neonColor: 'blue'
  },
  {
    id: '6',
    title: 'Next.js 16 Full Course',
    description: 'Build full-stack React applications with Next.js 16. Learn Server Components, App Router, API routes, and deployment strategies.',
    price: 99.99,
    originalPrice: 199.99,
    duration: '14 weeks',
    level: 'Advanced',
    thumbnail: '/courses/nextjs.jpg',
    rating: 4.9,
    students: 11234,
    lessons: 220,
    category: 'Next.js',
    neonColor: 'green'
  }
]

export const features: Feature[] = [
  {
    id: '1',
    title: 'Lifetime Access',
    description: 'Get unlimited access to all course materials, forever. Learn at your own pace with no time limits or restrictions.',
    icon: 'infinity',
    iconColor: 'cyan',
    delay: 0
  },
  {
    id: '2',
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of real-world experience building production applications.',
    icon: 'users',
    iconColor: 'magenta',
    delay: 100
  },
  {
    id: '3',
    title: 'Hands-On Projects',
    description: 'Build real applications to solidify your skills and create an impressive portfolio that showcases your abilities.',
    icon: 'code',
    iconColor: 'purple',
    delay: 200
  },
  {
    id: '4',
    title: 'Certificate of Completion',
    description: 'Earn certificates to showcase your achievements and boost your career prospects with verifiable credentials.',
    icon: 'award',
    iconColor: 'pink',
    delay: 300
  },
  {
    id: '5',
    title: 'Community Support',
    description: 'Join a vibrant community of 50,000+ learners. Get help, share knowledge, and network with fellow developers.',
    icon: 'chat',
    iconColor: 'blue',
    delay: 400
  },
  {
    id: '6',
    title: 'Regular Updates',
    description: 'Course content is regularly updated to reflect the latest industry standards, best practices, and framework updates.',
    icon: 'refresh',
    iconColor: 'green',
    delay: 500
  }
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Raja',
    role: 'Frontend Developer',
    avatar: '/avatars/alex.jpg',
    rating: 5,
    quote: 'This React course completely transformed my career. The hands-on projects were invaluable, and I landed my dream job within 3 months of completing it!',
    verified: true
  },
  {
    id: '2',
    name: 'Jessica Lee',
    role: 'UI/UX Designer',
    avatar: '/avatars/jessica.jpg',
    rating: 5,
    quote: 'The HTML & CSS course exceeded my expectations. I can now create stunning, responsive designs with confidence. The instructor explains everything so clearly!',
    verified: true
  },
  {
    id: '3',
    name: 'Sri',
    role: 'Full Stack Developer',
    avatar: '/avatars/david.jpg',
    rating: 5,
    quote: 'Best JavaScript course I have taken. The instructor breaks down complex concepts into easy-to-understand lessons. Highly recommended for anyone serious about web development.',
    verified: true
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    avatar: '/avatars/sarah.jpg',
    rating: 5,
    quote: 'The TypeScript course helped me level up my skills significantly. Now I write more reliable code and feel much more confident in my development abilities.',
    verified: true
  },
  {
    id: '5',
    name: 'Michael Chen',
    role: 'Web Developer',
    avatar: '/avatars/michael.jpg',
    rating: 5,
    quote: 'Next.js course was exactly what I needed to build modern full-stack applications. The production deployment section was particularly valuable.',
    verified: true
  },
  {
    id: '6',
    name: 'Emma Williams',
    role: 'Freelance Developer',
    avatar: '/avatars/emma.jpg',
    rating: 5,
    quote: 'The Vue.js course gave me the skills to take on more complex client projects. The community support is amazing and always ready to help!',
    verified: true
  }
]

export const navLinks: NavLink[] = [
  { label: 'Courses', href: '#courses' },
  { label: 'Features', href: '#features' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' }
]
