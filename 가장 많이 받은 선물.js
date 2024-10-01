class GiftPoint {
  constructor() {
    this.total = 0;
    this.points = {};
  }
}

function solution(friends, gifts) {
  const giftPoints = Object.fromEntries(friends.map((name) => [name, new GiftPoint()]));
  gifts.forEach((s) => {
    const [start, end] = s.split(' ');
    const startGiftPoint = giftPoints[start];
    const endGiftPoint = giftPoints[end];

    if (!startGiftPoint.points[end]) {
      startGiftPoint.points[end] = 0;
    }
    startGiftPoint.points[end] += 1;
    startGiftPoint.total += 1;

    if (!endGiftPoint.points[start]) {
      endGiftPoint.points[start] = 0;
    }
    endGiftPoint.points[start] -= 1;
    endGiftPoint.total -= 1;
  });

  const giftCounts = friends.map((me) => {
    let result = 0;

    friends.forEach((friend) => {
      // 본인 제외
      if (me === friend) {
        return;
      }

      // 주고받은 선물이 없거나 같을 때
      if ((giftPoints[me].points[friend] ?? 0) === 0) {
        if (giftPoints[me].total > giftPoints[friend].total) {
          result += 1;
        }
        return;
      }

      // 내가 더 많은 선물을 줬을 때
      if ((giftPoints[me].points[friend] ?? 0) > 0) {
        result += 1;
      }
    });

    return result;
  });

  return Math.max(...giftCounts);
}
