<template>
    <div>login</div>
</template>

<script lang="ts" setup>
import { userLogin, LoginRequest } from '@/api/user';

const userInfo: LoginRequest = {
    password: 'admin',
    username: 'admin'
};
userLogin(userInfo)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
</script>

<style scoped></style>
