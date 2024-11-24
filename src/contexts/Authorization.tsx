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
        const token = context.token ? context.token : localStorage.getItem("token")
        const username = context.username ? context.username : localStorage.getItem("username")
        setContext(prev => ({...prev, token: token ?? "", username: username ?? ""}))
        return token
    }, [context?.token, context?.username])

    const saveToken = (token: string, username: string) => {
        console.log("Saved: ", token)
        localStorage.setItem("logged_in", "1")
        localStorage.setItem("token", token)
        localStorage.setItem("username", username)
        const newVal = {username, token}
        setContext(()=>({...newVal}))
    }

    useEffect(() => {
        if (!token && !localStorage.getItem("token")) {
            console.log("Its me")
            navigate({to: "/auth/auth"}).catch()
        } else navigate({from: "/", to: "/"}).catch()
    }, [token])

    return (
        <AuthContext.Provider value={{context, saveToken: saveToken}}>
            {children}
        </AuthContext.Provider>
    )
}
