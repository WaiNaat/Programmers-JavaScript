const toMinutes = (time) => {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
};

function solution(fees, records) {
  const [baseTime, baseFee, unitTime, unitMoney] = fees;

  const parkingLot = new Map();
  const totalTime = {};

  const getFee = (time) =>
    baseFee + (time - baseTime > 0 ? Math.ceil((time - baseTime) / unitTime) * unitMoney : 0);

  records.forEach((record) => {
    const [timeStamp, car, status] = record.split(' ');

    if (status === 'IN') {
      parkingLot.set(car, toMinutes(timeStamp));
    } else {
      const time = toMinutes(timeStamp) - parkingLot.get(car);

      if (!totalTime[car]) totalTime[car] = 0;
      totalTime[car] += time;

      parkingLot.delete(car);
    }
  });

  parkingLot.forEach((inTime, car) => {
    const fee = toMinutes('23:59') - inTime;

    if (!totalTime[car]) totalTime[car] = 0;
    totalTime[car] += fee;
  });

  return Object.entries(totalTime)
    .map(([car, time]) => [car, getFee(time)])
    .sort((one, another) => (one[0] <= another[0] ? -1 : 1))
    .map(([, fee]) => fee);
}
