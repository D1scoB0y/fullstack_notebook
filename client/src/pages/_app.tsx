import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { UserProvider } from '@/context/UserContext'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session} >
			<UserProvider>
				<Component {...pageProps} />
			</UserProvider>
		</SessionProvider>
	)
}
