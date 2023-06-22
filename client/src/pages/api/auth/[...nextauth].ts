import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUser } from '@/services/userService'


const authManager = NextAuth({
	
	session: {
		strategy: 'jwt',
	},

	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {},

			authorize: async (credentials, req) => {
				const { email, password } = credentials as {
					email: string,
					password: string,
				}
				return getUser(email, password)
			},
		}),
	],

	secret: process.env.secret,

	callbacks: {
		jwt: async ({ token, user }) => {
			user && (
				token.id = user.id,
				token.email = user.email
			)
            return token;
		},

		session: async ({ session, token }) => {
			
			if (session && token) {
				session.user.id = token.id

			}

            return session;
		},
	}
});


export default authManager
