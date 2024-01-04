<template>
    <div>login</div>
</template>

<script lang="ts" setup>
// import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue";
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
</script>

<style scoped></style>
