import axios from "axios";
import config from "../config";
import { ElMessage } from "element-plus";
import router from "../router";
import storage from "../utils/storage";

const NETWORK_ERROR = "网络请求异常，请稍后再试";

const instance = axios.create({
    baseURL: config.baseApi,
    timeout: 8000,
});

// 请求拦截
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        const headers = config.headers;
        const token = storage.getItem("userInfo").token;
        if (!headers.Authorization) {
            headers.Authorization = "Bearer " + token; // jwt token
        }
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截
instance.interceptors.response.use(function (response) {
    const { code, msg } = response.data;
    if (code === 200) {
        return response.data;
    } else if (code === 20001) {
        ElMessage.error(msg);
        setTimeout(() => {
            router.push("/login");
        }, 3000);
        return Promise.reject(msg);
    } else {
        ElMessage.error(msg || NETWORK_ERROR);
    }
});

function request(options) {
    // 对get请求进行特殊处理
    options.method = options.method || "get";
    if (options.method.toLowerCase() === "get") {
        options.params = options.data;
    }

    let isMock = config.mock;
    if(toString.call(options.mock) != "[object Undefined]") {
        isMock = options.mock;
    }

    // 对生产环境进行特殊处理
    if (config.env === "production") {
        instance.defaults.baseURL = config.baseApi;
    } else {
        instance.defaults.baseURL = isMock
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
    return function (url, data, mock) {
        // 参数重载
        if (data == undefined) {
            data = {};
        }
        if (typeof data === "boolean") {
            mock = data;
            data = {};
        }
        return request({
            url,
            data,
            mock,
            method,
        });
    };
};

request.get = _helper("get");
request.post = _helper("post");
request.put = _helper("put");
request.delete = _helper("delete");

export default request;
