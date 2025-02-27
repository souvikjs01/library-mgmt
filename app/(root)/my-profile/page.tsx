import BookList from '@/components/home/BookList'
import { sampleBooks } from '@/constants'
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import React from 'react'

async function page() {
  const session = await auth()
  
  const latestBooks = await prisma.book.findMany({
    orderBy: { 
      createdAt: "desc" 
    },
    take: 10,
  }) as Book[];

  return (
    <>
        {/* <form action={async() => {
            "use server"
            await signOut()
        }} className=' mb-10'
        >
            <Button>Logout</Button>
        </form> */}

        {/* <BookList title='Borrowed Books' books={sampleBooks}/> */}
        <BookList 
          title="Latest Books"
          books={latestBooks.slice(1)}
          // containerClassName="mt-20"
        />
    </>
  )
}

export default page
