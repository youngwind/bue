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
                city: "beijing"
            }
        },
        message: ['a', 'b', 'c']
    }
});


app.$watch('name', function (val) {
    console.log('我watch住了name');
    console.log(`新的name为${val}`)
});

window.app = app;

