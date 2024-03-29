const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const logger2 = require("./utils/logger");
const jwt = require("koa-jwt");
const router = require("koa-router")();
const utils = require("./utils");

const index = require("./routes/index");
const users = require("./routes/users");
const login = require("./routes/login");
const jwtSecretKey = require("./config")["jwtSecretKey"];
require("./config/db");

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
    const start = new Date();
    await next().catch((error) => {
        if (error.status === 401) {
            ctx.body = utils.fail("token令牌未携带或已过期", 50001);
        }
    });

    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(
    jwt({ secret: jwtSecretKey }).unless({
        path: ["/api/login", "/api/verify2"],
    })
);

// routes
router.prefix("/api");
router.use(index.routes());
router.use(users.routes());
router.use(login.routes());
app.use(router.routes());

// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
    logger2.error(err);
});

app.use(async (ctx, next) => {
    await next();
});

module.exports = app;
