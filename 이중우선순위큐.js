/*
최대 힙, 최소 힙을 둘 다 사용해서 최댓값과 최솟값을 추적.
해당 값이 실제로 있는지 확인하기 위한 obj 필요.
*/
class MinHeap {
  constructor() {
    this.list = [undefined];
    this.length = 0;
  }

  push(value) {
    this.list.push(value);
    this.length += 1;

    let index;
    for (
      index = this.length;
      index > 1 && value < this.list[Math.floor(index / 2)];
      index = Math.floor(index / 2)
    ) {
      this.list[index] = this.list[Math.floor(index / 2)];
    }
    this.list[index] = value;
  }

  pop() {
    if (this.length === 0) return 'Heap Empty';
    const deleteValue = this.list[1];
    const value = this.list.pop();
    this.length -= 1;
    if (this.length === 0) return deleteValue;

    let index = 1;
    while (index * 2 <= this.length) {
      const smallChild = this.#findSmallestChild(index, value);
      if (index === smallChild) break;
      this.list[index] = this.list[smallChild];
      index = smallChild;
    }
    this.list[index] = value;
    return deleteValue;
  }

  peek() {
    if (this.length === 0) return 'Heap Empty';
    return this.list[1];
  }

  #findSmallestChild(index, value) {
    const leftChild = this.list[index * 2] !== undefined ? this.list[index * 2] : Infinity;
    const rightChild = this.list[index * 2 + 1] !== undefined ? this.list[index * 2 + 1] : Infinity;
    if (value <= leftChild && value <= rightChild) return index;
    if (leftChild <= value && leftChild <= rightChild) return index * 2;
    return index * 2 + 1;
  }
}

class DoublePriorityQueue {
  constructor() {
    this.minHeap = new MinHeap();
    this.maxHeap = new MinHeap();
    this.length = 0;
    this.entries = {};
  }

  insert(value) {
    this.length += 1;
    if (!Object.prototype.hasOwnProperty.call(this.entries, value)) {
      this.entries[value] = 0;
    }
    this.entries[value] += 1;
    this.minHeap.push(value);
    this.maxHeap.push(-value);
  }

  deleteMax() {
    if (this.length === 0) return 'PQ Empty';
    while (this.maxHeap.length > 0 && this.entries[-this.maxHeap.peek()] === 0) {
      this.maxHeap.pop();
    }
    if (this.maxHeap.length > 0) {
      const value = -this.maxHeap.pop();
      this.entries[value] -= 1;
      this.length -= 1;
      return value;
    }
    return 'PQ Empty';
  }

  deleteMin() {
    if (this.length === 0) return 'PQ Empty';
    while (this.minHeap.length > 0 && this.entries[this.minHeap.peek()] === 0) {
      this.minHeap.pop();
    }
    if (this.minHeap.length > 0) {
      const value = this.minHeap.pop();
      this.entries[value] -= 1;
      this.length -= 1;
      return value;
    }
    return 'PQ Empty';
  }

  getMax() {
    if (this.length === 0) return 0;
    while (this.maxHeap.length > 0 && this.entries[-this.maxHeap.peek()] === 0) {
      this.maxHeap.pop();
    }
    return -this.maxHeap.peek();
  }

  getMin() {
    if (this.length === 0) return 0;
    while (this.minHeap.length > 0 && this.entries[this.minHeap.peek()] === 0) {
      this.minHeap.pop();
    }
    return this.minHeap.peek();
  }
}

const solution = (operations) => {
  const doublePQ = new DoublePriorityQueue();
  operations.forEach((operation) => {
    const [operator, value] = operation.split(' ');
    if (operator === 'I') doublePQ.insert(Number(value));
    if (operator === 'D' && value === '1') doublePQ.deleteMax();
    if (operator === 'D' && value === '-1') doublePQ.deleteMin();
  });
  return [doublePQ.getMax(), doublePQ.getMin()];
};
