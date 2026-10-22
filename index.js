import { Tree } from "./binarySearchTree.js";

function randomArr(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * n));
  }
  return arr;
}

let tree = new Tree(randomArr(100));
console.log(tree.isBalanced());
tree.insert(101, 102, 103, 104, 105, 106, 107, 100);
tree.rebalance();
tree.prettyPrint();
console.log(tree.isBalanced());
tree.levelOrderForEach((data) => {
  console.log(data);
});
