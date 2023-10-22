const tokenize = (target) => {
  const tokens = [];
  const lowerCaseTarget = target.toLowerCase();

  Array.from(lowerCaseTarget).forEach((char, index) => {
    if (index === lowerCaseTarget.length - 1) return;
    if (char.match(/[a-z]/) === null || lowerCaseTarget[index + 1].match(/[a-z]/) === null) return;
    tokens.push(`${char}${lowerCaseTarget[index + 1]}`);
  });

  const result = {};

  tokens.forEach((token) => {
    if (!result[token]) result[token] = 0;
    result[token] += 1;
  });

  return result;
};

const getIntersection = (one, another) => {
  const result = {};

  Object.keys(one).forEach((token) => {
    if (another[token]) {
      result[token] = Math.min(one[token], another[token]);
    }
  });

  return result;
};

const getUnion = (one, another) => {
  const result = {};

  new Set([...Object.keys(one), ...Object.keys(another)]).forEach((token) => {
    result[token] = Math.max(one[token] ?? 0, another[token] ?? 0);
  });

  return result;
};

const getSum = (array) => array.reduce((prev, cur) => prev + cur, 0);

const J = (one, another) => {
  const tokens1 = tokenize(one);
  const tokens2 = tokenize(another);

  if (Object.keys(tokens1).length === 0 && Object.keys(tokens2).length === 0) {
    return 1;
  }

  const intersection = getIntersection(tokens1, tokens2);
  const union = getUnion(tokens1, tokens2);

  return getSum(Object.values(intersection)) / getSum(Object.values(union));
};

function solution(str1, str2) {
  return Math.floor(J(str1, str2) * 65536);
}
