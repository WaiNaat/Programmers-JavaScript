/*
그리디
멀리있는건 최대한 적은횟수로 왔다갔다해야함
갈때: 멀리 가야하는거부터 꽉 채워서 이동
올때: 멀리 쌓여있는거부터 꽉 채워서 이동

10만*50=500만
*/
function solution(cap, n, deliveries, pickups) {
  const deliveryStack = [];
  const pickupStack = [];
  
  deliveries.forEach((value, index) => deliveryStack.push(...new Array(value).fill(index + 1)));
  pickups.forEach((value, index) => pickupStack.push(...new Array(value).fill(index + 1)));
  
  let sol = 0;

  while (deliveryStack.length || pickupStack.length) {
      let goDistance = 0;
      let backDistance = 0;

      for (let i = 0; i < cap; i += 1) {
          if (deliveryStack.length) goDistance = Math.max(goDistance, deliveryStack.pop());
          if (pickupStack.length) backDistance = Math.max(backDistance, pickupStack.pop());
      }
      
      sol += goDistance * 2 + Math.max(0, backDistance - goDistance) * 2;
  }
  
  return sol;
}
