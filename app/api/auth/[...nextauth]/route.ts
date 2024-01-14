import NextAuth from "next-auth/next"
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // email: {
        //   label: "Email",
        //   type: "email",
        // },
        password: {
          label: "Password",
          type: "password",
        }
      },
      async authorize(credentials, req) {
        const res = await fetch(`/api/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        })
        const user = await res.json()

        if (res.ok && user) {
          return user
        }
        return null
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login'
  },
  callbacks: {
    async jwt(
      { token, user, trigger, session } :
      { token: any, user: any, trigger: any, session:any }
    ) {
      if (trigger === "update") {
        return { ...token, ...session.user, }
      }
      return { ...token, ...user, }
    },
    async session(
      { session, token } :
      { session: any, token: any }
    ) {
      session.user = token
      return { ...session }
    }
  },
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // email: {
        //   label: "Email",
        //   type: "email",
        // },
        password: {
          label: "Password",
          type: "password",
        }
      },
      async authorize(credentials, req) {
        const res = await fetch(`/api/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        })
        const user = await res.json()

        if (res.ok && user) {
          return user
        }
        return null
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login'
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user, }
      }
      return { ...token, ...user, }
    },
    async session({ session, token }) {
      session.user = token
      return { ...session }
    }
  },
})

export { handler as GET, handler as POST }