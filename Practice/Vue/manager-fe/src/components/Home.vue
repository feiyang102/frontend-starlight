<template>
    <h1>欢迎来到 vue3 + vite 的世界</h1>
    <router-link to="/detail"><el-button>去详情页</el-button></router-link>
    <el-button @click="gotoWelcome">去主页</el-button>
    <router-view></router-view>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import request from "../utils/request";
import storage from "../utils/storage";

onMounted(() => {
    // 测试 request 请求方法
    // request({
    //     method: "get",
    //     url: "/user/login"
    // }).then(res => {
    //     console.log("请求结果为：", res);
    // });

    // 测试 request.get 请求方法
    // request.get("/user/login").then(res => {
    //     console.log("请求结果为1：", res);
    // });

    // 测试 storage.js 是否正常工作
    storage.setItem("user", { id: 1, desc: "asc", age: 31 });
    console.log(storage.getItem("user"));;
});

const router = useRouter();
const gotoWelcome = function () {
    router.push("/welcome");
};
</script>

<style scoped></style>
