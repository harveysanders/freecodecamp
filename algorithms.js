function add() {
  var args = Array.prototype.slice.call(arguments); 
  var areAllNums = args.map(function(arg){
    return (typeof(arg) !== 'number') ? undefined : arg;
  }).reduce(function(prev, curr){
    return prev === undefined || curr === undefined ? undefined : true;
  }, 0);
  if (areAllNums) {
    if (args.length === 1) {
      return function(num){
        return (typeof(num) === 'number') ? num + args[0] : undefined;
      };
    } else {return args[0] + args[1];} 
  } else {
    return undefined;
  } 
}

function every(collection, pre) {
  // Does everyone have one of these?
  return collection.reduce(function(prevObj, currObj){
    return prevObj && currObj.hasOwnProperty(pre) ? true : false;
  }, collection[0].hasOwnProperty(pre));
}

function binaryAgent(str) {
  var binaries = str.split(' ');
  var characters = binaries.map(function(binary){
    return String.fromCharCode(parseInt(binary, 2));
  });
  return characters.join('');
}

function drop(arr, func) {
  // Drop them elements.
  var i = 1;
  var currArr = arr;
  while (!func(i)){
    currArr.shift();
    i++;
  }

  return currArr;
}

// drop([1, 2, 3, 4], function(n) {return n>= 3;}) should return [3, 4]
// drop([1, 2, 3], function(n) {return n > 0; }) should return [1, 2, 3]
// drop([1, 2, 3, 4], function(n) {return n > 5;}) should return []
// drop([1, 2, 3, 7, 4], function(n) {return n>= 3}) should return [7, 4]



function steamroller(arr) {
  // I'm a steamroller, baby
  var results = [];
  flatten(arr);

  function flatten(array){
    return array.map(function(element){
      return Array.isArray(element) ? flatten(element) : results.push(element);
    });
  }
  return results;
}

function smallestCommons2(arr){
  var min, max, results;
  //get biggest num from array
  arr.sort();
  min = arr[0];
  max = arr[1];

  var multiples = [];
  for (var i = 1; i <= 1000; i++){
    if ((max * i) % (max-1) === 0 ) {multiples.push(max * i);}
  }

  function filterMultiples(multiple, i){
    return multiple % (max - i) === 0;
  }
  results = multiples.filter(filterMultiples).filter(filterMultiples);
  return results;
}

function smallestCommons(arr) {
  var min, max;
  //get biggest num from array
  arr.sort();
  min = arr[0];
  max = arr[1];
 
  function getMultiple(highNum, lowNum, divisor) {
    var currMulitple = highNum;

    var currDivisor; 
    divisor === undefined ? currDivisor = (max - 1) : currDivisor = divisor;

    //if (num % divisible by nextNumInRange?
    if (currDivisor >= lowNum){
        if (currMulitple % currDivisor === 0){
          if (currDivisor === lowNum){return currMulitple;} else {
            //check if num is divisible by num after that
            return getMultiple(currMulitple, lowNum, (currDivisor - 1));
          }
        } else { //if not, add original num to num and try again
            
          return getMultiple((currMulitple + max), lowNum);
        }
    }
  } 
  return getMultiple(max, min);
}
  


function sumPrimes(num) {
  var nums = [2];
  var primes;
  //Make a list of all the integers less than or equal to n (greater than one)
  for (var n = 3; n <= num; n++){
    if (n % 2 !== 0) {nums.push(n);}
  }
  primes = nums;
  //strike out the multiples of all primes less than or equal to the square root of n, 
  var temp = [];
  while (primes[0] <= Math.sqrt(num)){
    temp.push(primes[0]);
    primes = primes.filter(function(primeNum){
      return (primeNum % primes[0] !== 0);
    });
  }
  var sum = temp.concat(primes).filter(function(prime){
    return prime <= num;
  }).reduce(function(prevPrime, currPrime){
    return prevPrime + currPrime;
  });

  return sum;
}

function sumFibs(num) {
  var fibs = [0,1];
  
  for (var n = 2; n <= num; n++){
    fibs[n] = fibs[n - 1] + fibs[n - 2];
  }

  var sum = fibs.filter(function(fib){
    return (fib <= num) && (fib % 2 === 1);
  }).reduce(function(prevOddFib, curOddFib){
    return prevOddFib + curOddFib;
  }, 0);

  return sum;
}

