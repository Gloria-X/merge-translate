# merge-translate 使用说明
## 功能介绍
该module有两个功能：merge 和 translate

其中 merge 可将多个 js 文件合并生成 excel ; translate 则调用讯飞开放平台机器翻译API，将传入基准字段翻译为多种语言，存入 excel


## 调用 translate 方法的示例代码

```javascript

const { translate } = require("./index.js");
translate("./../../input/cn.js", "cn", ["en", "ru", "fr"], {
  appid: "xxxx",
  apiSecret: "xxxx",
  apiKey: "xxxx",
});

```

## 调用 translate 方法的参数说明

| 参数名         | 含义            | 示例数据                     |
| -------------- | --------------  | ---------------------------- |
| text           | 需翻译文件                          | "./../../input/cn.js" |
| from           | 基准字段语言代码参数                | "cn" |
| to             | 需翻译语言代码参数 (支持多种语言)   | ["en", "ru", "fr"]  |
| tranlateConfig | 讯飞机器翻译API配置                 | { appid: "xxxx", apiSecret: "xxxx", apiKey: "xxxx" } |

</br>

> 备注: 参数 tranlateConfig 中的 appid, apiSecret, apiKey 可自行在讯飞开放平台创建新应用，获取服务接口认证信息 </br>
> 相关网页：https://console.xfyun.cn/app/myapp

## 调用 merge 方法的示例代码
```javascript

const { merge } = require("./index.js");

merge(["./../../input/cn.js", "./../../input/us.js"]);

```
## 调用 translate 方法的参数说明
| 参数名         | 含义            | 示例数据                     |
| -------------- | --------------  | ---------------------------- |
| langs          | 需合并文件      | ["./../../input/cn.js", "./../../input/us.js"] |

## 文件 ./../../input/cn.js 数据示例
```javascript
module.exports = {
  checkAll: "全选",
  close: "关闭",
  selected: "已选择",
  disable: "禁用",
  enable: "启用",
  successMsg: "操作成功!",
  repriceTypes: {
  TICKET: "票款",
  CUSTOM: "更名费",
  },
}
```


## translate 参数语种列表

|语种	      | 参数	 |
| ----------| -------------- |
汉语普通话	|     cn
波斯语		  |      fa	
僧伽罗语		|      si
英语		    |      en	
芬兰语		  |     fi	
斯洛伐克语	|     sk
彝语		    |     ii	
希伯来语		|      he	
斯洛文尼亚语|	     sl
广东话		  |      yue	
印地语		  |      hi	
塞尔维亚语	|      sr
日语		    |     ja	
克罗地亚语	|      hr	
巽他语		  |     su
俄语		    |      ru	
匈牙利语		|     hu	
瑞典语		  |      sv
法语		    |      fr	
亚美尼亚语	|     hy	
斯瓦希里语	|     sw
西班牙语		|      es	
印尼语		  |      id	
泰米尔语	  |      ta
阿拉伯语	  |      ar	
冰岛语		  |      is	
泰卢固语		|      te	
意大利语		|      it	
塔加路语(菲律宾) |  tl	
爪哇语		  |       jv	
土耳其语		|      tr
越南语	    |    	 vi	
格鲁吉亚语	|	     ka	
乌克兰语		|       uk
泰语		    |       th	
高棉语		  |       km	
乌尔都语	  |     	 ur
韩语		    |       ko	
老挝语		  |       lo	
南非祖鲁语	|       zu
德语	      | 	     de	
立陶宛语		|       lt	
内蒙语		  |       mn
哈萨克语		|       kka	
拉脱维亚语	|	     lv	
缅甸语		  |       my
南非荷兰语	|	     af	
马拉雅拉姆语|	     ml	
外蒙语		  |       nm
阿姆哈拉语	|	     am	
马拉地语		|       mr	
普什图语		|       ps
阿塞拜疆语	|	     az	
博克马尔挪威语|	   nb	
豪萨语		  |       ha
孟加拉语		|       bn	
尼泊尔语		|       ne	
乌兹别克语	|	     uz
加泰罗尼亚语|		   ca	
荷兰语		  |       nl	
土库曼语		|       tk
捷克语		  |       cs	
波兰语		  |       pl	
塔吉克语		|       tg
丹麦语	    |   	   da	
葡萄牙语		|       pt	
保加利亚语	|	     bg
希腊语		  |       el	
罗马尼亚语	|	     ro	
马来语		  |       ms


# TODO
1. 转ts，配置打包压缩(tsconfig.json 相关知识)
https://github.com/NickBoomBoom/Utils/blob/master/package.json + tsconfig.json
2. 修改pnpm push 脚本，使其能够调用时自动升级版本号并push 到 npm (release-it)