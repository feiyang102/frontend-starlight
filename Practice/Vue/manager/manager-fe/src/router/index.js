import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
import User from "../views/User.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        redirect: "/welcome",
        meta: {
            title: "首页",
        },
        children: [
            {
                path: "/welcome",
                name: "welcome",
                component: () => import("../components/Welcome.vue"),
                meta: {
                    title: "欢迎页",
                },
            },
            {
                path: "/system/user",
                name: "user",
                component: User,
                meta: {
                    title: "用户管理",
                },
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
