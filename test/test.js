var line = 'A Famous Saying: Much Ado About Nothing (2012/8).';
var i, j, tmp;
var arr = line.match(/[a-zA-Z]/g);
console.log(arr.join(''));
for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j].toUpperCase() > arr[j + 1].toUpperCase()) {
            tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;
        }
    }
    console.log(arr.join(''));
}


// var test = function(line) {
//     let countMin;
//     arr = line.split(' ').map(a => parseInt(a));
//     for(let i = 0; i < arr.length; i++) {
//         let count = getCount(arr, i);
//         countMin = countMin ? Math.min(count, countMin) : count;
//     }
//     console.log(countMin);
// }

// // 获取当前 index 下需要出列的同学数量
// var getCount = function(arr = [], index) {
//     let count = 0;
//     let arrLeft = arr.slice(0, index);
//     let arrRight = arr.slice(index).reverse();
//     count += getNotGrowItemCount(arrLeft);
//     count += getNotGrowItemCount(arrRight);
//     return count;
// }

// var getNotGrowItemCount = function(arr) {
//     console.log(arr);
//     let count = 0;
//     let max = arr[0];
//     for(let i = 1; i < arr.length; i++) {
//         if(arr[i] <= max) {
//             count++;
//         } else {
//             max = arr[i];
//         }
//     }
//     console.log('==== ', count);
//     return count;
// }

// test('16 103 132 23 211 75 155 82 32 48 79 183 13 91 51 172 109 102 189 121 12 120 116 133 79 120 116 208 47 110 65 187 69 143 140 173 203 35 184 49 245 50 179 63 204 34 218 11 205 100 90 19 145 203 203 215 72 108 58 198 95 116 125 235 156 133 220 236 125 29 235 170 130 165 155 54 127 128 204 62 59 226 233 245 46 3 14 108 37 94 52 97 159 190 143 67 24 204 39 222 245 233 11 80 166 39 224 12 38 13 85 21 47 25 180 219 140 201 11 42 110 209 77 136');