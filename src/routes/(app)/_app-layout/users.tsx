import * as React from 'react'
import {createFileRoute} from '@tanstack/react-router'
import SubpageLayout from "../../../components/SubpageLayout";
import UsersFilter from "../../../components/UsersFilter";

export const Route = createFileRoute('/(app)/_app-layout/users')({
    component: AboutComponent,
})

interface props {
    title: string,
    titles: Array<string>,
    subject: string
    FilterComponent: React.ComponentType<{ setList: React.Dispatch<React.SetStateAction<UserObj[]>> }>
}

function AboutComponent() {
    const titles = ["id", "name", "age", "gender", "phone", "county", "town"];

    return (
        <SubpageLayout
            title={"Users"}
            titles={titles}
            subject={'users'}
            FilterComponent={UsersFilter}
        />
    )
}
