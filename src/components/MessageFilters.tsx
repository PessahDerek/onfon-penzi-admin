import React, {useState} from "react";
import {FilterComponentType} from "../../global-sec";
import FilterComponentLayout from "./FilterComponentLayout";
import userStore from "../stores/users.store";
import {DatePickerInput, DateValue} from "@mantine/dates";
import dayjs from "dayjs";
import {Select} from "@mantine/core";


interface props extends FilterComponentType {

}

// {
//     setList: React.Dispatch<React.SetStateAction<(MessageObj|UserObj)[]>>;
// }

const default_filter = {
    dateFrom: undefined,
    dateTo: undefined,
    user_id: null
}

export default function MessageFilters({setList, display}: props) {
    const {messages, users} = userStore()
    const [_show, setShow] = display ? display : [false, () => {
    }]
    const [filters, setFilters] = useState<{
        dateFrom: DateValue | undefined
        dateTo: DateValue | undefined
        user_id: string | null
    }>({
        dateFrom: undefined,
        dateTo: undefined,
        user_id: null
    })
    const [filtered, setClearFiltered] = useState(false)

    const handleFilter = () => {
        const list = [...messages.values()]
            .filter(msg => {
                if (filters.dateFrom && !(dayjs(msg.created_at).isAfter(new Date(filters.dateFrom)) || dayjs(filters.dateFrom).isSame(dayjs(msg.created_at)))) {
                    return false
                }
                if (filters.dateTo && !(dayjs(msg.created_at).isBefore(dayjs(filters.dateTo)) || dayjs(filters.dateTo).isSame(dayjs(msg.created_at))))
                    return false
                return !(filters.user_id && (msg.user_id != Number(filters.user_id)));

            })
            .map(msg => msg)
        setList(list)
        setClearFiltered(true)
    }
    const clearFilters = () => {
        setFilters(() => ({...default_filter}))
        setList([])
        setShow(true)
        setClearFiltered(false)
    }

    return (
        <FilterComponentLayout
            list={[...messages.values()]}
            display={display}
            setList={setList}
            handleFilter={handleFilter}
            clearFilters={clearFilters}
            filtered={filtered}
        >
            <DatePickerInput
                clearable
                radius={'xl'}
                placeholder={'Date from'}
                value={filters.dateFrom}
                onChange={val =>
                    setFilters(p => ({...p, dateFrom: val}))
                }
            />
            <DatePickerInput
                clearable
                radius={'xl'}
                placeholder={'Date to'}
                value={filters.dateTo}
                onChange={val => setFilters(p => ({...p, dateTo: val}))}
            />
            <Select
                radius={'xl'}
                clearable
                placeholder={'Sort by User Id'}
                value={filters.user_id}
                onChange={val => setFilters(p => ({...p, user_id: val}))}
                data={[...users.keys()].map(id => id?.toString() ?? "")}
            />
        </FilterComponentLayout>
    )
}

