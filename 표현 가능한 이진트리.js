/*
재귀

10^15면 숫자가 커지는건 아니니까 Number 자료형으로 가능
10^15를 이진수로 바꾸면 50자리

탐색 순서는 왼 -> 본인 -> 오
본인이 '0'이라면 왼쪽이든 오른쪽이든 '1'이 절대로 나와서는 안 됨

숫자를 이진수로 변환한 길이가 2^n-1이 아니라면 그거에 맞게 padStart
짝수 index는 리프노드
*/
const isPossible = (target, start, end, mustBeZero) => {
  const myIndex = Math.floor((start + end) / 2);
  const me = target[myIndex];
  
  if (me === '1' && mustBeZero) return false;
  if (myIndex % 2 === 0) return true;
  
  return isPossible(target, start, myIndex, me === '0') && isPossible(target, myIndex + 1, end, me === '0');
};

const findNearestPerfectBinaryTreeLength = (targetLength) => {
  for (let i = 1; i <= 1024; i *= 2) {
      if (i - 1 >= targetLength) return i - 1;
  }
  return 0;
};

function solution(numbers) {
  const answer = [];
  
  numbers.forEach((value) => {
      const binary = value.toString(2);
      const tree = binary.padStart(findNearestPerfectBinaryTreeLength(binary.length), '0');
      answer.push(isPossible(tree, 0, tree.length, false) ? 1 : 0);
  });

  return answer;
}