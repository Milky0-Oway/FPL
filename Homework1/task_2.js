/*Create a function isPalindrom , which gets a string as a parameter and returns
true or false as the result of checking if string is a palindrome or not
(reads the same from left to right and from right to left)*/

function isPalindrom(text){
    text = text.toLowerCase();
    for(let i = 0; i < text.length/2; i++){
        if(text[i] !== text[text.length-i-1]){
            return false;
        }
    }
    return true;
}

console.log(isPalindrom("bbdshbv"));
console.log(isPalindrom("aba"));
console.log(isPalindrom("Aba"));