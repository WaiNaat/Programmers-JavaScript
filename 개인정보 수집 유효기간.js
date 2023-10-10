const MONTH = 28;
const YEAR = 12 * MONTH;

const toDateValue = (dateString) => {
    const [year, month, date] = dateString.split('.').map(Number);
    return year * YEAR + (month - 1) * MONTH + (date - 1);
};

function solution(today, terms, privacies) {
    const answer = [];
    const todayValue = toDateValue(today);
    
    const termMap = new Map();
    terms.forEach((term) => {
        const [name, month] = term.split(' ');
        termMap.set(name, Number(month));
    });
    
    privacies.forEach((privacy, index) => {
        const [start, term] = privacy.split(' ');
        const endDateValue = toDateValue(start) + MONTH * termMap.get(term) - 1;
        if (todayValue > endDateValue) answer.push(index + 1);
    });
    
    return answer;
}
