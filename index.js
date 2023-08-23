// export * from "./feature/mixins/genExcel.js";
// export * from "./feature/translate/index.js";
const { merge } = require("./feature/mixins/genExcel.js");
const { translate } = require("./feature/translate");

module.exports = {
  merge,
  translate,
};
