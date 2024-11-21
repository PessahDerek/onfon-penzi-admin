import {Button, Image, Title} from "@mantine/core";
import img from "../assets/breakdown.jpg"
import {IoReload} from "react-icons/io5";
import {ErrorComponentProps, Link, useRouter} from "@tanstack/react-router";
import {useQueryErrorResetBoundary} from "@tanstack/react-query";
import {useEffect, useMemo} from "react";
import {AxiosError} from "axios";

export default function ErrorPage({error, info, reset}: ErrorComponentProps) {
    const router = useRouter()
    const queryErrorResetBoundary = useQueryErrorResetBoundary()

    const err = useMemo(() => {
        if (error instanceof AxiosError) {
            return error.response?.status === 401 ? "Please login" : error.response?.data.message
        }
        return error.message
    }, [error])

    useEffect(() => {
        // Reset the query error boundary
        queryErrorResetBoundary.reset()
    }, [queryErrorResetBoundary])

    return (
        <div className={"w-full h-screen bg-white flex"}>
            <div className={'w-max m-auto grid gap-2'}>
                <Image className={"w-1/2 m-auto"} src={img} alt={"network error"}/>
                <Title className={"text-gray-400 text-center"} size={48}>{
                    err
                }</Title>
                <Button radius={'xl'} onClick={() => router.invalidate()} leftSection={<IoReload/>}
                        className={'w-max m-auto'}>
                    Reload
                </Button>
                <Link href={"/"} className={'w-max m-auto text-blue-500'}>
                    Go home
                </Link>
            </div>
        </div>
    )
}

