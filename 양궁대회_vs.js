/*
더 많은 화살을 k점에 맞힌 선수가 k 점을 가져갑니다.
최종 점수가 같을 경우 어피치를 우승자로 결정합니다.
라이언이 우승할 수 없는 경우(무조건 지거나 비기는 경우)는 [-1]을 return 해주세요.
가장 낮은 점수를 맞힌 개수가 같을 경우 계속해서 그다음으로 낮은 점수를 더 많이 맞힌 경우를 return 해주세요.
라이언이 가장 큰 "점수 차이"로 우승할 수 있는 방법이 여러 가지 일 경우, 가장 낮은 점수를 더 많이 맞힌 경우를 return 해주세요.

라이언은 각 점수를 얻을 때 최소한의 화살을 써서 얻어야 함
어차피 과녁 종류는 10개니까 다 해보면 될듯
과녁별 선택지는 맞춘다/안맞춘다 2개니까 2^10=1024
*/

function solution(n, info) {
  const apeachOriginalScore = info.reduce((prev, cur, index) => prev + (cur ? 10 - index : 0), 0);
  const neededArrows = info.map((value) => value + 1);

  const getScoreGap = (status) => {
    let ryanScore = 0;
    let apeachScore = apeachOriginalScore;
    let neededArrowCount = 0;

    status.forEach((isShooting, index) => {
      if (isShooting) {
        ryanScore += 10 - index;
        if (info[index] > 0) apeachScore -= 10 - index;
        neededArrowCount += neededArrows[index];
      }
    });

    return neededArrowCount <= n ? ryanScore - apeachScore : -Infinity;
  };

  const getLeftArrows = (array) => {
    return n - array.reduce((prev, cur) => prev + cur, 0);
  };

  const getBetterScoreBoard = (one, another) => {
    const copiedOne = [...one];
    const copiedAnother = [...another];
    while (copiedOne.length) {
      const a = copiedOne.pop();
      const b = copiedAnother.pop();
      if (a > b) return one;
      if (a < b) return another;
    }
    return one;
  };

  let maxScoreGap = -Infinity;
  let result = new Array(11).fill(-1);

  for (let status = 2 ** 10; status >= 0; status -= 1) {
    const statusArray = Array.from(status.toString(2).padStart(10, '0')).map(Number);
    const scoreGap = getScoreGap(statusArray);

    const ryanResults = statusArray.map((isShooting, index) =>
      isShooting ? neededArrows[index] : 0,
    );

    ryanResults.push(getLeftArrows(ryanResults));

    if (scoreGap === maxScoreGap) {
      result = getBetterScoreBoard(ryanResults, result);
    } else if (scoreGap > maxScoreGap) {
      maxScoreGap = scoreGap;
      result = ryanResults;
    }
  }

  if (maxScoreGap <= 0) return [-1];

  return result;
}
