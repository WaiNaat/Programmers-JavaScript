/*
어차피 스택에 여는 괄호를 넣고 닫는 괄호가 올때마다 여는 괄호를 뺌
>> 굳이 스택을 만들 필요 없이 현재 들어온 여는 괄호 개수만 세도 됨
*/

const solution = (string) => {
  let parenthesisCount = 0;
  for (let i = 0; i < string.length; i += 1) {
    if (string[i] === '(') {
      parenthesisCount += 1;
    } else if (parenthesisCount <= 0) {
      return false;
    } else {
      parenthesisCount -= 1;
    }
  }
  return parenthesisCount === 0;
};
