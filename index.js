import { randomQuestion } from "./modules/autoQuiz.js";
import { endingAnimation } from "./modules/endingAnimation.js";
import { statistic, instructionModal, loggingModal } from "./modules/modals.js";
import { statistics, rowWin, chartCookie } from "./modules/statistics.js";
import { playersArr, scoresArr, sentRank } from "./modules/rank.js";
import {
  setCookie,
  getCookie,
  cookieInit,
  cookieRender,
  getCookieString,
} from "./modules/cookies.js";

// 宣告鍵盤按鈕
const keyboard = document.querySelectorAll(".keyboard .alphabet");
const keyboards = document.querySelector(".keyboard");
const enterBtn = document.querySelector(".enter");
const deleteBtn = document.querySelector(".backspace");

//宣告作答提示
const note = document.querySelector(".note");

//宣告統計Ｍodal
const chartBar = document.querySelector("#chart");
const chartBarRank = document.querySelector("#rankChart");

//抓取玩家姓名
const loggingBtn = document.querySelector("#loggingBtn");
const loggingInput = document.querySelector("#loggingInput");

//將鍵盤輸入值填入作答空格
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

//出題
let question = randomQuestion();
console.log(question);

//初始化
let verification = "";
let lossTimes = 0;
let playTimes = 0;
//cookieInit();
statistics();

//確認是否為新玩家。是的話，開啟登入頁面，並重置cookie。
(function initialization() {
  let initSetting = playersArr.find((item) => {
    return item === getCookieString("currentPlayer");
  });

  if (initSetting === undefined) {
    loggingModal.show();
    cookieInit();
  }
})();

//將登入名存入cookie，並判斷是否為ＤＢ已有之玩家。
//沒有的話，存入ＤＢ，並開啟教學。

loggingBtn.addEventListener("click", (e) => {
  let newPlayer = loggingInput.value;
  setCookie("currentPlayer", newPlayer);

  let isNewPlayer = playersArr.find((item) => {
    return item === newPlayer;
  });

  if (isNewPlayer === undefined) {
    sentRank(newPlayer);
    instructionModal.toggle();
  }
});

//圖表
const dataBar = {
  labels: [1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: "Played",
      data: rowWin,
      backgroundColor: ["#07b975"],
      borderColor: ["#ffffff"],
      borderWidth: 2,
      borderRadius: 2,
    },
  ],
};

