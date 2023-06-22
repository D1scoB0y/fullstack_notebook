import { FC } from "react"
import styles from './ErrorMessage.module.css'

const ErrorMessage: FC<{errorText: string}> = ({ errorText }) => {
  return (
    <>
        {errorText && (
            <span className={styles.errorMessage} >{ errorText }</span>
        )}
    </>
  )
}

export default ErrorMessage
