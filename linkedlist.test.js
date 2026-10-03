const assert = require("assert");
const { DoublyLinkedList } = require("../linkedlist");
const titles = (l) => l.toJSON().songs.join(",");

const l = new DoublyLinkedList();
["a", "b", "c"].forEach((s) => l.addLast(s));
l.addFirst("z");                       assert.equal(titles(l), "z,a,b,c");
l.insertAt(2, "x");                    assert.equal(titles(l), "z,a,x,b,c");
assert.equal(l.removeAt(0), "z");      assert.equal(titles(l), "a,x,b,c");
l.move(0, 3);                          assert.equal(titles(l), "x,b,c,a");
l.reverse();                           assert.equal(titles(l), "a,c,b,x");
assert.equal(l.tail.prev.data, "b");   // back-pointers stay valid after reverse
l.playAt(1); l.next();                 assert.equal(l.toJSON().playing, 2);
l.prev(); l.prev(); l.prev();          assert.equal(l.toJSON().playing, 0);
assert.throws(() => l.removeAt(10), RangeError);
console.log("All linked list tests passed");
