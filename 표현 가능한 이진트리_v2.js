/*
숫자를 이진수로 변환
앞쪽에 0을 채움
    몇개까지? 길이가 2^n-1 이 될때까지

이러면 문제는 해당 트리가 valid한지 검사하는걸로 바뀜
중앙 완쪽 오른쪽 나눠서 재귀
0 하위에 1이 하나라도 있으면 실패
*/
function solution(numbers) {
  const getPadAmount = (length) => {
    let i;
    for (i = 0; 2 ** i - 1 < length; i += 1) {}
    return 2 ** i - 1;
  };
  const isValidTree = (tree, left, right) => {
    const isAllZero = (left, right) => {
      if (right - left === 1) {
        return tree[left] === '0';
      }

      const me = Math.floor((left + right) / 2);
      if (tree[me] === '1') {
        return false;
      }
      return isAllZero(left, me) && isAllZero(me + 1, right);
    };

    const traverse = (left, right) => {
      if (right - left === 1) {
        return true;
      }

      const me = Math.floor((left + right) / 2);
      if (tree[me] === '0') {
        return isAllZero(left, me) && isAllZero(me + 1, right);
      }
      return traverse(left, me) && traverse(me + 1, right);
    };

    return traverse(left, right);
  };
  const canRepresentedByTree = (value) => {
    const binary = value.toString(2);
    const tree = binary.padStart(getPadAmount(binary.length), '0');

    return isValidTree(tree, 0, tree.length);
  };

  return numbers.map(canRepresentedByTree).map((bool) => (bool ? 1 : 0));
}
