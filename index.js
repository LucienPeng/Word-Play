// 宣告鍵盤按鈕
const keyboard = document.querySelectorAll(".keyboard .alphabet");
const enterBtn = document.querySelector(".enter");
const deleteBtn = document.querySelector(".backspace");

//將鍵盤輸入值填入作答空格列
const guessAnswerR1 = document.querySelectorAll(".guessed-alphabetR1");
const guessAnswerR2 = document.querySelectorAll(".guessed-alphabetR2");
const guessAnswerR3 = document.querySelectorAll(".guessed-alphabetR3");
const guessAnswerR4 = document.querySelectorAll(".guessed-alphabetR4");
const guessAnswerR5 = document.querySelectorAll(".guessed-alphabetR5");
const guessAnswerR6 = document.querySelectorAll(".guessed-alphabetR6");

let guessedArrR1 = [];
let guessedArrR2 = [];
let guessedArrR3 = [];
let guessedArrR4 = [];
let guessedArrR5 = [];
let guessedArrR6 = [];

//題庫
const questionsDB = [
  { id: 1, question: "LUCKY" },
  { id: 2, question: "WINDY" },
  { id: 3, question: "GRAND" },
  { id: 4, question: "FRONT" },
  { id: 5, question: "FRAUD" },
  { id: 6, question: "MONEY" },
  { id: 7, question: "FAINT" },
  { id: 8, question: "LIGHT" },
  { id: 9, question: "FAKER" },
  { id: 10, question: "AGONY" },
];

//自動出題
let question = "";
function randomQuestion() {
  let random = Math.floor(Math.random() * 10) + 1;

  for (let i = 0; i < questionsDB.length; i++) {
    if (random === questionsDB[i].id) {
      question = questionsDB[i].question;
    }
  }
  return question;
}

//Round1

Round1();
function Round1() {
  console.log(randomQuestion());

  // 用來計算已輸入字母個數
  let counter1 = -1;

  //用迴圈一次監聽全部的虛擬鍵盤並取值
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", inputR1);

    function inputR1() {
      //每輸入一次則COUNTER+1
      counter1 += 1;

      //若輸入未超過5個字母，則每次將虛擬鍵盤取出的值渲然於畫面作答區，並將作答塞入陣列做後續操作。

      let showGuess = (guessTimes) => {
        guessAnswerR1[guessTimes].innerText =
          keyboard[i].childNodes[0].innerText;
        guessedArrR1.push(keyboard[i].childNodes[0].innerText);
      };
      if (counter1 < 5) showGuess(counter1);
      else {
        return;
      }
    }
  }

  //監聽按下ENTER
  enterBtn.addEventListener("click", enterR1);
  function enterR1() {
    //如果陣列長度（作答）不超過5，則不繼續執行。
    if (guessedArrR1.length < 5) {
      return;
    } else {
      for (let i = 0; i < guessedArrR1.length; i++) {
        //判斷作答是否完全正確，若是則給予綠色背景。
        if (guessedArrR1[i] === question[i]) {
          guessAnswerR1[i].parentElement.classList.add("correctBoth");
          // 更改字母鍵盤顏色
          for (let j = 0; j < keyboard.length; j++) {
            if (guessedArrR1[i] === keyboard[j].childNodes[0].innerText) {
              keyboard[j].style.backgroundColor = "#07b975";
            }
          }
          //判斷作答是否只有位置正確，若是則給予橘色背景。
        } else if (question.indexOf(guessedArrR1[i]) !== -1) {
          guessAnswerR1[i].parentElement.classList.add("correctOne");
          // 更改字母鍵盤顏色
          for (let k = 0; k < keyboard.length; k++) {
            if (guessedArrR1[i] === keyboard[k].childNodes[0].innerText) {
              keyboard[k].style.backgroundColor = "#e07a5f";
            }
          }
          //判斷作答是否完全不吻合，若是則給予灰色背景。
        } else if (question.indexOf(guessedArrR1[i]) === -1) {
          guessAnswerR1[i].parentElement.classList.add("correctNone");
          for (let l = 0; l < keyboard.length; l++) {
            if (guessedArrR1[i] === keyboard[l].childNodes[0].innerText) {
              keyboard[l].style.backgroundColor = "#444444";
            }
          }
        }
        //按下確定後，取消第一回合的虛擬鍵盤監聽。
        keyboard[i].removeEventListener("click", inputR1);
      }
    }
    //按下確定後，取消第一回合的ENTER/BACKSPACE監聽，並啟動第二回合監聽。
    enterBtn.removeEventListener("click", enterR1);
    deleteBtn.removeEventListener("click", deleteR1);
    //  判斷勝利與否
    if (question === guessedArrR1.join("")) {
      console.log("You won the game!");
      return;
    }
    Round2();
  }

  //BACKSPACE鍵監聽，透過COUNTER決定刪除的個數。
  //每刪除一個，就需要減少一個COUNTER讓數字後退，於小於0時RETURN。
  deleteBtn.addEventListener("click", deleteR1);
  function deleteR1() {
    if (counter1 < 0) return;
    guessAnswerR1[counter1].innerText = "";
    guessedArrR1.pop(keyboard[counter1].childNodes[0].innerText);
    counter1 -= 1;
  }
}

