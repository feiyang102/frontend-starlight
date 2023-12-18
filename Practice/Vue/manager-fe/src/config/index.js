const env = import.meta.env.MODE;
const envConfig = {
    development: {
        baseApi: "",
        mockApi: "https://mock.apifox.com/m1/3777977-0-default/"
    },
    prod: {
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
    ...envConfig[env]
}