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

app.test = function () {
    this.$data.name = 'liangshaofeng';
    this.$data.age = 100;
    this.$data.name = 'liangshaofeng222';
};

window.app = app;

