const { translate, merge } = require("./index.js");
// const { translate, merge } = require(".");

// translate("./../../input/cn.js", "cn", ["en", "ru", "fr"], {
// appid: "31859d6a",
// apiSecret: "ZTE4Nzg4ODA2NGViMzUzMzhlM2I1M2Rl",
// apiKey: "91d715fcd9934ca7e3e3d46b88da454c",
// });

merge(["./../../input/cn.js", "./../../input/us.js"]);
