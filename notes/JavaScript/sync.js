function requestA() {
  return new Promise((resolve, reject) => {
    // 模拟异步请求，这里使用setTimeout
    setTimeout(() => {
      console.log("A请求完成");
      resolve("A的结果");
    }, 1000);
  });
}

function requestB() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("B请求完成");
      resolve("B的结果");
    }, 500);
  });
}

function requestC() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("C请求完成");
      resolve("C的结果");
    }, 1000);
  });
}

function requestD() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("D请求完成");
      resolve("D的结果");
    }, 500);
  });
}

function requestE() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("E请求完成");
      resolve("E的结果");
    }, 1200);
  });
}

function requestF() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("F请求完成");
      resolve("F的结果");
    }, 1000);
  });
}

function requestG() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("G请求完成");
      resolve("G的结果");
    }, 1000);
  });
}

function requestH() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("H请求完成");
      resolve("H的结果");
    }, 1000);
  });
}

function requestI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("I请求完成");
      resolve("I的结果");
    }, 1000);
  });
}

// 先请求A
// B、C同时同时请求，并各自做各自请求
// B => D、E
// C => F、G
// H
// I

async function processRun() {
  console.log('-----开始请求A-----');
  const aResult = await requestA()

  console.log('-----开始请求B，同时请求C-----');
  const bPromise = requestB().then(async (res)=> {
    console.log('-----开始请求D-----');
    const dResult = await requestD()
    console.log(dResult);
  
    console.log('-----开始请求E-----');
    const eResult = await requestE()
    console.log(eResult);
    console.log('B、D、E请求完成 === ');
  })

  console.log('-----开始请求C-----');
  const cPromise = requestC().then(async (res) => {
    console.log('-----开始请求F-----');
    const fResult = await requestF()
    console.log(fResult);
  
    console.log('-----开始请求G-----');
    const gResult = await requestG()
    console.log(gResult);
    console.log('C、F、G请求完成 === ');
  })

  const result = await Promise.all([bPromise, cPromise])
  console.log('B、C请求完成后的返回结果: ', result);

  // const bResult = await bPromise2

  console.log('-----开始请求H-----');
  const hResult = await requestH()
  console.log(hResult);

  console.log('-----开始请求I-----');
  const iResult = await requestI()
  console.log(iResult);
}


// async function processRun() {
//   console.log('-----开始请求A-----');
//   const aResult = await requestA()

//   console.log('-----开始请求B，同时请求C-----');
//   const bPromise = requestB()
//   const bPromise2 = bPromise.then(async (res)=> {
//     console.log('-----开始请求D-----');
//     const dResult = await requestD()
  
//     console.log('-----开始请求E-----');
//     const eResult = await requestE()
//   })

//   console.log('-----开始请求C-----');
//   const cResult = await requestC()

//   console.log('-----开始请求F-----');
//   const fResult = await requestF()

//   console.log('-----开始请求G-----');
//   const gResult = await requestG()

//   const bResult = await bPromise2

//   console.log('-----开始请求H-----');
//   const hResult = await requestH()

//   console.log('-----开始请求I-----');
//   const iResult = await requestI()
// }

processRun()

// async function processRequests() {
//   try {
//     console.log('开始请求A');
//     const aResult = await requestA();
//     console.log('A请求完成', aResult);

//     console.log('开始并行请求B和C');
//     // 请求B，但不等待它完成
//     const bPromise = requestB();
//     // 请求C并等待它完成
//     const cResult = await requestC();
//     console.log('C请求完成', cResult);

//     // 请求F，由C触发，并等待它完成
//     const fResult = await requestF();
//     console.log('F请求完成', fResult);

//     // 等待B完成，然后发起D
//     const bResult = await bPromise;
//     console.log('B请求完成', bResult);
//     const dResult = await requestD();
//     console.log('D请求完成', dResult);

//     // 只有在D和F都完成后，才发起G
//     await requestG();
//     console.log('G请求完成');
//     console.log('所有请求都已完成');
//   } catch (error) {
//     console.error('请求出错:', error);
//   }
// }

// // 调用函数开始处理请求
// processRequests();
