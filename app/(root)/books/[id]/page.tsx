import BookOverview from '@/components/home/BookOverview';
import BookVideo from '@/components/home/BookVideo';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation';
import React from 'react'

async function page({ params }: { params: Promise<{id: string}>}) {
  const id = (await params).id

  const session = await auth()
  // fetch data based on the id
  const bookDetails = await prisma.book.findUnique({
    where: {
        id
    }
  });

  if(!bookDetails) redirect('/404')
  

  return (
    <>
        <BookOverview 
            {...bookDetails}
            userId={session?.user?.id!}
        /> 

        <div className='lg:mt-36 mt-16 mb-20 flex flex-col gap-16 lg:flex-row'>
            <div className=' flex-[1.5]'>
                <section className=' flex flex-col gap-7'>
                    <h3 className=' text-xl font-semibold text-primary'>Video</h3>
                    <BookVideo  videoUrl={bookDetails.videoUrl}/>
                </section>
                <section className=' mt-10 flex flex-col gap-7'>
                    <h3 className='text-xl font-semibold text-primary'>Summary</h3>

                    <div className=' space-y-5 text-xl text-light-100'>
                        {bookDetails.summary.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                </section>
            </div>
            {/* similar books */}
        </div>
    </>
  )
}

export default page
