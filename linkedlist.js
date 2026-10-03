// Doubly linked list - no arrays used for storage. Each node points to prev and next.
class Node {
  constructor(data) { this.data = data; this.prev = null; this.next = null; }
}

class DoublyLinkedList {
  constructor() { this.head = null; this.tail = null; this.current = null; this.size = 0; }

  addLast(data) {                       // O(1) thanks to tail pointer
    const n = new Node(data);
    if (!this.tail) this.head = this.tail = n;
    else { n.prev = this.tail; this.tail.next = n; this.tail = n; }
    if (!this.current) this.current = n;
    this.size++; return n;
  }

  addFirst(data) {                      // O(1)
    const n = new Node(data);
    if (!this.head) this.head = this.tail = n;
    else { n.next = this.head; this.head.prev = n; this.head = n; }
    if (!this.current) this.current = n;
    this.size++; return n;
  }

  insertAt(index, data) {               // O(n)
    if (index < 0 || index > this.size) throw new RangeError("Position out of range");
    if (index === 0) return this.addFirst(data);
    if (index === this.size) return this.addLast(data);
    const at = this._nodeAt(index), n = new Node(data);
    n.prev = at.prev; n.next = at;
    at.prev.next = n; at.prev = n;
    this.size++; return n;
  }

  removeAt(index) {                     // O(n) to find, O(1) to unlink
    if (index < 0 || index >= this.size) throw new RangeError("Position out of range");
    const n = this._nodeAt(index);
    if (n.prev) n.prev.next = n.next; else this.head = n.next;
    if (n.next) n.next.prev = n.prev; else this.tail = n.prev;
    if (this.current === n) this.current = n.next || n.prev;
    this.size--; return n.data;
  }

  move(from, to) {                      // remove + reinsert
    if (from === to) return;
    const data = this.removeAt(from);
    const wasEmpty = this.size === 0;
    const node = this.insertAt(to, data);
    if (wasEmpty) this.current = node;
  }

  next() { if (this.current && this.current.next) this.current = this.current.next; return this.current; }
  prev() { if (this.current && this.current.prev) this.current = this.current.prev; return this.current; }
  playAt(index) { this.current = this._nodeAt(index); return this.current; }

  reverse() {                           // swap prev/next on every node
    let n = this.head;
    while (n) { const t = n.next; n.next = n.prev; n.prev = t; n = t; }
    const h = this.head; this.head = this.tail; this.tail = h;
  }

  _nodeAt(index) {                      // walk from the nearer end
    if (index < 0 || index >= this.size) throw new RangeError("Position out of range");
    let n;
    if (index < this.size / 2) { n = this.head; for (let i = 0; i < index; i++) n = n.next; }
    else { n = this.tail; for (let i = this.size - 1; i > index; i--) n = n.prev; }
    return n;
  }

  toJSON() {
    const songs = []; let i = 0, playing = -1;
    for (let n = this.head; n; n = n.next, i++) {
      songs.push(n.data);
      if (n === this.current) playing = i;
    }
    return { size: this.size, playing, songs };
  }
}

module.exports = { DoublyLinkedList };
