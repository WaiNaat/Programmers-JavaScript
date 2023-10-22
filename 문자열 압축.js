/*
문자열 길이 1000 * 단위 1000
완전탐색
*/
const compress = (target, groupUnit) => {
  const result = [];

  for (let i = 0; i < target.length; i += groupUnit) {
    const group = target.slice(i, i + groupUnit);

    if (result.length && result[result.length - 1] === group) {
      result[result.length - 2] += 1;
    } else {
      result.push(1, group);
    }
  }

  return result.filter((item) => item !== 1).join('');
};

function solution(s) {
  let sol = new Array(s.length + 1).fill('-').join('');
  for (let length = 1; length <= Math.max(s.length / 2, 1); length += 1) {
    const result = compress(s, length);
    if (result.length < sol.length) sol = result;
  }
  return sol.length;
}
