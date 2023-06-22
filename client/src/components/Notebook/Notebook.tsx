import styles from './Notebook.module.css'
import Header from '../UI/Header/Header'
import NoteBox from './NoteBox/NoteBox'
import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@/context/UserContext'
import Head from 'next/head'

const Notebook: FC = () => {

	const router = useRouter()
	const { isLogged } = useUserContext()

	useEffect(() => {
		if (!isLogged) {
			router.push('/')
		}
	}, [isLogged])


	return (
		<>
			<Head>
				<title>Notebook | GoodNote</title>
			</Head>

			<div className={styles.content}>
				<Header />
				<NoteBox />
			</div>
		</>
	)
}

export default Notebook
