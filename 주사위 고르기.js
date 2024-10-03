/*
6^10 = 7천만 -> 완탐 불가능

백트래킹
임의의 주사위 조합을 만들어서 가능한 경우의 수 계산
-> 많아야 45가지

이분탐색
A의 경우의 수 중 한 경우를 뽑아서
B의 경우의 수에다가 이분탐색하면 각 경우마다 이기는 횟수 계산 가능
지금 보고있는 값이 타겟 점수보다
    높으면 -> 왼쪽 늘리기
    작거나 같으면 -> 오른쪽 줄이기

그냥 하면 시간초과 -> 메모이제이션 사용
*/

function solution(dice) {
  // 가능한 조합 계산
  const combinations = [];
  const getCombination = (picks, startIdx) => {
    if (picks.length === dice.length / 2) {
      combinations.push([...picks]);
      return;
    }
    if (startIdx >= dice.length) {
      return;
    }

    for (let i = startIdx; i < dice.length; i += 1) {
      picks.push(i);
      getCombination(picks, i + 1);
      picks.pop();
    }
  };
  getCombination([], 0);

  // 조합별 가능한 합 계산
  const availableSum = {};
  const getAvailableSumList = (diceIdxList) => {
    const result = [];
    const backtrack = (depth, sum) => {
      if (depth === diceIdxList.length) {
        result.push(sum);
        return;
      }

      for (let i = 0; i < 6; i += 1) {
        backtrack(depth + 1, sum + dice[diceIdxList[depth]][i]);
      }
    };

    backtrack(0, 0);
    return result;
  };
  combinations.forEach((combination) => {
    const key = combination.join(' ');
    const result = getAvailableSumList(combination);
    availableSum[key] = result.sort((a, b) => a - b);
  });

  // 조합별 승수 계산
  const getOtherSideDiceList = (myDiceList) => {
    const myDiceSet = new Set(myDiceList);
    return Array.from({ length: dice.length }, (_, idx) => idx).filter(
      (val) => !myDiceSet.has(val),
    );
  };
  const getWinningCount = (target, comparison) => {
    let count = 0;

    for (let i = 0; i < target.length; i += 1) {
      const score = target[i];
      let left = 0;
      let right = comparison.length;

      while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (score > comparison[mid]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      count += left;
    }

    return count;
  };

  // 승수 제일 많은 조합 찾기
  let max = 0;
  let maxIdx = -1;

  for (let i = 0; i < combinations.length; i += 1) {
    const myDiceSums = availableSum[combinations[i].join(' ')];
    const enemyDiceSums = availableSum[getOtherSideDiceList(combinations[i]).join(' ')];
    const winCount = getWinningCount(myDiceSums, enemyDiceSums);
    if (max < winCount) {
      max = winCount;
      maxIdx = i;
    }
  }

  return combinations[maxIdx].map((val) => val + 1);
}
