let startGame = document.querySelector('.btn_start');
let stopGame = document.querySelector('.btn_stop');
let cell = document.querySelectorAll('.cell');
let currentPlayer = document.querySelector('#curPlyr');
let oneGame = document.querySelector('.area');
let oneGameBig = document.querySelector('.area-big');
let options = document.querySelector('.options');

//массив с выигрышными положениями для 3х3
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

//массив с выигрышными положениями для 5х5
const winIndexBig = [
  [1,2,3,4],
  [2,3,4,5],
  [6,7,8,9],
  [7,8,9,10],
  [11,12,13,14],
  [12,13,14,15],
  [16,17,18,19],
  [17,18,19,20],
  [21,22,23,23],
  [22,23,24,25],
  [1,6,11,16],
  [6,11,16,18],
  [2,7,12,17],
  [7,12,17,22],
  [3,8,13,18],
  [8,13,18,23],
  [4,9,14,19],
  [9,14,19,24],
  [5,10,15,20],
  [10,15,20,25],
  [1,7,13,19],
  [7,13,19,25],
  [5,9,13,17],
  [9,13,17,21],
  [6,12,18,24],
  [2,8,14,20],
  [4,8,12,16],
  [10,14,18,22],
];

// показать/скрыть уровни сложности при разных режимах игры
let chooseLvl = document.querySelector('#choose-lvl');
let gamePC = document.querySelector('#PC-game');
let gameOne = document.querySelector('#ONE-game');
gameOne.addEventListener('click',testOff,true);
gamePC.addEventListener('click',testOn,true);
function testOff () {
  chooseLvl.setAttribute('hidden', true);
}
function testOn () {
  chooseLvl.removeAttribute('hidden');
}

startGame.addEventListener('click',testF,{once: true}); //{once: true} - функция выпол. только один раз

startGame.addEventListener('click',toggleStart,false);
stopGame.addEventListener('click',toggleStop,false);
stopGame.addEventListener('click',clear,true);
stopGame.addEventListener('click',xxx,true);



//реализация переключения кнопок и очистки полей/статистики
function toggleStart () {
  oneGame.removeAttribute('hidden');
  options.removeAttribute('hidden');
  startGame.setAttribute('disabled',true);
  stopGame.removeAttribute('disabled');
}
function toggleStop () {
  oneGame.setAttribute('hidden',true);
  options.setAttribute('hidden',true);
  stopGame.setAttribute('disabled',true);
  startGame.removeAttribute('disabled');
}
function clear () {    
  for(let i = 0; i < cell.length; i++) {
      cell[i].innerHTML = '';
  }
  // document.querySelector('#statX').innerHTML = 0;
  // document.querySelector('#statO').innerHTML = 0;
  // document.querySelector('#statD').innerHTML = 0;
}

function xxx () {
  document.querySelector('#statX').innerHTML = 0;
  document.querySelector('#statO').innerHTML = 0;
  document.querySelector('#statD').innerHTML = 0;
}


//ОДИНОЧКА 3х3 Первый ход КРЕСТИКОМ
function testF () { 

  let player = "x"; 

  //начальные значения статистики
  let stat = {
    'x': 0,
    'o': 0,
    'd': 0  //ничья
  }



  // добавляем каждой ячейки событие клика (по клику сработает функция cellClick)
  for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', cellClick, true);
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

    //проверка текущего положения на выигрыш/ничью с помощью функции checkWin(data)
    if(checkWin(data)) {
      stat[player] += 1; //добавляем 1 к статистике победившего игрока
      restart("Выиграл: " + player);
      player ="o" ;  // ЕСЛИ УБРАТЬ ЭТУ СТРОКУ - БУДЕТ ЧЕРЕДОВАНИЕ НАЧАЛЬНЫХ ХОДОВ !!!!!!!!!!!!!!!!!!!!
    } else {
      var draw = true;
      for(var i in cell) {
          if(cell[i].innerHTML == '') draw = false;
      }
      if(draw) {
          stat.d += 1;
          restart("Ничья");
      }
    } 

    player = player == "x" ? "o" : "x"; // после каждого хода меняем игрока
    currentPlayer.innerHTML = player.toUpperCase();//выводим игрока, который сейчас ходит
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
    document.querySelector('#statX').innerHTML = stat.x;
    document.querySelector('#statO').innerHTML = stat.o;
    document.querySelector('#statD').innerHTML = stat.d;
  }
}

