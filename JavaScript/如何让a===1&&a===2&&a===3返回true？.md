3等号和2等号的方式有很大不同，下面是全等于形式的几种方法

## 方法1：Object.defineProperty
> 这里的 this 在浏览器控制台中对应的是 window 对象
```js
let b = 1
Object.defineProperty(this, 'a', {
    get() {
        return b++;
    }
});

console.log(a === 1 && a === 2 && a === 3);// true
```

或者

```js
Object.defineProperty(this, 'a', {
    get: function () {
        return this.value = this.value ? (this.value += 1) : 1
    }
})
console.log(a===1 && a===2 && a===3) //true
```

## 方法2:：Reflect.defineProperty
> 该方法和 Object.defineProperty 用法类似
```js
let _a= 1;
Reflect.defineProperty(this, 'a', {
    get() {
        return _a++;
    }
});
console.log(a === 1 && a === 2 && a === 3);//true
```

## 方法3：使用 Proxy 代理
> p.a 为任意属性

```js
this.i = 1;
let p = new Proxy(this,
  {
    get(target, name) {
        return target.i++;
    },
  }
);
console.log(p.a === 1 && p.a === 2 && p.a === 3);// true
```

## 方法4：仿运算符重载
TODO

## 方法5：覆盖 === 调用的类型比较，必要时新建类
TODO
当JS做全等于时，首先对2个变量进行类型比较，此时就可以将

## 方法6：对code进行转义。。
```js
console.log(!!'p.a === 1 && p.a === 2 && p.a === 3')
```

## 参考文档
[[译] 在JS中，如何让(a===1 && a===2 && a === 3)(严格相等)的值为true？](https://juejin.cn/post/6844903725442531341)

[给JS对象设置“计算属性”](https://juejin.cn/post/6850418113805025287)

[如何实现a===1 && a===2 && a===3返回true？](https://mp.weixin.qq.com/s?__biz=MjM5MDA2MTI1MA==&mid=2649111285&idx=3&sn=4ea91d9bafd6e2f2426ec885d0d4a6c4&chksm=be581d58892f944eb907b36180a361c6e646f394690dca435fa599e80edaaeb3874355903238&scene=27)

[一道JS题，让我更深刻的理解了JS的执行机制](https://juejin.cn/post/7171748794164805645)