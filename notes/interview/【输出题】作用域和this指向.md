例题1：下面代码输出什么？
```js
var foo = {
    fn: function() {
        console.log(this.fn);
        console.log(fn);
    }
}

foo.fn();
```