/*
행렬 크기 1만
쿼리 수 1만
    -> 1억이므로 그냥 구현 가능

주어지는 두 점의 위치는 직사각형의 좌상단, 우하단임이 보장됨
*/
function solution(rows, columns, queries) {
  const matrix = Array.from({ length: rows }).map((_, row) =>
    Array.from({ length: columns }).map((_, column) => 1 + row * columns + column),
  );
  const parsedQueries = queries.map((query) => query.map((value) => value - 1));
  const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const sol = [];

  parsedQueries.forEach(([startR, startC, endR, endC]) => {
    let curPosition = [startR, startC];
    let prevValue = matrix[startR + 1][startC];
    let direction = 0;
    let minValue = prevValue;

    for (let count = 0; count < 2 * (endR - startR + 1 + endC - startC + 1) - 4; count += 1) {
      const [r, c] = curPosition;
      const curValue = matrix[r][c];

      matrix[r][c] = prevValue;
      prevValue = curValue;
      minValue = Math.min(minValue, curValue);

      const [dr, dc] = DIRECTIONS[direction];
      let r2 = r + dr;
      let c2 = c + dc;

      if (r2 > endR || r2 < startR || c2 > endC || c2 < startC) {
        direction = (direction + 1) % 4;
        r2 = r + DIRECTIONS[direction][0];
        c2 = c + DIRECTIONS[direction][1];
      }

      curPosition = [r2, c2];
    }
    sol.push(minValue);
  });

  return sol;
}
