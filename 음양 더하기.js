function solution(absolutes, signs) {
  let sol = 0;

  for (let i = 0; i < signs.length; i += 1) {
    sol += absolutes[i] * (signs[i] ? 1 : -1);
  }

  return sol;
}
