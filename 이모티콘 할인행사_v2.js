/*
이모티콘마다 할인율을 내가 고르는 문제임
이모티콘 7개, 할인율 4종 2^14 완탐 가능


*/
function solution(users, emoticons) {
  let sol = [-Infinity, -Infinity];
  const discount = {
    0: 10,
    1: 20,
    2: 30,
    3: 40,
  };

  for (let i = 0; i < 4 ** emoticons.length; i += 1) {
    const discounts = Array.from(i.toString(4).padStart(emoticons.length, '0')).map(
      (val) => discount[val],
    );
    const finalPrices = emoticons.map((price, index) => {
      return (price * (100 - discounts[index])) / 100;
    });
    let memberCount = 0;
    let sales = 0;

    users.forEach(([discountThreshold, registerThreshold]) => {
      const totalBuyPrice = finalPrices
        .filter((_, idx) => discounts[idx] >= discountThreshold)
        .reduce((sum, cur) => sum + cur, 0);
      if (totalBuyPrice >= registerThreshold) {
        memberCount += 1;
      } else {
        sales += totalBuyPrice;
      }
    });

    if (memberCount > sol[0]) {
      sol = [memberCount, sales];
    } else if (memberCount === sol[0] && sales > sol[1]) {
      sol = [memberCount, sales];
    }
  }

  return sol;
}
