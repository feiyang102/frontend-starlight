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
    }, "userName");// 如果有数据，只查询userName ，这样就不会在前端返回password等信息

    const data = res && res._doc;

    const token = jwt.sign(
        {
            data,
        },
        "feiyang",
        { expiresIn: 30 }
    );

    if (data) {
        data.token = token;
        ctx.body = util.success(data);
    } else {
        ctx.body = util.fail("账号或者密码错误！");
    }
});

module.exports = router;
