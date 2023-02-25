import fs from "fs";

const allData = fs
  .readFileSync("./input.txt", "utf-8")
  .replace(/\r/g, "")
  .split("\n\n");

const newData = (allData || []).map((r) => {
  return r.split("\n");
});

const totalCaloriesArray = newData.map((r) => {
  const totalArr = r.reduce((acc, num) => {
    acc = acc + Number(num);
    return acc;
  }, 0);

  return totalArr;
});

//this function sorts the indeces
let len = totalCaloriesArray.length;
let indices = new Array(len);
for (let i = 0; i < len; ++i) indices[i] = i;
indices.sort((x, y) => {
  return totalCaloriesArray[x] > totalCaloriesArray[y] ? -1 : totalCaloriesArray[x] < totalCaloriesArray[y] ? 1 : 0;
});


console.log("-----PART 1-----")
console.log(indices[0], "the elf number with max calories");
const sortedCalories = totalCaloriesArray.sort((a, b) => b - a)
const solution = totalCaloriesArray[0];

console.log(solution, 'max calories');

const sol2 = totalCaloriesArray[0] + totalCaloriesArray[1] +totalCaloriesArray[2]
console.log("-----PART 2-----")
console.log(sol2, "sum of top 3 calories")


