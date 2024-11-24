import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/admin",
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": true,
        "Access-Control-Allow-Credentials": true,
        "Authorization": "Bearer "+localStorage.getItem("token"),
    },
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    console.log("Token: ", token)
    config.headers.Authorization = `Bearer ${token ? token : ""}`;
    return config;
})

api.interceptors.response.use(config => config, error => {
    console.log("error like: ",error)
    if (error.status == 401) {
        localStorage.clear()
        console.log("I'm running")
        window.location.href = "/auth/auth"
    }
    return error
})

export default api
