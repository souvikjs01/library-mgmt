import BookDetails from '@/components/admin/allBooks/BookDetails'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function page({params}: {params: { id: string }}) {
  const { id } = await params
  if (!id){
    return notFound()
  }
  return (
    <>
      <Button asChild className='mb-10 w-fit border border-light-300 bg-white text-xs font-medium text-dark-200 hover:bg-light-300'>
        <Link href='/admin/books'>Go Back</Link>
      </Button>

      <BookDetails id={id}/> 
    
    </>
  )
}