function Round2() {
  // 用來計算已輸入字母個數
  let counter2 = -1;

  //用迴圈一次監聽全部的虛擬鍵盤並取值
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", inputR2);

    function inputR2() {
      //每輸入一次則COUNTER+1
      counter2 += 1;

      //若輸入未超過5個字母，則每次將虛擬鍵盤取出的值渲然於畫面作答區，並將作答塞入陣列做後續操作。
      let showGuess = (guessTimes) => {
        //將已點選的虛擬按鍵上深色
        keyboard[i].classList.add("checked");
        guessAnswerR2[guessTimes].innerText =
          keyboard[i].childNodes[0].innerText;
        guessedArrR2.push(keyboard[i].childNodes[0].innerText);
      };
      if (counter2 < 5) showGuess(counter2);
      else {
        return;
      }
    }
  }

  //監聽按下ENTER
  enterBtn.addEventListener("click", enterR2);
  function enterR2() {
    //如果陣列長度（作答）不超過5，則不繼續執行。
    if (guessedArrR2.length < 5) {
      return;
    } else {
      for (let i = 0; i < guessedArrR2.length; i++) {
        //判斷作答是否完全正確，若是則給予綠色背景。
        if (guessedArrR2[i] === question[i]) {
          guessAnswerR2[i].parentElement.classList.add("correctBoth");
          // 更改字母鍵盤顏色
          for (let j = 0; j < keyboard.length; j++) {
            if (guessedArrR2[i] === keyboard[j].childNodes[0].innerText) {
              keyboard[j].style.backgroundColor = "#07b975";
            }
          }
          //判斷作答是否只有位置正確，若是則給予橘色背景。
        } else if (question.indexOf(guessedArrR2[i]) !== -1) {
          guessAnswerR2[i].parentElement.classList.add("correctOne");
          // 更改字母鍵盤顏色
          for (let k = 0; k < keyboard.length; k++) {
            if (guessedArrR2[i] === keyboard[k].childNodes[0].innerText) {
              keyboard[k].style.backgroundColor = "#e07a5f";
            }
          }
          //判斷作答是否完全不吻合，若是則給予灰色背景。
        } else if (question.indexOf(guessedArrR2[i]) === -1) {
          guessAnswerR2[i].parentElement.classList.add("correctNone");
          for (let l = 0; l < keyboard.length; l++) {
            if (guessedArrR2[i] === keyboard[l].childNodes[0].innerText) {
              keyboard[l].style.backgroundColor = "#444444";
            }
          }
        }
        //按下確定後，取消第一回合的虛擬鍵盤監聽。
        keyboard[i].removeEventListener("click", inputR2);
      }
    }
    //按下確定後，取消第一回合的ENTER/BACKSPACE監聽，並啟動第二回合監聽。
    enterBtn.removeEventListener("click", enterR2);
    deleteBtn.removeEventListener("click", deleteR2);
    //  判斷勝利與否
    if (question === guessedArrR2.join("")) {
      console.log("You won the game!");
      return;
    }
    Round3();
  }

  //BACKSPACE鍵監聽，透過COUNTER決定刪除的個數。
  //每刪除一個，就需要減少一個COUNTER讓數字後退，於小於0時RETURN。
  deleteBtn.addEventListener("click", deleteR2);
  function deleteR2() {
    if (counter2 < 0) return;
    guessAnswerR2[counter2].innerText = "";
    guessedArrR2.pop(keyboard[counter2].childNodes[0].innerText);
    counter2 -= 1;
  }
}

