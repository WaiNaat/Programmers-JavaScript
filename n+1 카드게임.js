/*
카드 두 장을 내고 각 카드 숫자는 유일
    -> 임의의 카드와 본인의 짝이 되는 카드는 무조건 정해져 있음

첫 손패
    짝이 되는 카드가 이미 있으면 그 턴수만큼 버티는건 확정

두 장 뽑기
    핵심은 들어온 카드의 짝은 도대체 언제 들어오느냐임
    내가 동전을 썼는데 그 짝은 맨 마지막에 뽑힌다? 내가 남은 동전 다 써도 거기까지 도달 못하면 자연사임

1. 일단 첫패로 버틸 수 있는만큼 버팀
2. 게임오버 직전까지 들어온 모든 패(=대기패)를 보고 첫패랑 짝이되는 애들은 들어오는 족족 비용 1 지불해서 구입
3. 더 이상 버틸 수 없을 때 대기패 짝이 있으면 비용 2 지불해서 한 세트 구입
4. 2번부터 반복
*/
function solution(coin, cards) {
  const totalCardCount = cards.length;
  const initialHandCount = totalCardCount / 3;
  const initial = new Set(cards.slice(0, initialHandCount));
  const draws = new Set();
  let sol = 1;
  let coinLeft = coin;
  let nextCard = cards.length / 3;
  let turn = 1;
  let pairCountInFutureDraws = 0;

  // 첫 패로 버티기
  initial.forEach((card) => {
    const counterpart = totalCardCount + 1 - card;
    if (initial.has(counterpart)) {
      initial.delete(card);
      initial.delete(counterpart);
      sol += 1;
    }
  });

  // 게임 오버 직전까지 카드 뽑기
  while (turn <= sol && nextCard < totalCardCount) {
    const card1 = cards[nextCard];
    const card2 = cards[nextCard + 1];
    nextCard += 2;

    [card1, card2].forEach((card) => {
      const counterpart = totalCardCount + 1 - card;

      // 첫 패와 짝이 된다면 무조건 구매
      if (initial.has(counterpart) && coinLeft > 0) {
        sol += 1;
        coinLeft -= 1;
        return;
      }

      // 대기패에 짝이 있으면 기억해두기
      if (draws.has(counterpart)) {
        pairCountInFutureDraws += 1;
        return;
      }

      // 짝이 미래에 올 예정이면 대기패에 저장
      draws.add(card);
    });

    turn += 1;

    // 게임 오버 상황인데 코인이 있고 대기패에 짝이 있다면 구매
    if (turn > sol && coinLeft >= 2 && pairCountInFutureDraws > 0) {
      sol += 1;
      coinLeft -= 2;
      pairCountInFutureDraws -= 1;
    }
  }

  return Math.min(sol, (totalCardCount - initialHandCount) / 2 + 1);
}
