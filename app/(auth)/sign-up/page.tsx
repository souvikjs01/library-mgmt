'use client'
import AuthForm from '@/components/auth/AuthForm'
import { signUpSchema } from '@/lib/validations'
import React from 'react'

export default function page() {
  return (
    <AuthForm
        type="SIGN-UP"
        schema={signUpSchema}
        defaultValues={{
          email: "",
          password: "",
          fullName: "",
          universityCard: "",
          universityId: 0,
        }}
        onSubmit={() => {}}    
    />
  )
}