function Round3() {
  // 用來計算已輸入字母個數
  let counter3 = -1;

  //用迴圈一次監聽全部的虛擬鍵盤並取值
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", inputR3);

    function inputR3() {
      //每輸入一次則COUNTER+1
      counter3 += 1;

      //若輸入未超過5個字母，則每次將虛擬鍵盤取出的值渲然於畫面作答區，並將作答塞入陣列做後續操作。
      let showGuess = (guessTimes) => {
        //將已點選的虛擬按鍵上深色
        keyboard[i].classList.add("checked");
        guessAnswerR3[guessTimes].innerText =
          keyboard[i].childNodes[0].innerText;
        guessedArrR3.push(keyboard[i].childNodes[0].innerText);
      };
      if (counter3 < 5) showGuess(counter3);
      else {
        return;
      }
    }
  }

  //監聽按下ENTER
  enterBtn.addEventListener("click", enterR3);
  function enterR3() {
    //如果陣列長度（作答）不超過5，則不繼續執行。
    if (guessedArrR3.length < 5) {
      return;
    } else {
      for (let i = 0; i < guessedArrR3.length; i++) {
        //判斷作答是否完全正確，若是則給予綠色背景。
        if (guessedArrR3[i] === question[i]) {
          guessAnswerR3[i].parentElement.classList.add("correctBoth");
          // 更改字母鍵盤顏色
          for (let j = 0; j < keyboard.length; j++) {
            if (guessedArrR3[i] === keyboard[j].childNodes[0].innerText) {
              keyboard[j].style.backgroundColor = "#07b975";
            }
          }
          //判斷作答是否只有位置正確，若是則給予橘色背景。
        } else if (question.indexOf(guessedArrR3[i]) !== -1) {
          guessAnswerR3[i].parentElement.classList.add("correctOne");
          // 更改字母鍵盤顏色
          for (let k = 0; k < keyboard.length; k++) {
            if (guessedArrR3[i] === keyboard[k].childNodes[0].innerText) {
              keyboard[k].style.backgroundColor = "#e07a5f";
            }
          }
          //判斷作答是否完全不吻合，若是則給予灰色背景。
        } else if (question.indexOf(guessedArrR3[i]) === -1) {
          guessAnswerR3[i].parentElement.classList.add("correctNone");
          for (let l = 0; l < keyboard.length; l++) {
            if (guessedArrR3[i] === keyboard[l].childNodes[0].innerText) {
              keyboard[l].style.backgroundColor = "#444444";
            }
          }
        }
        //按下確定後，取消第一回合的虛擬鍵盤監聽。
        keyboard[i].removeEventListener("click", inputR3);
      }
    }
    //按下確定後，取消第一回合的ENTER/BACKSPACE監聽，並啟動第二回合監聽。
    enterBtn.removeEventListener("click", enterR3);
    deleteBtn.removeEventListener("click", deleteR3);
    //  判斷勝利與否
    if (question === guessedArrR3.join("")) {
      console.log("You won the game!");
      return;
    }
    Round4();
  }

  //BACKSPACE鍵監聽，透過COUNTER決定刪除的個數。
  //每刪除一個，就需要減少一個COUNTER讓數字後退，於小於0時RETURN。
  deleteBtn.addEventListener("click", deleteR3);
  function deleteR3() {
    if (counter3 < 0) return;
    guessAnswerR3[counter3].innerText = "";
    guessedArrR3.pop(keyboard[counter3].childNodes[0].innerText);
    counter3 -= 1;
  }
}

