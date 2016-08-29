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
        }]
    }
});

app.$watch('name', function (val) {
    console.log('我watch住了name');
    console.log(`新的name为${val}`);
});

app.$watch('address.info.city', function (val) {
    console.log('我watch住了city');
    console.log(`新的city为${val}`);
});

window.app = app;

