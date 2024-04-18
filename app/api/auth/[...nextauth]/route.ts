import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: 'b84c98174af0ee6a9d1a',
      clientSecret: '0e47830226d7fef6a4e42da7e1866eac3ff62569'
    })
  ]
})

export const { GET, POST } = handlers
