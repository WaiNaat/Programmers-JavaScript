function solution(today, terms, privacies) {
  const toDays = (year, month, day) => {
    return year * 12 * 28 + month * 28 + day;
  };
  const todayValue = toDays(...today.split('.').map(Number));
  const termDays = Object.fromEntries(
    terms
      .map((term) => term.split(' '))
      .map(([name, period]) => [name, toDays(0, Number(period), 0)]),
  );
  return privacies
    .map((privacy, index) => {
      const [date, name] = privacy.split(' ');
      return [index, toDays(...date.split('.').map(Number)) + termDays[name]];
    })
    .filter(([, expireAt]) => todayValue >= expireAt)
    .map(([idx]) => idx + 1);
}
