const records = document.querySelector(".records");

//設定Cookies
function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";";
}

//取得Cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return Number(parts.pop().split(";").shift());
}

//取得Cookies
function getCookieString(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

//Cookies初始化
function cookieInit() {
  setCookie("playTimes", 0);
  setCookie("winTimes", 0);
  setCookie("lossTimes", 0);
  setCookie("percentage", 0);
  for (let i = 0; i < 6; i++) {
    setCookie(`rowWins${i}`, 0);
  }
}

function cookieRender() {
  records.children[0].children[0].innerText = getCookie("playTimes");
  records.children[1].children[0].innerText = getCookie("winTimes");
  records.children[2].children[0].innerText = getCookie("lossTimes");
  records.children[3].children[0].innerText = getCookie("percentage");
}

export { setCookie, getCookie, cookieInit, getCookieString, cookieRender };
