const translator = require("./xunfei_translator");

// translator("你好", "cn", "en")
//   .then((res) => {
//     console.log(3333, res);
//     console.log("----", res.trans_result.dst);
//   })
//   .catch((err) => {
//     console.log("err", err);
//   });

// n 条请求，其中一条出错 怎么去做兼容处理。方向： que retry
function flattenObject(obj) {
  const toReturn = {};

  for (const i in obj) {
    if (!obj.hasOwnProperty(i)) continue;

    if (typeof obj[i] == "object" && obj[i] !== null) {
      const flatObject = flattenObject(obj[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = obj[i];
    }
  }
  return toReturn;
}

const cn = flattenObject(require("./../../input/cn.js"));

let allLangs = { cn: {} };

async function trans(allLangs, text, from, to) {
  const res = {};
  const errKey = [];
  const arr = Object.entries(text);

  for (let i = 0; i < arr.length; i++) {
    const [key, value] = arr[i];
    try {
      const result = await translator(value, from, to);
      res[key] = result.trans_result.dst;
    } catch (error) {
      errKey.push(arr[i]);
    }
  }
  console.log("翻译完成结果==> ", res);
  console.log("失败数据 ===>", errKey);
  allLangs[to] = res;
  console.log(allLangs);
}

// function trans(obj, from, to) {
//   const result = {};
//   let successCount = 0;
//   const errKey = [];
//   const arr = Object.keys(obj);

//   function check() {
//     if (successCount + errKey.length === arr.length) {
//       console.log("res ===> ", result);
//       console.log("fail res ===> ", errKey);
//     }
//   }
//   for (const key in obj) {
//     const value = obj[key];

//     translator(value, from, to)
//       .then((res) => {
//         result[key] = res.trans_result.dst;
//         successCount += 1;
//         check();
//       })
//       .catch((err) => {
//         console.log("err", err);
//         errKey.push({
//           key,
//           value,
//         });
//         check();
//       });
//   }
// }

trans(allLangs, cn, "cn", "en");

// for (const key in cn) {
//   const trans = {};
//   translator(cn[key], "cn", "en")
//     .then((res) => {
//       trans[key] = res.trans_result.dst;
//       console.log(trans);
//     })
//     .catch((err) => {
//       console.log("err", err);
//     });
// }

// console.log(translator("你", "cn", "us"));
