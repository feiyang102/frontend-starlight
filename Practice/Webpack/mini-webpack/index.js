import fs from "fs";
import path from "path";
// 模板代码处理文件
import ejs from "ejs";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import { transformFromAst } from "babel-core";
let id = 0;

function createAsset(filePath) {
    // 1.获取文件内容

    const source = fs.readFileSync(filePath, {
        encoding: "utf-8",
    });
    // console.log(source);

    // 2.获取依赖关系
    //  AST：抽象语法树，获取模块依赖关系
    const ast = parser.parse(source, {
        sourceType: "module",
    });
    // console.log(ast);

    const deps = [];
    traverse.default(ast, {
        ImportDeclaration({ node }) {
            deps.push(node.source.value);
        },
    });
    // console.log(deps);

    const { code } = transformFromAst(ast, null, {
        presets: ["env"],
    });
    console.log(code);

    return {
        filePath,
        code,
        mapping: {},
        deps,
        id: id++,
    };
}

// 基于文件生成图
function createGraph() {
    const mainAsset = createAsset("./example/main.js");
    // 这里涉及到图的遍历，我们使用广度优先搜索的方式去遍历
    // 先创建一个数组，作为队列
    const queue = [mainAsset];
    for (const asset of queue) {
        asset.deps.forEach((relativePath) => {
            const child = createAsset(path.resolve("./example", relativePath));
            asset.mapping[relativePath] = child.id;
            queue.push(child);
        });
    }
    return queue;
}

const graph = createGraph();

function build(graph) {
    const template = fs.readFileSync("./bundle.ejs", { encoding: "utf-8" });

    const data = graph.map((asset) => {
        const { id, code, mapping } = asset;
        return { id, code, mapping };
    });

    console.log(data);
    const code = ejs.render(template, { data });
    fs.writeFileSync("./dist/bundle.js", code);

    // console.log(code);
}

build(graph);
