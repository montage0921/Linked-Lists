class LinkedList {
  #sizeCounter = 0;
  #headNode;

  constructor() {
    this.#headNode = null;
  }

  //adds a new node to the end of the list
  append(value) {
    const node = new Node(value);
    if (this.#headNode == null) {
      this.#headNode = node;
    } else {
      this.#insertNode(this.#headNode, node);
    }

    this.#sizeCounter++;
  }

  #insertNode(existNode, newNode) {
    if (existNode.nextNode == null) {
      existNode.nextNode = newNode;
    } else {
      this.#insertNode(existNode.nextNode, newNode);
    }
  }

  //adds a new node to the start of the list
  prepend(value) {
    const node = new Node(value);
    if (this.#headNode == null) {
      this.#headNode = node;
    } else {
      const oldHead = this.#headNode;
      this.#headNode = node;
      node.nextNode = oldHead;
    }

    this.#sizeCounter++;
  }

  //return total number of nodes in the list
  size() {
    return this.#sizeCounter;
  }

  //return the first node;
  head() {
    return this.#headNode.value;
  }

  //returns the last node;
  tail() {
    if (this.#headNode.nextNode == null) return this.#headNode.value;
    else {
      return this.#traversalToTail(this.#headNode);
    }
  }

  #traversalToTail(node) {
    if (node.nextNode == null) {
      return node.value;
    } else return this.#traversalToTail(node.nextNode);
  }

  // returns the node at the given index
  at(index) {
    //HANDLING SPECIAL CASES
    //case: only contains a head node
    if (index == 1) return node.value;
    //case: user enter 0, index begins from 1;
    if (index == 0) throw new Error("index should start from 1!");
    //case: empty link
    if (this.#headNode == null) throw new Error("empty list");
    //case: index exceeds size of the list
    if (index > this.#sizeCounter)
      throw new Error(`exceed size of the linked list (${this.#sizeCounter})`);

    let node = this.#headNode;
    let count = 1;

    while (count !== index) {
      node = this.#nextNode(node);
      count++;
    }

    return node.value;
  }

  #nextNode(node) {
    if (node.nextNode == null) return;
    return node.nextNode;
  }

  //removes the last element from the list
  pop() {
    let node = this.#headNode;
    let count = 1;

    if (!node) return;

    while (count < this.#sizeCounter - 1) {
      node = this.#nextNode(node);
      count++;
    }

    node.nextNode = null;
    this.#sizeCounter--;

    if (this.#sizeCounter < 0) this.#sizeCounter = 0;
  }

  //return true if the value contains in the list, otherwise return false
  contains(value) {
    let node = this.#headNode;

    //empty link
    if (this.#headNode == null) return false;

    //check if head node contains the value
    if (node.value == value) return true;

    while (node.value !== value) {
      node = this.#nextNode(node);

      //end condition
      if (!node) return false;

      if (node.value == value) {
        return true;
      }
    }

    return;
  }

  //returns the index of the node containing value, or null if not found
  find(value) {
    let node = this.#headNode;
    let count = 1;

    //empty list
    if (this.#headNode == null) return null;

    if (node.value == value) return count;
    while (node.value !== value) {
      node = this.#nextNode(node);
      count++;

      //end condition
      if (!node) return null;

      if (node.value == value) return count;
    }
  }

  //print all values
  toString() {
    let valueString = "";

    let node = this.#headNode;

    //empty link
    if (node == null) return null;

    //
    while (node.value != null) {
      valueString += `(${node.value})->`;
      node = this.#nextNode(node);

      if (!node) return (valueString += `null`);
    }

    return;
  }

  //inserts a new node with the provided value at the given index
  insertAt(value, index) {
    const newNode = new Node(value);

    let node = this.#headNode;
    let count = 1;

    let temporaryNodeStorage;
    let lastNode;

    //index error
    if (index < 1 || index > this.#sizeCounter + 1) {
      throw new Error(
        `Wrong Index! Index should be 1 to ${this.#sizeCounter + 1}`
      );
    }

    if (index == 1) this.prepend(value);
    else if (index == this.#sizeCounter + 1) this.append(value);
    else {
      while (count !== index) {
        lastNode = node; //2
        node = this.#nextNode(node);
        count++;
      }

      temporaryNodeStorage = node; //100
      console.log(temporaryNodeStorage);
      lastNode.nextNode = newNode;

      newNode.nextNode = temporaryNodeStorage;
      this.#sizeCounter++;
    }
  }

  //remove value at the index
  removeAt(index) {
    let node = this.#headNode;
    let count = 1;

    let nodeBefore;
    let nodeAfter;

    //index error
    if (index < 1 || index > this.#sizeCounter) {
      throw new Error(`Wrong Index! Index should be 1 to ${this.#sizeCounter}`);
    }

    if (index == 1) {
      nodeAfter = node.nextNode;
      this.#headNode = nodeAfter;
      return;
    }

    while (count != index) {
      nodeBefore = node; //2
      node = this.#nextNode(node); //100
      nodeAfter = node.nextNode; // 102
      count++; //2
    }

    nodeBefore.nextNode = nodeAfter;
  }
}

class Node {
  constructor(value = null) {
    (this.value = value), (this.nextNode = null);
  }
}

const newLinkedList = new LinkedList();

newLinkedList.prepend(2); //index 1

newLinkedList.append(100); //index 2

newLinkedList.append(102); // index 3

newLinkedList.insertAt(200, 4);

console.log(newLinkedList.find(201));
console.log(newLinkedList.toString());
console.log(newLinkedList);
