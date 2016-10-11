/**
 * Created by youngwind on 16/10/3.
 */

import _ from '../util';
import Directive from '../directive';
import {compileGetter} from '../parse/expression';

/**
 * 解析props参数, 包括动态属性和静态属性
 * @param el {Element} 组件节点,比如: <my-component b-bind:name="user.name" message="hello"></my-component>
 * @param propOptions {Object} Vue.extend的时候传进来的prop对象参数, 形如 {name:{}, message:{}}
 * @returns {Array} 解析之后的props数组,
 * 形如: [
 *          {
 *              "name":"name",     // 组件属性名
 *              "options":{},      // 原先Vue.extend传过来的属性对应的参数, 暂时未空, 之后会放一些参数校验之类的
 *              "raw":"user.name", // 属性对应的值
 *              "dynamic":true,    // true代表是动态属性,也就是从父实例/组件那里获取值
 *              "parentPath":"user.name"   // 属性值在父实例/组件中的路径
 *          },
 *          {
 *              "name":"message",
 *              "options":{},
 *              "raw":"How are you?"
 *          }
 *     ]
 */
exports.compileProps = function (el, propOptions) {
    let names = Object.keys(propOptions);
    let props = [];
    names.forEach((name) => {
        let options = propOptions[name] || {};
        let prop = {
            name,
            options,
            raw: null
        };

        let value;

        if ((value = _.getBindAttr(el, name))) {
            // 动态props
            prop.raw = value;
            prop.dynamic = true;
            prop.parentPath = value;
        } else if ((value = _.getAttr(el, name))) {
            // 静态props
            prop.raw = value;
        }
        props.push(prop);
    });
    return props;
};

/**
 * 应用属性到vm实例上
 * 如果是动态属性, 需要额外走Directive、Watcher那一套流程
 * 因为只有这样,当父实例/组件的属性发生变化时,才能将变化传导到子组件
 * @param props {Array} 解析之后的props数组
 */
exports.applyProps = function (props) {
    props.forEach((prop) => {
        if (prop.dynamic) {
            // 动态props
            let dirs = this.$parent._directives;
            dirs.push(
                new Directive('prop', null, this, {
                    expression: prop.raw,  // prop对应的父实例/组件的哪个数据, 如:user.name
                    arg: prop.name          // prop在当前组件中的属性键值, 如:name
                })
            );
        } else {
            this.initProp(prop.name, prop.raw, prop.dynamic);
        }
    });
};

/**
 * 将prop设置到当前组件实例的$data中去, 这样一会儿initData的时候才能监听到这些数据
 * 如果是动态属性, 还需要跑到父实例/组件那里去取值
 * @param path {String} 组件prop键值，如"name"
 * @param val {String} 组件prop值，如果是静态prop，那么直接是"How are you"这种。
                        如果是动态prop，那么是"user.name"这种，需要从父实例那里去获取实际值
 * @param dynamic {Boolean} true代表是动态prop， false代表是静态prop
 */
exports.initProp = function (path, val, dynamic) {
    if (!dynamic) {
        // 静态prop
        this.$data[path] = val;
    } else {
        // 动态prop
        this.$data[path] = compileGetter(val)(this.$parent.$data);
    }
};
