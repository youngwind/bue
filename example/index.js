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

