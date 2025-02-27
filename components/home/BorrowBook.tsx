'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { borrowBook } from '@/actions/book';

interface Props {
    userId: string;
    bookId: string;
    borrowingEligibility: {
        isEligible: boolean;
        message: string;
    }
}

function BorrowBook({ 
    userId, 
    bookId, 
    borrowingEligibility: { isEligible, message } 
}: Props) {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false)

  const handleBorrow = async () => {
    if(!isEligible) {
        toast("Error", {
            description: message
        })
    }
    setBorrowing(true)

    try {
        const result = await borrowBook({bookId, userId})
        if(result.success) {
            toast("Success", {
                description: "Book borrowed successfully"
            })
            router.push("/my-profile")
        } else {
            toast("Error", {
                description: "An error occured while borrowing"
            })
        }        
    } catch (error) {
        toast("Error", {
            description: "An error occured while borrowing"
        })
    } finally {
        setBorrowing(false)
    }
  }
  return (
    <Button 
      className="book-overview_btn" 
      onClick={handleBorrow}
      disabled={borrowing}  
    >
        <Image src="/icons/book.svg" alt='book' width={20} height={20}/>
        <p className='text-xl text-dark-100'>
            {borrowing ? 'Borrowing ...' : 'Borrow Book'}
        </p>
    </Button>
  )
}

export default BorrowBook
