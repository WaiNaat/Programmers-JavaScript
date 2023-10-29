const isInRange = (x, y) => x >= -5 && x <= 5 && y >= -5 && y <= 5;
const direction = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

function solution(dirs) {
  const visited = new Set();
  let x = 0;
  let y = 0;

  [...dirs].forEach((move) => {
    const [dx, dy] = direction[move];
    const x2 = x + dx;
    const y2 = y + dy;

    if (isInRange(x2, y2)) {
      visited.add(`${x},${y},${x2},${y2}`);
      visited.add(`${x2},${y2},${x},${y}`);
      x = x2;
      y = y2;
    }
  });

  return visited.size / 2;
}
