/*
백트래킹
현재 보드, A위치, B위치, 움직임 횟수, 차례를 입력받아서 움직여봄
게임이 끝나면 즉시 탐색 종료

이거 문제점 >> 도망가는 사람이 '최선의 수'로 도망가지 않음
*/

const A = 1
const B = -1
const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
let row, col;
let answer;

function solution(board, aloc, bloc) {
    row = board.length;
    col = board[0].length;
    
    play(0, board, aloc, bloc, A);
    
    return answer;
}

function play(moves, board, aloc, bloc, turn_player)
{
    let player_r, player_c;
    if (turn_player === A)
        [player_r, player_c] = aloc;
    else
        [player_r, player_c] = bloc;
    
    // 패배 조건 1: 본인 밑에 발판이 없음
    if (board[player_r][player_c] === 0)
    {
        answer = moves;
        return true;
    }
    
    // 이동
    let moved = false;
    
    for (let [dr, dc] of directions)
    {
        let r2 = player_r + dr;
        let c2 = player_c + dc;
        
        if (0 > r2 || r2 >= row || 0 > c2 || c2 >= col || board[r2][c2] == 0)
            continue;
        
        // 이동
        let board2 = Array.from(board, row => Array.from(row));
        board2[player_r][player_c] = 0;
        moved = true;
        
        // 재귀
        let found;
        if (turn_player === A)
            found = play(moves + 1, board2, [r2, c2], bloc, B);
        else
            found = play(moves + 1, board2, aloc, [r2, c2], A);
        
        // 정답 찾았으면 종료
        if (found) return true;
    }
    
    // 패배 조건 2: 이동할 수 없음
    if (!moved)
    {
        answer = moves;
        return true;
    }
    
    return false;
}