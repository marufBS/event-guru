"use client"

import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth"
import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from "react"
import { auth, googleProvider } from "@/lib/firebase"

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password)
    }

    const register = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password)
    }

    const loginWithGoogle = async () =>{
        await signInWithPopup(auth,googleProvider)
    }

    const logout = async () => {
        await signOut(auth)
    }

    return (
        <AuthContext.Provider
        value={{user,loading,login,register,loginWithGoogle,logout}}
        >
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth(){
    const context = useContext(AuthContext)

    if(!context){
        throw new Error("useAuth must be used within a AuthProvider")
    }

    return context
}

