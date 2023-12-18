<template>
    <h1>欢迎来到 vue3 + vite 的世界</h1>
    <router-link to="/detail"><el-button>去详情页</el-button></router-link>
    <el-button @click="gotoWelcome">去主页</el-button>
    <router-view></router-view>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const gotoWelcome = function () {
    router.push("/welcome");
};

</script>

<style scoped></style>
