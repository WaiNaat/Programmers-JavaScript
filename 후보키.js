/*
모든 학생과 일대일 대응이 되는 속성이 있다면 그거 하나로 후보키 가능
    -> 다른 후보키에는 이 속성이 들어가서는 안 된다.

완전탐색 8! * row 20개  = 4만 * 20

1개로 후보키가 되는 경우
2개로
3개로
...

가능한 모든 조합에 대해
이 조합이 유일성을 만족한다면
후보키 집합의 모든 요소에 대해 각 요소가 이 조합의 부분집합이 아니면 됨
*/
const getCombinations = (length, max) => {
  const result = [];

  const dive = (combination) => {
    if (combination.length === length) {
      result.push(combination);
      return;
    }

    for (
      let i = combination.length ? combination[combination.length - 1] + 1 : 0;
      i < max;
      i += 1
    ) {
      dive([...combination, i]);
    }
  };

  dive([]);

  return result;
};

const isSubset = (subset, superset) => Array.from(subset).every((item) => superset.has(item));

function solution(relation) {
  const columnCount = relation[0].length;
  const candidateKeys = [];
  const cannotBeCandidateKey = new Set();

  const getKeys = (columns) =>
    relation.map((row) => row.filter((value, index) => columns.includes(index)).join(' '));

  for (let depth = 1; depth <= columnCount; depth += 1) {
    const keyCandidates = getCombinations(depth, columnCount);
    keyCandidates.forEach((keyCandidate) => {
      if (new Set(getKeys(keyCandidate)).size !== relation.length) return;

      const set = new Set(keyCandidate);
      const isMinimal = candidateKeys.every((key) => !isSubset(key, set));
      if (isMinimal) candidateKeys.push(set);
    });
  }

  return candidateKeys.length;
}
