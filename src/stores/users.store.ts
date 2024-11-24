import {create} from "zustand/react";


type setUsersFunc = (users: UserObj[]) => void;
type setMessageFunc = (messages: MessageObj[]) => void;

interface UserStoreObj {
    [key: string]: Map<number | undefined, UserObj> | setUsersFunc | Map<number | undefined, MessageObj> | setMessageFunc;

    users: Map<number | undefined, UserObj>
    messages: Map<number | undefined, MessageObj>
    setUsers: (users: UserObj[]) => void
    setMessages: (messages: MessageObj[]) => void
}

const userStore = create<UserStoreObj>((set) => ({
    users: new Map(),
    messages: new Map(),
    setUsers: (users: UserObj[]) => {
        const newUsers = new Map(users.map(user => ([user.id, user])))
        set(prev => ({...prev, users: newUsers}))
    },
    setMessages: (messages: MessageObj[]) => {
        const newMessages = new Map(messages.map(msg => ([msg.id, msg])))
        set(prev => ({...prev, messages: newMessages}))
    }
}));

export default userStore;
