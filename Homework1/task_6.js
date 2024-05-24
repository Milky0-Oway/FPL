/*Create a function quadraticEquation , which gets koefficients of a quadratic
equation, and returns an array with roots of that equation (if they are exist)*/

const quadraticEquation = (a,b,c) =>{
    let result = [];
    const d = b**2 - 4*a*c;
    if(d === 0){
        result.push(-b/(2*a));
    }
    else if(d > 0){
        result.push((-b - d**0.5)/(2*a));
        result.push((-b + d**0.5)/(2*a))
    }
    return result;
}

console.log(quadraticEquation(1, -8, 72)); // x^2 - 8*x + 72 -> []
console.log(quadraticEquation(1, 12, 36)); // x^2 + 12*x + 36 -> [-6]
console.log(quadraticEquation(1, 6, 1)); // 1*x^2 + 6*x + 1 -> [-0.1715728752538097,-5.82842712474619]