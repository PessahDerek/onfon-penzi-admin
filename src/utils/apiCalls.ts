import {AxiosResponse} from "axios";
import api from "./axios";


export async function handleLogin(body: { username: string, password: string }): Promise<AxiosResponse<
    {
        message: string,
        username: string,
        token: string
    }>> {
    return await api.post('/login', body)
}

export async function fetchAllUsers(): Promise<AxiosResponse<UserObj[]>>{
    return new Promise((resolve, reject)=>{
        try{
            resolve(api.get("/users"))
        } catch (err) {
            reject(err)
        }
    })
}

