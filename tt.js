const fs = require("fs");
const ExcelJS = require("exceljs");
const { blob } = require("stream/consumers");

const arr = [
  "/login:登录页\\",
  "/reset/password:ResetPassword\\",
  "/install:Install\\",
  "/*:404\\",
  "/403:403\\",
  "/:home\\",
  "/user:home\\修改密码\\",
  "/home:home\\首页\\",
  "/base:home\\基础信息管理\\",
  "/base/cruise:home\\基础信息管理\\邮轮基础信息\\",
  "/base/cruise/index:home\\基础信息管理\\邮轮基础信息\\邮轮信息维护\\",
  "/base/cruise/cabin:home\\基础信息管理\\邮轮基础信息\\舱房信息\\",
  "/base/cruise/facility:home\\基础信息管理\\邮轮基础信息\\设施\\",
  "/base/cruise/restaurant:home\\基础信息管理\\邮轮基础信息\\餐厅信息\\",
  "/base/cruise/subcategory:home\\基础信息管理\\邮轮基础信息\\舱房类型维护\\",
  "/base/area:home\\基础信息管理\\地区管理\\",
  "/base/country:home\\基础信息管理\\国家管理\\",
  "/base/port:home\\基础信息管理\\港口管理\\",
  "/base/line:home\\基础信息管理\\航线管理\\",
  "/base/media:home\\基础信息管理\\物料管理\\",
  "/voyage:home\\航次管理\\",
  "/voyage/calendar:home\\航次管理\\航行日历\\",
  "/voyage/list:home\\航次管理\\航次列表\\",
  "/settle:home\\财务总账\\",
  "/settle/index:home\\财务总账\\财务总账\\",
  "/controlCabin:home\\控舱管理\\",
  "/controlCabin/list:home\\控舱管理\\舱位列表\\",
  "/controlCabin/cabins:home\\控舱管理\\舱房列表\\",
  "/controlCabin/cabins/index:home\\控舱管理\\舱房列表\\舱房列表\\",
  "/controlCabin/cabins/detail:home\\控舱管理\\舱房列表\\舱房详情\\",
  "/controlCabin/rule:home\\控舱管理\\规则设定\\",
  "/controlCabin/sale:home\\控舱管理\\销售进度\\",
  "/controlCabin/cabin:home\\控舱管理\\舱房销售详情\\",
  "/revenue:home\\收益管理\\",
  "/revenue/data:home\\收益管理\\基础数据管理\\",
  "/revenue/groupType:home\\收益管理\\团队类型\\",
  "/revenue/priceVersion:home\\收益管理\\价格版本\\",
  "/revenue/pricing:home\\收益管理\\舱房定价管理\\",
  "/revenue/rule:home\\收益管理\\促销规则管理\\",
  "/revenue/policy:home\\收益管理\\取消政策管理\\",
  "/channel:home\\渠道管理\\",
  "/channel/area:home\\渠道管理\\渠道地区\\",
  "/channel/type:home\\渠道管理\\渠道类型\\",
  "/channel/list:home\\渠道管理\\分销商管理\\",
  "/channel/bill:home\\渠道管理\\业绩管理\\",
  "/channel/sale:home\\渠道管理\\销售订单\\",
  "/channel/groupDetail:home\\渠道管理\\订单明细\\",
  "/channel/fitDetail:home\\渠道管理\\订单明细\\",
  "/channel/account:home\\渠道管理\\Pro账号管理\\",
  "/pact:home\\合同管理\\",
  "/pact/list:home\\合同管理\\合同管理\\",
  "/policy:home\\政策信息\\",
  "/policy/index:home\\政策信息\\政策信息\\",
  "/order:home\\订单管理\\",
  "/order/fitCreate:home\\订单管理\\FIT预订\\",
  "/order/fit:home\\订单管理\\FIT订单\\",
  "/order/fit/index:home\\订单管理\\FIT订单\\FIT订单\\",
  "/order/fit/detail:home\\订单管理\\FIT订单\\FIT详情\\",
  "/order/group:home\\订单管理\\团队订单\\",
  "/order/group/index:home\\订单管理\\团队订单\\团队订单\\",
  "/order/group/detail:home\\订单管理\\团队订单\\团队详情\\",
  "/order/group/bill:home\\订单管理\\团队订单\\账单明细\\",
  "/order/group/income:home\\订单管理\\团队订单\\收益审价\\",
  "/order/group/room:home\\订单管理\\团队订单\\配房号\\",
  "/order/cabin:home\\订单管理\\舱房订单\\",
  "/order/cabin/index:home\\订单管理\\舱房订单\\舱房订单\\",
  "/order/cabin/detail:home\\订单管理\\舱房订单\\订单明细\\",
  "/system:home\\系统管理\\",
  "/system/permission:home\\系统管理\\权限管理\\",
  "/system/role:home\\系统管理\\角色管理\\",
  "/system/organization:home\\系统管理\\组织架构\\",
  "/system/admin:home\\系统管理\\账号管理\\",
  "/system/log:home\\系统管理\\日志管理\\",
].map((t) => t.split(":"));

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("My Sheet");

worksheet.addRows(arr);
workbook.xlsx.writeFile("./yu.xlsx");