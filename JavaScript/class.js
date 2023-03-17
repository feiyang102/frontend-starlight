/*
    箭头函数没有自己的 this，不能作为构造函数，也没有 prototype 属性
*/
// let func1 = () => {
//     console.log('11111');
// }

// function func2() {
//     console.log(222222);
// }

// func2();

// console.log(00000);

/*
    给对象直接赋值迭代属性，并迭代它
*/

// let test = {
//     from: 123,
//     to: 888,
//     *[Symbol.iterator]() {
//         for (let x = this.from; x <= this.to; x++) {
//             yield x;
//         }
//     },
//     toString: () => {
//         //TODO 注意，这里的箭头函数是访问不到 this.from 的
//         // 因为this只想的是 test 所在的对象，而不是 test
//         return `(${this.from}, ${this.to})`;
//     },
//     toString2() {
//         // 这里的 this 指向的是 test
//         return `(${this.from}, ${this.to})`;
//     },
//     toString3: function() {
//         // 这里的 this 指向的也是 test
//         return `(${this.from}, ${this.to})`;
//     }
// }

// // test.toString();
// console.log(test.toString2());
// test.forEach(item => {
//     console.log(item);
// });
// console.log(111);

/*
    一个简单的 JavaScript 类
*/
// function range(from, to) {
//     let r = Object.create(range.methods);
//     r.hello = 666;
//     r.array = [1, 2, 3, 1];
//     return r;
// }

// range.methods = {
//     hello: 12323,
//     hello2: 888
// }

// let test1 = range(23, 333);
// console.log(test1.hello);
// console.log(1111);