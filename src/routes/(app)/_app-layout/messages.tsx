import * as React from 'react'
import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_app-layout/messages')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>

        </div>
    )
}
