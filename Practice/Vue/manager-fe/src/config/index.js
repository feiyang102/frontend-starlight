const env = import.meta.env.MODE;
const envConfig = {
    development: {
        baseApi: "/api",
        mockApi: "https://mock.apifox.com/m1/3777977-0-default/"
    },
    production: {
        baseApi: "",
        mockApi: ""
    },
    test: {
        baseApi: "",
        mockApi: ""
    }
}

export default {
    env,
    mock: false,
    nameSpace: "manager",
    ...envConfig[env]
}