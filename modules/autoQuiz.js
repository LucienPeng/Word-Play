//題庫
const questionsDB = [
  { id: 1, question: "WORLD" },
  { id: 2, question: "FLYER" },
  { id: 3, question: "GLORY" },
  { id: 4, question: "CHOKE" },
  { id: 5, question: "FLOAT" },
  { id: 6, question: "QUOTE" },
  { id: 7, question: "BUILD" },
  { id: 8, question: "ENTER" },
  { id: 9, question: "INPUT" },
  { id: 10, question: "UNIFY" },
  { id: 11, question: "QUEST" },
  { id: 12, question: "GUIDE" },
  { id: 13, question: "FETCH" },
  { id: 14, question: "ROYAL" },
  { id: 15, question: "WIDTH" },
  { id: 16, question: "QUOTA" },
  { id: 17, question: "PAINT" },
  { id: 18, question: "CLONE" },
  { id: 19, question: "WINER" },
  { id: 20, question: "LOSER" },
];

//自動出題
export function randomQuestion() {
  let question = "";
  let random = Math.floor(Math.random() * 20) + 1;

  for (let i = 0; i < questionsDB.length; i++) {
    if (random === questionsDB[i].id) {
      question = questionsDB[i].question;
    }
  }
  return question;
}
