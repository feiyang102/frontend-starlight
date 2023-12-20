const log4js = require("log4js");

log4js.configure({
    // 设置追加器，此时我们用2种：debug/info error
    appenders: {
        out: { type: "file", filename: "logs/common.log" },
        error: {
            // 这里可以让错误日志的文件名称是根据日期动态的
            type: "dateFile",
            filename: "logs/error-",
            pattern: "yyyy-MM-dd.log",
            // filename + pattern
            alwaysIncludePattern: true,
        },
        // 指定的类别
        categories: {
            default: { appenders: ["out"], level: "debug" },
            info: { appenders: ["out"], level: "info" },
            error: { appenders: ["error"], level: "error" },
        },
    },
});


// dateFile 2022-10-29.log

module.exports = {
    debug(content) {
        // 这里不设置，或者设置的 key 在 categories 中找不到就会设置为 default
        const logger = log4js.getLogger();
        logger.level = "debug";
        logger.debug(content);
    },
    info(content) {
        const logger = log4js.getLogger("info");
        logger.level = "info";
        logger.debug(content);
    },
    error(content) {
        // 在这里创建实例并设置级别，就会从上面 categories 中找到对应的成员
        // 找到成员后，就会在上面 appenders 中找到对应追加器进行设置
        const logger = log4js.getLogger("error");
        logger.level = "error";
        logger.debug(content);
    },
};
