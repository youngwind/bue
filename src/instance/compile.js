/**
 * Created by youngwind on 16/8/18.
 */

exports._compile = function () {
    this.fragment = document.createDocumentFragment();
    this._compileNode(this.$template);
    this.$el.innerHTML = "";
    this.fragment.childNodes.forEach((child) => {
        this.$el.appendChild(child.cloneNode(true));
    });
};

exports._compileElement = function (node) {
    this.currentNode = document.createElement(node.tagName);
    this.fragment.appendChild(this.currentNode);

    if (node.hasChildNodes()) {
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }
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

    this.currentNode.appendChild(document.createTextNode(nodeValue));
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
