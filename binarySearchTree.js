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

    if (!node) {
      this.root = new Node(value);
      return;
    }

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

  deleteItem(...values) {
    let node, parentNode, leftChild, rightChild, leftActive;
    for (let value of values) {
      node = this.root;
      parentNode = this.root;

      while (node) {
        [leftChild, rightChild] = [node.left, node.right];
        if (node.data === value) {
          // node with 2 child
          if (leftChild && rightChild) {
            // find the min value in the right branch
            let nodeRightUtmost;
            let parentNodeUtmost = node;
            nodeRightUtmost = node.right;

            while (nodeRightUtmost.left) {
              parentNodeUtmost = nodeRightUtmost;
              nodeRightUtmost = nodeRightUtmost.left;
            }

            // parent node must point to nothing
            if (parentNodeUtmost.left.data === nodeRightUtmost.data) {
              parentNodeUtmost.left = undefined;
            } else {
              parentNodeUtmost.right = undefined;
            }

            // assign right and left data to node right utmost
            nodeRightUtmost.right = node.right;
            nodeRightUtmost.left = node.left;

            if (node.data === this.root.data) {
              // replace root with the smallest right node
              this.root = nodeRightUtmost;
            } else {
              if (leftActive) {
                parentNode.left = nodeRightUtmost;
              } else {
                parentNode.right = nodeRightUtmost;
              }
            }
            break;
          }

          // root node or simple node with no child case
          if (!leftChild && !rightChild) {
            // Case root node with no child
            if (node.data === this.root.data) {
              this.root = undefined;
              break;
            }

            // node with no child
            if (leftActive) {
              parentNode.left = undefined;
            } else {
              parentNode.right = undefined;
            }
            break;
          }

          // node with 1 child
          if ((!leftChild || !rightChild) && node.data === this.root.data) {
            this.root = leftChild ? leftChild : rightChild;
          }
          if (!leftChild) {
            if (leftActive) {
              parentNode.left = rightChild;
            } else {
              parentNode.right = rightChild;
            }
          } else {
            if (leftActive) {
              parentNode.left = leftChild;
            } else {
              parentNode.right = leftChild;
            }
          }
        }

        parentNode = node;
        if (value > node.data) {
          node = node.right;
          leftActive = false;
        } else {
          node = node.left;
          leftActive = true;
        }
      }
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback required");
    }

    let queue = [this.root];
    let node;

    while (queue.length) {
      node = queue[0];
      // call function
      callback(node.data);
      //queue children if they exist
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      //delete from queue
      queue.shift();
    }
  }

  preOrderForEach(callback, node) {
    if (arguments.length === 1) {
      node = this.root;
    }
    if (!node) return;
    if (typeof callback !== "function") {
      throw new Error("Callback required");
    }

    // call function on node
    callback(node.data);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  inOrderForEach(callback, node) {
    if (arguments.length === 1) {
      node = this.root;
    }
    if (!node) return;
    if (typeof callback !== "function") {
      throw new Error("Callback required");
    }

    // call function on node
    this.inOrderForEach(callback, node.left);
    callback(node.data);
    this.inOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node) {
    if (arguments.length === 1) {
      node = this.root;
    }
    if (!node) return;
    if (typeof callback !== "function") {
      throw new Error("Callback required");
    }

    // call function on node
    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node.data);
  }

  depth(value, depth = 0, node = this.root) {
    if (!node) return undefined;

    if (value === node.data) return depth;

    return this.depth(
      value,
      depth + 1,
      value > node.data ? node.right : node.left,
    );
  }

  #heightRecursive(node) {
    if (!node.left && !node.right) {
      return 0;
    }

    let leftHeight = node.left ? this.#heightRecursive(node.left) + 1 : 0;
    let rightHeight = node.right ? this.#heightRecursive(node.right) + 1 : 0;

    return leftHeight > rightHeight ? leftHeight : rightHeight;
  }

  height(value, node = this.root) {
    // find node and pass it to heightRecursive func
    while (node) {
      if (node.data === value) {
        return this.#heightRecursive(node);
      }
      node = value > node ? node.right : node.left;
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

let tree = new Tree([1, 3, 2, 4, 6, 7, 8, 9, 10, 11, 12]);
prettyPrint(tree.root);

console.log(tree.depth(7));
