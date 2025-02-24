import BookList from '@/components/home/BookList'
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants'
import { signOut } from '@/lib/auth'
import React from 'react'

function page() {
  return (
    <>
        <form action={async() => {
            "use server"
            await signOut()
        }} className=' mb-10'
        >
            <Button>Logout</Button>
        </form>

        <BookList title='Borrowed Books' books={sampleBooks}/>
    </>
  )
}

export default page
