/*
2개를 고르는 경우 10C2 * 주문 20개 * 코스 10개 = 45*20*10 = 9000
할만한데?
하나의 '주문'에 대해서 '단품 메뉴'는 고르거나 안고르거나가 가능
    -> 이진법 사용
*/
function solution(orders, course) {
  const orderList = orders.map((order) =>
    Array.from(order).sort((one, another) => (one < another ? -1 : 1)),
  );
  const courseSet = new Set(course);
  const courseCounts = Array.from({ length: Math.max(...course) + 1 }).map(() => ({}));

  orderList.forEach((order) => {
    for (let statusValue = 0; statusValue < 2 ** order.length; statusValue += 1) {
      const status = statusValue.toString(2).padStart(order.length, '0');
      const courseCandidate = order.filter((_, index) => status[index] === '1');

      if (!courseSet.has(courseCandidate.length)) continue;

      const newCourse = courseCandidate.join('');
      if (!courseCounts[newCourse.length][newCourse]) courseCounts[newCourse.length][newCourse] = 0;
      courseCounts[newCourse.length][newCourse] += 1;
    }
  });

  const sol = [];

  courseCounts.forEach((courses) => {
    const maxValue = Math.max(...Object.values(courses));

    if (maxValue < 2) return;

    sol.push(
      ...Object.entries(courses)
        .filter((newCourse) => newCourse[1] === maxValue)
        .map(([courseName]) => courseName),
    );
  });

  sol.sort((one, another) => (one < another ? -1 : 1));

  return sol;
}
