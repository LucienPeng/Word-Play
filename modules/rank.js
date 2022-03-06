//抓出所有玩家分數做降序排列，並將資料倒給圖表
export function getRank() {
  return new Promise((resolve) => {
    const response = axios
      .get("https://leaflix-east.herokuapp.com/player")
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        resolve("error", message);
      });
  });
}

let data = await getRank();
data.sort((a, b) => {
  return b.score - a.score;
});

let playersArr = [];
for (let i = 0; i < data.length; i++) {
  playersArr.push(data[i].nom);
}

let scoresArr = [];
for (let i = 0; i < data.length; i++) {
  scoresArr.push(data[i].score);
}

export { playersArr, scoresArr };


export function sentRank(newPlayer) {
  const response = axios
    .post("https://leaflix-east.herokuapp.com/player", {
      nom: newPlayer,
      score: 0,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

//找出對應玩家
export function getPlayer(player) {
  return new Promise((resolve) => {
    const response = axios
      .get(`https://leaflix-east.herokuapp.com/player/${player}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        resolve("error", message);
      });
  });
}

//更改分數
export function changeRank(nom, score) {
  const response = axios
    .post("https://leaflix-east.herokuapp.com/playerupdate", {
      nom: nom,
      score: score,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
