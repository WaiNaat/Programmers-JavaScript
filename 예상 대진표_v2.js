/*
1, 2 -> 1
3, 4 -> 2
5, 6 -> 3
...

일단 이기면 홀수는 (본인+1)/2 번, 짝수는 본인/2 번이 됨
만나는 조건
    한쪽이 홀수고 한쪽이 짝수
    홀수 + 1 === 짝수
    
n << 얘는 왜주는거임?
*/
function solution(n, a, b) {
  let one = a;
  let another = b;
  let round;

  const meets = () => {
    const odd = one % 2 === 1 ? one : another;
    const even = one % 2 === 1 ? another : one;
    return odd + 1 === even;
  };

  for (round = 1; !meets(); round += 1) {
    one = (one % 2 === 1 ? one + 1 : one) / 2;
    another = (another % 2 === 1 ? another + 1 : another) / 2;
  }

  return round;
}
