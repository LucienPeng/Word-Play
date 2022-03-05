//題庫
const questionsDB = [
    { id: 1, question: "WORLD" },
    { id: 2, question: "FLYER" },
    { id: 3, question: "MAYBE" },
    { id: 4, question: "CHOKE" },
    { id: 5, question: "FLOAT" },
    { id: 6, question: "QUOTE" },
    { id: 7, question: "BUILD" },
    { id: 8, question: "NIGHT" },
    { id: 9, question: "SUPER" },
    { id: 10, question: "UNIFY" },
  ];
  
  //自動出題
  export function randomQuestion() {
    let question = "";
    let random = Math.floor(Math.random() * 10) + 1;
  
    for (let i = 0; i < questionsDB.length; i++) {
      if (random === questionsDB[i].id) {
        question = questionsDB[i].question;
      }
    }
    return question;
  }