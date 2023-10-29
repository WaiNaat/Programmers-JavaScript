function solution(n) {
  return parseInt(Array.from(n.toString(3)).reverse().join(''), 3);
}