function Round4() {
  // 用來計算已輸入字母個數
  let counter4 = -1;

  //用迴圈一次監聽全部的虛擬鍵盤並取值
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", inputR4);

    function inputR4() {
      //每輸入一次則COUNTER+1
      counter4 += 1;

      //若輸入未超過5個字母，則每次將虛擬鍵盤取出的值渲然於畫面作答區，並將作答塞入陣列做後續操作。
      let showGuess = (guessTimes) => {
        //將已點選的虛擬按鍵上深色
        keyboard[i].classList.add("checked");
        guessAnswerR4[guessTimes].innerText =
          keyboard[i].childNodes[0].innerText;
        guessedArrR4.push(keyboard[i].childNodes[0].innerText);
      };
      if (counter4 < 5) showGuess(counter4);
      else {
        return;
      }
    }
  }

  //監聽按下ENTER
  enterBtn.addEventListener("click", enterR4);
  function enterR4() {
    //如果陣列長度（作答）不超過5，則不繼續執行。
    if (guessedArrR4.length < 5) {
      return;
    } else {
      for (let i = 0; i < guessedArrR4.length; i++) {
        //判斷作答是否完全正確，若是則給予綠色背景。
        if (guessedArrR4[i] === question[i]) {
          guessAnswerR4[i].parentElement.classList.add("correctBoth");
          // 更改字母鍵盤顏色
          for (let j = 0; j < keyboard.length; j++) {
            if (guessedArrR4[i] === keyboard[j].childNodes[0].innerText) {
              keyboard[j].style.backgroundColor = "#07b975";
            }
          }
          //判斷作答是否只有位置正確，若是則給予橘色背景。
        } else if (question.indexOf(guessedArrR4[i]) !== -1) {
          guessAnswerR4[i].parentElement.classList.add("correctOne");
          // 更改字母鍵盤顏色
          for (let k = 0; k < keyboard.length; k++) {
            if (guessedArrR4[i] === keyboard[k].childNodes[0].innerText) {
              keyboard[k].style.backgroundColor = "#e07a5f";
            }
          }
          //判斷作答是否完全不吻合，若是則給予灰色背景。
        } else if (question.indexOf(guessedArrR4[i]) === -1) {
          guessAnswerR4[i].parentElement.classList.add("correctNone");
          for (let l = 0; l < keyboard.length; l++) {
            if (guessedArrR4[i] === keyboard[l].childNodes[0].innerText) {
              keyboard[l].style.backgroundColor = "#444444";
            }
          }
        }
        //按下確定後，取消第一回合的虛擬鍵盤監聽。
        keyboard[i].removeEventListener("click", inputR4);
      }
    }
    //按下確定後，取消第一回合的ENTER/BACKSPACE監聽，並啟動第二回合監聽。
    enterBtn.removeEventListener("click", enterR4);
    deleteBtn.removeEventListener("click", deleteR4);
    //  判斷勝利與否
    if (question === guessedArrR4.join("")) {
      console.log("You won the game!");
      return;
    }
    Round5();
  }

  //BACKSPACE鍵監聽，透過COUNTER決定刪除的個數。
  //每刪除一個，就需要減少一個COUNTER讓數字後退，於小於0時RETURN。
  deleteBtn.addEventListener("click", deleteR4);
  function deleteR4() {
    if (counter4 < 0) return;
    guessAnswerR4[counter4].innerText = "";
    guessedArrR4.pop(keyboard[counter4].childNodes[0].innerText);
    counter4 -= 1;
  }
}

function Round5() {
  // 用來計算已輸入字母個數
  let counter5 = -1;

  //用迴圈一次監聽全部的虛擬鍵盤並取值
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", inputR5);

    function inputR5() {
      //每輸入一次則COUNTER+1
      counter5 += 1;

      //若輸入未超過5個字母，則每次將虛擬鍵盤取出的值渲然於畫面作答區，並將作答塞入陣列做後續操作。
      let showGuess = (guessTimes) => {
        //將已點選的虛擬按鍵上深色
        keyboard[i].classList.add("checked");
        guessAnswerR5[guessTimes].innerText =
          keyboard[i].childNodes[0].innerText;
        guessedArrR5.push(keyboard[i].childNodes[0].innerText);
      };
      if (counter5 < 5) showGuess(counter5);
      else {
        return;
      }
    }
  }

  //監聽按下ENTER
  enterBtn.addEventListener("click", enterR5);
  function enterR5() {
    //如果陣列長度（作答）不超過5，則不繼續執行。
    if (guessedArrR5.length < 5) {
      return;
    } else {
      for (let i = 0; i < guessedArrR5.length; i++) {
        //判斷作答是否完全正確，若是則給予綠色背景。
        if (guessedArrR5[i] === question[i]) {
          guessAnswerR5[i].parentElement.classList.add("correctBoth");
          // 更改字母鍵盤顏色
          for (let j = 0; j < keyboard.length; j++) {
            if (guessedArrR5[i] === keyboard[j].childNodes[0].innerText) {
              keyboard[j].style.backgroundColor = "#07b975";
            }
          }
          //判斷作答是否只有位置正確，若是則給予橘色背景。
        } else if (question.indexOf(guessedArrR5[i]) !== -1) {
          guessAnswerR5[i].parentElement.classList.add("correctOne");
          // 更改字母鍵盤顏色
          for (let k = 0; k < keyboard.length; k++) {
            if (guessedArrR5[i] === keyboard[k].childNodes[0].innerText) {
              keyboard[k].style.backgroundColor = "#e07a5f";
            }
          }
          //判斷作答是否完全不吻合，若是則給予灰色背景。
        } else if (question.indexOf(guessedArrR5[i]) === -1) {
          guessAnswerR5[i].parentElement.classList.add("correctNone");
          for (let l = 0; l < keyboard.length; l++) {
            if (guessedArrR5[i] === keyboard[l].childNodes[0].innerText) {
              keyboard[l].style.backgroundColor = "#444444";
            }
          }
        }
        //按下確定後，取消第一回合的虛擬鍵盤監聽。
        keyboard[i].removeEventListener("click", inputR5);
      }
    }
    //按下確定後，取消第一回合的ENTER/BACKSPACE監聽，並啟動第二回合監聽。
    enterBtn.removeEventListener("click", enterR5);
    deleteBtn.removeEventListener("click", deleteR5);
    //  判斷勝利與否
    if (question === guessedArrR5.join("")) {
      console.log("You won the game!");
      return;
    }
    Round6();
  }

  //BACKSPACE鍵監聽，透過COUNTER決定刪除的個數。
  //每刪除一個，就需要減少一個COUNTER讓數字後退，於小於0時RETURN。
  deleteBtn.addEventListener("click", deleteR5);
  function deleteR5() {
    if (counter5 < 0) return;
    guessAnswerR5[counter5].innerText = "";
    guessedArrR5.pop(keyboard[counter5].childNodes[0].innerText);
    counter5 -= 1;
  }
}

