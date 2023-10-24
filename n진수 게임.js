/*
자스 진법변환 알파벳은 소문자로 나옴
시원하게 초거대문자열 한번 ㄱ?
최종 문자열 길이는 길어봤자 100000개이므로 가능
*/

function solution(n, t, m, p) {
  let gameAnswer;
  let value;

  for (gameAnswer = '', value = 0; gameAnswer.length <= t * m + p; value += 1) {
    gameAnswer += value.toString(n);
  }

  let sol = '';

  for (let i = p - 1; sol.length < t; i += m) {
    sol += gameAnswer[i];
  }

  return sol.toUpperCase();
}
