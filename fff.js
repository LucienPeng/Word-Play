Round6();
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
        chartCookie(5);
        statistics(5);
        endingAnimation(5);
        enterBtn.removeEventListener("click", enter);
        deleteBtn.removeEventListener("click", remove);
        keyboards.removeEventListener("click", input);
        return;
      } else if (verification.length === 5) Round6();
    }
  }

  //BACKSPACE鍵監聽，透過COUNTER決定刪除的個數。
  //每刪除一個，就需要減少一個COUNTER讓數字後退，於小於0時RETURN。
  deleteBtn.addEventListener("click", remove);
  function remove() {
    console.log("FUCK");
    if (counter < 0) return;
    guessedArrR6.pop();
    guessAnswerR6[counter].innerText = "";
    counter -= 1;
    note.style.display = "none";
  }
}
