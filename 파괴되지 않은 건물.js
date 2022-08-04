/// 시간 초과 ///

/*
일단 그냥 구현해보기
*/

function solution(board, skill) {
    for (let [type, r1, c1, r2, c2, degree] of skill)
    {
        let flag;
        if (type === 1) flag = -1;
        else flag = 1;
        
        for (let r=r1; r<=r2; r++)
        {
            for (let c=c1; c<=c2; c++)
                board[r][c] += flag * degree;
        }
    }
    
    let cnt = 0;
    for (let r=0; r<board.length; r++)
    {
        for (let c=0; c<board[0].length; c++)
        {
            if (board[r][c] > 0)
                cnt++;
        }
    }
    
    return cnt;
}