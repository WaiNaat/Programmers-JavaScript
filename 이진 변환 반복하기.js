function solution(s) {
  let result = s;
  let zeroCount = 0;
  let changeCount = 0;

  while (result !== '1') {
    const zeroRemoved = result.replaceAll('0', '');
    zeroCount += result.length - zeroRemoved.length;
    result = zeroRemoved.length.toString(2);
    changeCount += 1;
  }

  return [changeCount, zeroCount];
}
