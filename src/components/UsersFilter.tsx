import {Button, Select, TextInput, Title} from "@mantine/core";
import React, {useMemo, useState} from "react";
import {MdSearch} from "react-icons/md";
import userStore from "../stores/users.store";
import {useDebouncedCallback} from "@mantine/hooks";
import {FilterComponentType} from "../../global-sec";
import FilterComponentLayout from "./FilterComponentLayout";

const default_filter = {
    search: "",
    age: {
        min: 18,
    },
    county: "",
    town: "",
    gender: ""
}

interface props extends FilterComponentType {

}

export default function UsersFilter({setList, display}: props) {
    const [filters, setFilters] = useState<UserFilterObj>({
        age: {
            min: 18,
        },
        county: "",
        town: "",
        gender: undefined
    });
    const [filtered, setClearFiltered] = useState(false)
    const {users} = userStore();
    const [_found, setShow] = display ? display : [false, () => {
    }]

    const {genders, counties, towns} = useMemo(() => {
        return {
            genders: [...new Set([...users.values()].map(f => f.gender))],
            counties: [...new Set([...users.values()].map(f => f.county.toLowerCase()))],
            towns: [...new Set([...users.values()].map(f => f.town.toLowerCase()))],
        }
    }, [users])

    const search = useDebouncedCallback((term: string) => {
        const found = [...users.values()].filter(u => JSON.stringify(u).toLowerCase().includes(term.toLowerCase()));
        setList(found);
        setShow(found.length > 0)
    }, 300)

    const handleFilter = () => {
        const list = [...users.values()]
            .filter(user => {
                const max = filters.age.max
                if (max && (user.age > max))
                    return false;
                if (user.age < filters.age.min)
                    return false;
                if (filters.town && (user.town.toLowerCase() != filters.town))
                    return false;
                if (filters.county && (user.county.toLowerCase() != filters.county))
                    return false;
                return !(filters.gender && (user.gender != filters.gender));

            })
            .map(user => user)
        setList(list)
        setClearFiltered(true)
    }
    const clearFilters = () => {
        setFilters(() => ({
            ...default_filter
        }))
        setList([])
        setShow(true)
        setClearFiltered(false)
    }

    return (
        <FilterComponentLayout
            list={[...users.values()]}
            display={display}
            setList={setList}
            handleFilter={handleFilter}
            clearFilters={clearFilters}
            filtered={filtered}
        >
            <TextInput
                value={filters.age.max}
                onChange={e => setFilters(p => ({...p, age: {...p.age, max: Number(e.target.value)}}))}
                radius={'xl'} placeholder={"Max age"} type={'number'}/>
            <TextInput
                value={filters.age.min}
                onChange={(e) => setFilters(p => ({...p, age: {...p.age, min: Number(e.target.value)}}))}
                radius={'xl'} placeholder={"Min age"} type={'number'}/>
            <Select
                value={filters.gender}
                onChange={val => setFilters(p => ({...p, gender: val ?? ""}))}
                radius={'xl'} placeholder={'Gender'} data={genders}/>
            <Select
                value={filters.county}
                onChange={val => setFilters(p => ({...p, county: val ?? ""}))}
                placeholder={'County'} data={counties} radius={'xl'}/>
            <Select
                value={filters.town ?? null}
                onChange={val => setFilters(p => ({...p, town: val ?? ""}))}
                placeholder={'Town'} data={towns} radius={'xl'}/>
                {/*<Button radius={'xl'} onClick={handleFilter}>*/}
                {/*    Filter*/}
                {/*</Button>*/}
                {/*{filtered &&*/}
                {/*    <Button onClick={clearFilters} radius={'xl'} color={'red'} variant={'light'}>*/}
                {/*        Clear*/}
                {/*    </Button>}*/}
            </FilterComponentLayout>
            )

            return (
            <div className={"bg-white p-2 grid gap-2"}>
                <Title size={'md'}>Filter</Title>
                <div className={"grid gap-2 grid-flow-col"}>
                    <TextInput
                        onChange={e => {
                            search(e.target.value)
                        }}
                        radius={'xl'}
                        leftSection={<MdSearch/>}
                        placeholder={'Search...'}
                    />
                    <TextInput
                        value={filters.age.max}
                        onChange={e => setFilters(p => ({...p, age: {...p.age, max: Number(e.target.value)}}))}
                        radius={'xl'} placeholder={"Max age"} type={'number'}/>
                    <TextInput
                        value={filters.age.min}
                        onChange={(e) => setFilters(p => ({...p, age: {...p.age, min: Number(e.target.value)}}))}
                        radius={'xl'} placeholder={"Min age"} type={'number'}/>
                    <Select
                        value={filters.gender}
                        onChange={val => setFilters(p => ({...p, gender: val ?? ""}))}
                        radius={'xl'} placeholder={'Gender'} data={genders}/>
                    <Select
                        value={filters.county}
                        onChange={val => setFilters(p => ({...p, county: val ?? ""}))}
                        placeholder={'County'} data={counties} radius={'xl'}/>
                    <Select
                        value={filters.town ?? null}
                        onChange={val => setFilters(p => ({...p, town: val ?? ""}))}
                        placeholder={'Town'} data={towns} radius={'xl'}/>
                    <Button radius={'xl'} onClick={handleFilter}>
                        Filter
                    </Button>
                    {filtered &&
                        <Button onClick={clearFilters} radius={'xl'} color={'red'} variant={'light'}>
                            Clear
                        </Button>}
                </div>
            </div>
            )
            }

