/*
투포인터

두 큐를 한 줄로 잇는다
큐1의 시작점과 끝점을 표시한다

시작점을 한칸 뒤로
    큐1에서 뽑아서 큐2에 넣는 행동
끝점을 한칸 뒤로
    큐2에서 뽑아서 큐1에 넣는 행동
    
큐1의 합, 전체합을 구한담에
큐1합이 작으면 끝점 뒤로
큐1합이 크면 시작점 뒤로

한바퀴 돌아서 원위치하면 실패
-> 큐 2배로 늘리고 초과하면 실패
*/
const getArraySum = (array) => array.reduce((prev, cur) => prev + cur, 0);

function solution(queue1, queue2) {
  let queue1Sum = getArraySum(queue1);
  const totalSum = queue1Sum + getArraySum(queue2);

  let sol = 0;
  let left = 0;
  let right = queue1.length - 1;
  const queue = [...queue1, ...queue2, ...queue1, ...queue2];

  while (queue1Sum !== totalSum / 2 && left <= right && right < queue.length) {
    if (queue1Sum < totalSum / 2) {
      right += 1;
      queue1Sum += queue[right];
    } else {
      queue1Sum -= queue[left];
      left += 1;
    }

    sol += 1;
  }

  return queue1Sum !== totalSum / 2 ? -1 : sol;
}
