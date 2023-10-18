/*
단, P는 각 자릿수에 0을 포함하지 않는 소수입니다
    -> 진법 변환 후 0을 기준으로 나눈담에 소수판별
*/
const isPrime = (target) => {
  if (target < 2) return false;
  for (let value = 2; value <= Math.sqrt(target); value += 1) {
    if (target % value === 0) return false;
  }
  return true;
};

function solution(n, k) {
  const candidates = n.toString(k).split(/0+/).map(Number);
  return candidates.filter((candidate) => isPrime(candidate)).length;
}
