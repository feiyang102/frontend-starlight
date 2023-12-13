<script setup>
import { ref, reactive } from "vue";

let obj = ref({ count: 1 });
let proxy = reactive({ count: 3 });

console.log(obj);
console.log(proxy);
</script>

<template>
    <h1 @click="obj.count++">测试！{{ obj.count }}</h1>
    <h1 @click="proxy.count++">测试测试！{{ proxy.count }}</h1>
</template>

<style scoped></style>
