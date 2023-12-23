import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
// import Welcome from "../components/Welcome.vue";
// import Detail from "../components/Detail.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        redirect: "/welcome",
        meta: {
            title: "首页"
        },
        children: [
            {
                path: "/welcome",
                name: "welcome",
                component: () => import("../components/Welcome.vue"),
                meta: {
                    title: "欢迎页"
                },
            },
            {
                path: "/detail",
                name: "detail",
                component: () => import("../components/Detail.vue"),
                meta: {
                    title: "详情页"
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
