function solution(files) {
  return files
    .map((file, index) => {
      const [, head, number, tail] = file.match(/^([a-zA-Z .-]+)(\d+)(.*)$/);
      return [head, Number(number), index, file];
    })
    .sort((one, another) => {
      if (one[0].toLowerCase() !== another[0].toLowerCase()) {
        return one[0].toLowerCase() < another[0].toLowerCase() ? -1 : 1;
      }

      if (one[1] !== another[1]) return one[1] - another[1];

      return one[2] - another[2];
    })
    .map(([, , , file]) => file);
}
