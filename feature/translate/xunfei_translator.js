/**
 * 机器翻译 WebAPI 接口调用示例
 * 运行前：请先填写Appid、APIKey、APISecret
 * 运行方法：直接运行 main() 即可
 * 结果： 控制台输出结果信息
 *
 * 1.接口文档（必看）：https://www.xfyun.cn/doc/nlp/xftrans/API.html
 * 2.错误码链接：https://www.xfyun.cn/document/error-code （错误码code为5位数字）
 * @author iflytek
 */
const CryptoJS = require("crypto-js");
var request = require("request");
var log = require("log4node");

// 系统配置
const config = {
  // 请求地址
  hostUrl: "https://itrans.xfyun.cn/v2/its",
  host: "itrans.xfyun.cn",
  //在控制台-我的应用-机器翻译获取
  appid: "31859d6a",
  //在控制台-我的应用-机器翻译获取
  apiSecret: "ZTE4Nzg4ODA2NGViMzUzMzhlM2I1M2Rl",
  //在控制台-我的应用-机器翻译获取
  apiKey: "91d715fcd9934ca7e3e3d46b88da454c",
  uri: "/v2/its",
};

function transVar(text, from, to) {
  let transVar = {
    text: text, //待翻译文本
    from: from, //源语种
    to: to, //目标语种S
  };

  // 获取当前时间 RFC1123格式
  let date = new Date().toUTCString();
  let postBody = getPostBody(transVar.text, transVar.from, transVar.to);
  let digest = getDigest(postBody);

  let options = {
    url: config.hostUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json,version=1.0",
      Host: config.host,
      Date: date,
      Digest: digest,
      Authorization: getAuthStr(date, digest),
    },
    json: true,
    body: postBody,
  };

  return options;
}

function translator(text, from, to) {
  return new Promise((resolve, reject) => {
    request.post(transVar(text, from, to), (err, resp, body) => {
      if (err) {
        log.error("error " + err);
        reject(err);
      }
      if (body.code != 0) {
        log.error(`发生错误，错误码：${body.code}错误原因：${body.message}`);
        reject(body.code + ":" + body.message);
      }
      resolve(body.data.result);
    });
  });
}

// 生成请求body
function getPostBody(text, from, to) {
  let digestObj = {
    //填充common
    common: {
      app_id: config.appid,
    },
    //填充business
    business: {
      from: from,
      to: to,
    },
    //填充data
    data: {
      text: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text)),
    },
  };
  return digestObj;
}

// 请求获取请求体签名
function getDigest(body) {
  return (
    "SHA-256=" +
    CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(JSON.stringify(body)))
  );
}

// 鉴权签名
function getAuthStr(date, digest) {
  let signatureOrigin = `host: ${config.host}\ndate: ${date}\nPOST ${config.uri} HTTP/1.1\ndigest: ${digest}`;
  let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, config.apiSecret);
  let signature = CryptoJS.enc.Base64.stringify(signatureSha);
  let authorizationOrigin = `api_key="${config.apiKey}", algorithm="hmac-sha256", headers="host date request-line digest", signature="${signature}"`;
  return authorizationOrigin;
}

module.exports = translator;
