function solution(numbers) {
  const sol = new Set();

  for (let i = 0; i < numbers.length; i += 1) {
    for (let j = i + 1; j < numbers.length; j += 1) {
      sol.add(numbers[i] + numbers[j]);
    }
  }

  return Array.from(sol).sort((one, another) => one - another);
}
