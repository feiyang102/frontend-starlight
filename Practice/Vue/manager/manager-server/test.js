// const log4js = require('log4js');
// log4js.configure({
//     appenders: {
//         out: { type: "file", filename: "test.log" }
//     },
//     categories: {
//         default: { appenders: ["out"], level: "error" }
//     }
// });
// const logger = log4js.getLogger("global-test.js");

// // 设置等级为 debug
// logger.level = "debug";
// logger.debug("some debug message"); // 分了9种等级 level


const log4js = require("./utils/log4j");

log4js.debug("测试 debug")
log4js.error("测试 error")
log4js.info("测试 info")