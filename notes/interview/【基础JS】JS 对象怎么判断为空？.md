
```JavaScript
const obj = {
    [Symbol('1')]: 132
};
Object.keys(obj); //[]
JSON.stringify(obj) === '{}'; //{}
Reflect.ownKeys(obj); //
```

#前端基础题 #基础JS