const configBar = {
  type: "bar",
  data: dataBar,
  options: {
    legend: {
      display: false,
    },

    indexAxis: "y",
    scales: {
      x: {
        grid: {
          display: false,
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  },
};
const chart = new Chart(chartBar, configBar);

const dataBarRank = {
  labels: playersArr,
  datasets: [
    {
      label: "Score",
      data: scoresArr,
      backgroundColor: ["#99c530"],
      borderColor: ["#ffffff"],
      borderWidth: 2,
      borderRadius: 2,
    },
  ],
};

const configBarRank = {
  type: "bar",
  data: dataBarRank,
  options: {
    legend: {
      display: false,
    },

    indexAxis: "y",
    scales: {
      x: {
        grid: {
          display: false,
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  },
};
const chartRank = new Chart(chartBarRank, configBarRank);

Round1();
function Round1() {
  let counter = -1;

  //利用動態鍵盤輸入文字
  keyboards.addEventListener("click", input);
  function input(e) {
    if (counter > 3) return;
    let guessedLetter = e.target.innerText;
    if (guessedLetter.length !== 1) return;
    else {
      counter += 1;
      guessedArrR1.push(guessedLetter);
      guessAnswerR1[counter].parentNode.classList.add(
        "animate__animated",
        "animate__bounceIn"
      );
      guessAnswerR1[counter].innerText = guessedLetter;
    }
  }

  //開始驗證答案
  enterBtn.addEventListener("click", enter);
  function enter() {
    if (guessedArrR1.length < 5) return;

    //透過API串接字典驗證是否為有意義的單字
    function isVacabularyAPI() {
      return new Promise((resolve) => {
        const response = axios
          .get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${guessedArrR1.join(
              ""
            )}`
          )
          .then(function (response) {
            resolve(response.data[0].word.toUpperCase());
          })
          .catch(function (error) {
            resolve(error.message);
          });
      });
    }

    isVacabulary();
    async function isVacabulary() {
      const verification = await isVacabularyAPI();

      if (verification === "Request failed with status code 404") {
        note.innerText = "This is not a word!";
        note.classList.add("animate__animated", "animate__wobble");
        note.style.width = "15rem";
        note.style.display = "block";
      } else {
        for (let i = 0; i < 5; i++) {
          //判斷作答是否完全正確。若是，則給予綠色背景。
          if (guessedArrR1[i] === question[i]) {
            guessAnswerR1[i].parentElement.classList.add(
              "correctBoth",
              "animate__animated",
              "animate__flipInY"
            );
            // 更改字母鍵盤顏色為綠色
            for (let j = 0; j < keyboard.length; j++) {
              if (guessedArrR1[i] === keyboard[j].childNodes[0].innerText) {
                keyboard[j].style.backgroundColor = "#07b975";
              }
            }

            //判斷作答是否只有位置正確。若是，則給予橘色背景。
          } else if (question.indexOf(guessedArrR1[i]) !== -1) {
            guessAnswerR1[i].parentElement.classList.add(
              "correctOne",
              "animate__animated",
              "animate__flipInY"
            );

            // 更改字母鍵盤顏色為橘色。
            for (let k = 0; k < keyboard.length; k++) {
              if (guessedArrR1[i] === keyboard[k].childNodes[0].innerText) {
                keyboard[k].style.backgroundColor = "#e07a5f";
              }
            }

            //判斷作答是否完全不吻合，若是則給予灰色背景。
          } else if (question.indexOf(guessedArrR1[i]) === -1) {
            guessAnswerR1[i].parentElement.classList.add(
              "correctNone",
              "animate__animated",
              "animate__flipInY"
            );
            for (let l = 0; l < keyboard.length; l++) {
              if (guessedArrR1[i] === keyboard[l].childNodes[0].innerText) {
                keyboard[l].style.backgroundColor = "#444444";
              }
            }
          } // 全對
          if (question === guessedArrR1.join("")) {
            guessAnswerR1[i].parentElement.classList.add("correctAll");
            guessAnswerR1[i].parentElement.classList.add(
              "animate__animated",
              "animate__flip"
            );
          }
        }
      }
      //  判斷勝利條件
      if (question === guessedArrR1.join("")) {
        endingAnimation(0);
        keyboards.removeEventListener("click", input);
        return;
      } else if (verification.length === 5) {
        enterBtn.removeEventListener("click", enter);
        deleteBtn.removeEventListener("click", remove);
        Round2();
      }
    }
  }

  //BACKSPACE鍵監聽，透過COUNTER決定刪除的個數。
  //每刪除一個，就需要減少一個COUNTER讓數字後退，於小於0時RETURN。
  deleteBtn.addEventListener("click", remove);
  function remove() {
    if (counter < 0) return;
    guessedArrR1.pop();
    guessAnswerR1[counter].innerText = "";
    counter -= 1;
    note.style.display = "none";
  }
}

//Round2();
function Round2() {
  let counter = -1;

  //利用動態鍵盤輸入文字
  keyboards.addEventListener("click", input);
  function input(e) {
    if (counter > 3) return;
    let guessedLetter = e.target.innerText;
    if (guessedLetter.length !== 1) return;
    else {
      counter += 1;
      guessedArrR2.push(guessedLetter);
      guessAnswerR2[counter].parentNode.classList.add(
        "animate__animated",
        "animate__bounceIn"
      );
      guessAnswerR2[counter].innerText = guessedLetter;
    }
  }

  //開始驗證答案
  enterBtn.addEventListener("click", enter);
  function enter() {
    if (guessedArrR2.length < 5) return;

    //透過API串接字典驗證是否為有意義的單字
    function isVacabularyAPI() {
      return new Promise((resolve) => {
        const response = axios
          .get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${guessedArrR2.join(
              ""
            )}`
          )
          .then(function (response) {
            resolve(response.data[0].word.toUpperCase());
          })
          .catch(function (error) {
            resolve(error.message);
          });
      });
    }

    isVacabulary();
    async function isVacabulary() {
      const verification = await isVacabularyAPI();

      if (verification === "Request failed with status code 404") {
        note.innerText = "This is not a word!";
        note.classList.add("animate__animated", "animate__wobble");
        note.style.width = "15rem";
        note.style.display = "block";
      } else {
        for (let i = 0; i < 5; i++) {
          //判斷作答是否完全正確。若是，則給予綠色背景。
          if (guessedArrR2[i] === question[i]) {
            guessAnswerR2[i].parentElement.classList.add(
              "correctBoth",
              "animate__animated",
              "animate__flipInY"
            );
            // 更改字母鍵盤顏色為綠色
            for (let j = 0; j < keyboard.length; j++) {
              if (guessedArrR2[i] === keyboard[j].childNodes[0].innerText) {
                keyboard[j].style.backgroundColor = "#07b975";
              }
            }

            //判斷作答是否只有位置正確。若是，則給予橘色背景。
          } else if (question.indexOf(guessedArrR2[i]) !== -1) {
            guessAnswerR2[i].parentElement.classList.add(
              "correctOne",
              "animate__animated",
              "animate__flipInY"
            );

            // 更改字母鍵盤顏色為橘色。
            for (let k = 0; k < keyboard.length; k++) {
              if (guessedArrR2[i] === keyboard[k].childNodes[0].innerText) {
                keyboard[k].style.backgroundColor = "#e07a5f";
              }
            }

            //判斷作答是否完全不吻合，若是則給予灰色背景。
          } else if (question.indexOf(guessedArrR2[i]) === -1) {
            guessAnswerR2[i].parentElement.classList.add(
              "correctNone",
              "animate__animated",
              "animate__flipInY"
            );
            for (let l = 0; l < keyboard.length; l++) {
              if (guessedArrR2[i] === keyboard[l].childNodes[0].innerText) {
                keyboard[l].style.backgroundColor = "#444444";
              }
            }
          } // 全對
          if (question === guessedArrR2.join("")) {
            guessAnswerR2[i].parentElement.classList.add("correctAll");
            guessAnswerR2[i].parentElement.classList.add(
              "animate__animated",
              "animate__flip"
            );
          }
        }
      }
      //  判斷勝利條件
      if (question === guessedArrR2.join("")) {
        statistics(1);
        endingAnimation(1);

        keyboards.removeEventListener("click", input);
        return;
      } else if (verification.length === 5) {
        enterBtn.removeEventListener("click", enter);
        deleteBtn.removeEventListener("click", remove);
        Round3();
      }
    }
  }

  //BACKSPACE鍵監聽，透過COUNTER決定刪除的個數。
  //每刪除一個，就需要減少一個COUNTER讓數字後退，於小於0時RETURN。
  deleteBtn.addEventListener("click", remove);
  function remove() {
    if (counter < 0) return;
    guessedArrR2.pop();
    guessAnswerR2[counter].innerText = "";
    counter -= 1;
    note.style.display = "none";
  }
}

//Round3();
function Round3() {
  let counter = -1;

  //利用動態鍵盤輸入文字
  keyboards.addEventListener("click", input);
  function input(e) {
    if (counter > 3) return;
    let guessedLetter = e.target.innerText;
    if (guessedLetter.length !== 1) return;
    else {
      counter += 1;
      guessedArrR3.push(guessedLetter);
      guessAnswerR3[counter].parentNode.classList.add(
        "animate__animated",
        "animate__bounceIn"
      );
      guessAnswerR3[counter].innerText = guessedLetter;
    }
  }

  //開始驗證答案
  enterBtn.addEventListener("click", enter);
  function enter() {
    if (guessedArrR3.length < 5) return;

    //透過API串接字典驗證是否為有意義的單字
    function isVacabularyAPI() {
      return new Promise((resolve) => {
        const response = axios
          .get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${guessedArrR3.join(
              ""
            )}`
          )
          .then(function (response) {
            resolve(response.data[0].word.toUpperCase());
          })
          .catch(function (error) {
            resolve(error.message);
          });
      });
    }

    isVacabulary();
    async function isVacabulary() {
      const verification = await isVacabularyAPI();

      if (verification === "Request failed with status code 404") {
        note.innerText = "This is not a word!";
        note.classList.add("animate__animated", "animate__wobble");
        note.style.width = "15rem";
        note.style.display = "block";
      } else {
        for (let i = 0; i < 5; i++) {
          //判斷作答是否完全正確。若是，則給予綠色背景。
          if (guessedArrR3[i] === question[i]) {
            guessAnswerR3[i].parentElement.classList.add(
              "correctBoth",
              "animate__animated",
              "animate__flipInY"
            );
            // 更改字母鍵盤顏色為綠色
            for (let j = 0; j < keyboard.length; j++) {
              if (guessedArrR3[i] === keyboard[j].childNodes[0].innerText) {
                keyboard[j].style.backgroundColor = "#07b975";
              }
            }

            //判斷作答是否只有位置正確。若是，則給予橘色背景。
          } else if (question.indexOf(guessedArrR3[i]) !== -1) {
            guessAnswerR3[i].parentElement.classList.add(
              "correctOne",
              "animate__animated",
              "animate__flipInY"
            );

            // 更改字母鍵盤顏色為橘色。
            for (let k = 0; k < keyboard.length; k++) {
              if (guessedArrR3[i] === keyboard[k].childNodes[0].innerText) {
                keyboard[k].style.backgroundColor = "#e07a5f";
              }
            }

            //判斷作答是否完全不吻合，若是則給予灰色背景。
          } else if (question.indexOf(guessedArrR3[i]) === -1) {
            guessAnswerR3[i].parentElement.classList.add(
              "correctNone",
              "animate__animated",
              "animate__flipInY"
            );
            for (let l = 0; l < keyboard.length; l++) {
              if (guessedArrR3[i] === keyboard[l].childNodes[0].innerText) {
                keyboard[l].style.backgroundColor = "#444444";
              }
            }
          } // 全對
          if (question === guessedArrR3.join("")) {
            guessAnswerR3[i].parentElement.classList.add("correctAll");
            guessAnswerR3[i].parentElement.classList.add(
              "animate__animated",
              "animate__flip"
            );
          }
        }
      }
      //  判斷勝利條件
      if (question === guessedArrR3.join("")) {
        statistics(2);
        endingAnimation(2);
        keyboards.removeEventListener("click", input);
        return;
      } else if (verification.length === 5) {
        enterBtn.removeEventListener("click", enter);
        deleteBtn.removeEventListener("click", remove);
        Round4();
        return;
      }
    }
  }

  //BACKSPACE鍵監聽，透過COUNTER決定刪除的個數。
  //每刪除一個，就需要減少一個COUNTER讓數字後退，於小於0時RETURN。
  deleteBtn.addEventListener("click", remove);
  function remove() {
    if (counter < 0) return;
    guessedArrR3.pop();
    guessAnswerR3[counter].innerText = "";
    counter -= 1;
    note.style.display = "none";
  }
}

//Round4();
function Round4() {
  let counter = -1;

  //利用動態鍵盤輸入文字
  keyboards.addEventListener("click", input);
  function input(e) {
    if (counter > 3) return;
    let guessedLetter = e.target.innerText;
    if (guessedLetter.length !== 1) return;
    else {
      counter += 1;
      guessedArrR4.push(guessedLetter);
      guessAnswerR4[counter].parentNode.classList.add(
        "animate__animated",
        "animate__bounceIn"
      );
      guessAnswerR4[counter].innerText = guessedLetter;
    }
  }

  //開始驗證答案
  enterBtn.addEventListener("click", enter);
  function enter() {
    if (guessedArrR4.length < 5) return;

    //透過API串接字典驗證是否為有意義的單字
    function isVacabularyAPI() {
      return new Promise((resolve) => {
        const response = axios
          .get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${guessedArrR4.join(
              ""
            )}`
          )
          .then(function (response) {
            resolve(response.data[0].word.toUpperCase());
          })
          .catch(function (error) {
            resolve(error.message);
          });
      });
    }

    isVacabulary();
    async function isVacabulary() {
      const verification = await isVacabularyAPI();

      if (verification === "Request failed with status code 404") {
        note.innerText = "This is not a word!";
        note.classList.add("animate__animated", "animate__wobble");
        note.style.width = "15rem";
        note.style.display = "block";
      } else {
        for (let i = 0; i < 5; i++) {
          //判斷作答是否完全正確。若是，則給予綠色背景。
          if (guessedArrR4[i] === question[i]) {
            guessAnswerR4[i].parentElement.classList.add(
              "correctBoth",
              "animate__animated",
              "animate__flipInY"
            );
            // 更改字母鍵盤顏色為綠色
            for (let j = 0; j < keyboard.length; j++) {
              if (guessedArrR4[i] === keyboard[j].childNodes[0].innerText) {
                keyboard[j].style.backgroundColor = "#07b975";
              }
            }

            //判斷作答是否只有位置正確。若是，則給予橘色背景。
          } else if (question.indexOf(guessedArrR4[i]) !== -1) {
            guessAnswerR4[i].parentElement.classList.add(
              "correctOne",
              "animate__animated",
              "animate__flipInY"
            );

            // 更改字母鍵盤顏色為橘色。
            for (let k = 0; k < keyboard.length; k++) {
              if (guessedArrR4[i] === keyboard[k].childNodes[0].innerText) {
                keyboard[k].style.backgroundColor = "#e07a5f";
              }
            }

            //判斷作答是否完全不吻合，若是則給予灰色背景。
          } else if (question.indexOf(guessedArrR4[i]) === -1) {
            guessAnswerR4[i].parentElement.classList.add(
              "correctNone",
              "animate__animated",
              "animate__flipInY"
            );
            for (let l = 0; l < keyboard.length; l++) {
              if (guessedArrR4[i] === keyboard[l].childNodes[0].innerText) {
                keyboard[l].style.backgroundColor = "#444444";
              }
            }
          } // 全對
          if (question === guessedArrR4.join("")) {
            guessAnswerR4[i].parentElement.classList.add("correctAll");
            guessAnswerR4[i].parentElement.classList.add(
              "animate__animated",
              "animate__flip"
            );
          }
        }
      }
      //  判斷勝利條件
      if (question === guessedArrR4.join("")) {
        statistics(3);
        endingAnimation(3);
        keyboards.removeEventListener("click", input);
        return;
      } else if (verification.length === 5) {
        enterBtn.removeEventListener("click", enter);
        deleteBtn.removeEventListener("click", remove);
        Round5();
        return;
      }
    }
  }

  //BACKSPACE鍵監聽，透過COUNTER決定刪除的個數。
  //每刪除一個，就需要減少一個COUNTER讓數字後退，於小於0時RETURN。
  deleteBtn.addEventListener("click", remove);
  function remove() {
    if (counter < 0) return;
    guessedArrR4.pop();
    guessAnswerR4[counter].innerText = "";
    counter -= 1;
    note.style.display = "none";
  }
}

//Round5();
function Round5() {
  let counter = -1;

  //利用動態鍵盤輸入文字
  keyboards.addEventListener("click", input);
  function input(e) {
    if (counter > 3) return;
    let guessedLetter = e.target.innerText;
    if (guessedLetter.length !== 1) return;
    else {
      counter += 1;
      guessedArrR5.push(guessedLetter);
      guessAnswerR5[counter].parentNode.classList.add(
        "animate__animated",
        "animate__bounceIn"
      );
      guessAnswerR5[counter].innerText = guessedLetter;
    }
  }

  //開始驗證答案
  enterBtn.addEventListener("click", enter);
  function enter() {
    if (guessedArrR5.length < 5) return;

    //透過API串接字典驗證是否為有意義的單字
    function isVacabularyAPI() {
      return new Promise((resolve) => {
        const response = axios
          .get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${guessedArrR5.join(
              ""
            )}`
          )
          .then(function (response) {
            resolve(response.data[0].word.toUpperCase());
          })
          .catch(function (error) {
            resolve(error.message);
          });
      });
    }

    isVacabulary();
    async function isVacabulary() {
      const verification = await isVacabularyAPI();

      if (verification === "Request failed with status code 404") {
        note.innerText = "This is not a word!";
        note.classList.add("animate__animated", "animate__wobble");
        note.style.width = "15rem";
        note.style.display = "block";
      } else {
        for (let i = 0; i < 5; i++) {
          //判斷作答是否完全正確。若是，則給予綠色背景。
          if (guessedArrR5[i] === question[i]) {
            guessAnswerR5[i].parentElement.classList.add(
              "correctBoth",
              "animate__animated",
              "animate__flipInY"
            );
            // 更改字母鍵盤顏色為綠色
            for (let j = 0; j < keyboard.length; j++) {
              if (guessedArrR5[i] === keyboard[j].childNodes[0].innerText) {
                keyboard[j].style.backgroundColor = "#07b975";
              }
            }

            //判斷作答是否只有位置正確。若是，則給予橘色背景。
          } else if (question.indexOf(guessedArrR5[i]) !== -1) {
            guessAnswerR5[i].parentElement.classList.add(
              "correctOne",
              "animate__animated",
              "animate__flipInY"
            );

            // 更改字母鍵盤顏色為橘色。
            for (let k = 0; k < keyboard.length; k++) {
              if (guessedArrR5[i] === keyboard[k].childNodes[0].innerText) {
                keyboard[k].style.backgroundColor = "#e07a5f";
              }
            }

            //判斷作答是否完全不吻合，若是則給予灰色背景。
          } else if (question.indexOf(guessedArrR5[i]) === -1) {
            guessAnswerR5[i].parentElement.classList.add(
              "correctNone",
              "animate__animated",
              "animate__flipInY"
            );
            for (let l = 0; l < keyboard.length; l++) {
              if (guessedArrR5[i] === keyboard[l].childNodes[0].innerText) {
                keyboard[l].style.backgroundColor = "#444444";
              }
            }
          } // 全對
          if (question === guessedArrR5.join("")) {
            guessAnswerR5[i].parentElement.classList.add("correctAll");
            guessAnswerR5[i].parentElement.classList.add(
              "animate__animated",
              "animate__flip"
            );
          }
        }
      }
      //  判斷勝利條件
      if (question === guessedArrR5.join("")) {
        statistics(4);
        endingAnimation(4);

        keyboards.removeEventListener("click", input);
        return;
      } else if (verification.length === 5) {
        enterBtn.removeEventListener("click", enter);
        deleteBtn.removeEventListener("click", remove);
        Round6();
        return;
      }
    }
  }

  //BACKSPACE鍵監聽，透過COUNTER決定刪除的個數。
  //每刪除一個，就需要減少一個COUNTER讓數字後退，於小於0時RETURN。
  deleteBtn.addEventListener("click", remove);
  function remove() {
    if (counter < 0) return;
    guessedArrR5.pop();
    guessAnswerR5[counter].innerText = "";
    counter -= 1;
    note.style.display = "none";
  }
}

//Round6();
function Round6() {
  let counter = -1;

  //利用動態鍵盤輸入文字
  keyboards.addEventListener("click", input);
  function input(e) {
    if (counter > 3) return;
    let guessedLetter = e.target.innerText;
    if (guessedLetter.length !== 1) return;
    else {
      counter += 1;
      guessedArrR6.push(guessedLetter);
      guessAnswerR6[counter].parentNode.classList.add(
        "animate__animated",
        "animate__bounceIn"
      );
      guessAnswerR6[counter].innerText = guessedLetter;
    }
  }

  //開始驗證答案
  enterBtn.addEventListener("click", enter);
  function enter() {
    if (guessedArrR6.length < 5) return;

    //透過API串接字典驗證是否為有意義的單字
    function isVacabularyAPI() {
      return new Promise((resolve) => {
        const response = axios
          .get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${guessedArrR6.join(
              ""
            )}`
          )
          .then(function (response) {
            resolve(response.data[0].word.toUpperCase());
          })
          .catch(function (error) {
            resolve(error.message);
          });
      });
    }

    isVacabulary();
    async function isVacabulary() {
      const verification = await isVacabularyAPI();

      if (verification === "Request failed with status code 404") {
        note.innerText = "This is not a word!";
        note.classList.add("animate__animated", "animate__wobble");
        note.style.width = "15rem";
        note.style.display = "block";
      } else {
        for (let i = 0; i < 5; i++) {
          //判斷作答是否完全正確。若是，則給予綠色背景。
          if (guessedArrR6[i] === question[i]) {
            guessAnswerR6[i].parentElement.classList.add(
              "correctBoth",
              "animate__animated",
              "animate__flipInY"
            );
            // 更改字母鍵盤顏色為綠色
            for (let j = 0; j < keyboard.length; j++) {
              if (guessedArrR6[i] === keyboard[j].childNodes[0].innerText) {
                keyboard[j].style.backgroundColor = "#07b975";
              }
            }

            //判斷作答是否只有位置正確。若是，則給予橘色背景。
          } else if (question.indexOf(guessedArrR6[i]) !== -1) {
            guessAnswerR6[i].parentElement.classList.add(
              "correctOne",
              "animate__animated",
              "animate__flipInY"
            );

            // 更改字母鍵盤顏色為橘色。
            for (let k = 0; k < keyboard.length; k++) {
              if (guessedArrR6[i] === keyboard[k].childNodes[0].innerText) {
                keyboard[k].style.backgroundColor = "#e07a5f";
              }
            }

            //判斷作答是否完全不吻合，若是則給予灰色背景。
          } else if (question.indexOf(guessedArrR6[i]) === -1) {
            guessAnswerR6[i].parentElement.classList.add(
              "correctNone",
              "animate__animated",
              "animate__flipInY"
            );
            for (let l = 0; l < keyboard.length; l++) {
              if (guessedArrR6[i] === keyboard[l].childNodes[0].innerText) {
                keyboard[l].style.backgroundColor = "#444444";
              }
            }
          } // 全對
          if (question === guessedArrR6.join("")) {
            guessAnswerR6[i].parentElement.classList.add("correctAll");
            guessAnswerR6[i].parentElement.classList.add(
              "animate__animated",
              "animate__flip"
            );
          }
        }
      }
      //  判斷勝利條件
      if (question === guessedArrR6.join("")) {
        statistics(5);
        endingAnimation(5);
        keyboards.removeEventListener("click", input);
        return;
      } else if (verification.length === 5) {
        enterBtn.removeEventListener("click", enter);
        deleteBtn.removeEventListener("click", remove);
        wrongEndingAnimation(5);
      }
    }
  }

  //結束時的錯誤動畫提示，並銜接統計數據MODAL
  let wrongEndingAnimation = (n) => {
    note.innerText = question;
    note.classList.add("animate__animated", "animate__animate__rubberBand");
    note.style.width = "10rem";
    note.style.backgroundColor = "#FF0000";
    note.style.display = "block";
    //
    lossTimes = getCookie("lossTimes") + 1;
    setCookie("lossTimes", lossTimes);
    //
    playTimes = getCookie("playTimes") + 1;
    setCookie("playTimes", playTimes);
    //
    cookieRender();
    chartCookie(n);
    setTimeout(() => {
      statistic.show();
    }, 2000);
  };

  //BACKSPACE鍵監聽，透過COUNTER決定刪除的個數。
  //每刪除一個，就需要減少一個COUNTER讓數字後退，於小於0時RETURN。
  deleteBtn.addEventListener("click", remove);
  function remove() {
    if (counter < 0) return;
    guessedArrR6.pop();
    guessAnswerR6[counter].innerText = "";
    counter -= 1;
    note.style.display = "none";
  }
}
