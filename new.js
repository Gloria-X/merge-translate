//创建对象

var wb = new ExcelJS.Workbook();

//创建一个名称为Sheet1的sheet页，并填充背景色为红色
var ws = wb.addWorksheet("Sheet1", {
  properties: { tabColor: { argb: "FFFFFF" } },
});

//将数据源添加到sheet页中

ws.addRows(data);
FindOnePassengerRequestDTO;
//设置默认单元格样式

var style = {
  fill: {
    //背景色填充
    type: "gradient",
    gradient: "angle",
    degree: 0,
    stops: [
      { position: 0, color: { argb: "FFAFEEEE" } }, //单元格渐变色（左）
      { position: 0.5, color: { argb: "FFAFEEEE" } }, //单元格渐变色（中）
      { position: 1, color: { argb: "FFAFEEEE" } }, //单元格渐变色（右）
    ],
  },
  font: {
    name: "宋体",
    size: 11,
    bold: false,
  },
  alignment: {
    vertical: "middle",
    horizontal: "center",
    wrapText: false,
  },
  border: {
    top: {
      style: "thin",
    },
    bottom: {
      style: "thin",
    },
    left: {
      style: "thin",
    },
    right: {
      style: "thin",
    },
  },
};

//设置单元格样式  (cellName:'A1')

ws.getCell(cellName).style = style;

//合并单元格 （将cellName1至cellName2的单元格合并）

//单元格样式与合并单元格都需要每个单元格单独设置，如果较多可以创建数组，遍历设置。

ws.mergeCells(cellName1, cellName2);

//查找重复的内容，自动合并单元格（仅限纵向合并）

//例子：MergeColumn(ws, 1, 0, ws._rows.length); 将A列重复的文字合并
function MergeColumn(sheet, StartRowNum, ColumnIndex, LastRowNum) {
  var rowNum = 0; //初始化为数字，便于计算
  for (var i = StartRowNum; i < LastRowNum + 1; i++) {
    var startCellName = getColumnNameByIndex(ColumnIndex) + i;
    var startValue = sheet.getCell(startCellName).value;
    for (var k = i + 1; k < LastRowNum + 1; k++) {
      var currCellName = getColumnNameByIndex(ColumnIndex) + k;
      var currValue = sheet.getCell(currCellName).value;
      if (startValue != currValue) {
        if (k != i + 1) {
          //合并到前一个单元格
          rowNum = k - 1;
          var preCellName = getColumnNameByIndex(ColumnIndex) + rowNum;
          sheet.mergeCells(startCellName, preCellName);
          i = k - 1; //从k开始继续
        }
        break;
      } else if (k == LastRowNum) {
        //连同最后一行合并
        sheet.mergeCells(startCellName, currCellName);
        //sheetMerge.push({ s: { r: i, c: ColumnIndex }, e: { r: LastRowNum, c: ColumnIndex } });
        i = LastRowNum; //结束外层循环
        break;
      }
    }
  }
}

//Excel/Sheet根据索引输出列名
function getColumnNameByIndex(i) {
  var result = String.fromCharCode("A".charCodeAt() + (i % 26));

  while (i >= 26) {
    i /= 26;
    i--;
    result = String.fromCharCode("A".charCodeAt() + (i % 26)) + result;
  }
  return result;
}

//导出excel
function saveAs(blob, fileName) {
  //生成一个a标签
  var a = document.createElement("a");
  a.style.display = "none";
  a.download = fileName;
  a.id = "aexport";
  //生成一个label标签，用于触发a标签点击事件
  var lb = document.createElement("label");
  lb.for = "aexport";
  a.appendChild(lb);
  //创建一个URL对象，指向Blob对象
  var objectURL = window.URL.createObjectURL(blob);
  a.href = objectURL;

  //把a标签加入body
  document.body.appendChild(a);
  //触发a标签点击事件
  lb.click();
  //IE不支持createObjectURL，特殊处理
  if (_isIE()) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  }
  //删除a标签
  document.body.removeChild(a);
  //回收内存
  URL.revokeObjectURL(objectURL);
}
