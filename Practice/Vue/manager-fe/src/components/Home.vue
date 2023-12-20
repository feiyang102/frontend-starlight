<template>
    <div class="container">
        <div class="side"></div>
        <div class="content-right">
            <div class="nav-top">菜单</div>
            <div class="wrapper">
                <div class="main-page">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
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
}

.content-right {
    margin-left: 200px;
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
