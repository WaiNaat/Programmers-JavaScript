/*
누가 그 사람을 신고했는지 기억
*/

function solution(idList, reportList, threshold) {
  const reporters = Object.fromEntries(idList.map((name) => [name, new Set()]));
  const reports = reportList.map((item) => item.split(' '));

  reports.forEach(([reporter, reportee]) => {
    reporters[reportee].add(reporter);
  });

  const banned = Object.entries(reporters)
    .map(([name, set]) => [name, set.size])
    .filter(([, count]) => count >= threshold)
    .map(([name]) => name);

  const receivedMailCount = Object.fromEntries(idList.map((name) => [name, 0]));

  banned.forEach((name) => {
    reporters[name].forEach((reporter) => {
      receivedMailCount[reporter] += 1;
    });
  });

  const sol = idList.map((name) => receivedMailCount[name]);

  return sol;
}
