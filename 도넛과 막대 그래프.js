/*
무관한 정점: 나가는 선만 있음
도넛: 모든 정점이 나가는거 1개, 들어오는거 1개
막대: 첫 정점은 들어오는거 0개, 마지막 정점은 나가는거 0개
8자: 들어오는거 2개, 나가는거 2개인 정점이 있음

1. 무관한 정점을 찾아서 전체 그래프 수 세기
    그래프가 2개 이상이므로 나가는 선만 2개 이상 있는 게 무관한 정점
2. 8자 세기
3. 막대 세기
4. 도넛은 123에서 계산한거로 역산 가능
*/
class Node {
  constructor() {
    this.in = new Set();
    this.out = new Set();
  }
}

function solution(edges) {
  const nodes = {};
  edges.forEach(([start, end]) => {
    if (!nodes[start]) {
      nodes[start] = new Node();
    }
    if (!nodes[end]) {
      nodes[end] = new Node();
    }

    nodes[start].out.add(end);
    nodes[end].in.add(start);
  });

  const [base] = Object.entries(nodes).find(([nodeName, node]) => {
    return node.in.size === 0 && node.out.size >= 2;
  });

  const totalCount = nodes[base].out.size;
  let eightCount = 0;
  let stickCount = 0;

  Object.entries(nodes).forEach(([nodeName, node]) => {
    if (nodeName === base) {
      return;
    }

    const baseValue = Number(base);
    node.in.delete(baseValue);
    node.out.delete(baseValue);

    if (node.in.size === 2 && node.out.size === 2) {
      eightCount += 1;
      return;
    }

    if (node.out.size === 0) {
      stickCount += 1;
    }
  });

  const donutCount = totalCount - eightCount - stickCount;

  return [Number(base), donutCount, stickCount, eightCount];
}
