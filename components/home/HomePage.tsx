'use client'

import { useState, useEffect, useRef } from 'react'
import { courses, features, testimonials, navLinks } from './data'
import type { Course, Feature, Testimonial } from './types'

// ===== CUSTOM HOOKS =====

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

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// ===== MAIN COMPONENT =====

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ===== INLINE COMPONENTS =====

  const FloatingShapes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-magenta)] rounded-full opacity-20 blur-3xl animate-float" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-pink)] rounded-full opacity-20 blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-green)] rounded-full opacity-20 blur-3xl animate-float animation-delay-2000" />
      <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-gradient-to-br from-[var(--neon-pink)] to-[var(--neon-cyan)] rounded-full opacity-15 blur-3xl animate-float-slow animation-delay-4000" />
    </div>
  )

  const TypewriterText = ({ text, className = '' }: { text: string; className?: string }) => {
    const { displayedText, isComplete } = useTypewriter(text, 80)

    return (
      <h1 className={className}>
        {displayedText}
        {!isComplete && <span className="animate-pulse">|</span>}
      </h1>
    )
  }

  const CourseCard = ({ course, index }: { course: Course; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const { ref: revealRef, isVisible } = useScrollReveal()

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * 10
      const rotateY = ((x - centerX) / centerX) * 10

      cardRef.current.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    }

    const handleMouseLeave = () => {
      if (!cardRef.current) return
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    }

    const neonColorClass = {
      cyan: 'text-neon-cyan',
      magenta: 'text-neon-magenta',
      purple: 'text-neon-purple',
      pink: 'text-neon-pink',
      blue: 'text-neon-blue',
      green: 'text-neon-green'
    }[course.neonColor]

    return (
      <div
        ref={revealRef}
        className={`${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div
          ref={cardRef}
          className="glass-strong rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden group">
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs font-semibold ${neonColorClass}`}>
              {course.level}
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2 text-white">{course.title}</h3>
            <p className="text-[var(--text-secondary)] mb-4 line-clamp-2">{course.description}</p>

            <div className="flex items-center gap-4 mb-4 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center gap-1">
                <span>⏱️</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>📚</span>
                <span>{course.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span>{course.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <span className={`text-3xl font-bold ${neonColorClass}`}>${course.price}</span>
                {course.originalPrice && (
                  <span className="text-sm text-[var(--text-secondary)] line-through ml-2">
                    ${course.originalPrice}
                  </span>
                )}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                {course.students.toLocaleString()} students
              </div>
            </div>

            <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 glass hover:glass-strong ${neonColorClass}`}>
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
    const { ref, isVisible } = useScrollReveal()
    const isEven = index % 2 === 0

    const iconMap: Record<string, string> = {
      infinity: '∞',
      users: '👥',
      code: '💻',
      award: '🏆',
      chat: '💬',
      refresh: '🔄'
    }

    return (
      <div
        ref={ref}
        className={`flex flex-col md:flex-row items-center gap-12 ${
          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        } ${isVisible ? (isEven ? 'animate-fade-slide-right' : 'animate-fade-slide-left') : 'opacity-0'}`}
        style={{ animationDelay: `${feature.delay}ms` }}
      >
        <div className="flex-shrink-0">
          <div className={`w-32 h-32 rounded-full glass-strong flex items-center justify-center text-6xl animate-glow-pulse text-${feature.iconColor}`}>
            {iconMap[feature.icon] || '✨'}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-3xl font-bold mb-4 text-white">{feature.title}</h3>
          <p className="text-lg text-[var(--text-secondary)]">{feature.description}</p>
        </div>
      </div>
    )
  }

  const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
    const { ref, isVisible } = useScrollReveal()

    return (
      <div
        ref={ref}
        className={`${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="glass-strong rounded-2xl p-8 h-full hover-lift">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-magenta)] flex items-center justify-center text-2xl font-bold">
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-white">{testimonial.name}</h4>
              <p className="text-sm text-[var(--text-secondary)]">{testimonial.role}</p>
            </div>
          </div>

          <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <span key={i} className="text-yellow-400">⭐</span>
            ))}
          </div>

          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">"{testimonial.quote}"</p>

          {testimonial.verified && (
            <div className="flex items-center gap-2 text-sm text-[var(--neon-green)]">
              <span>✓</span>
              <span>Verified Student</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ===== RENDER =====

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white overflow-x-hidden custom-scrollbar-neon">
      {/* ===== HEADER ===== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 pb-12 pt-12 transition-all duration-300 ${
          isScrolled ? 'glass-strong h-16 shadow-lg border-b border-white/10' : 'bg-transparent h-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4  h-full flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="text-neon-cyan">Kabinesh.</span>
           
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[var(--text-secondary)] hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a href="/registerform">
          <button className="hidden md:block px-6 py-2 cursor-pointer rounded-lg glass-strong text-neon-cyan hover:glass transition-all duration-300">
            Get Started
          </button>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-white mb-1.5" />
            <div className="w-6 h-0.5 bg-white mb-1.5" />
            <div className="w-6 h-0.5 bg-white" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-strong border-t border-white/10">
            <nav className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[var(--text-secondary)] hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="registerform">
              <button className="px-6 py-2 rounded-lg glass text-neon-cyan hover:glass-strong transition-all duration-300">
                Get Started
              </button>
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* ===== HERO SECTION ===== */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden ">
          <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
          <FloatingShapes />

          <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
            <TypewriterText
              text="Master Frontend Development"
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            />

            <h2 className="text-xl md:text-2xl mb-8 animate-gradient-text bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-magenta)] to-[var(--neon-purple)]">
              Learn HTML, CSS, JavaScript, React & More
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="#courses"
                className="px-8 py-4 rounded-lg glass-strong text-neon-cyan hover:glass transition-all duration-300 font-semibold text-lg"
              >
                Explore Courses
              </a>
              <a
                href="#features"
                className="px-8 py-4 rounded-lg border-2 border-[var(--neon-magenta)] text-[var(--neon-magenta)] hover:glass transition-all duration-300 font-semibold text-lg"
              >
                Learn More
              </a>
            </div>

            <div className="flex flex-wrap gap-8 justify-center text-sm">
              <div>
                <div className="text-3xl font-bold text-neon-cyan mb-2">50K+</div>
                <div className="text-[var(--text-secondary)]">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-neon-magenta mb-2">100+</div>
                <div className="text-[var(--text-secondary)]">Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-neon-purple mb-2">4.9/5</div>
                <div className="text-[var(--text-secondary)]">Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== COURSES SECTION ===== */}
        <section id="courses" className="py-24 px-4 bg-[var(--bg-primary)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-gradient-text bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-magenta)] to-[var(--neon-purple)]">
                Featured Courses
              </h2>
              <p className="text-xl text-[var(--text-secondary)]">
                Choose from our comprehensive collection of courses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ===== FEATURES SECTION ===== */}
        <section id="features" className="py-24 px-4 bg-[var(--bg-secondary)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Why Choose Us</h2>
            </div>

            <div className="space-y-16">
              {features.map((feature, index) => (
                <FeatureCard key={feature.id} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS SECTION ===== */}
        <section id="testimonials" className="py-24 px-4 bg-[var(--bg-primary)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Student Success Stories
              </h2>
              <p className="text-xl text-[var(--text-secondary)]">
                Hear what our students have to say
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer id="contact" className="bg-[var(--bg-secondary)] border-t border-white/10 pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-2xl font-bold mb-6 md:mb-0">
              <span className="text-neon-cyan">Frontend</span>
              <span className="text-neon-magenta">Courses</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glass-strong transition-all duration-300 text-neon-cyan">
                𝕏
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glass-strong transition-all duration-300 text-neon-magenta">
                GH
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glass-strong transition-all duration-300 text-neon-purple">
                in
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glass-strong transition-all duration-300 text-neon-blue">
                YT
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-neon-cyan">About</h4>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Team</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-neon-magenta">Courses</h4>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-white transition">HTML/CSS</a></li>
                <li><a href="#" className="hover:text-white transition">JavaScript</a></li>
                <li><a href="#" className="hover:text-white transition">React</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-neon-purple">Resources</h4>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-neon-pink">Contact</h4>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent mb-8" />

          <div className="text-center text-[var(--text-secondary)] text-sm">
            <p>&copy; 2025 Frontend Courses. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
