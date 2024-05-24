/*Create a function fizzBuzz , which outputs numbers from 1 to 100. If number is
multiple of 3 - output Fizz instead the number. If number is multiple of 5 -
output Buzz instead the number. If number is multiple both of 3 and 5 - output
FizzBuzz .*/

const fizzBuzz = () => {
    const mapper = (arr, mod, text) => {
        arr.filter(e => e % mod === 0).forEach(e => arr[arr.indexOf(e)] = text);
    };
    let i = 1;
    const arr = [...Array(100)].map(_ => i++);
    mapper(arr, 15, 'FizzBuzz');
    mapper(arr, 5, 'Buzz');
    mapper(arr, 3, 'Fizz');
    return arr.toString();
}

console.log(fizzBuzz())