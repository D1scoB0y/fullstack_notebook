import React, { FC, useState } from 'react'
import styles from '@/components/AuthPages/AuthPages.module.css'
import Header from '@/components/UI/Header/Header'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import Head from 'next/head'


const LoginPage: FC = () => {

	const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
	

	const router = useRouter()

	return (
		<>
			<Head>
				<title>Login | GoodNote</title>
			</Head>

			<div className={styles.content}>

				<Header />

				<p className={styles.formTitle}>Sign in</p>

				<form className={styles.form} noValidate>

					<input type="text" className={styles.field} value={formData.email} placeholder='Email'
						onChange={(e) => setFormData(prev => ({
							...prev, email: e.target.value,
						}))}
					/>

					<input type="password" className={styles.field} value={formData.password} placeholder='Password'
						onChange={(e) => setFormData(prev => ({
							...prev, password: e.target.value,
						}))}
					/>

					<input
						type="button"
						value='Sign in'
						className={'button ' + styles.formButton}
						onClick={async () => {
							await signIn('credentials', {
								email: formData.email,
								password: formData.password,
								redirect: false,
							})
							router.push('/')
						}}
					/>

				</form>
				
				<Link href='/login' className={styles.underFormHref}>
					I don't have an account yet
				</Link>

			</div>
		</>
	)
}

export default LoginPage
