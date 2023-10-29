function solution(a, b) {
  let sol = 0;

  for (let i = 0; i < a.length; i += 1) {
    sol += a[i] * b[i];
  }

  return sol;
}
