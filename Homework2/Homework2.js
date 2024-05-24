/*1) write custom realization of method bind in javascript:
function bind(fn, context, args) {
//...
}
const foo = () => {};
const context = {}; // any context, object, array, etc.
const data = []; // any object, array, etc.
const bindedFunction = bind(foo, context, data);*/

function bind(fn, context, ...args){
    return function (...fnArgs) {
        return fn.apply(context, [...args, ...fnArgs]);
    }
}

const foo = () => {};
const context = {}; // any context, object, array, etc.
const data = []; // any object, array, etc.
const bindedFunction = bind(foo, context, data);



/*2) create an object with a magic property, and when any value is assigned
to that property, current date will be output and value should be stored
in the additional property counter. But if we read that property from the
object, additional property counter will be incremented and output*/

let o = {
    _cnt: 0,
    get magicProperty(){
        this._cnt++;
        return this._cnt;
    },
    set magicProperty(value){
        this._cnt = value;
        console.log(new Date());
    }
}

o.magicProperty = 5; // 'Sat Mar 24 2018 13:48:47 GMT+0300 (+03) -- 5'
console.log(o.magicProperty); // 6
console.log(o.magicProperty); // 7
console.log(o.magicProperty); // 8



/*3) create a function-calculator which accepts two numbers and sign
for calculation, but the signatuir of the function should looks like that:
calc(1, 2)('+'); // 3
calc(1, 2)('/'); // 0.5*/

function calc(a, b){
    return function (operator){
        switch(operator){
            case '+':
                return a+b;
            case '-':
                return a-b;
            case '/':
                return a/b;
            case '*':
                return a*b;
            default:
                throw new Error('Invalid operator');
        }

    }
}

console.log(calc(1, 2)('+'));
console.log(calc(1, 2)('/'));



/*4) create a function curry, which accepts any function with mathematical
logic and the exact amout of arguments for further calls as it was declared
in that function*/

function curry(fn){
    let args = [];
    const len = fn.length;
    const acc = (arg) => {
        args.push(arg);
        if(args.length < len) return acc;
        return fn(...args);
    };
    return acc;
}

function sum2(x, y) { // 2 parameters
    return x + y;
}
function sum4(a, b, c, d) { // 4 parameters
    return a + b + c + d;
}
console.log(curry(sum2)(1)(2)); // 2 calls, after first wrapping call, returns 3
console.log(curry(sum4)(2)(3)(4)(5)); // 4 calls, after first wrapping call, returns 14



/*5) create a function, which can not be used as a constructor (can not be
called with operator new)
*/

function cantConstructor(){
    if(new.target){
        throw "You can't use it as a constructor!";
    }
    console.log("Everything is okay!");
}

//new cantConstructor();



/*6) create a function sleep(seconds)*/

function sleep(seconds){
    let start = new Date().getTime();
    while(new Date().getTime() < start + seconds*1000);
}

console.log(new Date()); // Sun Oct 08 2017 10:44:34 GMT+0300 (+03)
sleep(9);
console.log(new Date()); // Sun Oct 08 2017 10:44:43 GMT+0300 (+03)*/



/*7) Create a function getCounter*/
function getCounter(value) {
    return {
        _c: value,
        reset: function() {
            this._c = 0;
            return this;
        },
        add: function(val) {
            this._c += val;
            return this;
        },
        log: function() {
            console.log(this._c);
            return this;
        }
    }
}

let c = getCounter(5);
c
    .log() // 5 <- should outputs the result
    .add(4) // <- shoild add some value to the result
    .log() // 9
    .add(3)
    .log() // 12
    .reset() // <- resets the result
    .log() // 0
    .add(8)
    .log(); // 8