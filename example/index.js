/**
 * Created by youngwind on 16/8/18.
 */

import Bue from '../src/index';

const app = new Bue({
    el: '#app',
    data: {
        name: 'youngwind',
        age: 24,
        address: {
            info: {
                city: 'beijing'
            }
        },
        message: ['a', 'b', {
            name: 'liangshaofeng',
            age: 24
        }],
        user: {
            name: 'youngwind',
            age: 24
        }
    }
});

app.$watch('user.name', function () {
    console.log('watch住了user.name');
});

app.test = function () {
    this.$data.user.name = "liangshaofengliangshaofengliangshaofengliangshaofengliangshaofengliangshaofeng\n";
    this.$data.user.age = 100;
    this.$data.user.name = "liangshaofeng222";
};

app.test2 = function () {
    var demo = document.querySelector('#demo');
    console.log(demo.childNodes[0].nodeValue);  // demo 初始值
    demo.childNodes[0].nodeValue = 'hahahhahha';
    console.log(demo.childNodes[0].nodeValue); // hahahhahha
    demo.childNodes[0].nodeValue = 'balbla';
};

window.app = app;

