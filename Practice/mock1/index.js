const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");

const glob = require("glob");
const { resolve } = require("path");
const fs = require("fs");

const app = new Koa();
const router = new Router({ prefix: "/api" });

const routerMap = {};

// 注册日志
app.use(logger());

// 获取接口文件，注册路由
// resolve("./api", "**/*.json") 可以获取完整路径，此时返回 /Users/lufei/programs/frontend-starlight/api/**/*.json
glob.sync(resolve("./api", "**/*.json")).forEach((item, i) => {
    let apiJsonPath = item && item.split('/api')[1];
    let apiPath = apiJsonPath.replace('.json', '');
    routerMap[apiJsonPath] = apiPath;
    
    router.get(apiPath, (ctx, next) => {
        try {
            let jsonStr = fs.readFileSync(item).toString();
            ctx.body = {
                data: JSON.parse(jsonStr),
                state: 200,
                type: 'success'// 自定义响应体
            }
        } catch(err) {
            ctx.throw('服务器错误', 500);
        }
    });
});

app.use(router.routes()).use(router.allowedMethods());

// 生成路由映射图
fs.writeFile('./routerMap.json', JSON.stringify(routerMap, null, 4), err => {
    if(!err) {
        console.log('路由地图生成成功');
    }
});

console.log('服务已启动');
app.listen(3000);