import api from '@/api'


type TypeUserOperation = (
    email: string,
    password: string,
) => Promise<void>

const createUser: TypeUserOperation = async (email, password) => {
    // User creation
    try {
        await api.post('/registration', {
            email: email,
            password: password
        })
    } catch (e) {
        console.log(e)
    }
}

type TypeUserData = {
    id: string,
    email: string,
}


type TypeGetUser = (email: string, password: string) => Promise<TypeUserData|null>
const getUser: TypeGetUser = async (email, password) => {

    const data = JSON.stringify(
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
    )

    const requestConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    try {
        const response = await api.post('/login', data, requestConfig)
        return response.data
    } catch (e) {
        console.log(e)
        return null
    }
}


export type {
    TypeUserData,
}

export {
    createUser,
    getUser,
}
