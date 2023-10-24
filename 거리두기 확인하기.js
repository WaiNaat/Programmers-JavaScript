// 틀렸습니다

/*
시원하게 경우의수 12개 다 셀까?
bfs로 보는게 정석같긴함
*/
const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const hasPeople = (board, r, c, depth, visited) => {
  if (visited[r][c]) return false;
  visited[r][c] = true;

  if (depth === 3) return false;
  if (depth > 0 && board[r][c] === 'P') return true;
  if (board[r][c] === 'X') return false;

  return DIRECTIONS.some(([dr, dc]) => {
    const r2 = r + dr;
    const c2 = c + dc;

    if (r2 < 0 || r2 >= 5 || c2 < 0 || c2 >= 5) return false;
    if (board[r2][c2] === 'X') return false;

    return hasPeople(board, r2, c2, depth + 1, visited);
  });
};

const isValid = (place) => {
  for (let r = 0; r < 5; r += 1) {
    for (let c = 0; c < 5; c += 1) {
      if (place[r][c] !== 'P') continue;
      if (
        hasPeople(
          place,
          r,
          c,
          0,
          Array.from({ length: 5 }).map(() => new Array(5)),
        )
      ) {
        return false;
      }
    }
  }

  return true;
};

function solution(places) {
  return places.map((place) => (isValid(place) ? 1 : 0));
}
