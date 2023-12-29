const router = require("koa-router")();
const Counter = require("../models/counterSchema");
const User = require("../models/userSchema");
const utils = require("../utils");
const logger = require("../utils/logger");

router.prefix("/users");

router.get("/list", async (ctx) => {
    const {
        userName,
        state = 0,
        pageNum = 0,
        pageSize = 10,
    } = ctx.request.query;
    const { page, skipIndex } = utils.pager(pageNum, pageSize);
    console.log(pageNum, pageSize);
    // 格式化参数
    const params = {};
    if (userName) params.userName = userName;
    if (state && state != 0) params.state = state;

    // 根据条件查询用户列表
    const list = await User.find(params, { password: 0 })
        .skip(skipIndex)
        .limit(pageSize);
    const total = await User.countDocuments(params);
    ctx.body = utils.success({
        page: {
            ...page,
            total,
        },
        list,
    });
});

router.post("/create", async (ctx) => {
    const { userName, userEmail, state = 3 } = ctx.request.body;

    // 1、检测用户信息
    if (!userName || !userEmail) {
        ctx.body = utils.fail("userName/userEmail不能为空");
        return;
    }

    /*
        2、检查用户信息是否已存在
    */
    const userInfo = await User.findOne(
        {
            $or: [{ userName }, { userEmail }],
        },
        ["userName"]
    );

    if (userInfo) {
        ctx.body = utils.fail("用户信息已存在");
        return;
    }

    /*
        3、获取自增后的userId：获取到 counters 集合中 userid 的最大值，自增1后返回
    */
    const { sequence_value } = await Counter.findOneAndUpdate(
        { _id: "userid" },
        { $inc: { sequence_value: 1 } },
        { new: true }
    );

    /*
        4. 创建用户
    */
    // const user = new User({
    //     userId,
    //     userName,
    //     userEmail
    // });
    // user.save();

    const newUser = { userId: sequence_value, userName, userEmail, state };
    User.create(newUser);
    ctx.body = utils.success("用户创建成功");
});

router.post("/delete", async (ctx) => {
    // 如果我们只更新一条数据可以这样写
    // await User.updateOne({ userId }, { userName: "阿飞" });

    // updateMany 批量更新支持 $or 过滤
    // await User.updateMany(
    //     { $or: [{ userId: 100001 }, { userId: 100002 }] },
    //     { state: 2 }
    // );

    // updateMany 批量更新支持 $in 过滤
    // await User.updateMany({ userId: { $in: [100001, 100002] } }, { state: 2 });

    // POST 要在 request.body 中获取数据，GET请求使用的是ctx.request.query
    const { userIds } = ctx.request.body;
    const res = await User.updateMany(
        { userId: { $in: userIds } },
        { state: 2 }
    );
    if (res.modifiedCount) {
        ctx.body = utils.success(`删除成功，修改${res.modifiedCount}条数据`);
    }
});

router.post("/update", async (ctx) => {
    const { userId, userName, userEmail, state } = ctx.request.body;
    const res = await User.updateMany(
        { userId },
        { userName, userEmail, state }
    );
    if (res) {
        ctx.body = utils.success("修改成功");
    } else {
        ctx.body = utils.fail("修改失败");
    }
});

module.exports = router;
