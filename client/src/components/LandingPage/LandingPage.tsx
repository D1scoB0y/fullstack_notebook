import { useEffect } from "react"
import { useRouter } from "next/router"
import styles from './LandingPage.module.css'
import Head from "next/head"
import { useUserContext } from "@/context/UserContext"


const LandingPage = () => {
	const router = useRouter()

	const { isLogged } = useUserContext()

	useEffect(() => {
		if (isLogged) {
			router.push('/notebook')
		}
	}, [isLogged])

	return (
		<>
			<Head>
				<title>Landing | GoodNote</title>
			</Head>

			<p className={styles.companyName}>GoodNote</p>

			<div className={styles.slogan}>GoodNote - is the most practical and advanced note manager</div>

			<input
				type="button"
				value="Sign In"
				className={'button ' + styles.button}
				onClick={() => router.push('login')}
			/>

			<input
				type="button"
				value="Create new account"
				className={'button ' + styles.button}
				onClick={() => router.push('registration')}
			/>
		</>
	)
}

export default LandingPage
