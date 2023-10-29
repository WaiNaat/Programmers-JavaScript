/*
일단 선행스킬 없는애들 거름
선행스킬목록 처음부터 잘 있는지 비교
*/

function solution(skill, skill_trees) {
  const dependentSkills = new Set(skill);

  const isValid = (target) => {
    const parsed = [...target].filter((skill) => dependentSkills.has(skill)).join('');
    return parsed === skill.slice(0, parsed.length);
  };

  return skill_trees.filter(isValid).length;
}
