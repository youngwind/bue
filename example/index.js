/**
 * Created by youngwind on 16/8/18.
 */

import Bue from '../src/index';

var child = Bue.extend({
    template: '#child-template',
    data: {
        name: '',
        age: ''
    },
    methods: {
        dispatchName: function () {
            this.$dispatch('child-name', this.name);
        },
        broadcastName: function () {
            this.$broadcast('parent-name', this.name);
        }
    },
    events: {
        'child-name': function (name) {
            this.name = name;
            return true;
        },
        'child-age': function (age) {
            this.age = age;
        },
        'parent-name': function (name) {
            this.name = name;
            return true;
        },
        'parent-age': function (age) {
            this.age = age;
        }
    }
});

Bue.component('child', child);

var recursiveChild = Bue.extend({
    template: '#recursive-child-template',
    data: {
        name: '',
        age: ''
    },
    methods: {
        dispatchName: function () {
            this.$dispatch('child-name', this.name);
        },
        dispatchAge: function () {
            this.$dispatch('child-age', this.age);
        }
    },
    events: {
        'parent-name': function (name) {
            this.name = name;
        },
        'parent-age': function (age) {
            this.age = age;
        }
    }
});

Bue.component('recursive-child', recursiveChild);

const app = new Bue({
    el: '#app',
    data: {
        name: '',
        age: ''
    },
    events: {
        'child-name': function (name) {
            this.name = name;
        },
        'child-age': function (age) {
            this.age = age;
        }
    },
    methods: {
        broadcastName: function () {
            this.$broadcast('parent-name', this.name);
        },
        broadcastAge: function () {
            this.$broadcast('parent-age', this.age);
        }
    }
});

window.app = app;

