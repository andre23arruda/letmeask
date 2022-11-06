import { createContext, ReactNode, useEffect, useState } from 'react'
import { firebase, auth } from '../services/firebase'


type User = {
    name: string,
    avatar: string,
    id: string
}

type AuthContextData = {
    user: User | undefined,
    signinWithGoogle: () => Promise<void>,
}

type AuthProviderProps = {
    children: ReactNode,
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>()

    async function signinWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        const response = await auth.signInWithPopup(provider)
        if (response.user) {
            const { displayName, photoURL, uid } = response.user
            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account')
            }
            setUser({
                name: displayName,
                avatar: photoURL,
                id: uid
            })
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user
                if (!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account')
                }
                setUser({
                    name: displayName,
                    avatar: photoURL,
                    id: uid
                })
            // } else {
            //     history.push('/')
            }
        })

        return () => {
            unsubscribe()
        }

        // eslint-disable-next-line
    }, [])

    return (
        <AuthContext.Provider
            value={{ user, signinWithGoogle }}
        >
            { children }
        </AuthContext.Provider>
    )
}