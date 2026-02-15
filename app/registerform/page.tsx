import RigisterFormPage from '@/components/form/RigisterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register - Create Your Account',
  description: 'Sign up for a new account with email or social authentication. Join us today and get started with a beautiful, secure registration experience.',
}

export default function page() {
  return <RigisterFormPage />
}