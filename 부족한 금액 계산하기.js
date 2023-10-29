function solution(price, money, count) {
  let totalPrice = 0;

  for (let i = 1; i <= count; i += 1) {
    totalPrice += price * i;
  }

  return Math.max(totalPrice - money, 0);
}
