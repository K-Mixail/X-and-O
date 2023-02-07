let startGame = document.querySelector('.btn__start');
let stopGame = document.querySelector('.btn__stop');
let cell = document.querySelectorAll('.cell');
let cellBig = document.querySelectorAll('.cell-big');
let oneGame = document.querySelector('.area');
let oneGameBig = document.querySelector('.area-big');
let options = document.querySelector('.options');
let currentPlayer = document.querySelector('#curPlyr');
let choose = document.querySelector('.choose');
let chooseSize = document.querySelector('.choose__size');
let choosePlayer = document.querySelector('.choose__player');
let rules = document.querySelector('.js-rules');

const game = document.querySelector('#game');
game.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const size = data.get('size');
  const player = data.get('player');
  toggleStart();
  if(size === 'three') {
      if (player === 'x') {
        threeX(); 
      } else if (player === 'zero') {
        threeO();
      }
  } else if (size === 'five') {
     if (player === 'x') {
       fiveX();
     } else if (player === 'zero') {
       fiveO();
     }
   }
})
 
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
 
stopGame.addEventListener('click',toggleStop);
stopGame.addEventListener('click',restartPage);
function restartPage () {
 location.reload(); return false;
}

 //переключение кнопок
function toggleStart () {
  options.removeAttribute('hidden');
  startGame.setAttribute('disabled',true);
  stopGame.removeAttribute('disabled');
  choose.setAttribute('hidden',true);
  rules.setAttribute('hidden',true);
}
function toggleStop () {
  options.setAttribute('hidden',true);
  stopGame.setAttribute('disabled',true);
  startGame.removeAttribute('disabled');
  oneGame.setAttribute('hidden',true);
  oneGameBig.setAttribute('hidden',true);   
}

// Модальное окно
let modal = document.getElementById("modal");
let closeModal = document.querySelector(".close");
let continueModal = document.querySelector(".continue");
let messageWin = document.querySelector('#text');
closeModal.addEventListener('click', none);
continueModal.addEventListener('click', none);
function none () {
  modal.style.display = "none";
}

 // 3х3 Первый ход КРЕСТИКОМ
function threeX () { 
   oneGame.removeAttribute('hidden');
   let player = "x"; 
   let stat = {
     'x': 0,
     'o': 0,
     'd': 0  
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
       console.log("Ячейка занята");
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
       restart("Выиграли: " + player.toUpperCase());
       player = "o" ;  
     } else {
       var draw = true;
       for(var i in cell) {
           if(cell[i].innerHTML == '') draw = false;
       }
       if(draw) {
           stat.d += 1;
           restart("Ничья");
           player = "o" ;
       }
     } 
 
     if (player == "x") {
      this.style.color = "#78191a";
      this.style.cursor = "default";
      player = "o";
     } else {
      this.style.color = "#1a5c2f";
      this.style.cursor = "default";
      player = "x";
    } 

     currentPlayer.innerHTML = player.toUpperCase();//выводим игрока, который сейчас ходит
  }
 
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
 
   function restart(text) {    
    modal.style.display = "block";
    messageWin.innerHTML = text;
    window.onclick = function (event) {
       if (event.target == modal) {
           modal.style.display = "none";
       }
    }
     for(let i = 0; i < cell.length; i++) {
         cell[i].innerHTML = '';
         cell[i].style.cursor = "pointer";
     }
     updateStat();
   }
   function updateStat() {
     document.querySelector('#statX').innerHTML = stat.x;
     document.querySelector('#statO').innerHTML = stat.o;
     document.querySelector('#statD').innerHTML = stat.d;
   }
}
 
 // 3х3 Первый ход НОЛИКОМ
function threeO () { 
   oneGame.removeAttribute('hidden');
   let player = "o"; 
   let stat = {
     'x': 0,
     'o': 0,
     'd': 0  
   }

   for (let i = 0; i < cell.length; i++) {
     cell[i].addEventListener('click', cellClick, true);
   }
 
   function cellClick() {  
     let data = [];

     if(!this.innerHTML) { 
       this.innerHTML = player;
     } else {
      console.log("Ячейка занята");
      return;
     }

     for(let i in cell) {
       if(cell[i].innerHTML == player) {
           data.push(parseInt(cell[i].getAttribute('pos')));
       }
     }

     if(checkWin(data)) {
       stat[player] += 1; 
       restart("Выиграли: " + player.toUpperCase());
       player = "x";
     } else {
       var draw = true;
       for(var i in cell) {
           if(cell[i].innerHTML == '') draw = false;
       }
       if(draw) {
           stat.d += 1;
           restart("Ничья");
           player = "x";
       }
     }

     if (player == "x") {
      this.style.color = "#78191a";
      this.style.cursor = "default";
      player = "o";
     } else {
      this.style.color = "#1a5c2f";
      this.style.cursor = "default";
      player = "x";
    }
 
     currentPlayer.innerHTML = player.toUpperCase();
   }
 
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
 
   function restart(text) {    
    modal.style.display = "block";
    messageWin.innerHTML = text;
    window.onclick = function (event) {
       if (event.target == modal) {
           modal.style.display = "none";
       }
    }
     for(let i = 0; i < cell.length; i++) {
         cell[i].innerHTML = '';
         cell[i].style.cursor = "pointer";
     }
     updateStat();
   }
   function updateStat() {
     document.querySelector('#statX').innerHTML = stat.x;
     document.querySelector('#statO').innerHTML = stat.o;
     document.querySelector('#statD').innerHTML = stat.d;
   }
}
 
 
 // 5x5 Первый ход КРЕСТИКОМ
