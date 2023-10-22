/*
최고 순위: 지워진 숫자가 다 맞음
최저 순위: 지워진 숫자가 다 틀림
*/

function solution(lottos, win_nums) {
  const winningValues = new Set(win_nums);
  const intersectionCount = lottos.filter((value) => winningValues.has(value)).length;
  const unknownCount = lottos.filter((value) => value === 0).length;
  const maxRank = 7 - (intersectionCount + unknownCount);
  const minRank = 7 - intersectionCount;
  return [Math.min(maxRank, 6), Math.min(minRank, 6)];
}
