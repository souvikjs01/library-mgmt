import Image from 'next/image'
import React from 'react'
import BookCover from './BookCover'
import BorrowBook from './BorrowBook'
import { prisma } from '@/lib/prisma';

interface Props extends Book {
    userId: string;
}

export default async function BookOverview({
    id,
    title, 
    author, 
    genre, 
    rating, 
    totalCopies, 
    availableCopies, 
    coverColor, 
    description, 
    coverUrl,
    userId,
}: Props) {
  const user = await prisma.user.findUnique({
    where: {
        id: userId
    }
  });

  if(!user) return null

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user.status === "APPROVED",
    message: availableCopies <= 0 ? "Book is not available" : "You are not eligible to borrow the book"
  }

  return (
    <div className='book-overview'>
      <div className=' flex flex-1 flex-col gap-5'>
        <h1>{title}</h1>

        <div className='book-info'>
            <p>
                By <span className=' font-semibold text-light-200'>{author}</span>
            </p>

            <p>
                Category{" "}
                <span className=' font-semibold text-light-200'>{genre}</span>
            </p>

            <div>
                <Image src="/icons/star.svg" alt='star' width={22} height={22}/>
                <p>{rating}</p>
            </div>
        </div>

        <div className='book-copies'>
            <p>
                Total Books: <span>{totalCopies}</span>
            </p>

            <p>
                Available Books: <span>{availableCopies}</span>
            </p>
        </div>

        <p className='book-description'>{description}</p>
        <BorrowBook 
            userId={userId}
            bookId={id}
            borrowingEligibility={borrowingEligibility}
        />        
      </div>

      <div className=' relative flex flex-1 justify-center'>
        <div className=' relative'>
            <BookCover 
                varient="wide"
                className='z-10'
                coverColor={coverColor}
                coverImage={coverUrl}
            />
            <div className=' absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden'>
                <BookCover 
                    varient="wide"
                    coverColor={coverColor}
                    coverImage={coverUrl}
                />  
            </div>
        </div>
      </div>
    </div>
  )
}
