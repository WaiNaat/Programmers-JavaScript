/*
2개면 무조건 없어짐 -> 시원하게 스택 ㄱ
*/

function solution(s) {
  const stack = [];

  [...s].forEach((char) => {
    if (stack.at(-1) === char) stack.pop();
    else stack.push(char);
  });

  return stack.length === 0 ? 1 : 0;
}
