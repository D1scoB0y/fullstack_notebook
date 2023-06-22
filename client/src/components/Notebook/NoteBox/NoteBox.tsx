import React, { useState, useEffect } from 'react'
import Note from './Note/Note'
import type { TypeNote } from '@/services/noteService'
import { updateNote, createNote, deleteNote, getNote, getNotes } from '@/services/noteService'
import styles from './NoteBox.module.css'
import { useUserContext } from '@/context/UserContext'


const NoteBox = () => {
    const [notes, setNotes] = useState<TypeNote[]>([])
    const [noteId, setNoteId] = useState('new')
    const [isUpdated, setIsUpdated] = useState(false)
    const [currentNote, setCurrentNote] = useState<TypeNote>({
        id: '',
        title: '',
        text: '',
    })

    const { id } = useUserContext()

    useEffect(() => {
        if (noteId === 'new') {
            setCurrentNote({
                id: '',
                title: '',
                text: '',
            })
            return
        }

        getNote(noteId, id, setCurrentNote)
    }, [noteId])

    useEffect(() => {
        id && getNotes(id, setNotes)
    }, [id])

  return (
    <div className={styles.noteBox}>

        <div className={styles.explorer}>

            <div className={styles.newNoteButton} onClick={() => {setNoteId('new'); setIsUpdated(false)}}>
                <p className={styles.plusSymbol}>+</p>
                <p className={styles.buttonText}>New Note</p>
            </div>

            <div className={styles.noteBrowser}>
                {notes.map((note) => {
                    return (
                        <div
                            key={note.id}
                            className={styles.noteWrap}
                            onClick={() => {
                                setNoteId(note.id)
                                setIsUpdated(false)
                            }}
                        >
                            <Note title={note.title} text={note.text} />
                        </div>
                    )
                })}
            </div>

        </div>

        <div className={styles.noteTool}>

            <div className={styles.noteToolHeader}>
                {/* Note title input */}
                <input
                    onChange={(e) => {
                        setIsUpdated(true)
                        setCurrentNote((prev) => ({
                            ...prev, title: e.target.value
                        }))
                    }}
                    value={currentNote.title}
                    className={styles.noteTitleInput}
                    type="text"
                    placeholder='Note title'
                />

                {/* Delete button */}
                {(noteId !== 'new') && (
                    <div
                        className={`button ${styles.saveButton} ${styles.deleteButton}`}
                        onClick={() => {
                            id && deleteNote(noteId, id, setNotes)
                            setIsUpdated(false)
                            setNoteId('new')
                        }}
                    >
                        <img className={styles.saveButtonIcon} src="/bin.png" alt="bin icon" />
                        <p className="save-text">Delete</p>
                    </div>
                )}

                {/* Save button */}
                <div
                    className={`button ${styles.saveButton}`}
                    onClick={() => {
                        if (noteId === 'new'){
                            id && createNote(id, currentNote.title, currentNote.text, setNotes, setNoteId)
                            setIsUpdated(false)
                        } else if (isUpdated) {
                            id && updateNote(currentNote, id, setNotes)
                            setIsUpdated(false)
                        }
                        return
                    }}
                >
                    {isUpdated ? (
                        <>
                            <img className={styles.saveButtonIcon} src="/save.png" alt="save icon" />
                            <p className={styles.saveText}>Save</p>
                        </>
                    ) : (
                        <>
                            <img className={styles.saveButtonIcon} src="/check.png" alt="check icon" />
                            <p className={styles.saveText}>Saved</p>
                        </>
                    )}
                </div>
            </div>

            <textarea
                onChange={(e) => {
                    setIsUpdated(true)
                    setCurrentNote((prev) => ({
                        ...prev, text: e.target.value
                    }))
                }}
                value={currentNote.text}
                className={styles.noteTextInput}
                placeholder='Type something!'
            />
        </div>
    </div>
  )
}

export default NoteBox
