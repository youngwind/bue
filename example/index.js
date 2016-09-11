/**
 * Created by youngwind on 16/8/18.
 */

import Bue from '../src/index';

const app = new Bue({
    el: '#app',
    data: {
        show: true,
        user: {
            name: 'youngwind',
            age: 24
        }
    },
    computed: {
        info: function () {
            return `计算出来的属性-> 姓名: ${this.user.name}, 年龄: ${this.user.age}`;
        }
    }
});

// app.$watch('user.name', function () {
//     console.log('watch住了user.name');
// });

app.test = function () {
    this.$data.user.name = 'liangshaofeng';
    this.$data.user.age = 100;
    this.$data.user.name = 'liangshaofeng222';
};

app.test2 = function () {
    this.$data.user.name = 'hahha';
    this.$data.user.age = 200;
    this.$data.user.name = 'blabla';
};

window.app = app;

