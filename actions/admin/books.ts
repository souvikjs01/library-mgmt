"use server"

import { prisma } from "@/lib/prisma"

export const createBook = async (params: BookParams) => {
    try {
        const newBook = await prisma.book.create({
            data: {
                ...params,
                availableCopies: params.totalCopies
            }
        })
        if(!newBook){
            return {success: false, error: "Failed creating book"}
        }
        return {success: true, data: newBook}
    } catch (error) {
        console.log(error);
        return {success: false, error: "Internal server error"}
    }
}