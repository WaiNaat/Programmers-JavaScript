const getScore = (value, area) => {
  if (area === 'S') return value;
  if (area === 'D') return value ** 2;
  return value ** 3;
};

function solution(dartResult) {
  const regex = /^(\d?\d)([SDT])([*#]?)(\d?\d)([SDT])([*#]?)(\d?\d)([SDT])([*#]?)$/;
  const parsed = [...dartResult.match(regex)].slice(1);
  const scores = [];

  for (let i = 0; i < 9; i += 3) {
    let score = getScore(Number(parsed[i]), parsed[i + 1]);
    const option = parsed[i + 2];

    if (option === '*') {
      score *= 2;
      if (scores.length) scores.push(scores.pop() * 2);
    }

    if (option === '#') {
      score *= -1;
    }

    scores.push(score);
  }

  return scores.reduce((prev, score) => prev + score, 0);
}
