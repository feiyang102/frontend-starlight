// import { Configuration } from "webpack"
import path from "path";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

/**
 * @type {Configuration}
*/
const config = {
    entry: "./src/index.js",
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'output')
    },
    optimization: {
        minimize: true
    }
}

export default config;