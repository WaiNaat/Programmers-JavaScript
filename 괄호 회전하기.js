/*
왼쪽으로 회전?
    배열 맨 앞에거 빼서 맨 뒤에 넣는다는 뜻
올바른 괄호 문자열인지는 스택으로 뚝딱

일단 해보고 시간초과나면 다른해결책 생각해보기
*/
const isValid = (target) => {
  const stack = [];

  for (let i = 0; i < target.length; i += 1) {
    const paren = target[i];

    if (paren === ')') {
      if (stack.at(-1) === '(') stack.pop();
      else return false;
    } else if (paren === ']') {
      if (stack.at(-1) === '[') stack.pop();
      else return false;
    } else if (paren === '}') {
      if (stack.at(-1) === '{') stack.pop();
      else return false;
    } else {
      stack.push(paren);
    }
  }

  return stack.length === 0;
};

function solution(s) {
  const parens = [...s];
  let count = 0;

  for (let i = 0; i < s.length; i += 1) {
    count += isValid(parens) ? 1 : 0;
    parens.push(parens.shift());
  }

  return count;
}
