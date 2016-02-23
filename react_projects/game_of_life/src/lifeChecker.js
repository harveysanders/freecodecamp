(function(window){

	    // Any live cell with < 2 live neighbours dies, as if caused by under-population.
		// Any live cell with 2 || 3 live neighbours lives on to the next generation.
		// Any live cell with > 3 live neighbours dies, as if by over-population.
		// Any dead cell with === 3 live neighbours becomes a live cell, as if by reproduction.

	window.gameOfLife = window.gameOfLife || {};

	window.gameOfLife.cellLifeChecker = function(cells, gridSize){
		console.log('cellLifeChecker called');
		console.log('OG cells:');
		console.log(cells);
		let newCells = [];
		newCells = cells.map(function(rows, y) {
			return rows.map(function(cell, x) {
				var liveNeighborCount = countLiveNeighbors(cells, x, y);
				if (cell.isAlive) {
					if (liveNeighborCount < 2) {
						let newCell = cell;

						console.log('neighbors: ' + liveNeighborCount + '. cell (' + x + ', ' + y + ') dies');
						newCell.isAlive = false;
						return newCell;

					} else if (liveNeighborCount === 2 || liveNeighborCount === 3) {
						let newCell = cell;

						console.log('neighbors: ' + liveNeighborCount + '. cell (' + x + ', ' + y + ') lives still');
						return newCell;

					} else if (liveNeighborCount > 3) {
						let newCell = cell;

						console.log('neighbors: ' + liveNeighborCount + '. cell (' + x + ', ' + y + ') dies');
						newCell.isAlive = false;
						return newCell;

					}
				} else if (!cell.isAlive && liveNeighborCount === 3) {
					let newCell = cell;

					console.log('neighbors: ' + liveNeighborCount + '. cell (' + x + ', ' + y + ') is born!');
					newCell.isAlive = true;
					return newCell;

				} else {
					return cell;
				}
			});
		});
		console.log('newCells:'); 
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