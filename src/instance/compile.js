/**
 * Created by youngwind on 16/8/18.
 */

let fragment, currentNodeList = [];

exports._compile = function () {
    fragment = document.createDocumentFragment();

    // 用一个栈来存储遍历过程中当前的父节点
    currentNodeList.push(fragment);

    this._compileNode(this.$template);

    this.$el.parentNode.replaceChild(fragment, this.$el);
    this.$el = document.querySelector(this.$options.el);
};

exports._compileElement = function (node) {
    let newNode = document.createElement(node.tagName);

    // 处理节点属性
    if (node.hasAttributes()) {
        let attrs = node.attributes;
        Array.from(attrs).forEach((attr) => {
            newNode.setAttribute(attr.name, attr.value);
        });
    }


    let currentNode = currentNodeList[currentNodeList.length - 1].appendChild(newNode);

    if (node.hasChildNodes()) {
        currentNodeList.push(currentNode);
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }

    currentNodeList.pop();
};

exports._compileText = function (node) {
    let nodeValue = node.nodeValue;

    if (nodeValue === '') return;

    let patt = /{{\w+}}/g;
    let ret = nodeValue.match(patt);

    if (!ret) return;

    ret.forEach((value) => {
        let property = value.replace(/[{}]/g, '');
        nodeValue = nodeValue.replace(value, this.$data[property]);
    }, this);

    currentNodeList[currentNodeList.length - 1].appendChild(document.createTextNode(nodeValue));
};

exports._compileNode = function (node) {
    switch (node.nodeType) {
        // text
        case 1:
            this._compileElement(node);
            break;
        // node
        case 3 :
            this._compileText(node);
            break;
        default:
            return;
    }
};
