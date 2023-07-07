const fs = require("fs");
const ExcelJS = require("exceljs");
const { blob } = require("stream/consumers");

const fileURLToPath = require("node:url");
const path = require("path");
const xlsx = require("node-xlsx");
const table = require("node:console");

const filePath = "./output/i18n（用户侧）.xlsx";

// xlsx文件绝对路径
// const xlsxPath = path.resolve(__dirname, filePath);

const xlsxData = xlsx.parse(fs.readFileSync(filePath))[0];
const dataRes = xlsxData.data;
const allLangs = {};

const [header, ...data] = dataRes;
const langs = header.filter((t, i) => i > 0);

// console.log(langs);

langs.forEach((t, i) => {
  const _i = i + 1;
  allLangs[t] = data.map((tt) => {
    return {
      key: tt[0],
      value: tt[_i],
    };
  });
});

// console.log(data);

// console.log(allLangs);

const res = {};
for (const key in allLangs) {
  const source = allLangs[key];

  res[key] = {};

  source.forEach((t) => {
    const { key: _key, value } = t;
    setValue(res[key], _key.split("."), value);
  });

  const sourceJson = `export default ${JSON.stringify(source)};`;
  const path = `./input/new-${key}.js`;

  fs.writeFileSync(path, sourceJson, "utf-8");
}

// console.log(111, res);

// for (let i = 1; i < dataRes[0].length; i++) {
//   const head = dataRes[0][i];

//   for (const j in [1, dataRes.length - 1]) {
//     const res = {
//       key: dataRes[j][0],
//       value: dataRes[j][i],
//     };
//     console.log(res);
//   }
// }

// console.log(dataRes);

// obj 数据对象
function setValue(obj, keys, value) {
  let target = obj;
  keys.forEach((t, i) => {
    const isLast = i === keys.length - 1;

    if (isLast) {
      target[t] = value;
    }
    if (!target[t]) {
      target[t] = {};
    }

    target = target[t];
  });
}
