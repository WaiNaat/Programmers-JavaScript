/*
정렬의 기준?
결국 정렬은 두 수를 비교하는 문제
두 수를 이어붙였을 때 더 큰 숫자가 나오도록 하는 조합이 우선시되어야 함
*/
const isAllZero = (numbers) => {
  for (let i = 0; i < numbers.length; i += 1) {
    if (numbers[i] !== 0) return false;
  }
  return true;
};

const compareFunction = (a, b) => {
  const number1 = Number([a, b].join(''));
  const number2 = Number([b, a].join(''));
  return number2 - number1;
};

const solution = (numbers) => {
  if (isAllZero(numbers)) return '0';

  const numberStrings = numbers.map((number) => number.toString());
  numberStrings.sort(compareFunction);
  return numberStrings.join('');
};
