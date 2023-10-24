const dict = new Map(
  Array.from({ length: 26 }).map((_, index) => [String.fromCharCode(65 + index), index + 1]),
);

const findLongestMatch = (target, startIndex) => {
  let match = '';
  for (let i = startIndex; i < target.length; i += 1) {
    if (dict.has(match + target[i])) match += target[i];
    else break;
  }
  return match;
};

function solution(msg) {
  const sol = [];

  let i = 0;
  while (i < msg.length) {
    const match = findLongestMatch(msg, i);
    sol.push(dict.get(match));

    i += match.length;

    if (i < msg.length) {
      dict.set(match + msg[i], dict.size + 1);
    }
  }

  return sol;
}
