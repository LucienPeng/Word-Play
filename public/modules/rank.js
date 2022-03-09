//抓出所有玩家分數做降序排列，並將資料倒給圖表
function getRank() {
  return new Promise((resolve) => {
    const response = axios
      .get("https://wordplay-wordle.herokuapp.com/player")
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
    .post("https://wordplay-wordle.herokuapp.com/player", {
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

export async function chartRender() {
  function getRank() {
    return new Promise((resolve) => {
      const response = axios
        .get("https://wordplay-wordle.herokuapp.com/player")
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

  playersArr = [];
  for (let i = 0; i < data.length; i++) {
    playersArr.push(data[i].nom);
  }

  scoresArr = [];
  for (let i = 0; i < data.length; i++) {
    scoresArr.push(data[i].score);
  }
}
