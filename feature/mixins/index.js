const fs = require("fs");
const ExcelJS = require("exceljs");
const { blob } = require("stream/consumers");

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

// name => ./[xxxx].js 永远是这种格式，方便取name
function getFileName(name) {
  // const reg = /\.\/(.*?)\.js$/;
  const reg = /\/([^/]+)\.js$/;
  reg.test(name);
  return RegExp.$1;
}

function plus(og, newOg) {
  const ogPlus = flattenObject(JSON.parse(JSON.stringify(og)));

  // 写入json
  const ogPlusJson = `export default ${JSON.stringify(ogPlus)}`;
  fs.writeFileSync(newOg, ogPlusJson, "utf-8");

  return ogPlus;
}

function merge(langs) {
  const keys = []; // 基准key
  const headers = [{ header: "key", width: 35 }]; // 第一行第一列（固定）
  const pushHeaders = []; // 第一行其余列（不确定）
  const allLangs = {};
  langs.forEach((t) => {
    const cur = require(t); // 文件内容 kv对象
    const obj = flattenObject(cur); // 打平后的kv对象
    const name = getFileName(t); // 文件名称 我们用来当列头名字 cn us jp
    pushHeaders.push({ header: name, width: 35 });
    // 默认用首个文件的key
    if (keys.length === 0) {
      keys.push(...Object.keys(obj)); // [k1, k2, k3, ...]
    }
    allLangs[name] = obj; // obj打平后
    // allLangs = {
    //  cn: (obj1)
    //   {
    //    'xxx'.'xx':'kkkk'
    //  },
    //  us:{...}
    // }
  });

  // ↑ 确定了columns 和第一列 key

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
    // 视业务情况而定是否需要 ↓
    // { header: "不要改这一行！！", width: 35 },
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
  workbook.xlsx.writeFile("./output/i18n（用户侧）.xlsx");
}
module.exports = { merge };
