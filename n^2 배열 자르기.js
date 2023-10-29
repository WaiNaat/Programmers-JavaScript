/*
n이 좀 큼: 규칙찾기

새로운 1차원 배열의 i번째 원소는
2차원 배열에서 어디에?
    i//n행 i%n열

2차원 배열에서 r행 c열의 원소는 몇?
    max(r, c) + 1
*/
function solution(n, left, right) {
  const get2dPosition = (value) => [Math.floor(value / n), value % n];
  const getValue = (r, c) => Math.max(r, c) + 1;
  const sol = [];

  for (let i = left; i <= right; i += 1) {
    sol.push(getValue(...get2dPosition(i)));
  }

  return sol;
}
