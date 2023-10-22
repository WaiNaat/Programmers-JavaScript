/*
u는 "균형잡힌 괄호 문자열"로 더 이상 분리할 수 없어야 하며, v는 빈 문자열이 될 수 있습니다. 
    -> 여는 괄호와 닫는 괄호의 개수가 같아지는 시점
문자열 u가 "올바른 괄호 문자열" 이라면
    -> 스택으로 확인 가능
*/
const divide = (target) => {
  let i;
  let openingParenCount = 0;
  let closingParenCount = 0;

  for (i = 0; i < target.length; i += 1) {
    if (target[i] === '(') openingParenCount += 1;
    else closingParenCount += 1;

    if (openingParenCount === closingParenCount) break;
  }

  return [target.slice(0, i + 1), target.slice(i + 1)];
};

const isCorrectParenString = (target) => {
  let openingParenCount = 0;

  for (let i = 0; i < target.length; i += 1) {
    if (target[i] === '(') openingParenCount += 1;
    else openingParenCount -= 1;

    if (openingParenCount < 0) break;
  }

  return openingParenCount === 0;
};

const reverse = (target) =>
  Array.from(target)
    .map((paren) => (paren === '(' ? ')' : '('))
    .join('');

const convert = (target) => {
  if (target === '') return '';

  const [left, right] = divide(target);

  if (isCorrectParenString(left)) return left + convert(right);

  return `(${convert(right)})${reverse(left.slice(1, left.length - 1))}`;
};

function solution(p) {
  return convert(p);
}