function spinalCase(str) {
  // "It's such a fine line between stupid, and clever."
  // --David St. Hubbins
  var regEx = /([a-z][A-Z]?)\s?_?([A-Z])/g;
  var result = '';
  result = str.replace(regEx, '$1-$2');
  result = result.toLowerCase().replace(' ', '-');

  return result;
}

function convertToHTMLEnt(str) {
  // &colon;&rpar;
 
  var result = str;
  var irregChars = /&|<|>|"|'/g;
  var currMatch;

  // irregChars.lastIndex will change everytime .exec() is run:
  while ((currMatch = irregChars.exec(str)) !== null){ 
    console.log('found match: ' + currMatch[0] + ' at ' + currMatch.index);
    result = result.replace(currMatch[0], charToEntity(currMatch[0]));
    console.log(result);
  }

  function charToEntity(char){
    var entity = '';
    switch (char) {
      case '&':
        entity = '&amp;';
        break;
      case '<':
        entity = '&lt;';
        break;
      case '>':
        entity = '&gt;';
        break;
      case '"':
        entity = '&quot;';
        break;
      case "'":
        entity = '&apos;';
        break;
    }
    return entity;
  }
  return result;
  
}

function unite(arr1, arr2, arr3) {
  var result = [];
  var args = Array.prototype.slice.call(arguments);
  args.forEach(function(array){
    array.forEach(function(element){
      if (result.indexOf(element) === -1){result.push(element);}   
    });
  });

  return result;
}

unite([1, 3, 2], [5, 2, 1, 4], [2, 1]);

function degToCompass(num) {
		var degreeSection = Math.floor((num/22.5) + 0.5);
		var directions = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
		return directions[degreeSection % 16];
}

var flatten = function (array){
  // TODO: Program me
  var flattened = [];
  if (array.length < 2 || !Array.isArray(array[0])) {
  	return array;
  } else {
  	array.forEach(function(innerArray){
      innerArray.forEach(function(element){
        flattened.push(element);
      });
  	});
  }return flattened;
};

function fearNotLetter(str) {
	var workingStr = str;
	while (firstCharCode = workingStr.charCodeAt(0)){
		if (workingStr.charCodeAt(1) - firstCharCode > 1){
			return String.fromCharCode(firstCharCode + 1);
		}
		workingStr = workingStr.substr(1);
	} return undefined; 
}

fearNotLetter('abce');

function pair(str) {
 	var DNAbaseSingles = str.split('');
 	var result = DNAbaseSingles.map(function(base){
 		var basePair = [];
 		switch(base) {
 			case 'A':
 				basePair.push('A', 'T');
 				break;
			case 'T':
				basePair.push('T', 'A');
 				break;
			case 'C':
				basePair.push('C', 'G');
 				break;
 			case 'G':
 				basePair.push('G', 'C');
 				break;	
 		}
 		return basePair;
 	});
	return result;
}

pair("GCG");

function myReplace(str, before, after) {
	var words = str.split(' ');
	var wordIndex = words.indexOf(before);
	if ((words[wordIndex][0]) === (words[wordIndex][0]).toUpperCase()) {
		after = after.charAt(0).toUpperCase() + after.slice(1);
	}
	words.splice(wordIndex, 1, after);
	var result = words.join(' ');
 	console.log(result);
 	return result;
}

// myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");

function translate(str) {
	str = str.toLowerCase();
	var vowels = ['a', 'e', 'i', 'o', 'u'];
	var indicies = [];
	var result = '';

	//get indicies of all found vowels
	vowels.forEach(function(vowel){
		indicies.push(str.indexOf(vowel));
	});
	//find index of first vowel occurence
	var firstVowelIdx = indicies.reduce(function(lowestVal, currVal){
		if (currVal === -1) {
			currVal = 99;
		} return lowestVal < currVal ? lowestVal : currVal; 		
	},999);

	if (firstVowelIdx > -1) {
		var letters = str.split('');
		var cons = letters.splice(0, firstVowelIdx);
		var suffix;
		firstVowelIdx === 0 ? suffix = ['way'] : suffix = ['ay'];
		result = letters.concat(cons, suffix).join('');
	}
	return result;
}

