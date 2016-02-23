(function(window) {

	window.gameOfLife = window.gameOfLife || {};

	let cellLifeChecker = window.gameOfLife.cellLifeChecker;

	// Any live cell with < 2 live neighbours dies, as if caused by under-population.
	// Any live cell with 2 || 3 live neighbours lives on to the next generation.
	// Any live cell with > 3 live neighbours dies, as if by over-population.
	// Any dead cell with === 3 live neighbours becomes a live cell, as if by reproduction.

	let Cell = React.createClass({
		handleClick: function() {
			// console.log('cell (' + this.props.xCoor + ', ' + this.props.yCoor + ') was clicked.');
			this.props.onClick(
				this.props.xCoor,
				this.props.yCoor,
				this.props.isAlive
			);		
		},
		shouldComponentUpdate: function(nextProps, nextState) {
			return this.props.isAlive !== nextProps.isAlive;
		},
		render: function() {
			const aliveColor = '#059BF3';
			const deadColor = '#FFF';
			let currColor = this.props.isAlive ? aliveColor : deadColor;
			let cellStyle= {
				backgroundColor: currColor,
				width: this.props.cellSize,
				height: this.props.cellSize
			};
			return (
				<div 
					onClick={this.handleClick}
					className="cell"
					style={cellStyle} >
				</div>
			);
		}
	});

	let GameGrid = React.createClass({
		getInitialState: function() {
			let cells = [];

			for (let y = 0; y < this.props.gridSize; y++) {
				cells.push([]);
				for (let x = 0; x < this.props.gridSize; x++) {
					cells[y][x] = {
							cellSize: this.props.gridWidth / this.props.gridSize, 
							xCoor: x,
							yCoor: y,
							isAlive: false
						};
				}
			}
			return {cells: cells};
		},
		updateCellState: function(x, y, isAlive) {
			let cells = this.state.cells;
			cells[y][x].isAlive = !isAlive;
			this.setState({cells: cells});
		},

		render: function() {
			var Cells = this.state.cells.map(function(row) {
				return row.map(function(cell) {
					var boundUpdate = this.updateCellState;
					return (
						<Cell
							key={cell.xCoor + ', ' + cell.yCoor} 
							cellSize={cell.cellSize} 
							xCoor={cell.xCoor}
							yCoor={cell.yCoor}
							isAlive={cell.isAlive}
							onClick={boundUpdate}
						/>
					);	
				}, this);	
			}, this);

			var gridContext = this; // stop this in timer from pointing to global context

			setTimeout(function() {
				console.log(gridContext);
				cellLifeChecker(gridContext.state.cells, gridContext.props.gridSize);
			}, gridContext.props.refreshTime);

			return (
				<div id="game-grid" style={this.props.gridStyle} >
					{Cells}
				</div>
			);
		}
	});

	let GameBoard = React.createClass({
		render: function() {
			let refreshTime = 10000;
			let gridWidth = 600; //pixels
			let gridSize = 4; //amount of cells per axis
			let gridStyle = {
				minWidth: gridWidth,
				maxWidth: gridWidth,
			};

			return (
				<div>
					<GameGrid 
						refreshTime={refreshTime}
						gridSize={gridSize}
						gridWidth={gridWidth}
						gridStyle={gridStyle}
					/>
				</div>
			);
		}
	});

	ReactDOM.render(
		<GameBoard />,
		document.getElementById('react-app')
	);

})(window);