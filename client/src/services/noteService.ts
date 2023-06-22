import { Dispatch, SetStateAction } from "react"
import api from "@/api"

type TypeNote = {
    id: string
    title: string
    text: string
}

type TypeSetNotes = Dispatch<SetStateAction<TypeNote[]>>
type TypeSetCurrentNote = Dispatch<SetStateAction<TypeNote>>
type TypeSetNoteId = Dispatch<SetStateAction<string>>


type TypeGetNotes = (userId: string, setNotes: TypeSetNotes) => Promise<void>
const getNotes: TypeGetNotes= async (userId, setNotes) => {
    try {
        const response = await api.get('/notes', {params: {user_id: userId}})
        setNotes(response.data)
    } catch (e) {
        console.log(e)
    }
}


type TypeGetNote = (noteId: string|null, userId: string|null|undefined, setCurrentNote: TypeSetCurrentNote) => Promise<void>
const getNote: TypeGetNote = async (noteId, userId, setCurrentNote) => {
    const requestConfig = {
        params: {
            user_id: userId 
        }
    }

    try {
        const response = await api.get(`/note/${noteId}`, requestConfig)
        setCurrentNote(response.data)
    } catch (e) {
        console.log(e)
    }
}


type TypeCreateNote = (userId: string, title: string, text: string, setNotes: TypeSetNotes, setNoteId: TypeSetNoteId) => Promise<void>
const createNote: TypeCreateNote = async (userId, title, text, setNotes, setNoteId) => { 

    if (title === '' && text === '') return

    const data = {
        title: title,
        text: text,
        owner_id: userId,
    }

    try {
        const responce = await api.post('/note', data)
        getNotes(userId, setNotes)
        setNoteId(responce.data['id'])
    } catch (e) {
        console.log(e)
    }
}


type TypeDeleteNote = (noteId: string, userId: string, setNotes: TypeSetNotes) => Promise<void>
const deleteNote: TypeDeleteNote =  async (noteId, userId, setNotes) => {
    const requestConfig = {
        params: {
            user_id: userId 
        }
    }
    try {
        await api.delete(`/note/${noteId}`, requestConfig)
        getNotes(userId, setNotes)
    } catch (e) {
        console.log(e)
    }
}


type TypeUpdateNote = (noteData: TypeNote, userId: string, setNotes: TypeSetNotes) => Promise<void>
const updateNote: TypeUpdateNote = async (noteData, userId, setNotes) => {
    const data = {
        id: noteData.id,
        title: noteData.title,
        text: noteData.text,
    }

    try {
        await api.put('/note', data)
        getNotes(userId, setNotes)
    } catch (e) {
        console.log(e)
    }
}


export {
    getNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote,
}

export type {
    TypeNote
}