// translate("glove");
function convert(num){
  function numeralToRoman(numeral){
    var romanNum = '';
    switch(numeral){
      case 1000:
        romanNum = 'M';
        break;
      case 900:
        romanNum = 'CM';
        break;
      case 500:
        romanNum = 'D';
        break;
      case 400:
        romanNum = 'CD';
        break;  
      case 100:
        romanNum = 'C';
        break;
      case 90:
        romanNum = 'XC';
        break;
      case 50:
        romanNum = 'L';
        break;
      case 40:
        romanNum = 'XL';
        break;
      case 10:
        romanNum = 'X';
        break;
      case 9:
        romanNum = 'IX';
        break;
      case 5:
        romanNum = 'V';
        break;
      case 4:
        romanNum = 'IV';
        break;  
      case 1:
        romanNum = 'I';
        break;
    }
    return romanNum;
  }

  var numerals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var currNum  = num;
  var romanNumerals = numerals.map(function(numeral){
    // console.log(currNum);
    if (currNum >= numeral) {
      var result = numeralToRoman(numeral).repeat(Math.floor(currNum / numeral));
      currNum = currNum % numeral;  
      return result;
    }
  });
  return romanNumerals.join('');
}

function integerToRomNum(num){
  var result, romNums, thousands, hundreds, tens, ones;
  result = '';
  romNums = ["M", "D", "C", "L", "X", "V", "I"];
  thousands = Math.floor(num/1000);
  hundreds = Math.floor(num/100);
  tens = Math.floor(num/10);
  ones = Math.floor(num/1);

  function getRomanNum(num, placeName){
    var n = num;
    if (Math.floor(n/1000)) {
      result += romNums[0];
      n = n - Math.floor(n/1000) * 1000;
      getRomanNum(n);
    } else if (Math.floor(n/100)) {
      result += romNums[2];
      n = n - Math.floor(n/100) * 100;
      getRomanNum(n);
    } else if (Math.floor(n/10)) {
      result += romNums[4];
      n = n - Math.floor(n/10) * 10;
      getRomanNum(n);
    } else if (Math.floor(n/1)) {
      result += romNums[6];
      n = n - Math.floor(n/1) * 1;
      getRomanNum(n);
    }
  }
  // getRomanNum(num);
  return result;
}

function diff(arr1, arr2) {
  var newArr = [];
  newArr = newArr.concat(arr1);
  arr2.forEach(function(item){
    var itemIdx = newArr.indexOf(item);
    if (itemIdx !== -1){
      newArr.splice(itemIdx, 1);
    } else {
      newArr.push(item);
    }
  });
  return newArr;
}

// diff([1, 2, 3, 5], [1, 2, 3, 4, 5]);


function buildRandomArray(length, max) {
  var result = [];
  for (var i=0; i<length; i++){
    result.push(Math.floor(Math.random() * max+1));
  }
  console.log(result);
  return result;
}

function sumAll(arr) {
  var nums = [];
  var max = Math.max.apply(null, arr);
  var min = Math.min.apply(null, arr);
  for(var i = min; i<=max; i++){
    nums.push(i);
  }
  result = nums.reduce(function(sum, prev){
    return sum + prev;
  });
  return result;
}

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
  if(min > max) {
    var temp = max;
    max = min;
    min = temp; 
  }
  var result = [];
  for (var i = min; i < max + 1; i++) {
    result.push(i);
  }
  return result;
}

// console.log(range(8, 12));  // => [8, 9, 10, 11, 12]




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

// console.log(match([{ first: 'Romeo', last: 'Montague' }, { first: 'Mercutio', last: null }, { first: 'Tybalt', last: 'Capulet' }], { last: 'Capulet' }));


function destroyer(arr) {
  // Remove all the values
  var args = Array.prototype.slice.call(arguments).slice(1,arguments.length);
  return arr.filter(function(element){
  	return args.indexOf(element) === -1;
  });
}

// destroyer([1, 2, 3, 1, 2, 3], 2, 3); // [1,1]

function where(arr, num) {
  // Find my place in this sorted array.
  var filtered = arr.filter(function(element){
  	return element < num;
  });
  return filtered.length;
}

// where([20, 30, 40, 60, 70, 77], 50); //should be 1

