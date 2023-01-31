const solution = (numbers) => {
  const result = [];
  numbers.forEach((number) => {
    if (result[result.length - 1] !== number) result.push(number);
  });
  return result;
};
