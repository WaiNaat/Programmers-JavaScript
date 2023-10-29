/*
주어진 판을 스택형으로 만들어서 계산하기 편하게 변경
*/

function solution(board, moves) {
  const size = board.length;
  const dolls = Array.from({ length: size }).map(() => []);

  for (let r = size - 1; r >= 0; r -= 1) {
    for (let c = 0; c < size; c += 1) {
      if (board[r][c]) dolls[c].push(board[r][c]);
    }
  }

  const stack = [];
  let lostCount = 0;

  moves
    .map((value) => value - 1)
    .forEach((lane) => {
      const popped = dolls[lane].pop();
      if (!popped) return;

      if (stack.at(-1) === popped) {
        stack.pop();
        lostCount += 2;
      } else {
        stack.push(popped);
      }
    });

  return lostCount;
}
