(function(){

	var $calcDisplay,
		$numButton, 
		calcMem,
		currNum,
		currOperator
		;

	calcMem = [];
	currNum = '';
	currOperator = null;
	$numButton = $('.num-btn');
	$calcDisplay = $('#calc-display');

	// --------------------- Button Handlers ------------------------------//
	$numButton.on('click', function(event){
		if (calcMem.length > 0) {
			console.log($(event.target).text());
			currNum = $(event.target).text();
			$calcDisplay.text(currNum);
		} else {
			currNum +=  $(event.target).text();
			$calcDisplay.text(currNum);
		}
		
	});

	$('#negate').on('click', function(){
		var n = parseFloat(currNum);
		n < 0 ? currNum = Math.abs(n) : currNum = -Math.abs(n);
		displayVal(currNum);
	});

	$('#percent').on('click', function(){
		var n = parseFloat(currNum);
		currNum = n / 100;
		displayVal(currNum);
	});

	$('#decimal').on('click', function(){
		if ($calcDisplay.text().indexOf('.') < 0) {
			currNum = $calcDisplay.text() + ".";
			displayVal(currNum);
		}
	});

	$('.operator').on('click', function(event){
		//Fix issue if user clicks more than once!


		calcMem.push(parseFloat(currNum)); 	//store previously keyed number in calcMem
		currNum = '';

		if(currOperator){getResult();} 		//if operator already key, calculate and display result
		var operation = event.target.id;
		switch (operation){					//store currOperator
			case 'add': currOperator = add; break;
			case 'subtract': currOperator = subtract; break;
			case 'multiply': currOperator = multiply; break;
			case 'divide': currOperator = divide; break;
		}
		console.log(calcMem);
		// if (calcMem.length > 1) {
		// 	getResult();
		// }
	});

	$('#equals').on('click', function(){
		calcMem.push(parseFloat(currNum));
		getResult();
	});
	$('#all-clear').on('click', function(){clearAll();});

	// --------------------- Operations ------------------------------//

	function add(num1, num2){
		return num1 + num2;
	}
	function subtract(num1, num2){
		return num1 - num2;
	}
	function multiply(num1, num2){
		return num1 * num2;
	}
	function divide(num1, num2){
		return num1 / num2;
	}

	function getResult(){
		var result = calcMem.reduce(currOperator);
		calcMem = [];
		calcMem.push(result);
		displayVal(result);
	}

	function clearAll(){
		currNum = '';
		calcMem = [];
		displayVal(0);
	}

	function displayVal(num){
		$calcDisplay.text(num);
	}
})();