/*
경로를 어떻게 표현할 것인가?
    배열로
    도착한 위치, 방향을 기억 -> 똑같은게 나오면 사이클 완성
그냥 모든 점에서 쏴보면 되나?
*/
const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solution(grid) {
  const row = grid.length;
  const col = grid[0].length;

  const getNextPosition = (r, c, direction) => {
    const [dr, dc] = DIRECTIONS[direction];
    return [(r + row + dr) % row, (c + col + dc) % col, direction];
  };

  const cycles = [];
  const visited = new Set();

  const findCycle = (startR, startC, startD) => {
    const start = `${startR},${startC},${startD}`;

    if (visited.has(start)) return;
    visited.add(start);

    const cycle = new Set([start]);
    let cur = start.split(',').map(Number);

    while (true) {
      const [r, c, d] = cur;
      const node = grid[r][c];

      let next;

      if (node === 'S') {
        next = getNextPosition(r, c, d);
      } else if (node === 'R') {
        next = getNextPosition(r, c, (d + 1) % 4);
      } else {
        next = getNextPosition(r, c, (d + 3) % 4);
      }

      if (cycle.has(next.join(','))) break;

      cycle.add(next.join(','));
      visited.add(next.join(','));
      cur = next;
    }

    cycles.push(cycle);
  };

  for (let r = 0; r < row; r += 1) {
    for (let c = 0; c < col; c += 1) {
      for (let d = 0; d < 4; d += 1) {
        findCycle(r, c, d);
      }
    }
  }

  return cycles.map((cycle) => cycle.size).sort((one, another) => one - another);
}
