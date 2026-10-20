class Node {
  constructor(data) {
    this.data = data;
    this.left = undefined;
    this.right = undefined;
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
      return;
    }

    // set node with mid index element and assign other nodes to left and right elements
    let node = new Node(arr[midIndex]);
    node.left = this.#buildTree(arr.slice(0, midIndex));
    node.right = this.#buildTree(arr.slice(midIndex + 1));

    return node;
  }

  includes(value, node) {
    if (arguments.length === 1) {
      node = this.root;
    }

    if (!node) return false;
    if (node.data === value) return true;

    if (value > node.data) {
      return this.includes(value, node.right);
    } else if (value < node.data) {
      return this.includes(value, node.left);
    }
  }

  insert(value) {
    let previousNode;
    let node = this.root;
    while (node) {
      previousNode = node;
      if (value > node.data) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    node = new Node(value);

    if (previousNode.data < value) {
      previousNode.right = node;
    } else {
      previousNode.left = node;
    }
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

let tree = new Tree([1, 2, 3, 4, 5, 6, 7, 9, 10]);
prettyPrint(tree.root);

tree.insert(20);
tree.insert(25);
tree.insert(23);
tree.insert(22);

console.log(tree.includes(2523));

prettyPrint(tree.root);
