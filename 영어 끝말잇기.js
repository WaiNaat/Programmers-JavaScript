function solution(n, words) {
  let last = words[0][0];
  let turn;
  const said = new Set();

  for (turn = 0; turn < words.length; turn += 1) {
    const says = words[turn];
    if (says.length === 1) break;
    if (says[0] !== last.at(-1)) break;
    if (said.has(says)) break;
    last = says;
    said.add(says);
  }

  if (turn === words.length) return [0, 0];

  return [(turn % n) + 1, Math.floor(turn / n) + 1];
}
