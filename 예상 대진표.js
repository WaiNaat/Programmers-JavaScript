/*
a와 b가 다음 라운드에선 몇 번인지 계산
둘이 같아지면 둘은 그 직전 라운드에서 싸운거
*/

function solution(n,a,b)
{
    a--;
    b--;
    
    let round;
    for (round=1; a != b; round++)
    {
        a = Math.floor(a / 2);
        b = Math.floor(b / 2);
    }
    
    return round - 1;
}