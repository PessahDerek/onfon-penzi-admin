import * as React from 'react'
import {useMemo, useState} from 'react'
import {Table, Text, Title} from "@mantine/core";
import userStore from "../stores/users.store";
import {presentable} from "../utils/methods";
import {FilterComponentType} from "../../global-sec";

interface props {
    title: string,
    titles: Array<string>,
    subject: string;
    FilterComponent: React.ComponentType<FilterComponentType>
}

export default function SubpageLayout({title, titles, subject, FilterComponent}: props) {
    const store = userStore()
    const [filtered, setFiltered] = React.useState<(UserObj | MessageObj)[]>([])

    const show = (user: UserObj | MessageObj, key: string) => {
        const value = user[key]
        return typeof value !== "object" ? value : ""
    }

    const list = useMemo(() => {
        return filtered.length > 0 ? filtered : [...(store[subject] as Map<number, UserObj>).values()]
    }, [filtered, store, subject])
    const [display, setDisplay] = useState(true)


    return (
        <div className="flex-1 max-h-screen grid gap-2 auto-rows-max p-2">
            <div className={'w-full h-[50px] z-30 sticky top-2 flex justify-end bg-white p-2 rounded-lg border ' +
                'border-solid border-gray-100'}
            >
                <Title className={"text-purple-900 relative"} size={22}>{title}</Title>
            </div>
            <FilterComponent
                display={[display, setDisplay]}
                setList={setFiltered}
            />
            <div className={"max-h-[90vh] overflow-y-auto"}>
                <Table
                    stickyHeader={true}
                    horizontalSpacing={'xs'}
                    highlightOnHover={true}
                    striped={'odd'}
                    className={"bg-white"}
                >
                    <Table.Thead>
                        <Table.Tr>
                            {titles.map((title, i) =>
                                <Table.Th key={i}>
                                    {presentable(title)}
                                </Table.Th>)}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {display ?
                            list.map(user =>
                                <Table.Tr className={'cursor-pointer hover:text-purple-900'} key={user.id}>
                                    {titles.map((title, i) =>
                                        <Table.Td key={i}>
                                            {show(user, title)}
                                        </Table.Td>
                                    )}
                                </Table.Tr>)
                            :
                            <Table.Tr>
                                <Table.Td>Not found</Table.Td>
                            </Table.Tr>
                        }
                    </Table.Tbody>
                </Table>
            </div>
        </div>
    )
}
