const solution = (array, commands) => {
  const sol = [];
  commands.forEach(([start, end, index]) => {
    const target = array.slice(start - 1, end);
    target.sort((a, b) => a - b);
    sol.push(target[index - 1]);
  });
  return sol;
};
