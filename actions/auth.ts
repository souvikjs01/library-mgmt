"use server"

import { signIn } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
    const { email, password } = params
    try {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        }) 
        if(!result) {
            return { success: false, error: "credential error" }
        }
        return { success: true }
    } catch (error) {
        console.log("Sig in error ", error);
        return { success: false, error: "Sign in error"}
    }
}

export const signup = async (params: AuthCredentials) => {
    const { fullName, email, password, universityCard, universityId } = params

    // check if user already exist or not:
    const existUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(existUser) {
        return { success: false, error: "User already exist"}
    }
    const hashPassword = await hash(password, 10);

    try {
        await prisma.user.create({
            data: {
                fullName,
                email,
                universityId,
                password: hashPassword,
                universityCard,
            }
        });
        await signInWithCredentials({email, password})
        return {
            success: true
        }
    } catch (error) {
        console.log(error, " sign up error");
        return { success: false, error: "Sign up error" }        
    }

}