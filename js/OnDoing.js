function onChose(j, i) {
  // 该函数主要用于控制棋子的选择
  if (!runNow) return;
  if (onMove) return;
  //alert(j+""+i);
  var CC = WhatSpace(j, i);
  if (CC == 0) {
    onChoseS(j, i);
  } else {
    Log("选择了" + j + "-" + i + "  " + CC);
    onChoseC(j, i, CC);
  }
}

function cleanSt() {
  // 该函数用于棋子被选中状态的清除
  // 棋盘中的棋子单击一下是选中，单击两下则由选中变为未选中此时会触发该函数。
  nowChoseC = [];
  cleanChose();
  moveList = [];
  eatList = [];
  OnChoseNow = false;
}
function trunH() {
  // 该函数根据出手的先后顺序，控制出棋方的 棋子是否腾空悬起
  if (nowWho == 0) {
    nowWho = 1;
  } else {
    nowWho = 0;
  }
  // 棋子移动完成后则清除其样式
  cleanSt();
}
function showSt(j, i, t) {
  //
  nowChoseC = [];
  cleanChose();
  showChose(j, i, 1);
  var tmap = WhereCan(j, i, t);
  if (tmap != null && tmap.length > 0)
    for (var q = 0; q < tmap.length; q++) {
      if (map[tmap[q][0]][tmap[q][1]] == 0) {
        moveList.push(tmap[q]);
      } else {
        eatList.push(tmap[q]);
      }
      showChose(tmap[q][0], tmap[q][1], tmap[q][2] + 2);
    }
  nowChoseC[0] = j;
  nowChoseC[1] = i;
  nowChoseC[2] = t;
  OnChoseNow = true;
}

var onMove = false;
var OnChoseNow = false;
var nowChoseC = [];
var nowWho = 0; //0红 1黑
var moveList = [];
var eatList = [];

function onChoseC(j, i, t) {
  if (!OnChoseNow) {
    if (nowWho == 0) {
      if (t < 0) return;
    }
    if (nowWho == 1) {
      if (t > 0) return;
    }
  }
  if (nowChoseC[0] == j && nowChoseC[1] == i) {
    cleanSt();
    return;
  }
  if (OnChoseNow == true) {
    for (var q = 0; q < eatList.length; q++) {
      if (eatList[q][0] == j && eatList[q][1] == i) {
        //eat && move
        eat(nowChoseC[0], nowChoseC[1], j, i);
        break;
      }
    }
    cleanSt();
  }
  if (nowWho == 0) {
    if (t < 0) {
      cleanSt();
      return;
    }
  }
  if (nowWho == 1) {
    if (t > 0) {
      cleanSt();
      return;
    }
  }
  showSt(j, i, t);
}
function onChoseS(j, i) {
  if (OnChoseNow) {
    for (var q = 0; q < moveList.length; q++) {
      if (moveList[q][0] == j && moveList[q][1] == i) {
        move(nowChoseC[0], nowChoseC[1], j, i);
        break;
      }
    }
  }
  cleanSt();
}