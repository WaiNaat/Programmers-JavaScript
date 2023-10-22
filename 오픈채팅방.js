/*
입/퇴장 기록을 id로 기억
id에 현재 닉네임 연결
최종적으로 기록된 id를 닉네임으로 변경
*/
function solution(record) {
  const idToNickname = {};
  const log = [];

  record.forEach((record) => {
    const [action, id, nickname] = record.split(' ');

    switch (action) {
      case 'Enter':
        idToNickname[id] = nickname;
        log.push([id, '님이 들어왔습니다.']);
        break;
      case 'Leave':
        log.push([id, '님이 나갔습니다.']);
        break;
      default:
        idToNickname[id] = nickname;
    }
  });

  return log.map(([id, message]) => `${idToNickname[id]}${message}`);
}
