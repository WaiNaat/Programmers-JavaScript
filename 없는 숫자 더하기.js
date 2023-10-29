function solution(numbers) {
  let sol = 45;

  numbers.forEach((value) => (sol -= value));

  return sol;
}
