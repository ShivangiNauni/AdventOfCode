import fs from "fs";
const allData = fs
  .readFileSync("./input.txt", "utf-8")
  .replace(/\r/g, "")
  .split("\n")
  .map((input) => input.split(" "));

const dict = {
  Rock: ["A", "X"],
  Paper: ["B", "Y"],
  Scissor: ["C", "Z"],
};

const pointsCharts = {
  Rock: 1,
  Paper: 2,
  Scissor: 3,
};

const WIN_POINT = 6;
const LOSE_POINT = 0;

let finalPoint = 0;
allData.forEach((x) => {
  const data = whoWins(x[0].toString(), x[1].toString());
  finalPoint += data["playerPoint"];
});
console.log(finalPoint, "finalPoint");

function whoWins(opp, player) {
  let oppPoint = 0;
  let playerPoint = 0;
  for (let move in dict) {
    if (dict[move].includes(opp) && dict[move].includes(player)) {
      oppPoint = oppPoint + 3 + pointsCharts[move];
      playerPoint = playerPoint + 3 + pointsCharts[move];
    }
  }

  if (dict["Rock"].includes(opp) && dict["Scissor"].includes(player)) {
    //lose player
    const data = assignPoints(
      { wonPlayerPoint: oppPoint, move: "Rock" },
      { lostPlayerPoint: playerPoint, move: "Scissor" }
    );
    playerPoint += data.lostPlayerPoint;
    oppPoint += data.wonPlayerPoint;
  } else if (dict["Rock"].includes(opp) && dict["Paper"].includes(player)) {
    //win player
    const data = assignPoints(
      { wonPlayerPoint: playerPoint, move: "Paper" },
      { lostPlayerPoint: oppPoint, move: "Rock" }
    );
    playerPoint += data.wonPlayerPoint;
    oppPoint += data.lostPlayerPoint;
  } else if (dict["Paper"].includes(opp) && dict["Scissor"].includes(player)) {
    const data = assignPoints(
      { wonPlayerPoint: playerPoint, move: "Scissor" },
      { lostPlayerPoint: oppPoint, move: "Paper" }
    );
    playerPoint += data.wonPlayerPoint;
    oppPoint += data.lostPlayerPoint;
    //win player
  } else if (dict["Paper"].includes(opp) && dict["Rock"].includes(player)) {
    //lose player
    const data = assignPoints(
      { wonPlayerPoint: oppPoint, move: "Paper" },
      { lostPlayerPoint: playerPoint, move: "Rock" }
    );
    playerPoint += data.lostPlayerPoint;
    oppPoint += data.wonPlayerPoint;
  } else if (dict["Scissor"].includes(opp) && dict["Rock"].includes(player)) {
    //win player
    const data = assignPoints(
      { wonPlayerPoint: playerPoint, move: "Rock" },
      { lostPlayerPoint: oppPoint, move: "Scissor" }
    );
    playerPoint += data.wonPlayerPoint;
    oppPoint += data.lostPlayerPoint;
  } else if (dict["Scissor"].includes(opp) && dict["Paper"].includes(player)) {
    //lose player
    const data = assignPoints(
      { wonPlayerPoint: oppPoint, move: "Scissor" },
      { lostPlayerPoint: playerPoint, move: "Paper" }
    );
    playerPoint += data.lostPlayerPoint;
    oppPoint += data.wonPlayerPoint;
  }

  return { oppPoint, playerPoint };
}

function assignPoints(wonPlayerData, lostPlayerData) {
  let wonPlayerPoint =
    wonPlayerData.wonPlayerPoint + WIN_POINT + pointsCharts[wonPlayerData.move];

  let lostPlayerPoint =
    lostPlayerData.lostPlayerPoint +
    LOSE_POINT +
    pointsCharts[lostPlayerData.move];

  return { wonPlayerPoint, lostPlayerPoint };
}

const sample = ["A", "X"];
const lose = {
  A: "Z",
  B: "X",
  C: "Y",
};

const draw = {
  A: "X",
  B: "Y",
  C: "Z",
};

const win = {
  A: "Y",
  B: "Z",
  C: "X",
};

function predictPlayerMove(oppMove, givenMove) {
  let playerMove = "";
  if (givenMove === "X") {
    //Lose

    playerMove = lose[oppMove];
    // arr[1] = playerMove;
  } else if (givenMove === "Y") {
    playerMove = draw[oppMove];
  } //Draw
  else if (givenMove === "Z") {
    playerMove = win[oppMove];
  } //Win
  return [oppMove, playerMove];
}

const newArr = allData.map((arrayItem) =>
  predictPlayerMove(arrayItem[0], arrayItem[1])
);

let finalNewPoints = 0;
newArr.forEach((x) => {
  const data = whoWins(x[0].toString(), x[1].toString());

  finalNewPoints += data["playerPoint"];
});
console.log(finalNewPoints, "finalNewPoints");
