function solution(n) {
  for (let i = 2; i < n; i += 1) {
    if (n % i === 1) return i;
  }
  return null;
}
