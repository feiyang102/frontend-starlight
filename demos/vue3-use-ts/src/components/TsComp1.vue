<template>
  <div>你好{{ test }}</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const test = ref<string>('123123asfsd');
test.value = 'Hello TypeScript111'
console.log(test?.value?.hello)
</script>

<style scoped></style>
