/*
어차피 갔다가 와야 함
-> 멀리있는데 택배 배달하면 멀리있는 거 수거해오기

즉 매 왕복마다 배달/수거 중 더 멀리있는데까지 갔다오는거임
*/
function solution(cap, n, deliveries, pickups) {
  let sol = 0;
  const decrease = (arr, amount) => {
    let amountLeft = amount;
    while (amountLeft > 0 && arr.length > 0) {
      if (arr.at(-1) > 0) {
        const min = Math.min(arr.at(-1), amountLeft);
        arr[arr.length - 1] -= min;
        amountLeft -= min;
      }
      while (arr.at(-1) === 0) {
        arr.pop();
      }
    }
  };

  while (deliveries.at(-1) === 0) {
    deliveries.pop();
  }
  while (pickups.at(-1) === 0) {
    pickups.pop();
  }

  while (deliveries.length > 0 || pickups.length > 0) {
    sol += Math.max(deliveries.length, pickups.length) * 2;
    decrease(deliveries, cap);
    decrease(pickups, cap);
  }

  return sol;
}
