// 这个解法过不去测试用例，不知道为啥
/*
思路：
对 nums1 和 num2
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minOperations = function (nums1, nums2) {
    nums1.sort();
    nums2.sort();
    // min - max 比较，有重合，找重合的值
    let aMin = nums1.length;
    let aMax = nums1.length * 6;
    let bMin = nums2.length;
    let bMax = nums2.length * 6;
    let mMax = getRangeIntersection(aMin, aMax, bMin, bMax);
    if (!mMax) {
        return -1;
    }

    let minCount = -1;
    let aCount, bCount, numCount;
    // 在这个循环中找到最小的 numCount 并赋值给 minCount
    for (let i = mMax[0]; i <= mMax[1]; i++) {
        aCount = getStep(nums1, getSum(nums1), i);
        bCount = getStep(nums2, getSum(nums2), i);
        numCount = aCount + bCount;
        console.log(`= i:${i},aCount:${aCount},bCount:${bCount},numCount:${numCount}`);
        if (minCount == -1) {
            minCount = numCount;
        } else {
            minCount = numCount < minCount ? numCount : minCount;
        }
        console.log(minCount);
    }
    return minCount;
};

var getRangeIntersection = function (aMin, aMax, bMin, bMax) {
    var min = Math.max(aMin, bMin);
    var max = Math.min(aMax, bMax);
    if (min <= max) {
        console.log([min, max]);
        return [min, max];
    }
    return null;
}

/*
计算 nums 到达目标数需要调整的次数
算法：
对 nums 排序遍历运算：
1、sum>val需要做减法所以倒序，遍历时做减法 item - 1
2、sum<val要做加法所以正序），遍历时做加法 6 - item

*/
/**
 * 求 nums 到达 val 的最短次数
 * @param {number[]} nums
 * @param {number} sum 
 * @param {number} val 目标值
*/
var getStep = function (nums, sum, val) {
    //数组之和 sum 在目标值 val 左边和右边是相反的比较方法
    //1、当在右边是，是遍历找 sum 取值范围下最小值小于 val
    //2、当在左边时，是遍历找 sum 取值范围下最大值大于 val
    let isSumBig = false;
    // let sum = nums.reduce((a, b) => { return a + b });
    // let sum = 0;
    // for (let i = 0; i < nums.length; i++) {
    //     sum += nums[i];
    // }
    if (sum == val) {
        return 0;
    } else if (sum > val) {
        isSumBig = true;
    } else {
        isSumBig = false;
        nums.reverse();
    }
    // let sum2 = 0;
    let i;
    for (i = 1; i < nums.length; i++) {
        // 对有序数组前 nums.length - i 项求和，看需要多少
        if (isSumBig) {
            sum = sum - nums[nums.length - i] + 1;
            if (sum > val) {
                continue;
            }
        } else {
            sum = sum - nums[nums.length - i] + 6;
            if (sum < val) {
                continue;
            }
        }
        return i;
    }
    return i;
}

var getSum = function (nums) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    }
    return sum;
}

let nums1 = [2,5,1,4,5,2,2,6,4,5,6,4,6,1,4,6,4,4,5,5,3,5,1,4,6,2,1,1,1,5,4,4,2,3,1,4,4,5,3,6,6,6,3,6,3,4,1,1,2,3,3,1,4,3,5,3,3,1,6,6,1,4,3,3,3,1,2,3,3,6,2,2,1,5,4,6,4,2,1,6,1,4,6,6,6,4,1,2,4,4,1,3,3,1,1,5,6,4,5,6,6,3,5,6,2,6,3,3,3,4,4,3,3,5,5,2,6,4,3,2,4,3,4,4,2,3,5,1,6,6,6,5,6,2,2,1,2,3,5,4,4,3,3,2,3,6,6,1,4,1,2,2,5,5,3,2,3,3,5,4,1,1,3,2,2,1,3,1,1,6,3,4,2,2,2,1,5,1,1,4,4,4,2,1,4,5,5,6,2,3,1,5,3,1,4,1,6,2,6,1,2,5,2,1,2,6,1,6,4,5,5,4,5,2,4,4,4,1,4,5,3,1,4,4,1,4,1,4,1,3,5,4,6,2,4,5,3,2,4,6,1,2,4,3,5,2,5,3,4,3,6,3,6,5,6,6,2,6,6,3,2,4,2,6,1];
let nums2 = [4,2,4,2,5,3,1,1,6,6,6,2,5,6,5,3,1,3,5,3,2,1,2,2,2,6,1,2,3,6,2,3,4,4,2,4,4,6,1,3,5,3,2,3,5,2,2,1,5,5,6,5,5,1,4,1,5,6,1,6,2,4,5,1,2,1,4,2,6];
console.log(minOperations(nums1, nums2));