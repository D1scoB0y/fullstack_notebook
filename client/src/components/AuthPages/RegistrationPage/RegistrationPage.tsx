import React, { FC, useEffect, useState } from 'react'
import styles from '@/components/AuthPages/AuthPages.module.css'
import Header from '@/components/UI/Header/Header'
import Link from 'next/link'
import { createUser } from '@/services/userService'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorMessage from '../ErrorMesage/ErrorMessage'

const RegistrationPage: FC = () => {

	const [formData, setFormData] = useState({
        'email': '',
        'password': '',
    })

	const [emailError, setEmailError] = useState<string>('')
	const [passwordError, setPasswordError] = useState<string>('')

	useEffect(() => {

		// Email field validation
		if (!formData.email) {
			setEmailError('')
		} else if (formData.email.length <= 4) {
			setEmailError('Email must be correct')
		} else {
			setEmailError('')
		}

		// Password field validation
		if (!formData.password) {
			setPasswordError('')
		} else if (formData.password.length <= 8) {
			setPasswordError('Password is very weak')
		} else {
			setPasswordError('')
		}

	}, [formData])

	const router = useRouter()

	return (
		<>
			<Head>
				<title>Registration | GoodNote</title>
			</Head>

			<div className={styles.content}>

				<Header />

				<p className={styles.formTitle}>Registration</p>

				<form className={styles.form} noValidate>

					{emailError && <ErrorMessage errorText={emailError} />}

					<input type="text" className={styles.field} value={formData.email} placeholder='Email'
						onChange={(e) => setFormData(prev => ({
							...prev, email: e.target.value,
						}))}
					/>

					{passwordError && <ErrorMessage errorText={passwordError} />}

					<input type="password" className={styles.field} value={formData.password} placeholder='Password'
						onChange={(e) => setFormData(prev => ({
							...prev, password: e.target.value,
						}))}
					/>

					<input
						type="button"
						value="Create new account"
						className={'button ' + styles.formButton}
						onClick={() => {
							createUser(formData.email, formData.password)
							router.push('/login')
						}}
					/>

				</form>
				
				<Link href='/login' className={styles.underFormHref}>
					I already have an account
				</Link>

			</div>
		</>
	)
}

export default RegistrationPage