/**
 * Created by youngwind on 16/8/18.
 */

import Bue from '../src/index';

var MyComponent = Bue.extend({
    template: '<div>' +
                '<p>Hello,{{name}}</p>' +
                '<p>{{message}}</p>' +
              '</div>',
    props: {
        name: {},
        message: {}
    }
});

Bue.component('my-component', MyComponent);

const app = new Bue({
    el: '#app',
    data: {
        user: {
            name1: '梁少峰',
            name2: 'youngwind'
        }
    }
});

window.app = app;

