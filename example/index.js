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
        },
        sub_show: true
    },
    computed: {
        info: function () {
            return `计算出来的属性-> 姓名: ${this.user.name}, 年龄: ${this.user.age}`;
        }
    },
    methods: {
        submit: function () {
            console.log('提交');
        }
    }
});

// app.$watch('user.name', function () {
//     console.log('watch住了user.name');
// });


window.app = app;