// *************************ОДИНОЧКА 3х3 Первый ход НОЛИКОМ******************************
// function testO () { 

//   let player = "o"; //начальный игрок (let т.к. Х будет меняться на 0)
  
//   //начальные значения статистики
//   let stat = {
//     'x': 0,
//     'o': 0,
//     'd': 0  //ничья
//   }
  
//   //массив с выигрышными положениями
//   const winIndex = [
//     [1,2,3],
//     [4,5,6],
//     [7,8,9],
//     [1,4,7],
//     [2,5,8],
//     [3,6,9],
//     [1,5,9],
//     [3,5,7],
//   ];
  
//   // добавляем каждой ячейки событие клика (по клику сработает функция cellClick)
//   for (let i = 0; i < cell.length; i++) {
//     cell[i].addEventListener('click', cellClick, false);
//   }
  
//   function cellClick() {  
//     let data = [];
//     //если ячейка свободна, записываем в неё текущего игрока, если занята - выдаём сообщение
//     if(!this.innerHTML) { 
//       this.innerHTML = player;
//     } else {
//       alert("Ячейка занята");
//       return;
//     }
//     //проходим по ячейкам и если в ячейке стоит позиция текущего игрока, добавляем эти данные в массив data
//     for(let i in cell) {
//       if(cell[i].innerHTML == player) {
//           data.push(parseInt(cell[i].getAttribute('pos')));
//       }
//     }
  
//     //проверяем, совпадаем ли текущее положение игрока с выигрышным или ничья
//     // с помощью функции checkWin(data)
//     if(checkWin(data)) {
//       stat[player] += 1; //добавляем 1 к статистике победившего игрока
//       restart("Выиграл: " + player); 
//     }else {
//       var draw = true;
//       for(var i in cell) {
//           if(cell[i].innerHTML == '') draw = false;
//       }
//       if(draw) {
//           stat.d += 1;
//           restart("Ничья");
//       }
//     } 
  
//     // после каждого хода меняем игрока 
//     player = player == "o" ? "x" : "o";
  
//     //выводим на экран игрока, которй сейчас будет делать ход (O или Х)
//     currentPlayer.innerHTML = player.toUpperCase();
  
//   }
  
//   //функция для проверки победы
//   function checkWin(data) {
//     for(let i in winIndex) {
//       let win = true;
//         for(let j in winIndex[i]) {
//           let id = winIndex[i][j];
//           let ind = data.indexOf(id);
//           if(ind == -1) {
//               win = false;
//           }
//         }
//         if(win) return true;
//     }
//     return false;
//   }
  
  
//   //очищаем поле после каждой игры
//   function restart(text) {    
//     alert(text);
//     for(let i = 0; i < cell.length; i++) {
//         cell[i].innerHTML = '';
//     }
//     updateStat();
//   }
  
//   function updateStat() {
//     document.getElementById('statX').innerHTML = stat.x;
//     document.getElementById('statO').innerHTML = stat.o;
//     document.getElementById('statD').innerHTML = stat.d;
//   }
  
//   }


// *************************БОТ-ПРОСТОЙ (РАНДОМ)******************************

function botRandom () { 
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

    }

    let bot = this.innerHTML == '0';
     
    // после каждого хода меняем игрока 
    player = player == "x" ? bot : "x";
  
    //выводим на экран игрока, которй сейчас будет делать ход (O или Х)
    //currentPlayer.innerHTML = player.toUpperCase();
  
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
  
 
