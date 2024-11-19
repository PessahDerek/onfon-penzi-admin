import React, {createContext, useEffect, useMemo, useState} from 'react'
import {useNavigate} from "@tanstack/react-router";

export const AuthContext = createContext<{
    context: AuthContextObj,
    saveToken: (token: string, username: string) => void
}>({
    context: {},
    saveToken: () => {
    },
})

export default function AuthProvider({children}: { children: React.ReactNode }) {
    const [context, setContext] = useState<AuthContextObj>({
        username: "",
        token: "",
    })
    const navigate = useNavigate({from: "/"})
    const token = useMemo(() => {
        return context.token ? context.token : localStorage.getItem("token")
    }, [context?.token])

    const saveToken = (token: string, username: string) => {
        localStorage.setItem("token", token)
        setContext({username, token})
    }

    useEffect(() => {
        console.log("Context: ", context)
        if (!token)
            navigate({to: "/auth"}).catch()
        else navigate({from: "/", to: "/"}).catch()
    }, [token])

    return (
        <AuthContext.Provider value={{context, saveToken: saveToken}}>
            {children}
        </AuthContext.Provider>
    )
}
