const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while(line = await readline()){
        // 统计字符串出现次数
        let codeDic = {};
        for(let i = 0; i < line.length; i++) {
            if(codeDic[line[i]]) {
                codeDic[line[i]]++;
            } else {
                codeDic[line[i]] = 1;
            }
        }
        // 找到需要删除的字符串，存入 deleteCodes
        let arrVal = Object.values(codeDic);
        let arrKey = Object.keys(codeDic);
        let deleteCodes = new Set([arrKey[0]]),minVal = arrVal[0];

        for(let i = 1; i < arrVal.length; i++) {
            if(minVal > arrVal[i]) {
                minVal = arrVal[i];
                deleteCodes = new Set([arrKey[i]]);
            } else if(minVal == arrVal[i]) {
                deleteCodes.add(arrKey[i]);
            }
        }

        //删除需要的字符串
        let res = [];
        for(let i = 0; i < line.length; i++) {
            if(!deleteCodes.has(line[i])) {
                res.push(line[i]);
            }
        }
        console.log(res.join(''));

    }
}()
