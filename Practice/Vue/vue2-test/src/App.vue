<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <InputModel v-model="text" />
    <div>{{ text }}</div>
    <InputModel3 v-model="text3" />
    <div>{{ text3 }}</div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import InputModel from "./components/InputModel.vue";
import InputModel3 from "./components/InputModel3.vue";

export default {
  name: "App",
  data() {
    return {
      text: "",
      text3: "",
    };
  },
  components: {
    HelloWorld,
    InputModel,
    InputModel3,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
