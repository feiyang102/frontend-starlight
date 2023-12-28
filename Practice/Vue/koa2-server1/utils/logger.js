const log4js = require("log4js");

log4js.configure({
    // 追加器，设置输出模式
    appenders: {
        out: { type: "file", filename: "logs/app.log" },
        error: {
            type: "dateFile",
            filename: "logs/error",
            pattern: "yyyy-MM-dd.log",
            alwaysIncludePattern: true
        },
    },
    // 指定类别
    categories: {
        default: { appenders: ["out"], level: "debug" },
        info: { appenders: ["out"], level: "info" },
        error: { appenders: ["error"], level: "error" },
    },
});

module.exports = {
    debug(content) {
        const logger = log4js.getLogger("default");
        logger.level = "debug";
        logger.debug(content);
    },
    info(content) {
        const logger = log4js.getLogger("info");
        logger.level = "info";
        logger.info(content);
    },
    error(content) {
        const logger = log4js.getLogger("error");
        logger.level = "error";
        logger.error(content);
    }
}