function fiveX () { 
   oneGameBig.removeAttribute('hidden');
   let player = "x"; 
   let stat = {
     'x': 0,
     'o': 0,
     'd': 0  
   }

   for (let i = 0; i < cellBig.length; i++) {
     cellBig[i].addEventListener('click', cellClick, true);
   }
 
   function cellClick() {  
     let data = [];

     if(!this.innerHTML) { 
       this.innerHTML = player;
     } else {
      console.log("Ячейка занята");
       return;
     }

     for(let i in cellBig) {
       if(cellBig[i].innerHTML == player) {
           data.push(parseInt(cellBig[i].getAttribute('pos')));
       }
     }
    
     if(checkWin(data)) {
       stat[player] += 1; 
       restart("Выиграли: " + player.toUpperCase());
       player = "o" ;  
     } else {
       var draw = true;
       for(var i in cellBig) {
           if(cellBig[i].innerHTML == '') draw = false;
       }
       if(draw) {
           stat.d += 1;
           restart("Ничья");
           player = "o" ;
       }
     } 
 
     if (player == "x") {
      this.style.color = "#78191a";
      this.style.cursor = "default";
      player = "o";
     } else {
      this.style.color = "#1a5c2f";
      this.style.cursor = "default";
      player = "x";
    }
 
     currentPlayer.innerHTML = player.toUpperCase();
   }
 
   function checkWin(data) {
     for(let i in winIndexBig) {
       let win = true;
         for(let j in winIndexBig[i]) {
           let id = winIndexBig[i][j];
           let ind = data.indexOf(id);
           if(ind == -1) {
               win = false;
           }
         }
         if(win) return true;
     }
     return false;
   }
 
   function restart(text) {    
    modal.style.display = "block";
    messageWin.innerHTML = text;
    window.onclick = function (event) {
       if (event.target == modal) {
           modal.style.display = "none";
       }
    }
     for(let i = 0; i < cellBig.length; i++) {
         cellBig[i].innerHTML = '';
         cellBig[i].style.cursor = "pointer";
     }
     updateStat();
   }
   function updateStat() {
     document.querySelector('#statX').innerHTML = stat.x;
     document.querySelector('#statO').innerHTML = stat.o;
     document.querySelector('#statD').innerHTML = stat.d;
   }
}
 
 
 //5x5 Первый ход НОЛИКОМ
function fiveO () { 
   oneGameBig.removeAttribute('hidden');
   let player = "o"; 
   let stat = {
     'x': 0,
     'o': 0,
     'd': 0  
   }

   for (let i = 0; i < cellBig.length; i++) {
     cellBig[i].addEventListener('click', cellClick, true);
   }
 
   function cellClick() {  
     let data = [];
     
     if(!this.innerHTML) { 
       this.innerHTML = player;
     } else {
      console.log("Ячейка занята");
       return;
     }
     
     for(let i in cellBig) {
       if(cellBig[i].innerHTML == player) {
           data.push(parseInt(cellBig[i].getAttribute('pos')));
       }
     }
    
     if(checkWin(data)) {
       stat[player] += 1; 
       restart("Выиграли: " + player.toUpperCase());
       player = "x";  
     } else {
       var draw = true;
       for(var i in cellBig) {
           if(cellBig[i].innerHTML == '') draw = false;
       }
       if(draw) {
           stat.d += 1;
           restart("Ничья");
           player = "x";
       }
     } 
 
     if (player == "x") {
      this.style.color = "#78191a";
      this.style.cursor = "default";
      player = "o";
     } else {
      this.style.color = "#1a5c2f";
      this.style.cursor = "default";
      player = "x";
    }
 
     currentPlayer.innerHTML = player.toUpperCase();
   }
 
   function checkWin(data) {
     for(let i in winIndexBig) {
       let win = true;
         for(let j in winIndexBig[i]) {
           let id = winIndexBig[i][j];
           let ind = data.indexOf(id);
           if(ind == -1) {
               win = false;
           }
         }
         if(win) return true;
     }
     return false;
   }
 
   function restart(text) {    
    modal.style.display = "block";
    messageWin.innerHTML = text;
    window.onclick = function (event) {
       if (event.target == modal) {
           modal.style.display = "none";
       }
    }
     for(let i = 0; i < cellBig.length; i++) {
         cellBig[i].innerHTML = '';
         cellBig[i].style.cursor = "pointer";
     }
     updateStat();
   }
   function updateStat() {
     document.querySelector('#statX').innerHTML = stat.x;
     document.querySelector('#statO').innerHTML = stat.o;
     document.querySelector('#statD').innerHTML = stat.d;
   }
}

