/*Create a function isDeepEqual which gets two parameters (objects or arrays)
and checks if they are equal by value*/

const isDeepEqual = (a, b) => {
    if(a === b) return true;

    if(Array.isArray(a) && Array.isArray(b)){
        if(a.length !== b.length) return false;
        return a.every((el, index) => {
            return isDeepEqual(el, b[index]);
        })
    }

    if(typeof a === "object" && typeof b === "object" && a !== null && b !== null){
        if(Array.isArray(a) || Array.isArray(b)) return false;
        const keys1 = Object.keys(a);
        const keys2 = Object.keys(b);
        if(keys1.length !== keys2.length || !keys1.every(key => keys2.includes(key))) return false;
        for(let key in a) {
            if (!isDeepEqual(a[key], b[key])) { return false; }
        }
        return true;
    }
    return false;
}

const a = { prop1: 1, list: [1, 2, 3], o: { x: 2 } };
const b = { list: [1, 2, 3], o: { x: 2 } };
console.log(isDeepEqual(a, b)); // false
b.prop1 = 1;
console.log(isDeepEqual(a, b)); //true