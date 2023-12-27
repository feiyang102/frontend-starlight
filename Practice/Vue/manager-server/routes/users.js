const router = require("koa-router")();
const User = require("../models/userSchema");
const util = require("../utils");
const jwt = require("jsonwebtoken");

// 二级路由
router.prefix("/user");
router.post("/login", async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    const res = await User.findOne(
        {
            userName,
            password,
        },
        "userName"
    ); // 如果有数据，只查询userName ，这样就不会在前端返回password等信息

    const data = res && res._doc;

    const token = jwt.sign(
        {
            data,
        },
        "feiyang",
        { expiresIn: 3000 }
    );

    if (data) {
        data.token = token;
        ctx.body = util.success(data);
    } else {
        ctx.body = util.fail("账号或者密码错误！");
    }
});

router.get("/list", async (ctx) => {
    const { userId, userName, state, pageNum, pageSize } = ctx.request.query;
    const { page, skipIndex } = util.pager(pageNum, pageSize);

    // 格式化参数
    const params = {};
    if (userId) params.userId = userId;
    if (userName) params.userName = userName;
    if (state && state != "0") params.state = state;

    // 根据条件查询用户列表
    const list = await User.find(params, { password: 0 })
        .skip(skipIndex)
        .limit(pageSize);
    const total = await User.countDocuments(params);
    ctx.body = util.success({
        page: {
            ...page,
            total,
        },
        list,
    });
});

router.post("/delete", async (ctx) => {
    // await User.updateOne({ userId }, { userName: "阿飞" });

    // updateMany 批量更新支持 $or 过滤
    // await User.updateMany(
    //     { $or: [{ userId: 100001 }, { userId: 100002 }] },
    //     { state: 2 }
    // );
    // updateMany 批量更新支持 $in 过滤
    // await User.updateMany({ userId: { $in: [100001, 100002] } }, { state: 2 });
    // ctx.body = util.success(res);

    // POST 要在 request.body 中获取数据，GET请求使用的是ctx.request.query
    const { userIds } = ctx.request.body;
    const res = await User.updateMany(
        { userId: { $in: userIds } },
        { state: 2 }
    );
    if (res.modifiedCount) {
        ctx.body = util.success(
            `删除成功，修改${res.modifiedCount}条数据`
        );
    }
});

module.exports = router;
