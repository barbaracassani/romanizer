// n.b. needs a modern browser that supports Object.keys

(function(namespace, factory) {

    'use strict';

    if (typeof exports !== 'undefined') {

        exports.romanizer = factory();

    } else if (typeof define === 'function' && define.amd) {

        // Require.js
        define('romanizer', [], function() {
            return factory();
        });

    } else {

        namespace.romanizer = factory();

    }

}(this, function() {

    return function (num) {
        var list = [
            {'I' : 1 },
            {'IV' : 4},
            {'V' : 5},
            {'IX' : 9},
            {'X' : 10},
            {'XL' : 40},
            {'L' : 50},
            {'XC' : 90},
            {'C' : 100},
            {'CD' : 400},
            {'D' : 500},
            {'CM' : 900},
            {'M' : 1000}
        ];

        var iterator = list.length - 1;
        var str = '';

        function romanize(num) {

            var objKey = Object.keys(list[iterator]);
            var value = list[iterator][objKey];

            if (num  >= value) {
                str += objKey;
                num -= value;
            }
            if (num < value) {
                iterator--;
            }
            if (iterator > -1 && num > 0) {
                return romanize(num)
            }
            return str;
        }


        return (num < 1 || num > 3999) ? 'Sorry! Number out of range' : romanize(num);
    }
}));


console.assert(romanizer(-4) === 'Sorry! Number out of range');
console.assert(romanizer(18) === 'XVIII');
console.assert(romanizer(184) === 'CLXXXIV');
console.assert(romanizer(2833) === 'MMDCCCXXXIII');
console.assert(romanizer(50000) === 'Sorry! Number out of range');