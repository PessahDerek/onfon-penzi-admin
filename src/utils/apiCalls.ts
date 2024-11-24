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

export async function fetchAllUsers(): Promise<AxiosResponse<UserObj[]>> {
    return new Promise((resolve, reject) => {
        try {
            resolve(api.get("/users"))
        } catch (err) {
            reject(err)
        }
    })
}

export async function fetchAllMessages(): Promise<AxiosResponse<MessageObj[]>> {
    return new Promise((resolve, reject) => {
        try {
            resolve(api.get("/messages"))
        } catch (err) {
            reject(err)
        }
    })
}

