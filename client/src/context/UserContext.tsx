import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";


interface IUserContext {
    id: string|null|undefined,
    email: string|null|undefined,
    isLogged: boolean,
}

const defaultContext: IUserContext = {
    id: '',
    email: '',
    isLogged: false,
}

// Context instance
const UserContext = createContext<IUserContext>(defaultContext)

// Context provider instance
const UserProvider = ({ children }: PropsWithChildren<{}>) => {

    const session = useSession()

    const defaultEmail = session.data?.user?.email
    const defaultId = session.data?.user?.id

    const [isLogged, setIsLogged] = useState<boolean>(!!defaultId)
    const [id, setId] = useState<string|null|undefined>(defaultId)
    const [email, setEmail] = useState<string|null|undefined>(defaultEmail)

    useEffect(() => {
        const id = session.data?.user?.id
        const email = session.data?.user?.email

        setIsLogged(!!email)
        setId(id)
        setEmail(email)
    }, [session])

    return (
        <UserContext.Provider value={{id, email, isLogged}}>
            {children}
        </UserContext.Provider>
    )
}

// useUserContext hook
const useUserContext = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error("useUserContext must be used inside the UserProvider");
    }

    return context
}

export {
    UserProvider,
    useUserContext,
}
