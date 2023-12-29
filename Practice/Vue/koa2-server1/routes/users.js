const router = require("koa-router")();
const Counter = require("../models/counterSchema");
const User = require("../models/userSchema");
const utils = require("../utils");
const logger = require("../utils/logger");

router.prefix("/users");

router.post("/create", async (ctx) => {
    const { userName, userEmail } = ctx.request.body;

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

    const newUser = { userId: sequence_value, userName, userEmail };
    User.create(newUser);
    ctx.body = utils.success("用户创建成功");
});


module.exports = router;
