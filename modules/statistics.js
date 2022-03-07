import { setCookie, getCookie } from "./cookies.js";

const records = document.querySelector(".records");

let winTimes = 0;
let wins = 0;
let rowWin = [];

let statistics = () => {
  //Win %
  let percentage =
    (getCookie("winTimes") / (getCookie("lossTimes") + getCookie("winTimes"))) *
    100;
  setCookie("percentage", Math.floor(percentage));

  // RENDER
  records.children[0].children[0].innerText = getCookie("playTimes");
  records.children[1].children[0].innerText = getCookie("winTimes");
  records.children[2].children[0].innerText = getCookie("lossTimes");
  records.children[3].children[0].innerText = getCookie("percentage");
};

//chart

let chartCookie = (n) => {
  wins = getCookie(`rowWins${n}`) + 1;
  setCookie(`rowWins${n}`, wins);
  rowWin[n] = getCookie(`rowWins${n}`);
  console.log(rowWin);
  return rowWin;
};

(function rowWinsRender() {
  for (let i = 0; i < 6; i++) {
    rowWin.push(getCookie(`rowWins${i}`));
  }
  console.log(rowWin);
  return rowWin;
})();

export { statistics, chartCookie, rowWin };
