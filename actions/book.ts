"use server"

import { prisma } from "@/lib/prisma";
import day from "dayjs"

export const borrowBook = async (params: BorrowBookParams) => {
    const { bookId, userId } = params
    
    try {
        const book = await prisma.book.findUnique({
            where: {
                id: bookId
            },
            select:{
                availableCopies: true,
            }
        });

        if(!book || book.availableCopies <= 0) {
            return { success: false, error: "Book is not available for borrowing"}
        }
        
        // return date using dayjs library:  i.e, 7 days from now.
        const dueDate = day().add(7, 'day').toDate().toISOString();

        const record = await prisma.borrowRecord.create({
            data: {
                userId,
                bookId,
                dueDate,
                status: "BORROWED"
            }
        });
        // update the book details:
        await prisma.book.update({
            where: {
                id: bookId
            },
            data: {
                availableCopies: book.availableCopies - 1
            }
        });
                
        return { success: true, data: JSON.stringify(record)}
    } catch (error) {        
        return { success: false, error: "Internal server error" + error}        
    }
}

export const getBookDetails = async (id: string) => {
    try {
        const book = await prisma.book.findUnique({
            where: {
                id
            }
        })
        if(!book) {
            return {success: false, error: "Error fetching book" }
        }
        return { success: true, data: book }
    } catch (error) {
        console.log(error);
        return { success: false, error: "Internal server error" }
    }
}