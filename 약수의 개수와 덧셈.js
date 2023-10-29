/*
약수의 개수가 홀수 === 제곱수
*/
function solution(left, right) {
  let sol = 0;

  for (let i = left; i <= right; i += 1) {
    if (Math.sqrt(i) % 1 === 0) sol -= i;
    else sol += i;
  }

  return sol;
}
