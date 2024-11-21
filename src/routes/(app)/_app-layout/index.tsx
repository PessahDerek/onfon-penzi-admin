import * as React from 'react'
import {createFileRoute, useLoaderData} from '@tanstack/react-router'
import {fetchAllUsers} from "../../../utils/apiCalls";
import ErrorPage from "../../../components/ErrorPage";
import {useEffect} from "react";
import userStore from "../../../stores/users.store";
import {AxiosError} from "axios";

export const Route = createFileRoute('/(app)/_app-layout/')({
    component: RouteComponent,
    loader: () => Promise.all([fetchAllUsers()]),
    errorComponent: ErrorPage,
    onError: (error: Error) => {
        if (error instanceof AxiosError) {
            if (error.status == 401)
                localStorage.clear()
        }
    }
})

function RouteComponent() {
    const results = useLoaderData({from: "/(app)/_app-layout/"})
    const {setUsers} = userStore()
    useEffect(() => {
        try{
            const users = results[0].data??[]
            setUsers(users)
        } catch (err){

        }
    }, [results]);

    return (
        <div className={"w-full"}>

        </div>
    )
}
