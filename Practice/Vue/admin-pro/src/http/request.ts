import axios from "axios";
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 15000,
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.log(error);
    }
);

export default service;