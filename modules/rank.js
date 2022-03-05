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

//降序排列
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

/////

export function sentRank() {
  const response = axios
    .post("https://bulletin-board-db.herokuapp.com/add", {
      id: 10,
      user: "Karen",
      timeStamp: "2022/03/05 13:54:04",
      topic: "Bootstrap套件問題",
      content: "TEST/TEST/TEST/TEST/TEST/TEST/TEST",
      like: 0,
      valid: true,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
