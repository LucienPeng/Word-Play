import { setCookie, getCookie, getCookieString } from "./cookies.js";
import { statistic } from "./modals.js";
//import { getPlayer } from "./rank.js";
import { cookieRender } from "./cookies.js";
import { chartCookie, statistics } from "./statistics.js";

//宣告作答提示
const note = document.querySelector(".note");
//統計遊玩次數
let winTimes = 0;
let playTimes = 0;

//結束時的正確動畫提示，並銜接統計數據MODAL
export let endingAnimation = (n) => {
  note.innerText = "WONDERFUL!";
  note.classList.add("animate__animated", "animate__animate__rubberBand");
  note.style.width = "10rem";
  note.style.backgroundColor = "#07b975";
  note.style.display = "block";
  //
  winTimes = getCookie("winTimes") + 1;
  setCookie("winTimes", winTimes);
  //
  playTimes = getCookie("playTimes") + 1;
  setCookie("playTimes", playTimes);
  //
  dataChange(getCookieString("currentPlayer"));
  //
  cookieRender();
  statistics();
  chartCookie(n);
  setTimeout(() => {
    statistic.show();
  }, 2000);
};

//更改資料庫內的分數
async function dataChange(name) {
  let data = await getPlayer(name); //取得DB玩家資料
  await changeRank(data[0].nom, data[0].score); //變更玩家ＤＢ內分數
}

function getPlayer(player) {
  return new Promise((resolve) => {
    const response = axios
      .get(`https://wordplay-wordle.herokuapp.com/player/${player}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        resolve("error", err);
      });
  });
}

function changeRank(nom, score) {
  const response = axios
    .post("https://wordplay-wordle.herokuapp.com/playerupdate", {
      nom: nom,
      score: score + 1,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
