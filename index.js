// 宣告鍵盤按鈕
const keyboard = document.querySelectorAll(".keyboard .alphabet");

const enterBtn = document.querySelector(".enter");

const deleteBtn = document.querySelector(".backspace");

//將鍵盤輸入值填入作答空格列
const guessAlphabetR1 = document.querySelectorAll(".guessed-alphabet");
const guessAlphabetR2 = document.querySelectorAll(".guessed-alphabetR2");
const guessAlphabetR3 = document.querySelectorAll(".guessed-alphabetR3");
const guessAlphabetR4 = document.querySelectorAll(".guessed-alphabetR4");

//例題
const questions = [
  { id: 1, question: ["O", "U", "I", "J", "A"] },
  { id: 2, question: "SALUT" },
  { id: 3, question: "GANDI" },
];

//將虛擬鍵盤的輸入值顯示於畫面
let guessedAnswerR1 = [];
let guessedAnswerR2 = [];
let guessedAnswerR3 = [];
let guessedAnswerR4 = [];
let guessedAnswerR5 = [];
let guessedAnswerR6 = [];

let counter = -1;
for (let i = 0; i < keyboard.length; i++) {
  keyboard[i].addEventListener("click", (e) => {
    counter += 1;
    let showGuess = (guessTimes) => {
      guessAlphabetR1[guessTimes].innerText = keyboard[i].children[0].innerText;
      guessedAnswerR1.push(keyboard[i].children[0].innerText);
    };
    if (counter < 5) showGuess(counter);
  });
}

//驗證輸入值並帶出猜測字母的顏色
enterBtn.addEventListener("click", enterR1);
function enterR1() {
  for (let i = 0; i < guessedAnswerR1.length; i++) {
    if (guessedAnswerR1[i] === questions[0].question[i]) {
      guessAlphabetR1[i].parentElement.classList.add("correctBoth");
    } else if (guessedAnswerR1.indexOf(questions[0].question[i]) !== -1) {
      guessAlphabetR1[i].parentElement.classList.add("correctOne");
    } else if (guessedAnswerR1.indexOf(questions[0].question[i]) === -1) {
      guessAlphabetR1[i].parentElement.classList.add("correctNone");
    }
  }
  console.log(guessedAnswerR1);
  round2();
  enterBtn.removeEventListener("click", enterR1);
}

//刪除輸入值
deleteBtn.addEventListener("click", (e) => {
  if (counter < 0) return;
  guessAlphabet[counter].innerText = " ";
  counter -= 1;
});

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
      if (guessedAnswerR2[i] === questions[0].question[i]) {
        guessAlphabetR2[i].parentElement.classList.add("correctBoth");
      } else if (guessedAnswerR2.indexOf(questions[0].question[i]) !== -1) {
        guessAlphabetR2[i].parentElement.classList.add("correctOne");
      } else if (guessedAnswerR2.indexOf(questions[0].question[i]) === -1) {
        guessAlphabetR2[i].parentElement.classList.add("correctNone");
      }
    }
    console.log(guessedAnswer);
    console.log(guessedAnswerR2);
    enterBtn.removeEventListener("click", enterR2);
    round3();
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
      if (guessedAnswerR3[i] === questions[0].question[i]) {
        guessAlphabetR3[i].parentElement.classList.add("correctBoth");
      } else if (guessedAnswerR3.indexOf(questions[0].question[i]) !== -1) {
        guessAlphabetR3[i].parentElement.classList.add("correctOne");
      } else if (guessedAnswerR3.indexOf(questions[0].question[i]) === -1) {
        guessAlphabetR3[i].parentElement.classList.add("correctNone");
      }
    }
  }
  console.log(guessedAnswer);
  console.log(guessedAnswerR2);
  console.log(guessedAnswerR3);
}
