/*
캐시 크기는 최대 30 * 도시 10만개
    매번 캐시를 순회해서 LRU를 찾더라도 충분히 구현 가능할듯?
*/
class Cache {
  constructor(size) {
    this.cache = [];
    this.size = size;
  }

  find(target) {
    if (this.size === 0) return 5;

    const index = this.cache.findIndex((value) => value === target);

    if (index >= 0) {
      this.cache = [...this.cache.slice(0, index), ...this.cache.slice(index + 1), target];

      return 1;
    }

    if (this.cache.length < this.size) {
      this.cache.push(target);
      return 5;
    }

    this.cache = [...this.cache.slice(1), target];
    return 5;
  }
}

function solution(cacheSize, cities) {
  let time = 0;
  const cache = new Cache(cacheSize);

  cities.forEach((city) => {
    time += cache.find(city.toLowerCase());
  });

  return time;
}
