import * as React from 'react'
import {useEffect, useMemo} from 'react'
import {createFileRoute, useLoaderData} from '@tanstack/react-router'
import {fetchAllMessages, fetchAllUsers} from "../../../utils/apiCalls";
import ErrorPage from "../../../components/ErrorPage";
import userStore from "../../../stores/users.store";
import {BarChart, DonutChart, DonutChartCell, Sparkline} from "@mantine/charts";
import {Title} from "@mantine/core";
import dayjs from "dayjs";

export const Route = createFileRoute('/(app)/_app-layout/')({
    component: RouteComponent,
    loader: () => Promise.all([fetchAllUsers(), fetchAllMessages()]),
    errorComponent: ErrorPage,
    onError: (error: Error) => {
        // if (error instanceof AxiosError) {
        //     if (error.status == 401)
        //         localStorage.clear()
        // }
    }
})

function RouteComponent() {
    const results = useLoaderData({from: "/(app)/_app-layout/"})
    const {users, messages, setUsers, setMessages} = userStore();

    useEffect(() => {
        try {
            const users = results[0].data ?? []
            const messages = results[1].data ?? []
            setUsers(users)
            setMessages(messages)
        } catch (err) {

        }
    }, [results]);

    const gender_distribution: DonutChartCell[] = useMemo(() => {
        const all_users = [...users.values()]
        return [
            {
                name: "Males", value: all_users.filter(m => m.gender == 'MALE').length, color: "#7171ff"
            },
            {
                name: "Females", value: all_users.filter(m => m.gender == 'FEMALE').length, color: "#FFC0CB"
            }
        ]
    }, [users])


    const message_dates: number[] = useMemo(() => {
        return [...messages.values()].map(m => dayjs(new Date(m.created_at)).hour())
    }, [messages])

    const by_hour_in_day: { hr: number, msg_count: number }[] = useMemo(() => {
        const result = ".".repeat(24).split("").map((_v, i) => i).map((hr) => {
            const msg_count = [...messages.values()].filter(msg => new Date(msg.created_at).getUTCHours() === hr).length
            return {hr, msg_count}
        })
        return result
    }, [messages])

    return (
        <div className={"w-full p-2 space-y-2 columns-2 h-screen overflow-y-auto"}>
            <Title>Dashboard</Title>
            <div className={""}>
                <div className={"w-max p-2 bg-white rounded hover:shadow-md"}>
                    <DonutChart chartLabel={"Gender distribution"} paddingAngle={2} data={gender_distribution}/>
                </div>
            </div>
            <div className={'grid bg-white p-2 rounded'}>
                <Title size={28}>Trend by hour</Title>
                <Sparkline
                    className={"w-full h-[50vh]"}
                    data={message_dates}
                />
            </div>
            <div className={"bg-white p-2 grid gap-2 rounded hover:shadow-md"}>
                <Title>Message distribution by hour of day</Title>
                <BarChart
                    className={"w-full h-[50vh]"}
                    series={[
                        {name: 'msg_count', color: "blue"}
                    ]}
                    dataKey={"hr"}
                    data={by_hour_in_day}
                />
            </div>
        </div>
    )
}
