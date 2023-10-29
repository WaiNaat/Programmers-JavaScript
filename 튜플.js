/*
길이가 짧은게 튜플 앞에온다는뜻
    -> 집합 크기순대로 정렬

N := 정답배열의 길이

가장 작은 집합 꺼내서 O(N)
그 원소를 튜플에 넣고
나머지 집합에서 그 원소를 제거 (O(N))
반복
*/

function solution(s) {
  const sets = s
    .slice(2, -2)
    .split('},{')
    .map((setString) => new Set(setString.split(',').map(Number)));
  const sol = [];

  sets.sort((one, another) => another.size - one.size);

  while (sets.length) {
    const [target] = sets.pop().values();
    sets.forEach((set) => set.delete(target));
    sol.push(target);
  }

  return sol;
}
