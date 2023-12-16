<template>
    <h1>欢迎来到 vue3 + vite 的世界</h1>
    <router-link to="/detail"><el-button>去详情页</el-button></router-link>
    <el-button @click="gotoWelcome">去主页</el-button>
    <router-view></router-view>

    <div v-for="item in newsList">{{ item.title }}</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { onMounted, ref } from "vue";

const router = useRouter();
const gotoWelcome = function () {
    router.push("/welcome");
};

let newsList = ref([]);

onMounted(async () => {
    const res = await axios.get("https://unidemo.dcloud.net.cn/api/news");
    newsList = res.data;
    console.log(newsList);
});
</script>

<style scoped></style>
