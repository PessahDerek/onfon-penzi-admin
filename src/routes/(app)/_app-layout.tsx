import * as React from 'react'
import {createFileRoute, Outlet} from '@tanstack/react-router'
import LeftPanel from "../../components/LeftPanel";
import ErrorPage from "../../components/ErrorPage";

export const Route = createFileRoute('/(app)/_app-layout')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className={"flex gap-2"}>
            <LeftPanel/>
            <div className={"flex-1 h-screen overflow-y-hidden"}>
                <Outlet/>
            </div>
        </div>
    )
}