function Round6() {
  // 用來計算已輸入字母個數
  let counter6 = -1;

  //用迴圈一次監聽全部的虛擬鍵盤並取值
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", inputR6);

    function inputR6() {
      //每輸入一次則COUNTER+1
      counter6 += 1;

      //若輸入未超過5個字母，則每次將虛擬鍵盤取出的值渲然於畫面作答區，並將作答塞入陣列做後續操作。
      let showGuess = (guessTimes) => {
        //將已點選的虛擬按鍵上深色
        keyboard[i].classList.add("checked");
        guessAnswerR6[guessTimes].innerText =
          keyboard[i].childNodes[0].innerText;
        guessedArrR6.push(keyboard[i].childNodes[0].innerText);
      };
      if (counter6 < 5) showGuess(counter6);
      else {
        return;
      }
    }
  }

  //監聽按下ENTER
  enterBtn.addEventListener("click", enterR6);
  function enterR6() {
    //如果陣列長度（作答）不超過5，則不繼續執行。
    if (guessedArrR6.length < 5) {
      return;
    } else {
      for (let i = 0; i < guessedArrR6.length; i++) {
        //判斷作答是否完全正確，若是則給予綠色背景。
        if (guessedArrR6[i] === question[i]) {
          guessAnswerR6[i].parentElement.classList.add("correctBoth");
          // 更改字母鍵盤顏色
          for (let j = 0; j < keyboard.length; j++) {
            if (guessedArrR6[i] === keyboard[j].childNodes[0].innerText) {
              keyboard[j].style.backgroundColor = "#07b975";
            }
          }
          //判斷作答是否只有位置正確，若是則給予橘色背景。
        } else if (question.indexOf(guessedArrR6[i]) !== -1) {
          guessAnswerR6[i].parentElement.classList.add("correctOne");
          // 更改字母鍵盤顏色
          for (let k = 0; k < keyboard.length; k++) {
            if (guessedArrR6[i] === keyboard[k].childNodes[0].innerText) {
              keyboard[k].style.backgroundColor = "#e07a5f";
            }
          }
          //判斷作答是否完全不吻合，若是則給予灰色背景。
        } else if (question.indexOf(guessedArrR6[i]) === -1) {
          guessAnswerR6[i].parentElement.classList.add("correctNone");
          for (let l = 0; l < keyboard.length; l++) {
            if (guessedArrR6[i] === keyboard[l].childNodes[0].innerText) {
              keyboard[l].style.backgroundColor = "#444444";
            }
          }
        }
        //按下確定後，取消第一回合的虛擬鍵盤監聽。
        keyboard[i].removeEventListener("click", inputR6);
      }
    }
    //按下確定後，取消第一回合的ENTER/BACKSPACE監聽，並啟動第二回合監聽。
    enterBtn.removeEventListener("click", enterR6);
    deleteBtn.removeEventListener("click", deleteR6);
  }
  //  判斷勝利與否
  if (question === guessedArrR6.join("")) {
    console.log("You won the game!");
    return;
  }

  //BACKSPACE鍵監聽，透過COUNTER決定刪除的個數。
  //每刪除一個，就需要減少一個COUNTER讓數字後退，於小於0時RETURN。
  deleteBtn.addEventListener("click", deleteR6);
  function deleteR6() {
    if (counter6 < 0) return;
    guessAnswerR6[counter6].innerText = "";
    guessedArrR6.pop(keyboard[counter6].childNodes[0].innerText);
    counter6 -= 1;
  }
}
