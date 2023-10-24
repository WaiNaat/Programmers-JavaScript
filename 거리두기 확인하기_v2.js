/*
시원하게 경우의수 12개 다 셀까?
*/
const isInvalid = (board, r, c) =>
  (r > 0 && board[r - 1][c] === 'P') ||
  (r < 4 && board[r + 1][c] === 'P') ||
  board[r][c + 1] === 'P' ||
  board[r][c - 1] === 'P' ||
  (r > 1 && board[r - 2][c] === 'P' && board[r - 1][c] !== 'X') ||
  (r < 3 && board[r + 2][c] === 'P' && board[r + 1][c] !== 'X') ||
  (board[r][c - 2] === 'P' && board[r][c - 1] !== 'X') ||
  (board[r][c + 2] === 'P' && board[r][c + 1] !== 'X') ||
  (r > 0 && board[r - 1][c - 1] === 'P' && (board[r - 1][c] !== 'X' || board[r][c - 1] !== 'X')) ||
  (r < 4 && board[r + 1][c - 1] === 'P' && (board[r + 1][c] !== 'X' || board[r][c - 1] !== 'X')) ||
  (r > 0 && board[r - 1][c + 1] === 'P' && (board[r - 1][c] !== 'X' || board[r][c + 1] !== 'X')) ||
  (r < 4 && board[r + 1][c + 1] === 'P' && (board[r + 1][c] !== 'X' || board[r][c + 1] !== 'X'));

const isAllValid = (place) => {
  for (let r = 0; r < 5; r += 1) {
    for (let c = 0; c < 5; c += 1) {
      if (place[r][c] === 'P' && isInvalid(place, r, c)) return false;
    }
  }
  return true;
};

function solution(places) {
  return places.map((place) => (isAllValid(place) ? 1 : 0));
}
