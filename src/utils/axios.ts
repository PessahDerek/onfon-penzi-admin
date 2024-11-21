import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/admin",
})

api.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token') ?? "";
    return config;
})

api.interceptors.response.use(config => config, error => {
    if (error.status == 401) {
        localStorage.clear()
        window.location.href = "/auth/auth"
    }
    return error
})

export default api
