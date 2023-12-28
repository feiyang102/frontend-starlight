<template>
    <template v-for="menu of props.menuList" :key="menu._id">
        <el-sub-menu
            v-if="
                menu.children &&
                menu.children.length > 0 &&
                menu.children[0].menuType == 1
            "
            :index="menu.path"
        >
            <template #title>
                <el-icon><component :is="menu.icon" /></el-icon>
                <span>{{ menu.menuName }}</span>
            </template>
            <tree-menu :menu-list="menu.children"></tree-menu>
        </el-sub-menu>
        <el-menu-item v-else-if="menu.menuType == 1" :index="menu.path">{{
            menu.menuName
        }}</el-menu-item>
    </template>
</template>

<script setup>
import { defineProps } from "vue";
import TreeMenu from "./TreeMenu.vue";

// defineProps(["menuList"]);
const props = defineProps(["menuList"]);
</script>

<style scoped></style>
