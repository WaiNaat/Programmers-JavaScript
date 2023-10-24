function solution(n, arr1, arr2) {
  const wallMap1 = arr1.map((value) =>
    Array.from(value.toString(2).padStart(n, '0')).map((value) => value === '1'),
  );
  const wallMap2 = arr2.map((value) =>
    Array.from(value.toString(2).padStart(n, '0')).map((value) => value === '1'),
  );
  const map = Array.from({ length: n }).map(() => new Array(n));

  for (let r = 0; r < n; r += 1) {
    for (let c = 0; c < n; c += 1) {
      map[r][c] = wallMap1[r][c] || wallMap2[r][c];
    }
  }

  return map.map((row) => row.map((isWall) => (isWall ? '#' : ' ')).join(''));
}
