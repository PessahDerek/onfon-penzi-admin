import * as React from 'react'
import {createFileRoute} from '@tanstack/react-router'
import SubpageLayout from "../../../components/SubpageLayout";
import MessageFilters from "../../../components/MessageFilters";

export const Route = createFileRoute('/(app)/_app-layout/messages')({
    component: RouteComponent,
})

function RouteComponent() {
    const titles = ['id', 'user_id', 'phone', 'message', 'msg_type', 'created_at']
    return (
        <SubpageLayout
            title={"Messages"}
            titles={titles}
            subject={'messages'}
            FilterComponent={MessageFilters}
        />
    )
}
