import { setCookie, getCookie } from "./cookies.js";
import { statistic } from "./modals.js";

//宣告作答提示
const note = document.querySelector(".note");
//統計遊玩次數
let winTimes = 0;

//結束時的正確動畫提示，並銜接統計數據MODAL
export let endingAnimation = (n) => {
  note.innerText = "WONDERFUL!";
  note.classList.add("animate__animated", "animate__animate__rubberBand");
  note.style.width = "10rem";
  note.style.backgroundColor = "#07b975";
  note.style.display = "block";
  winTimes = getCookie("winTimes");
  winTimes = winTimes + 1;
  setCookie("winTimes", winTimes);
  setTimeout(() => {
    statistic.show();
  }, 2000);
};

