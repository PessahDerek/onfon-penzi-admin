import {Avatar, Button, Text, Title} from "@mantine/core";
import {AiFillHeart} from "react-icons/ai";
import {Link, useLocation} from "@tanstack/react-router";
import {PathObj} from "../../global-sec";
import {MdCheck, MdMessage, MdPeople, MdSpaceDashboard} from "react-icons/md";
import {useContext} from "react";
import {AuthContext} from "../contexts/Authorization";
import dayjs from "dayjs";
import avatar from "../assets/avatar.png"
import {presentable} from "../utils/methods";
import {CiLogout} from "react-icons/ci";
import {notifications} from "@mantine/notifications";

export default function LeftPanel() {
    const {context: {username}} = useContext(AuthContext)
    const paths: PathObj[] = [
        {
            name: "Dashboard",
            path: "/",
            icon: MdSpaceDashboard
        },
        {
            name: "Users",
            path: "/users",
            icon: MdPeople
        },
        {
            name: "Messages",
            path: "/messages",
            icon: MdMessage
        }
    ]
    const {href} = useLocation();

    const handle_logout = () => {
        notifications.show({
            title: "Notification", message: "See you later",
            icon: <MdCheck/>
        })
        setTimeout(()=>{
            window.localStorage.clear()
            window.location.reload()
        }, 300)
    }

    return (
        <div className="w-[200px] h-screen grid auto-rows-max gap-2 p-2 bg-white">
            <Title className={'flex h-max bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-700'}>
                <AiFillHeart className={'text-red-500 animate-pulse'} size={22}/> Penzi
            </Title>
            <div className={'w-full h-max p-4 gap-2 grid bg-gradient-to-tr from-purple-100 to-red-100 rounded-xl'}>
                <div className={'w-max h-max flex gap-2'}>
                    <Avatar size={'lg'} src={avatar as string} className={''}/>
                    <Text size={'lg'} className={"font-bold m-auto"}>{presentable(username ?? "")}</Text>
                </div>
                <div className={'h-max'}>
                    <Text size={"sm"}>{dayjs().format("ddd, D MMM YY")}</Text>
                </div>
            </div>
            <div className={'w-full h-[60vh] grid auto-rows-max gap-2'}>
                {paths.map((path, index) => (
                    <Link
                        className={`w-full min-h-[40px] rounded-full flex transition-all active:bg-purple-600 m-auto ${href === path.path ? "bg-purple-500 text-white" : ""}`}
                        href={path.path} key={index}
                    >
                        <span
                            className={"m-auto w-[80%] flex justify-start gap-2"}>
                            {path.icon &&
                                <path.icon
                                    className={`mt-auto mb-auto`}/>}
                            {path.name}
                        </span>
                    </Link>
                ))}
            </div>
            <div className={"mt-auto"}>
                <Button
                    variant={'light'}
                    color={'red'}
                    className={"w-full rounded-full"}
                    leftSection={<CiLogout/>}
                    onClick={handle_logout}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}


