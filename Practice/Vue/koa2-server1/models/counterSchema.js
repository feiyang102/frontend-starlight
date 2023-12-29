const { default: mongoose } = require("mongoose");
const counterSchema = mongoose.Schema({
    _id: String,
    sequence_value: Number,
});

// 关系绑定表示当前模型的单数名称、模型、对应集合
module.exports = mongoose.model("Counter", counterSchema, "counters");
