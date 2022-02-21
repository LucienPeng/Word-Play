let alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

let findQuestions = (digit) => {
  let arr = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        for (let l = 0; l < 2; l++) {
          for (let m = 0; m < 2; m++) {
            let str = "";
            str += digit[i] + digit[j] + digit[k] + digit[l] + digit[m];
            axios
              .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${str}`)
              .then((res) => {
                if (res.status === 200) {
                  arr.push(str);
                }
              });
          }
        }
      }
    }
  }
  console.log(arr);
};
