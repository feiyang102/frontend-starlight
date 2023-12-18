import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import axios from "axios";
import config from "./config";

axios.get(config.mockApi + 'user/login').then(res => {
    console.log(res);
});

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount("#app");
