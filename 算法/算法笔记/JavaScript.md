# JavaScrip 算法笔记
## 正则匹配
```js
// 匹配二进制数
'111011'.match(/1+/g).map(a => a.length) // [3, 2]

/*
各种字符对应 ASCII 码
    字母：a-z, A-Z
    数字：0-9
    !"#$%&'()*+,-./     (ASCII码：0x21~0x2F) // 字符集1
    :;<=>?@             (ASCII码：0x3A~0x40) // 字符集2
    [\]^_`              (ASCII码：0x5B~0x60) // 字符集3
    {|}~                (ASCII码：0x7B~0x7E) // 字符集4

匹配数量
    +   等同于 {1,  }，至少 1 个
    *   等同于 {0,  }，0 个以上
    ?   等同于 {0, 1}，一个或没有

其他
    $   结尾
    .   任意字符占位符
    ()  需要匹配的结果，一般和 ''.match 配合使用
*/

// test 匹配是否为英文字母
/a-zA-Z/.test('Z') // true
// 匹配 字符集1 中的字符，可以用 - 来过渡，和上面相似
/\!-\//.test('#') // true
// 匹配连续的 adfp ，至少匹配一次
/[adfp]+/

// ''.match
te = '1100111';
te.match(/1+/)      //['11', index: 0, input: '1100111', groups: undefined]
te.match(/1+/g)     // ['11', '111']
te.match(/(1+)/)    // ['11', '11', index: 0, input: '1100111', groups: undefined]
```

## 进制转换
```js
// 2 进制转 10 进制
parseInt('110111', 2) // 55
// 10 进制转 2 进制
parseInt('55').toString(2);// 110111
```

## Math 库
```js
// 求最大值最小值
arr = [5,1,55,66];
Math.max(...arr) // 66
Math.min(...arr) // 1
// 绝对值
Math.abs();
// 开根号
Math.sqrt();
```
