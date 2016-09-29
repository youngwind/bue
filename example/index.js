/**
 * Created by youngwind on 16/8/18.
 */

import Bue from '../src/index';

var MyComponent = Bue.extend({
    template: '<p>{{message}}</p>'
});

Bue.component('my-component', MyComponent);

const app = new Bue({
    el: '#app',
    data: {
        message: 'hello'
    }
});

window.app = app;

