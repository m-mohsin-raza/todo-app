console.log("Hello world!")
x = 5;
y = 6;
z = x + y;
const a = 1;
var sum = 1;
console.log(z)
console.log(sum+1)
console.log(sum+a)
console.log(sum=sum+1)
console.log(sum+z)
console.log(sum+y)
sum=sum+y;
sum=sum-3;
console.log("Sum is: " + sum)
console.log(sum*2)
console.log(sum/3)

console.log("Here are further actions performed")

// Function or just use of querySelector
// const formChanges = document.querySelector("#heading");
// const button = document.querySelector("#changeText");

// button.addEventListener('click',function(){
//     formChanges.textContent= 'Text Changed';
// })

function mySum(num1,num2){
    return num1 + num2;
}
console.log("Sum Using a Function: " + mySum(5,6));
console.log("Sum Using a Function: " + mySum(z,6));
console.log("Sum Using a Function: " + mySum(x,6));
console.log("Sum Using a Function: " + mySum(a,6));

const fruits = ['apple','mango','banana','grapes']
console.log(fruits[0]);
// method 1 for loop in array
fruits.forEach((item,index)=>{
    console.log(`${index}: ${item}`);
})
// method 2 for loop in array
 for(const fruit of fruits){
    console.log(fruit);
 }


// console.log(5==5)
// console.log(5==0'5') // this will not check the type & will only check the value
// console.log(5===5)
// console.log(5==='5') // this will check the type also
