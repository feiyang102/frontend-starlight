<template>
    <div class="container">
        <div :class="['side', isCollapse ? 'collapse' : 'expand']">
            <div class="logo">
                <img src="../assets/images/star.svg" />
                <span v-show="!isCollapse">manager</span>
            </div>
            <el-menu
                :collapse="isCollapse"
                background-color="#041527"
                text-color="fff"
            >
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon><Grid /></el-icon>
                        <span>系统管理</span>
                    </template>
                    <el-menu-item index="1-1">用户管理</el-menu-item>
                    <el-menu-item index="1-2">菜单管理</el-menu-item>
                    <el-menu-item index="1-3">角色管理</el-menu-item>
                    <el-menu-item ndex="1-4">部门管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon><Promotion /></el-icon>
                        <span>系统管理</span>
                    </template>
                    <el-menu-item index="2-1">
                        <span>休假管理</span>
                    </el-menu-item>
                    <el-menu-item index="2-2">
                        <span>待我审批</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
        <div :class="['content-right', isCollapse ? 'collapse' : 'expand']">
            <div class="nav-top">
                <div class="menu" @click="handleToggleMenu">
                    <el-icon><Fold v-show="!isCollapse" /><Expand v-show="isCollapse" /></el-icon>
                    <span>菜单</span>
                </div>
                <div class="user-info">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            <el-badge is-dot class="notify"
                                ><el-icon><Bell /></el-icon
                            ></el-badge>
                            <span>{{ userInfo.name }}</span>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="a">{{
                                    userInfo.email
                                }}</el-dropdown-item>
                                <el-dropdown-item command="logout"
                                    >退出</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div class="wrapper">
                <div class="main-page">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const route = new useRouter();
const store = new useStore();

const userInfo = ref({
    name: "666",
    email: "123132132@qq.com",
});

const isCollapse = ref(false);
const handleToggleMenu = function () {
    isCollapse.value = !isCollapse.value;
};

const handleCommand = function (command) {
    if (command === "logout") {
        store.commit("saveUserInfo", "");
        route.push("/login");
    }
    console.log(command);
};
</script>

<style scoped>
.container {
    position: relative;
}

.side {
    position: fixed;
    width: 200px;
    height: 100%;
    color: #fff;
    background-color: #001529;
    transition: width 0.7s;
}

.side.collapse {
    width: 64px;
}
.side.expand {

}

.logo {
    margin: 15px auto;
    padding: 0 10px;
    display: flex;
    align-items: center;
}
.logo img {
    height: 40px;
}
.logo span {
    font-size: 18px;
    margin-left: 20px;
}

.el-menu {
    border-right: none;
}

.el-menu--vertical {
    height: calc(100vh - 70px);
    /* overflow: scroll; */
}

/* 顶部菜单栏伸缩按钮 */
.menu,
.user-info {
    display: flex;
    align-items: center;
}

.menu span,
.user-info span {
    padding-left: 10px;
    font-size: 16px;
}

.menu:hover {
    cursor: pointer;
}

.user-info {
    margin-right: 20px;
}

.user-info :hover {
    cursor: pointer;
}

.user-info .notify {
    line-height: 16px;
}

.content-right {
    transition: margin-left 0.7s;
}
.content-right.collapse {
    margin-left: 64px;
}
.content-right.expand {
    margin-left: 200px;
}

.el-dropdown :focus-visible {
    outline: none;
}

.nav-top {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between; /* 两端对齐 */
    padding: 0 20px;
}

.wrapper {
    background-color: #eef0f3;
    height: calc(100vh - 50px);
    padding: 20px;
}

.main-page {
    background-color: #fff;
    height: 100%;
    padding: 20px;
}
</style>
