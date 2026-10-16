class Node {
  constructor(data) {
    this.data = data;
    this.left;
    this.right;
  }
}

class Tree {
  constructor(arr) {
    // sort array
    arr.sort((a, b) => a - b);
    // remove duplicates
    arr = [...new Set(arr)];
    this.root = this.#buildTree(arr);
  }

  #buildTree(arr) {
    // get middle index
    let midIndex = Math.floor(arr.length / 2);

    // return if node length is 1 and if 0 return an empty node
    if (arr.length === 1) {
      return new Node(arr[midIndex]);
    } else if (arr.length === 0) {
      return new Node("N");
    }

    // set node with mid index element and assign other nodes to left and right elements
    let node = new Node(arr[midIndex]);
    node.left = this.#buildTree(arr.slice(0, midIndex));
    node.right = this.#buildTree(arr.slice(midIndex + 1));

    return node;
  }

  includes(value, node = this.root) {
    if (node.data === value) {
      return true;
    }

    if (value > node.data) {
      return this.includes(value, node.right);
    } else if (value < node.data) {
      return this.includes(value, node.left);
    }

    return false;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

let tree = new Tree([1, 80, 2, 3, 20, 20, 30, 4, 5, 6, 8, 9, 19, 20, 30]);
prettyPrint(tree.root);
console.log(tree.includes(30));
