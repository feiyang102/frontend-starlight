const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    userId: Number,
    userName: String,
    userEmail: String,
    state: {
        type: Number,
        default: 1, // 1在职、2离职、3试用期
    },
    job: String,
    sex: String,
    mobile: String,
    role: {
        type: Number,
        default: 1, // 1系统管理员、2普通用户
    },
    roleList: [],
    deptId: [],
    password: String,
    createTime: {
        type: Date,
        default: new Date(),
    },
    lastLoginTime: {
        type: Date,
        default: new Date(),
    },
});

// 关系绑定表示当前模型的单数名称 , 模型, 对应集合
module.exports = mongoose.model('User', userSchema, 'users');
