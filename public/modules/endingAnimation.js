import { setCookie, getCookie } from "./cookies.js";
import { statistic } from "./modals.js";
import { getPlayer, changeRank } from "./rank.js";
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
  dataChange(playerUpdate.nom);
  //
  cookieRender();
  statistics();
  chartCookie(n);
  setTimeout(() => {
    statistic.show();
  }, 2000);
};

//更改分數
//抓取玩家姓名
const loggingBtn = document.querySelector("#loggingBtn");
const loggingInput = document.querySelector("#loggingInput");

let playerUpdate = {
  nom: "",
  score: 0,
};
loggingBtn.addEventListener("click", (e) => {
  playerUpdate.nom = loggingInput.value;
});

async function dataChange(name) {
  let data = await getPlayer(name);
  await changeRank(data[0].nom, data[0].score + 1);
}
