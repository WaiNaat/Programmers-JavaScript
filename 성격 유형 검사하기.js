function solution(survey, choices) {
  const score = {
    R: 0,
    T: 0,
    C: 0,
    F: 0,
    J: 0,
    M: 0,
    A: 0,
    N: 0,
  };

  choices
    .map((value) => value - 4)
    .forEach((choice, index) => {
      if (choice < 0) score[survey[index][0]] -= choice;
      else score[survey[index][1]] += choice;
    });

  return [
    score.R >= score.T ? "R" : "T",
    score.C >= score.F ? "C" : "F",
    score.J >= score.M ? "J" : "M",
    score.A >= score.N ? "A" : "N",
  ].join("");
}
