import axios from "axios";
import config from "../config";
import ElMessage from "element-plus";

const NETWORK_ERROR = "网络请求异常，请稍后再试";

const instance = axios.create({
    baseURL: config.baseApi,
    timeout: 8000,
});

// 请求拦截
axios.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        const headers = config.headers;
        if (!headers.Authorization) {
            headers.Authorization = ""; // jwt
        }
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截
axios.interceptors.response.use(function (response) {
    const { code, message } = response.data;
    if (code === 200) {
        return response.data;
    } else {
        ElMessage.error(message || NETWORK_ERROR);
    }
});

function request(options) {
    // 对get请求进行特殊处理
    options.method = options.method || "get";
    if (options.method.toLowerCase() === "get") {
        options.params = options.data;
    }

    // 对生产环境进行特殊处理
    if (config.env === "production") {
        instance.defaults.baseURL = config.baseApi;
    } else {
        instance.defaults.baseURL = config.mock
            ? config.mockApi
            : config.baseApi;
    }

    return instance(options);
}

// 这种写法没有提示词，所以换了一种写法
// ["get", "post", "put", "delete"].forEach((item) => {
//     request[item] = function (url, data) {
//         return request({
//             url,
//             data,
//             method: item,
//         });
//     };
// });

const _helper = function (method) {
    return function (url, data) {
        return request({
            url,
            data,
            method,
        });
    }
};

request.get = _helper("get");
request.post = _helper("post");
request.put = _helper("put");
request.delete = _helper("delete");

export default request;
