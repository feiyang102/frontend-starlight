const env = import.meta.env.MODE;
const envConfig = {
    development: {
        baseApi: "/api",
        mockApi: "https://www.fastmock.site/mock/e2d04eaa9d8fa6fa717af0cc26890d87/api"
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
    mock: true,
    nameSpace: "manager",
    ...envConfig[env]
}