// export * from "./feature/mixins/genExcel.js";
// export * from "./feature/translate/index.js";
const { merge } = require("./merge/feature/mixins/index.js");
const { translate } = require("./merge/feature/translate/index.js");

module.exports = {
  merge,
  translate,
};
