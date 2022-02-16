// 宣告鍵盤按鈕
const keyboard = document.querySelectorAll(".keyboard .alphabet");
const enterBtn = document.querySelector(".enter");
const deleteBtn = document.querySelector(".backspace");

//將鍵盤輸入值填入作答空格列
const guessAlphabetR1 = document.querySelectorAll(".guessed-alphabetR1");
const guessAlphabetR2 = document.querySelectorAll(".guessed-alphabetR2");
const guessAlphabetR3 = document.querySelectorAll(".guessed-alphabetR3");
const guessAlphabetR4 = document.querySelectorAll(".guessed-alphabetR4");
const guessAlphabetR5 = document.querySelectorAll(".guessed-alphabetR5");
const guessAlphabetR6 = document.querySelectorAll(".guessed-alphabetR6");

//例題
const questionsDB = [
  { id: 1, question: "AFTER" },
  { id: 2, question: "SALUT" },
  { id: 3, question: "GANDI" },
];

let guessedAnswerR1 = [];
let guessedAnswerR2 = [];
let guessedAnswerR3 = [];
let guessedAnswerR4 = [];
let guessedAnswerR5 = [];
let guessedAnswerR6 = [];

//將虛擬鍵盤的輸入值顯示於畫面
//Round1
Round1();
function Round1() {
  let counter1 = -1;
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", (e) => {
      counter1 += 1;
      let showGuess = (guessTimes) => {
        guessAlphabetR1[guessTimes].innerText =
          keyboard[i].children[0].innerText;
        guessedAnswerR1.push(keyboard[i].children[0].innerText);
      };
      if (counter1 < 5) showGuess(counter1);
      keyboard[i].classList.add("checked");
    });
  }

  //驗證輸入值並帶出猜測字母的顏色
  enterBtn.addEventListener("click", enterR1);
  function enterR1() {
    for (let i = 0; i < guessedAnswerR1.length; i++) {
      if (guessedAnswerR1[i] === questionsDB[0].question[i]) {
        guessAlphabetR1[i].parentElement.classList.add("correctBoth");

        for (let j = 0; j < keyboard.length; j++) {
          if (guessedAnswerR1[i] === keyboard[j].children[0].innerText) {
            keyboard[j].style.backgroundColor = "#07b975";
          }
        }
      } else if (questionsDB[0].question.indexOf(guessedAnswerR1[i]) !== -1) {
        guessAlphabetR1[i].parentElement.classList.add("correctOne");
        for (let k = 0; k < keyboard.length; k++) {
          if (guessedAnswerR1[i] === keyboard[k].children[0].innerText) {
            keyboard[k].style.backgroundColor = "#e07a5f";
          }
        }
      } else if (questionsDB[0].question.indexOf(guessedAnswerR1[i]) === -1) {
        guessAlphabetR1[i].parentElement.classList.add("correctNone");
      }
    }
    enterBtn.removeEventListener("click", enterR1);
    // deleteBtn.removeEventListener("click", deleteR1);
    round2();
  }
}

//刪除輸入值
// deleteBtn.addEventListener("click", deleteR1);
// function deleteR1() {
//   if (counter1 < 0) return;
//   guessAlphabetR1[counter1].innerText = " ";
//   counter1 -= 1;
//   console.log(guessAlphabetR1);
// }

//Round2
function round2() {
  let counter2 = -1;
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", (e) => {
      counter2 += 1;
      let showGuess = (guessTimes) => {
        guessAlphabetR2[guessTimes].innerText =
          keyboard[i].children[0].innerText;
        guessedAnswerR2.push(keyboard[i].children[0].innerText);
      };
      if (counter2 < 5) showGuess(counter2);
    });
  }
  //驗證輸入值並帶出猜測字母的顏色
  enterBtn.addEventListener("click", enterR2);
  function enterR2() {
    for (let i = 0; i < guessedAnswerR2.length; i++) {
      if (guessedAnswerR2[i] === questionsDB[0].question[i]) {
        guessAlphabetR2[i].parentElement.classList.add("correctBoth");
      } else if (questionsDB[0].question.indexOf(guessedAnswerR2[i]) !== -1) {
        guessAlphabetR2[i].parentElement.classList.add("correctOne");
      } else if (questionsDB[0].question.indexOf(guessedAnswerR2[i]) === -1) {
        guessAlphabetR2[i].parentElement.classList.add("correctNone");
      }
    }
    deleteBtn.removeEventListener("click", deleteR2);
    enterBtn.removeEventListener("click", enterR2);
    round3();
  }

  //刪除輸入值
  deleteBtn.addEventListener("click", deleteR2);
  function deleteR2() {
    if (counter2 < 0) return;
    guessAlphabetR2[counter2].innerText = " ";
    counter2 -= 1;
  }
}

