/*
기본적인 큐의 기능 외에
큐를 한 번 순환하면서 중요도를 확인하는 기능 필요
*/
class Node {
  constructor(priority, location) {
    this.priority = priority;
    this.location = location;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  enqueue(priority, location) {
    const newNode = new Node(priority, location);
    if (this.length === 0) {
      this.first = newNode;
    } else {
      this.last.next = newNode;
    }
    this.last = newNode;
    this.length += 1;
  }

  dequeue() {
    const { priority, location, next } = this.first;
    this.length -= 1;
    if (this.length === 0) {
      this.last = null;
    }
    this.first = next;
    return { priority, location };
  }

  hasMoreImportantDocument(priority) {
    for (let cur = this.first; cur !== null; cur = cur.next) {
      if (cur.priority > priority) return true;
    }
    return false;
  }
}

const solution = (priorities, targetLocation) => {
  const queue = new Queue();
  priorities.forEach((priority, index) => { queue.enqueue(priority, index); });

  let printTime = 0;
  while (queue.length > 0) {
    const { priority, location } = queue.dequeue();
    if (queue.hasMoreImportantDocument(priority)) {
      queue.enqueue(priority, location);
    } else {
      printTime += 1;
      if (location === targetLocation) return printTime;
    }
  }
  return -1;
};
