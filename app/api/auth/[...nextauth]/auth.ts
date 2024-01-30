import { NextAuthOptions } from "next-auth"
// https://github.com/vercel/next.js/discussions/50511
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "hhkimmm9"
        },
        password: {
          label: "Password",
          type: "password",
        }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
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
    /*
      - Requests to /api/auth/signin, /api/auth/session and calls to
        getSession(), getServerSession(), useSession() will invoke this
        function.
      - The returned value will be encrypted, and it is stored in a cookie.
     */
    async jwt({ token }) {
      return token
    },
    /*
      - If you want to make something available you added to the token via the
        jwt() callback, you have to explicitly forward it here to make it
        available to the client.
      - Requests to /api/auth/signin, /api/auth/session and calls to
        getSession(), useSession(), /api/auth/session will invoke this
        function.
      - When using database sessions, the User (user) object is passed as an
        argument. When using JSON Web Tokens for sessions, the JWT payload
        (token) is provided instead.
     */
    async session({ session }) {
      return session
    }
  },
}

export default authOptions