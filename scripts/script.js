let startGame = document.querySelector('.btn_start');
let stopGame = document.querySelector('.btn_stop');
let cell = document.getElementsByClassName('cell');
let area = document.getElementsByClassName('area');
let currentPlayer = document.getElementById('curPlyr');

startGame.addEventListener('click',testF,{once: true}); //{once: true} - функция выпол. только один раз
startGame.addEventListener('click',testToggleStart,false);
stopGame.addEventListener('click',testToggleStop,false);
stopGame.addEventListener('click',clear,true);

// тестим визуализацией переключение кнопок
/* startGame.addEventListener('click',testStart,false);
stopGame.addEventListener('click',testStop,false);
function testStart () {
  alert('a');
}
function testStop () {
  alert('ab');
} */

//реализация переключения кнопок
function testToggleStart () {
  startGame.setAttribute('disabled',true);
  stopGame.removeAttribute('disabled');

}
function testToggleStop () {
  stopGame.setAttribute('disabled',true);
  startGame.removeAttribute('disabled');
  cell.setAttribute('disabled',true); // не блокирует ячейки после стопа/////////////////////////
}

function clear () {    
  for(let i = 0; i < cell.length; i++) {
      cell[i].innerHTML = '';
  }
}


function testF () { 

let player = "x"; //начальный игрок (let т.к. Х будет меняться на 0)

//начальные значения статистики
let stat = {
  'x': 0,
  'o': 0,
  'd': 0  //ничья
}

//массив с выигрышными положениями
const winIndex = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7],
];

// добавляем каждой ячейки событие клика (по клику сработает функция cellClick)
for (let i = 0; i < cell.length; i++) {
  cell[i].addEventListener('click', cellClick, false);
}

function cellClick() {  
  let data = [];
  //если ячейка свободна, записываем в неё текущего игрока, если занята - выдаём сообщение
  if(!this.innerHTML) { 
    this.innerHTML = player;
  } else {
    alert("Ячейка занята");
    return;
  }
  //проходим по ячейкам и если в ячейке стоит позиция текущего игрока, добавляем эти данные в массив data
  for(let i in cell) {
    if(cell[i].innerHTML == player) {
        data.push(parseInt(cell[i].getAttribute('pos')));
    }
  }

  //проверяем, совпадаем ли текущее положение игрока с выигрышным или ничья
  // с помощью функции checkWin(data)
  if(checkWin(data)) {
    stat[player] += 1; //добавляем 1 к статистике победившего игрока
    restart("Выиграл: " + player); 
  }else {
    var draw = true;
    for(var i in cell) {
        if(cell[i].innerHTML == '') draw = false;
    }
    if(draw) {
        stat.d += 1;
        restart("Ничья");
    }
  } 

  // после каждого хода меняем игрока 
  player = player == "x" ? "o" : "x";

  //выводим на экран игрока, которй сейчас будет делать ход (O или Х)
  currentPlayer.innerHTML = player.toUpperCase();

}

//функция для проверки победы
function checkWin(data) {
  for(let i in winIndex) {
    let win = true;
      for(let j in winIndex[i]) {
        let id = winIndex[i][j];
        let ind = data.indexOf(id);
        if(ind == -1) {
            win = false;
        }
      }
      if(win) return true;
  }
  return false;
}


//очищаем поле после каждой игры
function restart(text) {    
  alert(text);
  for(let i = 0; i < cell.length; i++) {
      cell[i].innerHTML = '';
  }
  updateStat();
}

function updateStat() {
  document.getElementById('statX').innerHTML = stat.x;
  document.getElementById('statO').innerHTML = stat.o;
  document.getElementById('statD').innerHTML = stat.d;
}

}



