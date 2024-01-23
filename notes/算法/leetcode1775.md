# Problem: 1775. 通过最少操作次数使数组的和相等

## 思路
一、首先判断两和是否相等，判断是否有解（这里使用的是判断两个数组取值范围内是否有交集）

二、如果确定有解，再求解 1、保证两数组 num1 和 num2 的各项和分别为 sumLeft 和 sumRight，且 sumLeft > sumRight 那么只有 sumLeft 和 sumRight 相互靠近时，才能保证以最小步数两值相等。

2、设目标值 sum 是我们想要的那个最优秀的和 那么 sumLeft >= sum >= sumRight； 那么 sumLeft 需要向右移动做加法，而 sumLeft 需要向左移动做减法才能保证最小步数接近 sum。

所以，num1 各项 item1 做加法上限是6，能够给靠近 sum 做出的最大贡献为 6 - item1 所以，num2 各项 item2 做减法下限是1，能够给靠近 sum 做出的最大贡献为 item2 - 1 把上面 num1 和 num2 可为接近 sum 做出的贡献统一合并到一个 obj 对象下

3：设 diff = sumRight - sumLeft 从 obj 中先找出能为消解 diff 做最大贡献的项开始消解，直到最大项消耗完，再找次大的去消解 diff ，直到把 diff 消解到 diff <= 0。 我们的消解次数 count 就是最终答案。

PS： 这里没有用 Map 是因为数据量不大时，对象操作性能上会比 Map 好一点点（其实为了图方便）

## 代码
```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minOperations = function (nums1, nums2) {
    let sumLeft = nums1.reduce((a, b) => { return a + b });
    let sumRight = nums2.reduce((a, b) => { return a + b });

    let numsLeft = nums1;
    let numsRight = nums2;
    let diff = 0;
    let obj = {};

    //判断是否相等
    if(sumLeft == sumRight) {
        return 0;
    }
    if (sumLeft > sumRight) {
        [sumLeft, sumRight] = [sumRight, sumLeft];
        [numsLeft, numsRight] = [numsRight, numsLeft];
    }
    diff = sumRight - sumLeft;

    //判断是否存在交集
    if (numsLeft.length * 6 < numsRight.length) {
        return -1;
    }

    for (let i = 0; i < numsLeft.length; i++) {
        diffHandler(obj, 6 - numsLeft[i]);
    }
    for (let i = 0; i < numsRight.length; i++) {
        diffHandler(obj, numsRight[i] - 1);
    }
    //在这里把keys内的项转换为整数
    let keys = Object.keys(obj).map(a => parseInt(a)).sort((a, b) => { return b - a });
    let sum = 0, count = 0;
    //消解和diff的差距，直到 sum >= diff，count 为需要调整的位数
    for (let i = 0; i < keys.length; i++) {
        for (; obj[keys[i]] > 0; obj[keys[i]]--) {
            sum += keys[i];
            count++;
            if (sum >= diff) {
                return count;
            }
        }
    }
};

//将nums1和nums2可以为消解 diff 能做的贡献整理好
var diffHandler = function (obj, key) {
    if(key == 0) {
        return;
    }
    if(obj[key]) {
        obj[key]++;
    } else {
        obj[key] = 1;
    }
}
```