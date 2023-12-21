const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const log4js = require("./utils/log4j");
const router = require("koa-router")();

const index = require("./routes/index");
const users = require("./routes/users");
require('./config/db');

// error handler
onerror(app);

// middlewares
app.use(
    bodyparser({
        enableTypes: ["json", "form", "text"],
    })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
    views(__dirname + "/views", {
        extension: "pug",
    })
);

// logger
app.use(async (ctx, next) => {
    await next();
});

//一级路由
router.prefix("/api");
router.use(users.routes());

// routes
app.use(index.routes(), index.allowedMethods());
app.use(router.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
    log4js.error(err);
});

module.exports = app;

// db.article.aggregate([
//     {
//         $group: {
//             _id: "$By",
//             sum_count: { $sum: 1 },
//         },
//     },
// ]);
