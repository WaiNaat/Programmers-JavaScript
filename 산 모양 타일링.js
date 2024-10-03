/*
누가봐도 dp

opt(i) := 아랫줄 i번째까지 만드는 경우의 수

일단 '모자'가 없다면 단순한 계단오르기 문제임
opt(i) = opt(i-1) + opt(i-2)

'모자'는 홀수번째(0-indexed) 위에만 있을 수 있음
홀수번째 채울 떄 opt(i-1) 을 두번 더하게 됨 (모자를 한세트로 가져간다/쪼갠다)
opt(i) =
    i는 짝수
        opt(i-1) + opt(i-2) 
    i는 홀수, 모자 있음
        opt(i-1)*2 + opt(i-2)
    i는 홀수, 모자 없음
        opt(i-1) + opt(i-2)
*/
function solution(n, tops) {
  const opt = [1, 2 + tops[0]];

  for (let i = 2; i < 2 * n + 1; i += 1) {
    const isOdd = i % 2 === 1;
    const hasHat = isOdd && tops[(i - 1) / 2] === 1;
    if (!isOdd) {
      opt.push((opt.at(-1) + opt.at(-2)) % 10007);
    } else if (hasHat) {
      opt.push((opt.at(-1) * 2 + opt.at(-2)) % 10007);
    } else {
      opt.push((opt.at(-1) + opt.at(-2)) % 10007);
    }
  }

  return opt.at(-1);
}
