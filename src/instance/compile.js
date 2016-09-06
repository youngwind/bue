/**
 * Created by youngwind on 16/8/18.
 */
import Directive from '../directive';
import textParser from '../parse/text';
import dirParser from '../parse/directive';
import _ from '../util';

exports._compile = function () {
    this._compileNode(this.$el);
};

exports._compileElement = function (node) {
    if (node.hasChildNodes()) {
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }
};

exports._compileTextNode = function (node) {
    let tokens = textParser.parse(node.nodeValue);
    if (!tokens) return;

    tokens.forEach((token) => {
        if (token.tag) {
            // 指令节点
            let value = token.value;
            let el = document.createTextNode('');
            _.before(el, node);
            this._bindDirective('text', value, el);
        } else {
            // 普通文本节点
            let el = document.createTextNode(token.value);
            _.before(el, node);
        }
    });

    _.remove(node);
};

exports._compileNode = function (node) {
    switch (node.nodeType) {
        // text
        case 1:
            this._compileElement(node);
            break;
        // node
        case 3 :
            this._compileTextNode(node);
            break;
        default:
            return;
    }
};

exports._bindDirective = function (name, value, node) {
    let descriptors = dirParser.parse(value);
    let dirs = this._directives;
    descriptors.forEach((descriptor) => {
        dirs.push(
            new Directive(name, node, this, descriptor)
        )
    });
};
