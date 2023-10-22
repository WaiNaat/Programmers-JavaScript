/*
각 스테이지별 인원수 계산
실패율 = (해당 스테이지 인원수) / (해당 스테이지 + 그 이후 스테이지 인원);
*/

function solution(N, stages) {
  const stagePeopleCount = new Array(N + 2).fill(0);
  stages.forEach((stage) => {
    stagePeopleCount[stage] += 1;
  });

  const failRate = {};
  let clearedPeopleCount = stagePeopleCount.pop();

  for (let stage = N; stage > 0; stage -= 1) {
    failRate[stage] = stagePeopleCount[stage] / (stagePeopleCount[stage] + clearedPeopleCount);
    clearedPeopleCount += stagePeopleCount[stage];
  }

  return Object.entries(failRate)
    .sort((one, another) => {
      if (one[1] !== another[1]) return another[1] - one[1];
      return Number(one[0]) < Number(another[0]) ? -1 : 1;
    })
    .map(([stage]) => Number(stage));
}
