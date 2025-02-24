import NextAuth, { User } from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import { compare } from "bcryptjs"
export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialProvider({
            async authorize (credentials) {
                if(!credentials?.email || !credentials?.password) {
                    return null
                }

                const userExist = await prisma.user.findUnique({
                    where: {
                        email: credentials.email.toString(),
                    }
                })
                if(!userExist) return null

                const isPasswordValid = await compare(credentials.password.toString(), userExist.password)
                if(!isPasswordValid) return null

                return {
                    id: userExist.id,
                    email: userExist.email,
                    name: userExist.fullName,
                } as User
            }
        })
    ],
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.id = user.id;
                token.name = user.name;
            }
            return token
        },
        async session({session, token}) {
            if(session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
            }
            return session
        }
    }
})