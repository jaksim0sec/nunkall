let coin;
let bead;
let time;
let timer;

function set(){
  coin = 100;
  bead = 0;
  time = 0;
  
  timer = null;
}

function start(){
  set();
  timer = setInterval(()=>{time+=0.1},100);
}

function end(){
  clearInterval(timer);
  timer = null;

  let history = JSON.parse(local('get',['history'])) || {}; //전체 데이터
  let gameData = {when:Date.now(),value:{coin,bead},time}; //요번 데이터
  history.push(gameData); //우선 넣기
  let max = history.reduce((a, b) =>a.time > b.time ? a : b); //넣은 상태로 최고기록 찾기
  max = max.time>time?max:gameData; //요번꺼랑 비교해서 정하기

  //넣기
  local('set',['history',JSON.stringify(history)]);
  local('set',['max',JSON.stringify(max)]);
}

/*유틸*/
function html(a){return document.querySelector(a)};
function local(what, par) {return localStorage[what + "Item"](...par);}
function session(what, par) {return sessionStorage[what + "Item"](...par);}
