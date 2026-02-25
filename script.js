class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(data) {
        this.root = this._insert(this.root, data);
    }

    _insert(node, data) {
        if (!node) return new Node(data);
        if (data < node.data) node.left = this._insert(node.left, data);
        else if (data > node.data) node.right = this._insert(node.right, data);
        return node;
    }

    search(data) {
        return this._search(this.root, data);
    }

    _search(node, data) {
        if (!node) return false;
        if (data === node.data) return true;
        if (data < node.data) return this._search(node.left, data);
        return this._search(node.right, data);
    }

    inorder(node = this.root, result = []) {
        if (!node) return result;
        this.inorder(node.left, result);
        result.push(node.data);
        this.inorder(node.right, result);
        return result;
    }

    delete(data) {
        this.root = this._delete(this.root, data);
    }

    _delete(node, data) {
        if (!node) return null;

        if (data < node.data) node.left = this._delete(node.left, data);
        else if (data > node.data) node.right = this._delete(node.right, data);
        else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            let minNode = this._findMin(node.right);
            node.data = minNode.data;
            node.right = this._delete(node.right, minNode.data);
        }
        return node;
    }

    _findMin(node) {
        while (node.left) node = node.left;
        return node;
    }
}

let bst = new BST();

function insert() {
    let value = parseInt(document.getElementById("value").value);
    bst.insert(value);
    document.getElementById("output").innerText = "Inserted: " + value;
    drawTree();
}

function deleteNode() {
    let value = parseInt(document.getElementById("value").value);
    bst.delete(value);
    document.getElementById("output").innerText = "Deleted: " + value;
    drawTree();
}

function search() {
    let value = parseInt(document.getElementById("value").value);
    let found = bst.search(value);
    document.getElementById("output").innerText =
        found ? "Found!" : "Not Found!";
}

function inorder() {
    let result = bst.inorder();
    document.getElementById("output").innerText =
        "Inorder: " + result.join(", ");
}

function drawTree() {
    let canvas = document.getElementById("treeCanvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function drawNode(node, x, y, offset) {
    if (!node) return;

    // Draw node circle (BIG)
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();

    // Text style
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.data, x, y);

    // Left child
    if (node.left) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - offset, y + 90);
        ctx.stroke();
        drawNode(node.left, x - offset, y + 90, offset / 2);
    }

    // Right child
    if (node.right) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + offset, y + 90);
        ctx.stroke();
        drawNode(node.right, x + offset, y + 90, offset / 2);
    }
}

    drawNode(bst.root, canvas.width / 2, 50, 200);
}