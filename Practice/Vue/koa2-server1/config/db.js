const mongoose = require("mongoose");
const config = require("./index");
const logger = require("../utils/logger");

main()
    .then((res) => {
        logger.info("***数据库连接成功***");
    })
    .catch((err) => logger.error(err));

async function main() {
    await mongoose.connect(config.URL);
}
