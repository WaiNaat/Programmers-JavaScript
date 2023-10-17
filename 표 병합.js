/*
셀은 2500칸 * 명령어 1000개 = 2_500_000
무식한 구현 가능

핵심은 merge 처리
    병합된 셀끼리 다시 병합할 수 있다
    두 셀을 합칠 때 그 사이에 위치한 셀들은 영향을 받지 않는다?!?!

각 셀마다 기억해야 하는 값은?
    자기한테 적힌 값
    본인이 속한 병합 셀이 있다면 그거 이름

주의: update의 인자는 둘 또는 셋
*/

const table = {
  board: Array.from({ length: 51 }).map(() =>
    Array.from({ length: 51 }).map(() => ({ value: "EMPTY", group: null })),
  ),
  nextGroupName: 1,

  change(r, c, value) {
    this.board[r][c].value = value;

    const targetGroup = this.board[r][c].group ?? 0;

    if (!targetGroup) return;

    for (let r = 1; r <= 50; r += 1) {
      for (let c = 1; c <= 50; c += 1) {
        if (this.board[r][c].group === targetGroup) {
          this.board[r][c].value = value;
        }
      }
    }
  },

  changeAll(value1, value2) {
    for (let r = 1; r <= 50; r += 1) {
      for (let c = 1; c <= 50; c += 1) {
        if (this.board[r][c].value === value1) {
          this.board[r][c].value = value2;
        }
      }
    }
  },

  merge(r1, c1, r2, c2) {
    if (this.isInTheSameGroup(r1, c1, r2, c2)) return;

    const value1 = this.board[r1][c1].value;
    const value2 = this.board[r2][c2].value;
    const value = value1 === "EMPTY" ? value2 : value1;

    const group1 = this.board[r1][c1].group ?? 0;
    const group2 = this.board[r2][c2].group ?? 0;

    for (let r = 1; r <= 50; r += 1) {
      for (let c = 1; c <= 50; c += 1) {
        if (
          this.board[r][c].group === group1 ||
          this.board[r][c].group === group2
        ) {
          this.board[r][c] = { value, group: this.nextGroupName };
        }
      }
    }

    this.board[r1][c1] = { value, group: this.nextGroupName };
    this.board[r2][c2] = { value, group: this.nextGroupName };

    this.nextGroupName += 1;
  },

  unmerge(r, c) {
    const { value, group: targetGroup } = this.board[r][c];

    if (!targetGroup) return;

    for (let r = 1; r <= 50; r += 1) {
      for (let c = 1; c <= 50; c += 1) {
        if (this.board[r][c].group === targetGroup) {
          this.board[r][c] = { value: "EMPTY", group: null };
        }
      }
    }

    this.board[r][c].value = value;
  },

  print(r, c) {
    return this.board[r][c].value;
  },

  isInTheSameGroup(r1, c1, r2, c2) {
    const group1 = this.board[r1][c1].group;
    const group2 = this.board[r2][c2].group;
    return group1 && group2 && group1 === group2;
  },
};

function solution(commands) {
  const sol = [];

  commands.forEach((line) => {
    const [command, param1, param2, param3, param4] = line.split(" ");

    switch (command) {
      case "UPDATE":
        if (param3 !== undefined)
          table.change(...[param1, param2].map(Number), param3);
        else table.changeAll(param1, param2);
        break;
      case "MERGE":
        table.merge(...[param1, param2, param3, param4].map(Number));
        break;
      case "UNMERGE":
        table.unmerge(...[param1, param2].map(Number));
        break;
      default:
        sol.push(table.print(...[param1, param2].map(Number)));
    }
  });

  return sol;
}
