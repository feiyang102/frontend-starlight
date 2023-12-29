const router = require("koa-router")();
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const utils = require("../utils");
const md5 = require("md5");
const jwtSecretKey = require("../config")["jwtSecretKey"];

router.post("/login", async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    const res = await User.findOne(
        {
            userName,
            password: md5(password),
        },
        ["userId", "userName", "roleList"]
    );

    const data = res._doc;
    const userPayload = { data };
    const token = await jwt.sign(userPayload, jwtSecretKey, { expiresIn: "1h" });

    if (res) {
        data.token = `Bearer ${token}`;
        ctx.body = utils.success(data);
    } else {
        ctx.body = utils.fail("账号或密码错误！");
    }
});

// 使用 jsonwebtoken 做校验
router.get("/verify", (ctx, next) => {
    console.log("koa-jwt 校验成功")
    // 手动解析 jwt 中的信息
    const token = ctx.request.headers.authorization?.split(" ")[1];
    const data = jwt.verify(token, jwtSecretKey);
    ctx.body = data;
});

// 检验 koa-jwt 的白名单
router.get("/verify2", (ctx, next) => {
    ctx.body = utils.success("测试通过");
});

module.exports = router;
