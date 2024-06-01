// finally
// let p1 = Promise.resolve('foo');

// 下面等价，都会远洋后传
// let p2 = p1.finally();
// let p3 = p1.finally(() => undefined);
// let p4 = p1.finally(() => {});
// let p5 = p1.finally();

// setTimeout(console.log, 0, p2)
// setTimeout(console.log, 0, p3)
// setTimeout(console.log, 0, p4)
// setTimeout(console.log, 0, p5)

// let p9 = p1.finally(() => new Promise(() => {}))
// let p10 = p1.finally(() => Promise.reject())
// let p11 = p1.finally(() => { throw 'baz'; })

// setTimeout(console.log, 0, p9)
// setTimeout(console.log, 0, p10)
// setTimeout(console.log, 0, p11)

let p1 = Promise.resolve("foo");
let p2 = p1.finally(
  () => new Promise((resolve, reject) => setTimeout(() => reject("bar"), 100))
);
// let p10 = p1.finally(() => Promise.resolve(123))
// let p9 = p1.finally(() => new Promise(() => {}))

// let p2 = p1.finally(
//   () => new Promise((resolve) => {
//     resolve('bar')
//   })
// )


// setTimeout(console.log, 0, p10)
// setTimeout(console.log, 0, p2);
// setTimeout(() => console.log(p2), 200);
setTimeout(() => setTimeout(console.log, 0, p2), 200);
// setTimeout(console.log, 0, p9)
