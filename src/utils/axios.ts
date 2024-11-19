


import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/admin",
})

api.interceptors.request.use(config => {
    config.headers.Authorization = 'Basic ' + localStorage.getItem('token');
    return config;
})

export default api
