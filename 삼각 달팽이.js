/*
1
2 9
3 10 8
4 5  6 7

1
2 12
3    11
4       10
5 6  7  8  9

정성그럽게 그리기

다음 삼각형 시작점
    지금 삼각형 시작점이 r, c일 때 (r+2, c+1)
다음 삼각형 한 변의 길이
    지금 삼각형 한 변의 길이 - 3
*/

function solution(n) {
  const triangle = Array.from({ length: n }).map((_, index) => new Array(index + 1));
  let value = 1;

  const draw = (startR, startC, size) => {
    if (size < 1) return;

    for (let r = startR; r < startR + size; r += 1) {
      triangle[r][startC] = value;
      value += 1;
    }

    for (let c = startC + 1; c < startC + size; c += 1) {
      triangle[startR + size - 1][c] = value;
      value += 1;
    }

    for (let i = size - 2; i > 0; i -= 1) {
      triangle[startR + i][startC + i] = value;
      value += 1;
    }

    draw(startR + 2, startC + 1, size - 3);
  };

  draw(0, 0, n);

  const result = [];
  triangle.forEach((row) => result.push(...row));

  return result;
}
