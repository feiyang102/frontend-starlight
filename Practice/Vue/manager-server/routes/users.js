const router = require("koa-router")();
const User = require("../models/userSchema");
const util = require("../utils");
const jwt = require("jsonwebtoken");

// 二级路由
router.prefix("/user");
router.post("/login", async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    const res = await User.findOne({
        userName,
        password,
    });

    const data = res._doc;

    const token = jwt.sign(
        {
            data,
        },
        "feiyang",
        { expiresIn: 30 }
    );

    if (res) {
        data.token = token;
        ctx.body = util.success(data);
    } else {
        ctx.body = util.fail("账号或者密码错误！");
    }
});

module.exports = router;
