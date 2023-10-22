function solution(new_id) {
  const step1 = Array.from(new_id.toLowerCase());
  const step2 = step1.filter((char) => char.match(/[0-9a-z_.-]/) !== null);
  const step3 = Array.from(step2.join('').replaceAll(/\.+/g, '.'));
  const step4 = step3.slice(
    step3[0] === '.' ? 1 : 0,
    step3[step3.length - 1] === '.' ? step3.length - 1 : step3.length,
  );
  const step5 = Array.from(step4.join('') || 'a');
  const step6 = step5.slice(0, 15);
  if (step6[step6.length - 1] === '.') step6.pop();
  const step7 = step6.join('').padEnd(3, step6[step6.length - 1]);

  return step7;
}
