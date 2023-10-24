function solution(row, col, board) {
  let totalBoomCount = 0;
  let currentBoard = board;

  while (true) {
    const boomPositions = new Set();
    const nextBoard = Array.from({ length: row }).map((_, index) => [...currentBoard[index]]);

    // 폭발
    for (let r = 0; r < row - 1; r += 1) {
      for (let c = 0; c < col - 1; c += 1) {
        const target = currentBoard[r][c];

        if (!target) continue;

        if (
          currentBoard[r + 1][c] === target &&
          currentBoard[r][c + 1] === target &&
          currentBoard[r + 1][c + 1] === target
        ) {
          nextBoard[r][c] = null;
          nextBoard[r + 1][c] = null;
          nextBoard[r][c + 1] = null;
          nextBoard[r + 1][c + 1] = null;

          boomPositions.add(`${r},${c}`);
          boomPositions.add(`${r + 1},${c}`);
          boomPositions.add(`${r},${c + 1}`);
          boomPositions.add(`${r + 1},${c + 1}`);
        }
      }
    }

    if (boomPositions.size === 0) break;
    totalBoomCount += boomPositions.size;

    // 끌어내리기
    for (let r = row - 1; r >= 0; r -= 1) {
      for (let c = 0; c < col; c += 1) {
        for (let r2 = r + 1; r2 < row && nextBoard[r2][c] === null; r2 += 1) {
          nextBoard[r2][c] = nextBoard[r2 - 1][c];
          nextBoard[r2 - 1][c] = null;
        }
      }
    }

    currentBoard = nextBoard;
  }

  return totalBoomCount;
}