//Round3
function round3() {
  let counter3 = -1;
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", (e) => {
      counter3 += 1;
      let showGuess = (guessTimes) => {
        guessAlphabetR3[guessTimes].innerText =
          keyboard[i].children[0].innerText;
        guessedAnswerR3.push(keyboard[i].children[0].innerText);
      };
      if (counter3 < 5) showGuess(counter3);
    });
  }
  //驗證輸入值並帶出猜測字母的顏色
  enterBtn.addEventListener("click", enterR3);

  function enterR3() {
    for (let i = 0; i < guessedAnswerR3.length; i++) {
      if (guessedAnswerR3[i] === questionsDB[0].question[i]) {
        guessAlphabetR3[i].parentElement.classList.add("correctBoth");
      } else if (questionsDB[0].question.indexOf(guessedAnswerR3[i]) !== -1) {
        guessAlphabetR3[i].parentElement.classList.add("correctOne");
      } else if (questionsDB[0].question.indexOf(guessedAnswerR3[i]) === -1) {
        guessAlphabetR3[i].parentElement.classList.add("correctNone");
      }
    }
    round4();
    enterBtn.removeEventListener("click", enterR3);
  }
}

//Round4
function round4() {
  let counter4 = -1;
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", (e) => {
      counter4 += 1;
      let showGuess = (guessTimes) => {
        guessAlphabetR4[guessTimes].innerText =
          keyboard[i].children[0].innerText;
        guessedAnswerR4.push(keyboard[i].children[0].innerText);
      };
      if (counter4 < 5) showGuess(counter4);
    });
  }
  //驗證輸入值並帶出猜測字母的顏色
  enterBtn.addEventListener("click", enterR4);

  function enterR4() {
    for (let i = 0; i < guessedAnswerR4.length; i++) {
      if (guessedAnswerR4[i] === questionsDB[0].question[i]) {
        guessAlphabetR4[i].parentElement.classList.add("correctBoth");
      } else if (questionsDB[0].question.indexOf(guessedAnswerR4[i]) !== -1) {
        guessAlphabetR4[i].parentElement.classList.add("correctOne");
      } else if (questionsDB[0].question.indexOf(guessedAnswerR4[i]) === -1) {
        guessAlphabetR4[i].parentElement.classList.add("correctNone");
      }
    }
    enterBtn.removeEventListener("click", enterR4);
    round5();
  }
}

//Round5
function round5() {
  let counter5 = -1;
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", (e) => {
      counter5 += 1;
      let showGuess = (guessTimes) => {
        guessAlphabetR5[guessTimes].innerText =
          keyboard[i].children[0].innerText;
        guessedAnswerR5.push(keyboard[i].children[0].innerText);
      };
      if (counter5 < 5) showGuess(counter5);
    });
  }
  //驗證輸入值並帶出猜測字母的顏色
  enterBtn.addEventListener("click", enterR5);

  function enterR5() {
    for (let i = 0; i < guessedAnswerR5.length; i++) {
      if (guessedAnswerR5[i] === questionsDB[0].question[i]) {
        guessAlphabetR5[i].parentElement.classList.add("correctBoth");
      } else if (questionsDB[0].question.indexOf(guessedAnswerR5[i]) !== -1) {
        guessAlphabetR5[i].parentElement.classList.add("correctOne");
      } else if (questionsDB[0].question.indexOf(guessedAnswerR5[i]) === -1) {
        guessAlphabetR5[i].parentElement.classList.add("correctNone");
      }
    }
    enterBtn.removeEventListener("click", enterR5);
    round6();
  }
}

//Round6
function round6() {
  let counter6 = -1;
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", (e) => {
      counter6 += 1;
      let showGuess = (guessTimes) => {
        guessAlphabetR6[guessTimes].innerText =
          keyboard[i].children[0].innerText;
        guessedAnswerR6.push(keyboard[i].children[0].innerText);
      };
      if (counter6 < 5) showGuess(counter6);
    });
  }
  //驗證輸入值並帶出猜測字母的顏色
  enterBtn.addEventListener("click", enterR6);

  function enterR6() {
    for (let i = 0; i < guessedAnswerR6.length; i++) {
      if (guessedAnswerR6[i] === questionsDB[0].question[i]) {
        guessAlphabetR6[i].parentElement.classList.add("correctBoth");
      } else if (questionsDB[0].question.indexOf(guessedAnswerR6[i]) !== -1) {
        guessAlphabetR6[i].parentElement.classList.add("correctOne");
      } else if (questionsDB[0].question.indexOf(guessedAnswerR6[i]) === -1) {
        guessAlphabetR6[i].parentElement.classList.add("correctNone");
      }
    }
    enterBtn.removeEventListener("click", enterR6);
  }
}
