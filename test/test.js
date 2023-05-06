/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minOperations = function (nums1, nums2) {
    //1、求有没有交集，并判断是否相等
    //2、存在交集以后，判断左右差值的最小调次数
    let sumLeft = nums1.reduce((a, b) => { return a + b });
    let sumRight = nums2.reduce((a, b) => { return a + b });

    let numsLeft = nums1;
    let numsRight = nums2;
    let diff = 0;
    let obj = {};
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

    let keys = Object.keys(obj).map(a => parseInt(a)).sort((a, b) => { return b - a });
    let sum = 0, count = 0;
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

// let nums1 = [1, 2, 3, 4, 5, 6];
// let nums2 = [1, 1, 2, 2, 2, 2];
let nums1 = [6,6];
let nums2 = [1];
console.log(minOperations(nums1, nums2));
