/*
완전탐색
    7^4=2401

할인율은 10%, 20%, 30%, 40%
    각 이모티콘 별 할인율을 4진법으로 표시
*/
const getSaleRate = (status) => (Number(status) + 1) * 10;

function solution(users, emoticons) {
    let sol = [-Infinity, -Infinity];
    
    for (let saleStatusValue = 0; saleStatusValue < 4 ** emoticons.length; saleStatusValue += 1) {
        const saleStatus = saleStatusValue.toString(4).padStart(emoticons.length, '0');
        let subscriberCount = 0;
        let totalPrice = 0

        users.forEach(([minSale, maxPrice]) => {
            let price = 0;
            
            emoticons.forEach((emoticon, index) => {
                const saleRate = getSaleRate(saleStatus[index]);
                if (saleRate < minSale) return;
                price += emoticon * (100 - saleRate) / 100;
            });

            if (price < maxPrice) totalPrice += price;
            else subscriberCount += 1;
        });
        
        if (
            sol[0] < subscriberCount ||
            (sol[0] === subscriberCount && sol[1] < totalPrice)
        ) {
            sol = [subscriberCount, totalPrice];
        }
    }
    
    return sol;
}
