"use server"

import { prisma } from "@/lib/prisma";

export const getAllUser = async () => {
    try {
        const users = await prisma.user.findMany()
        
        if(!users) {
            return { success: false, error: "Error fetching users" }
        }
        return { success: true, data: users }
    } catch (error) {
        console.log(error);
        return { success: false, error: "Internal server error" }
    }
}