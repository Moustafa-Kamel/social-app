import axios from "axios";
import { router } from "../app/router/AppRouter/AppRouter";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})
api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('user_tkn')
        if(token){
            config.headers.token = token;
        }
        return config;
    },
    error => Promise.reject(error)
)

api.interceptors.response.use(
    (config)=>{
        if(config && config.status === 401){
            localStorage.removeItem('user_tkn')
            router.navigate('/login')
        }
        return config;
    },
    error => Promise.reject(error)
)