/*
Map obj 2개 사용
    하나는 차량번호-입차시간
    하나는 차량번호-총 시간
같은 차량 여러번 왔다갈 수 있음
    출차 즉시 시간 계산해서 반영해야 함
    조건에 의해 요금 계산은 하루의 끝에 함
*/

function solution(fees, records) {
    const enter = new Map();
    const parking_time = new Map();
    const [base_time, base_fee, unit_time, unit_fee] = fees;

    // 기록 처리
    for (let record of records)
    {
        let [time, id, type] = record.split(' ');
        id = Number(id);

        if (type === 'IN')
            enter.set(id, time);
        else
        {
            let minute = time_sub(time, enter.get(id));
            enter.delete(id);
            update_parking_time(parking_time, id, minute);            
        }
    }

    // 아직 출차하지 않은 차들은 23:59에 출차로 처리
    for (let id of enter.keys())
    {
        let minute = time_sub('23:59', enter.get(id));
        update_parking_time(parking_time, id, minute);  
    }

    // 정답 계산
    const answer = [];
    for (let id of Array.from(parking_time.keys()).sort((a, b) => a - b))
    {
        let minute = parking_time.get(id) - base_time;
        let fee = base_fee;

        if (minute > 0)
            fee += Math.ceil(minute / unit_time) * unit_fee;

        answer.push(fee);
    }

    return answer;
}

function time_sub(a, b)
{
    let h, m, result;

    [h, m] = a.split(':').map(Number);
    result = h * 60 + m;

    [h, m] = b.split(':').map(Number);
    result -= h * 60 + m;

    return result;
}

function update_parking_time(parking_time, id, minute)
{
    if (!parking_time.has(id))
        parking_time.set(id, minute);
    else 
        parking_time.set(id, parking_time.get(id) + minute);
}