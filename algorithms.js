function reduce(collection, combine, start){
  var combined = start;
  collection.forEach(function(value){
    combined = combine(combined, value);
  });
  return combined;
}


function formatNumWithCommas(float){
  var str = float.toString();
  var decimalPos = (str.indexOf('.') - str.length+1);
  var integerLength = -(str.length) - decimalPos + 1;
  var formatedStrs = [];
  for (var i=decimalPos; i > -(str.length); i--) {
    console.log('i: ' + i);
    if ((i + decimalPos) % 3 === 0) {
      formatedStrs.push(str.slice(i, (i + decimalPos)));
    }
  }
  console.log('decimalPos: ' + decimalPos);
  console.log('integerLength: ' + integerLength);
  return formatedStrs.join(',');
}
function changePropName(object, oldKey, newKey) {
  for (var key in object) {
    object[newKey] = object[key];
  }
  return object;
}

function factorial(n){
  var nums = [];
  for(var i=1; i<=n; i++) {
    nums.push(i);
  }
  return nums.reduce(function(total, factor) {
    return total * factor;
  },1);
}

function range (min, max) {
  // body...
  var result = [];
  for (var i = min; i < max + 1; i++) {
    result.push(i);
  }
  return result;
}

console.log(range(8, 12));  // => [8, 9, 10, 11, 12]




function match(collection, source) {
  var arr = collection.filter(function(object){
    for (var key in object) {
      if (source.hasOwnProperty(key)){
        return object[key] === source[key];
      }
    }
  });
  // What's in a name?
  return arr;
}

console.log(match([{ first: 'Romeo', last: 'Montague' }, { first: 'Mercutio', last: null }, { first: 'Tybalt', last: 'Capulet' }], { last: 'Capulet' }));


function destroyer(arr) {
  // Remove all the values
  var args = Array.prototype.slice.call(arguments).slice(1,arguments.length);
  return arr.filter(function(element){
  	return args.indexOf(element) === -1;
  });
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3); // [1,1]

function where(arr, num) {
  // Find my place in this sorted array.
  var filtered = arr.filter(function(element){
  	return element < num;
  });
  return filtered.length;
}

where([20, 30, 40, 60, 70, 77], 50); //should be 1
