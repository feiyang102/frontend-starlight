const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    userId: Number,
    userName: String,
    userEmail: String,
    password: String,
    state: {
        type: Number,
        default: 1,
    },
    roleList: [],
    createTime: {
        type: Date,
        default: new Date(),
    },
});

// 关系绑定表示当前模型的单数名称、模型、对应集合
module.exports = mongoose.model("User", userSchema, "users");
