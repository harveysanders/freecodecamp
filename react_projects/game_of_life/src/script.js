(function() {

	// Any live cell with < 2 live neighbours dies, as if caused by under-population.
	// Any live cell with 2 || 3 live neighbours lives on to the next generation.
	// Any live cell with > 3 live neighbours dies, as if by over-population.
	// Any dead cell with === 3 live neighbours becomes a live cell, as if by reproduction.

	var Cell = React.createClass({
		getInitialState: function() {
			return {isAlive: false};
		},
		handleClick: function(e) {
			console.log('cell #' + this.props.num +  'was clicked.');
			this.setState({isAlive: true});
		},
		position: null,
		render: function() {
			var aliveColor = '#059BF3';
			var deadColor = '#FFF'
			var currColor = this.state.isAlive ? aliveColor : deadColor;
			var cellStyle= {
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

	var GameGrid = React.createClass({
		render: function() {
			var Cells = [];
			var gridWidth = 600;
			var gridSize = 30;

			var gridStyle = {
				minWidth: gridWidth,
				maxWidth: gridWidth,
			};

			for (var y = 0; y < gridSize; y++) {
				Cells.push([]);
				for (var x = 0; x < gridSize; x++) {
					Cells[y][x] = <Cell 
						key={x +', ' + y} 
						cellSize={gridWidth / gridSize} 
						xCoor={x}
						yCoor={y}/>;
				}
			}
			return (
				<div id="game-grid" style={gridStyle} >
					{Cells}
				</div>
			);
		}
	});

	var GameBoard = React.createClass({
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

})();