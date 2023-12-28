<template>
    <div class="welcome">
        <div class="sub_title">欢迎体验</div>
        <div class="title">我的会员管理系统</div>
        <div class="description">Vue3+Koa2+MongoDB+node 打造的通用ERP管理系统</div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.welcome {
    background-color: #f6fbff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    height: 100%;
}
.welcome .sub_title {
    font-size: 30px;
    line-height: 42px;
    color: #333;
}
.welcome .title {
    font-size: 40px;
    line-height: 62px;
    color: #387ce5;
}
.welcome .description {
    font-size: 14px;
    line-height: 62px;
    color: #b8b5b5;
    text-align: right;
}
</style>