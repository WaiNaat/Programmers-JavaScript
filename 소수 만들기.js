const isPrime = (value) => {
  if (value < 2) return false;
  for (let i = 2; i ** 2 <= value; i += 1) {
    if (value % i === 0) return false;
  }
  return true;
};

function solution(nums) {
  let count = 0;

  for (let i = 0; i < nums.length; i += 1) {
    for (let j = i + 1; j < nums.length; j += 1) {
      for (let k = j + 1; k < nums.length; k += 1) {
        if (isPrime(nums[i] + nums[j] + nums[k])) count += 1;
      }
    }
  }

  return count;
}
