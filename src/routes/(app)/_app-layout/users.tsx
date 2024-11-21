import * as React from 'react'
import {createFileRoute, Link} from '@tanstack/react-router'
import {Table, Title} from "@mantine/core";
import {presentable} from "../../../utils/methods";
import userStore from "../../../stores/users.store";
import UsersFilter from "../../../components/UsersFilter";
import {useMemo} from "react";

export const Route = createFileRoute('/(app)/_app-layout/users')({
    component: AboutComponent,
})

function AboutComponent() {
    const titles = ["id", "name", "age", "gender", "phone", "county", "town"]

    const {users} = userStore()
    const [filtered, setFiltered] = React.useState<UserObj[]>([])

    const show = (user: UserObj, key: string) => {
        const value = user[key]
        return typeof value !== "object" ? value : ""
    }

    const list = useMemo(()=>{
        return filtered.length > 0 ? filtered : [...users.values()]
    }, [filtered, users])
    return (
        <div className="flex-1 h-full space-y-2 p-2">
            <div
                className={'w-full h-[50px] flex justify-end bg-white p-2 rounded-lg border border-solid border-gray-100'}>
                <Title className={"text-purple-900"} size={22}>Users</Title>
            </div>
            <UsersFilter setList={setFiltered} />
            <div className={""}>
                <Table horizontalSpacing={'xs'} highlightOnHover={true} striped={'odd'} className={"bg-white"}>
                    <Table.Thead>
                        <Table.Tr>
                            {titles.map((title, i) => <Table.Th key={i}>{presentable(title)}</Table.Th>)}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {list.map(user => <Table.Tr className={'cursor-pointer hover:text-purple-900'} key={user.id}>
                            {titles.map((title, i) =>
                                <Table.Td key={i}>{
                                    show(user, title)
                                }</Table.Td>
                            )}
                        </Table.Tr>)}
                    </Table.Tbody>
                </Table>
            </div>
        </div>
    )
}
