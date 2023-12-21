const router = require("koa-router")();
const User = require("../models/userSchema");
const util = require("../utils");

// 二级路由
router.prefix("/user");
router.post("/login", async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    const res = await User.findOne({
        userName,
        password,
    });

    if (res) {
        ctx.body = util.success(res);
    } else {
        ctx.body = util.fail("账号或者密码错误！");
    }
});

module.exports = router;