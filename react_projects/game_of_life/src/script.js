(function(window) {

	window.gameOfLife = window.gameOfLife || {};

	let cellLifeChecker = window.gameOfLife.cellLifeChecker;

	// Any live cell with < 2 live neighbours dies, as if caused by under-population.
	// Any live cell with 2 || 3 live neighbours lives on to the next generation.
	// Any live cell with > 3 live neighbours dies, as if by over-population.
	// Any dead cell with === 3 live neighbours becomes a live cell, as if by reproduction.

	let Cell = React.createClass({
		handleClick: function(e) {
			this.props.onCellClick(this.props.isAlive);
			console.log('cell (' + this.props.xCoor + ', ' + this.props.yCoor + ') was clicked.');
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
			return {isAlive: false};
		},
		updateCellState: function(isAlive) {
			this.setState({isAlive: !isAlive});
		},
		render: function() {
			let Cells = [];
			let gridWidth = 600; //pixels
			let gridSize = 10; //amount of cells per axis

			let gridStyle = {
				minWidth: gridWidth,
				maxWidth: gridWidth,
			};

			for (let y = 0; y < gridSize; y++) {
				Cells.push([]);
				for (let x = 0; x < gridSize; x++) {
					Cells[y][x] = <Cell 
									key={x +', ' + y} 
									cellSize={gridWidth / gridSize} 
									xCoor={x}
									yCoor={y}
									initialLiveState={false}
									isAlive={this.state.isAlive}
									onCellClick={this.updateCellState}
									/>;
				}
			}

			setTimeout(function() {
				console.log(window.gameOfLife);
				cellLifeChecker(Cells);
			}, 10000);

			return (
				<div id="game-grid" style={gridStyle} >
					{Cells}
				</div>
			);
		}
	});

	let GameBoard = React.createClass({
		render: function() {
			return (
				<div>
					<GameGrid />
				</div>
			);
		}
	});

	ReactDOM.render(
		<GameBoard />,
		document.getElementById('react-app')
	);

})(window);