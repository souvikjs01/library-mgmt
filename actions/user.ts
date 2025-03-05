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

export const getUserDetails = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                fullName: true,
                createdAt: true,
                universityId: true,
                universityCard: true,
                status: true,
            }
        })
        if(!users) {
            return { success: false, error: "Error fetching users" }
        }
        return { success: true, data: users }
    } catch (error) {
        console.log(error);
        return { success: false, error: "Internal server error" }
    }
}

export const userApproved = async (id: string) => {
    try {
        const result = await prisma.user.update({
            where: {
                id
            },
            data: {
                status: "APPROVED"
            }
        })
        if(result.status !== "APPROVED") {
            return { success: false, error: "Could not approved, Try again Later" }
        }
        return { success: true, msg: "User Approved"}
    } catch (error) {
        console.log(error);
        return { success: false, error: "Internal server error " + error }
    }
}

export const userRevoked = async (id: string) => {
    try {
        const result = await prisma.user.update({
            where: {
                id
            },
            data: {
                status: "REJECTED"
            }
        })
        if(result.status !== "REJECTED") {
            return { success: false, error: "Could not revoked, Try again Later" }
        }
        return { success: true, msg: "User status Revoked" }
    } catch (error) {
        console.log(error);
        return { success: false, error: "Internal server error " + error }
    }
}