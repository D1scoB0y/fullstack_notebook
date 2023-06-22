import { FC, memo } from 'react'
import styles from './Note.module.css'



const Note: FC<{title: string, text: string}> = ({title, text}) => {
  return (
    <div className={styles.note}>
        <div className={styles.innerNote}>
            <p className={styles.noteTitle}>{title}</p>
            <p className={styles.noteText}>{text}</p>
        </div>
    </div>
  )
}

export default memo(Note)
