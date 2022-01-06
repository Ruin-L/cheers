function LoadGround() {
  //创建加载场景
  var g = "";
  // 使用循环将棋盘的样式结构遍历出来，添加到dom节点树
  for (var j = 0; j < 10; j++) {
    map[j] = [];
    for (var i = 0; i < 9; i++) {
      map[j][i] = 0;
      g +=
        "<article class='CS' id='CS" +
        j +
        "-" +
        i +
        "' onclick='onChose(" +
        j +
        "," +
        i +
        ")'></article>";
    }
  }
  // 获取dom id space，调用jq中的html方法并将参数g传入
  $("#space").html(g);
  Log("完成创建场景");
}
//0空
//兵1 炮2 车3 马4 相5 士6 将7 红
//卒-1 炮-2 车-3 马-4 象-5 士-6 帅-7 黑
function getCText(j, i) {
  var T = [];
  // 使用switch case 判断当前map集合中棋子的名称
  switch (map[j][i]) {
    case 0:
      return null;
      break;
    case 1:
      T[0] = "兵";
      T[1] = "BR";
      break;
    case 2:
      T[0] = "炮";
      T[1] = "PR";
      break;
    case 3:
      T[0] = "车";
      T[1] = "JR";
      break;
    case 4:
      T[0] = "马";
      T[1] = "MR";
      break;
    case 5:
      T[0] = "相";
      T[1] = "XR";
      break;
    case 6:
      T[0] = "士";
      T[1] = "SR";
      break;
    case 7:
      T[0] = "将";
      T[1] = "J";
      break;
    case -1:
      T[0] = "卒";
      T[1] = "BB";
      break;
    case -2:
      T[0] = "炮";
      T[1] = "PB";
      break;
    case -3:
      T[0] = "车";
      T[1] = "JB";
      break;
    case -4:
      T[0] = "马";
      T[1] = "MB";
      break;
    case -5:
      T[0] = "象";
      T[1] = "XB";
      break;
    case -6:
      T[0] = "士";
      T[1] = "SB";
      break;
    case -7:
      T[0] = "帅";
      T[1] = "S";
      break;
    default:
      return null;
      break;
  }
  return T;
}
// 循环遍历棋子，渲染其dom结构和样式
function showC() {
  for (var j = 0; j < 10; j++) {
    for (var i = 0; i < 9; i++) {
      var cla = "";
      var tex = "";
      var isNone = false;
      var T = getCText(j, i);
      if (T == null) {
        isNone = true;
      } else {
        cla = T[1];
        tex = T[0];
      }
      if (isNone) {
        continue;
      }
      $("#CS" + j + "-" + i).html(
        "<section class='C " + cla + "'>" + tex + "</section>"
      );
    }
  }
  Log("完成显示场景");
}

//0清除 1绿色 2黄色 3红色
function showChose(j, i, t) {
  // 添加棋子被选中、移动、吃子等时的样式

  // 获取id cs，并进行字符串的拼接
  var o = $("#CS" + j + "-" + i);
  if (t == 0) {
    //当t为0时代表棋子被吃掉了，此时需要清除它的边框以及阴影这些样式
    o.css({
      "box-shadow": "",
      border: "",
    });
    return;
  }
  var c = "";
  // 根据棋子的状态，为它添加不同的边框颜色和阴影
  switch (t) {
    case 1:
      c = "6bc274";
      break;
    case 2:
      c = "eeb948";
      break;
    case 3:
      c = "c53f46";
      break;
    default:
      break;
  }
  o.css({
    "box-shadow": "0 0 25pt #" + c,
    border: "3px solid #" + c,
  });
}

function cleanChose() {
  // 清除棋子在没有被选择时的样式
  $(".CS").css({
    "box-shadow": "",
    border: "",
  });
}
function move(y, x, j, i, eat) {
  // 该函数主要是根据棋子的坐标来判断棋子是否被吃掉以及控制棋子的移动
  // 它主要有5个形参，其中有y,x代表坐标，j,i代表棋子信息，eat判断是否符合吃的条件
  onMove = true;
  if (eat == null)
    if (map[j][i] != 0) {
      LogError("错误的位置");
      return;
    }
  var cla = "";
  var tex = "";
  var T = getCText(y, x);
  if (T == null) {
    LogError("丢失棋子信息");
    return;
  } else {
    cla = T[1];
    tex = T[0];
  }
  if (eat == null) Log(y + "-" + x + " " + tex + " 移动到" + j + "-" + i);
  else {
    Log(
      y + "-" + x + " " + tex + " 吃" + j + "-" + i + " " + getCText(j, i)[0]
    );
    console.log(getCText(j, i));
    /*
     getCText是一个函数，这个函数中有两个形参，其中j代表棋子的中文名，i代表棋子的英文名
     这个函数的返回值是一个数组，每当有棋子被吃掉时该函数就会触发 值的格式为 ['马', 'MB'] 
     前面的马是被吃棋子名称，后面的’MB‘代表被吃的是黑子，如果是‘MR’则代表被吃的是红子。
    */

    /* 
    根据这个函数的返回值中的棋子名称来判断哪方为胜利方并调用js中的刷新方法，来结束游戏
    */
    if (getCText(j, i)[0] === "帅") {
      // 如果getCText的返回值为“帅”则可以判断出黑子的“帅”被吃掉了
      alert("红子获胜！");
      // 弹窗提示用户红字胜出
      location.reload();
      // 刷新整个网页
      console.error("游戏结束");
      // 打印日志
    } else if (getCText(j, i)[0] === "将") {
      // 同上
      alert("黑子获胜！");
      location.reload();
      console.error("游戏结束");
    }
  }

  map[j][i] = map[y][x];
  map[y][x] = 0;
  $("#CS" + j + "-" + i).html(
    "<section class='C " +
      cla +
      "' style='transform:translate(" +
      (x - i) * 45 +
      "px," +
      (y - j) * 45 +
      "px);'>" +
      tex +
      "</section>"
  );
  $("#CS" + y + "-" + x).html("");
  setTimeout(function () {
    $("#CS" + j + "-" + i + " section").css({
      transform: "",
    });
  }, 10);
  setTimeout(function () {
    trunH();
    onMove = false;
  }, 700);
}

function eat(y, x, j, i) {
  onMove = true;
  // 该函数用于实现棋子被吃掉的效果
  // 具体效果的实现是通过css来隐藏棋子从而达到看不到被吃掉的效果
  $("#CS" + j + "-" + i + " section").css({
    transform: "scale(0,0)",
    //   css中的transform中有scale缩放的属性，缩放为0时则可以达到隐藏的效果
  });
  setTimeout(function () {
    move(y, x, j, i, true);
  }, 700);
}
