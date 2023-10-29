const position = {
  1: [0, 0],
  2: [0, 1],
  3: [0, 2],
  4: [1, 0],
  5: [1, 1],
  6: [1, 2],
  7: [2, 0],
  8: [2, 1],
  9: [2, 2],
  '*': [3, 0],
  0: [3, 1],
  '#': [3, 2],
};

const getDistance = (one, another) => Math.abs(one[0] - another[0]) + Math.abs(one[1] - another[1]);

function solution(numbers, hand) {
  let leftPos = position['*'];
  let rightPos = position['#'];
  const sol = [];

  numbers.forEach((value) => {
    switch (value) {
      case 1:
      case 4:
      case 7:
        sol.push('L');
        leftPos = position[value];
        break;
      case 3:
      case 6:
      case 9:
        sol.push('R');
        rightPos = position[value];
        break;
      default:
        const leftDistance = getDistance(leftPos, position[value]);
        const rightDistance = getDistance(rightPos, position[value]);

        if (leftDistance < rightDistance) {
          sol.push('L');
          leftPos = position[value];
        } else if (leftDistance > rightDistance) {
          sol.push('R');
          rightPos = position[value];
        } else if (hand === 'left') {
          sol.push('L');
          leftPos = position[value];
        } else {
          sol.push('R');
          rightPos = position[value];
        }
    }
  });

  return sol.join('');
}
