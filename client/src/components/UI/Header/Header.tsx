import Link from 'next/link'
import styles from './Header.module.css'
import { signOut } from 'next-auth/react'
import { useUserContext } from '@/context/UserContext'


const Header = () => {

	const { isLogged, email } = useUserContext()

	return (
		<div className={styles.header}>
            <div className={styles.innerHeader}>
                <Link href='/'>
                    <p className={styles.headerCompanyName}>GoodNote</p>
                </Link>

                {isLogged && (
                    <div className={styles.userBox}>
                        <p className={styles.headerUserEmail}>{email}</p>

						<input
							type="button"
							value="Logout"
							className={'button ' + styles.headerButton}
							onClick={() => signOut()}
						/>

                    </div>
                )}
            </div>
        </div>
	)
}

export default Header
