import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/style/index.css";
import App from "./App.vue";
import router from "./router/index";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import store from "./store";

const app = createApp(App);
// 引入 element-plus 图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(ElementPlus);
app.use(router);
app.use(store)
app.mount("#app");
