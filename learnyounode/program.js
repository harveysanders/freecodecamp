var sum = 0;
var array = process.argv;

for (var i = 2; i < array.length; i++) {
	sum += +array[i];
	//console.log('sum is ' + sum + '. current array num is ' + array[i]);
}
	
console.log(sum);