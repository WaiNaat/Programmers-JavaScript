/*
6가지 경우의 수 하나씩 해보면 됨
식의 길이도 짧으므로 앞에서부터 하나씩 찾아서 해보면 됨
*/
const priorities = ['*+-', '*-+', '+*-', '+-*', '-+*', '-*+'];

const parse = (expression) => {
  const result = [];
  let rest = expression;

  while (rest.length > 0) {
    const value = rest.match(/^[0-9]+/)[0];

    result.push(Number(value));

    if ('*-+'.includes(rest[value.length])) {
      result.push(rest[value.length]);
    }

    rest = rest.slice(value.length + 1);
  }

  return result;
};

const calculate = (expression, operator) => {
  const stack = [];
  let i = 0;

  const operationFn =
    operator === '*'
      ? (one, another) => one * another
      : operator === '+'
      ? (one, another) => one + another
      : (one, another) => one - another;

  while (i < expression.length) {
    if (expression[i] === operator) {
      stack.push(operationFn(stack.pop(), expression[i + 1]));
      i += 2;
    } else {
      stack.push(expression[i]);
      i += 1;
    }
  }

  return stack;
};

function solution(expression) {
  const parsed = parse(expression);
  let sol = -Infinity;

  priorities.forEach((priority) => {
    const first = calculate(parsed, priority[0]);
    const second = calculate(first, priority[1]);
    const [result] = calculate(second, priority[2]);
    sol = Math.max(sol, Math.abs(result));
  });

  return sol;
}
