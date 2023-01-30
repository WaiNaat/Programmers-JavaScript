const solution = (nums) => {
  const typeCount = new Set(nums).size;
  const ponkemonCount = nums.length;
  return Math.min(typeCount, ponkemonCount / 2);
};
