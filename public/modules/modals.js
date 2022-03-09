//控制Ｍodal開啟時間
const statistic = new bootstrap.Modal(
  document.getElementById("statisticModal"),
  {
    keyboard: false,
  }
);

const instructionModal = new bootstrap.Modal(
  document.getElementById("instructionModal"),
  {
    keyboard: false,
  }
);

const loggingModal = new bootstrap.Modal(document.getElementById("logging"), {
  keyboard: false,
});


export { statistic, instructionModal, loggingModal };
