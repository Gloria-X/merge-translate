const fs = require("fs");
const ExcelJS = require("exceljs");
const translator = require("./xunfei_translator");

// 数据打平
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

// name => ../../input/[xxxx].js 永远是这种格式，方便取name
function getFileName(name) {
  // const reg = /\.\/(.*?)\.js$/;
  const reg = /\/([^/]+)\.js$/;
  reg.test(name);
  return RegExp.$1;
}

// 翻译
async function trans(allLangs, text, from, to) {
  for (let j = 0; j < to.length; j++) {
    const t = to[j];
    const arr = Object.entries(text);
    const errKey = [];
    const res = {};
    for (let i = 0; i < arr.length; i++) {
      const [key, value] = arr[i];
      try {
        const result = await translator(value, from, t);
        res[key] = result.trans_result.dst;
      } catch (error) {
        errKey.push(arr[i]);
        console.log(error);
      }
    }
    // console.log("翻译完成结果==> ", res);
    // console.log("失败数据 ===>", errKey);
    allLangs[t] = res;
  }
}

// 确定了columns 和第一列 key
async function set(lang, from, to) {
  const keys = []; // 基准key
  const headers = [{ header: "key", width: 35 }]; // 第一行第一列（固定）
  const pushHeaders = []; // 第一行其余列（不确定）
  const allLangs = {};
  // lang.forEach(async (t) => {
  const cur = require(lang); // 文件内容 kv对象
  const obj = flattenObject(cur); // 打平后的kv对象
  const name = getFileName(lang); // 文件名称 用来当列头名字 cn us jp
  // 默认用首个文件的key
  if (keys.length === 0) {
    keys.push(...Object.keys(obj)); // [k1, k2, k3, ...]
  }

  allLangs[name] = obj; // obj打平后
  await trans(allLangs, allLangs[name], from, to);
  // console.log("--------", allLangs);

  // 第一列为key，第二列开始列名从allLangs中取
  for (let i = 0; i < Object.keys(allLangs).length; i++) {
    pushHeaders.push({ header: Object.keys(allLangs)[i], width: 35 });
  }

  // 获取数据
  const result = keys.map((t) => [t]);
  // [[a],[b],[c]]
  pushHeaders.forEach((t) => {
    // 之前 pushHeaders = [{cn}, {us}, ...]
    const data = allLangs[t.header]; // 找对应列
    // t.header = cn
    // {
    //   'ax'.'b':'kkk'
    // }

    // 之前 result = [[k1],[k2],[k3]]
    result.forEach((tt) => {
      const key = tt[0];
      tt.push(data[key] || "");
    });
  });

  // 建表
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("My Sheet");

  // [cn,en]
  worksheet.columns = [
    ...headers,
    ...pushHeaders,
    { header: "不要改这一行！！", width: 35 },
  ];
  worksheet.addRows(result);

  worksheet.getRow(1).alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  for (var i = 0; i < pushHeaders.length + 2; i++) {
    var str = "A";
    str = String.fromCharCode(str.charCodeAt() + i);

    worksheet.getCell(`${str}1`).fill = {
      fgColor: { argb: "FFFFFF00" },
      bgColor: { argb: "FF0000FF" },
    };
  }
  workbook.xlsx.writeFile("./output/transRes.xlsx");
}
//   );
// }

// genarate(
//   [
//     {
//       langs: ["./../../input/cn.js"],
//       excel: "./output/transRes.xlsx",
//     },
//   ],
//   "cn",
//   "en"
// );
module.exports = set;
