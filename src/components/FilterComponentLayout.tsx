import {FilterComponentType} from "../../global-sec";
import {useDebouncedCallback} from "@mantine/hooks";
import React from "react";
import {Button, TextInput, Title} from "@mantine/core";
import {MdSearch} from "react-icons/md";


interface props extends FilterComponentType {
    children: React.ReactNode;
    list: (MessageObj | UserObj)[]
    handleFilter: () => void;
    clearFilters: () => void;
    filtered: boolean
}

export default function FilterComponentLayout({
                                                  children,
                                                  setList,
                                                  display,
                                                  list,
                                                  handleFilter,
                                                  filtered,
                                                  clearFilters
                                              }: props) {
    const [_show, setShow] = display ? display : [false, () => {
    }];
    const search = useDebouncedCallback((term: string) => {
        const found = list.filter(u => JSON.stringify(u).toLowerCase().includes(term.toLowerCase()));
        setList(found);
        setShow(found.length > 0)
    }, 300)


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
                {children}
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

