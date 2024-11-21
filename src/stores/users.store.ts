import {create} from "zustand/react";


interface UserStoreObj {
    users: Map<number | undefined, UserObj>
    setUsers: (users: UserObj[]) => void
}

const userStore = create<UserStoreObj>((set) => ({
    users: new Map(),
    setUsers: (users: UserObj[]) => {
        const newUsers = new Map(users.map(user => ([user.id, user])))
        set(prev => ({...prev, users: newUsers}))
    }
}));

export default userStore;
