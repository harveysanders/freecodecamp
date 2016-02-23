(function(window){

	window.gameOfLife = window.gameOfLife || {};

	window.gameOfLife.cellLifeChecker = function(cells, gridSize){
		console.log(cells);
		let newCells = [];
		newCells = cells.map(function(rows, y) {
			return rows.map(function(cell, x) {
				console.log(countLiveNeighbors(cells, x, y));
				return cells[y][x].isAlive;
			});
		});
		console.log(newCells);
		return newCells;
	};

	function countLiveNeighbors(cells, x, y) {
		let count = 0;
		let gridSize = cells.length;
		// Check cell on the right.
	    if (x !== gridSize - 1){
	        if (cells[y][x + 1].isAlive){ count++; }
	    }
	 
	    // Check cell on the bottom right.
	    if (x !== gridSize - 1 && y !== gridSize - 1){
	        if (cells[y + 1][x + 1].isAlive){ count++; }
	    }
	 
	    // Check cell on the bottom.
	    if (y !== gridSize - 1){
	        if (cells[y + 1][x].isAlive){ count++; }
	    }
	 
	    // Check cell on the bottom left.
	    if (x !== 0 && y !== gridSize - 1){
	        if (cells[y + 1][x - 1].isAlive){ count++; }
	    }
	 
	    // Check cell on the left.
	    if (x !== 0){
	        if (cells[y][x - 1].isAlive){ count++; }
	    }
	 
	    // Check cell on the top left.
	    if (x !== 0 && y !== 0){
	        if (cells[y - 1][x - 1].isAlive){ count++; }
	    }
	 
	    // Check cell on the top.
	    if (y !== 0){
	        if (cells[y - 1][x].isAlive){ count++; }
	    }
	 
	    // Check cell on the top right.
	    if (x !== gridSize - 1 && y !== 0){
	        if (cells[y - 1][x + 1].isAlive){ count++; }
	    }
	 
	    return count;
	}

})(window);