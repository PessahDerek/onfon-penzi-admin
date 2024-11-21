
import * as React from 'react'
import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import AuthProvider from "../contexts/Authorization";

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <div className={'w-full h-max'}>
            <AuthProvider>
                <Outlet/>
            </AuthProvider>
            <TanStackRouterDevtools position="bottom-right"/>
        </div>
    )
}
