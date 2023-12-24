<template>
    <div class="container">
        <div :class="['side', isCollapse ? 'collapse' : 'expand']">
            <div class="logo">
                <img src="../assets/images/star.svg" />
                <span v-show="!isCollapse">manager</span>
            </div>
            <!-- <tree-menu :collapse="isCollapse" :menuList="menuList"></tree-menu> -->
            <el-menu
                :collapse="isCollapse"
                background-color="#041527"
                text-color="fff"
                router
            >
                <tree-menu :menuList="menuList"></tree-menu>
            </el-menu>
        </div>
        <div :class="['content-right', isCollapse ? 'collapse' : 'expand']">
            <div class="nav-top">
                <div class="menu">
                    <el-icon @click="handleToggleMenu"
                        ><Fold v-show="!isCollapse" /><Expand
                            v-show="isCollapse"
                    /></el-icon>
                    <span>
                        <BreadCrumb />
                    </span>
                </div>
                <div class="user-info">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            <el-badge
                                :is-dot="notifyCount > 0 ? true : false"
                                class="notify"
                                ><el-icon><Bell /></el-icon
                            ></el-badge>
                            <span>{{ userInfo.userName }}</span>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="a"
                                    >邮箱
                                    {{ userInfo.userEmail }}</el-dropdown-item
                                >
                                <el-dropdown-item command="logout"
                                    >退出</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div class="wrapper">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { notify, getMenuList } from "../api";
import TreeMenu from "../components/TreeMenu.vue";
import BreadCrumb from "../components/BreadCrumb.vue";

const route = new useRouter();
const store = new useStore();

// store.state.userInfo 本身就是响应式数据
const userInfo = store.state.userInfo;
// const userInfo = ref(store.state.userInfo);

/**
 * 侧边导航栏
 */
// 控制显示和隐藏
const isCollapse = ref(false);
const handleToggleMenu = function () {
    isCollapse.value = !isCollapse.value;
};

// 动态渲染表单相关
const menuList = ref([]);
const handleMenuList = async function () {
    const res = await getMenuList();
    menuList.value = res.data;
};


// 顶部会员信息
const handleCommand = function (command) {
    if (command === "logout") {
        store.commit("saveUserInfo", "");
        route.push("/login");
    }
};
let notifyCount = ref(0);
const getNotifyCount = async function () {
    const res = await notify();
    notifyCount.value = res.count;
};

getNotifyCount();
handleMenuList();
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

</style>
