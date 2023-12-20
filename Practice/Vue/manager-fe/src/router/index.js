import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome.vue";
import Detail from "../components/Detail.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        redirect: "/welcome",
        children: [
            {
                path: "/welcome",
                name: "welcome",
                component: Welcome,
            },
            {
                path: "/detail",
                name: "detail",
                component: Detail,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
