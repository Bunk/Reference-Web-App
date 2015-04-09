'use strict';

var Person = {
    firstName : 'Fred',
    sayName : function() {
        console.log('Hello, my name is ' + this.firstName);
    }
};

Person.sayName();
