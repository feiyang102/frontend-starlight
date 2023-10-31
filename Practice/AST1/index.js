// import * as cherow from "cherow";
// import * as astring from "astring";


// const ast = cherow.parseScript("console.log(111)");
// const code = astring.generate(ast);
// console.log(code);

import * as espree from 'espree';
import * as astring from 'astring';

let ast = espree.parse('console.log(1);');
console.log(ast);

let code = astring.generate(ast);
console.log(`这是原始的code: ${code}`);

