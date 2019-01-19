var calculator=require('./scripts/calc');
var greeter=require('./scripts/greet');

var css=require('./css/mystyle.css');

function doSomething(){
    console.log("Example function returns");
    console.log("Examssssss");
}

doSomething();
console.log(calculator.add(2,5));
console.log(calculator.subtract(10,3));

greeter.greeting('rajvi')