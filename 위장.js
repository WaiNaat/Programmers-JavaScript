/*
새로운 종류의 옷들이 들어왔을 때 가능한 건 세 가지.
1. 새로운 종류의 옷을 무시하고 기존 옷들 조합으로 입는다
2. 기존 조합에 새로운 종류의 옷을 하나 입는다
3. 새로운 옷 하나만 입는다.

type(i) := i번째 타입 의상의 개수
opt(i) := i번째 타입까지의 가능한 조합의 수
opt(i) = opt(i - 1) + opt(i - 1) * type(i) + type(i)
*/
const countClothesType = (clothes) => {
  const typeCount = {};
  clothes.forEach((info) => {
    const type = info[1];
    if (!Object.prototype.hasOwnProperty.call(typeCount, type)) {
      typeCount[type] = 0;
    }
    typeCount[type] += 1;
  });
  return typeCount;
};

const solution = function clothesCombinations(clothes) {
  const typeCount = countClothesType(clothes);
  let answer = 0;
  Object.keys(typeCount).forEach((type) => {
    answer = answer * (typeCount[type] + 1) + typeCount[type];
  });
  return answer;
};
