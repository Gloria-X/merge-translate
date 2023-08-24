# 功能介绍
该module有两个功能：merge 和 translate

其中merge可将多个js文件合并生成excel; translate调用讯飞机器翻译api，将传入基准字段翻译为多种语言，存入excel


# 示例代码

调用translate模块示例如下：
```javascript

import  {translate} from 'merge-translate'
translate("./../../input/cn.js", "cn", ["en", "ru", "fr"], {
  appid: "xxxx",
  apiSecret: "xxxx",
  apiKey: "xxxx",
});

```

调用merge模块示例如下：
```javascript

const set = require("../feature/mixins/genExcel");

set(["./../../input/cn.js", "./../../input/us.js"]);


```

# 语种列表



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




