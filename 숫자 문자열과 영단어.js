const stringToValue = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

function solution(s) {
  const regex = /^([0-9]|zero|one|two|three|four|five|six|seven|eight|nine)/;
  let start = 0;
  let sol = '';

  while (start < s.length) {
    const match = s.slice(start).match(regex)[1];
    sol += stringToValue[match] ?? match;
    start += match.length;
  }

  return Number(sol);
}
