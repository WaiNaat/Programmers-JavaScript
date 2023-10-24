/*
몇분동안 재생했는지 계산해서 재생된 악보 만들기
*/
const toMinutes = (timeString) => {
  const [hour, minute] = timeString.split(':').map(Number);
  return (hour - 1) * 60 + minute;
};

const sharpToLowerCase = (score) => {
  const stack = [];
  Array.from(score).forEach((note) => {
    if (note !== '#') {
      stack.push(note);
    } else {
      stack.push(stack.pop().toLowerCase());
    }
  });
  return stack.join('');
};

function solution(m, musicinfos) {
  const melody = sharpToLowerCase(m);

  const result = musicinfos
    .map((info, index) => {
      const [start, end, name, score] = info.split(',');
      const parsedScore = sharpToLowerCase(score);
      const runningTime = toMinutes(end) - toMinutes(start) + 1;
      const playedScore = parsedScore
        .repeat(Math.ceil(runningTime / parsedScore.length))
        .slice(0, runningTime);

      return [runningTime, name, playedScore, index];
    })
    .filter(([, , playedScore]) => playedScore.includes(melody))
    .sort((one, another) => {
      if (one[0] !== another[0]) return one[0] - another[0];
      return another[3] - one[3];
    })
    .pop();

  return result ? result[1] : '(None)';
}
