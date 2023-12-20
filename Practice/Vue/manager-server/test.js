const log4js = require('log4js');
log4js.configure({
    appenders: {
        out: { type: "file", filename: "test.log" }
    },
    categories: {
        default: { appenders: ["out"], level: "error" }
    }
});
const logger = log4js.getLogger("global-test.js");

// 设置等级为 debug
logger.level = "debug";
logger.debug("some debug message"); // 分了9种等级 level



