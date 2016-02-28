(function(window) {

	window.gameOfLife = window.gameOfLife || {};

	let cellLifeChecker = window.gameOfLife.cellLifeChecker;


	let GenerationCount = React.createClass({
		render: function() {
			return (
				<div>
					Generations: {this.props.generationCount}
				</div>
			);
		}
	});

	let UI = React.createClass({

		render: function() {
			return (
				<div>
					cells per side:
					<input type="text" onChange={this.props.onCellNumInput}/>


					<PlayControls onClick={this.props.startGame}/>
				</div>
			);
		}
	});

	let PlayControls = React.createClass({
		handlePlayClick: function(e) {
			console.log('play click');
		},
		handlePauseClick: function() {
			console.log('pause click');
		},
		handleResetClick: function() {
			console.log('reset click');
		},
		render: function() {
			return (
				<div className="btn-group" role="group" aria-label="play-controls">
					<button onClick={this.handlePlayClick} type="button" className="btn btn-secondary">Play</button>
					<button onClick={this.handlePauseClick} type="button" className="btn btn-secondary">Pause</button>
					<button onClick={this.handleResetClick} type="button" className="btn btn-secondary">Reset</button>
				</div>
			);
		}
	});

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
					x: {this.props.xCoor}, 
					y: {this.props.yCoor}
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
		componentDidMount: function() {
			var gridContext = this; // stop this in timer from pointing to global context
			setInterval(function() {
				var updatedCells = cellLifeChecker(gridContext.state.cells, gridContext.props.gridSize);
				gridContext.setState({
					cells: updatedCells
				});
			}, gridContext.props.refreshTime);
		},

		render: function() {
			console.log('Game grid render called');
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

			return (
				<div id="game-grid" style={this.props.gridStyle} >
					{Cells}
				</div>
			);
		}
	});

	let GameBoard = React.createClass({
		handleCellNumInput: function(num) {
			console.log(num);
		},
		render: function() {
			let refreshTime = 200000;
			let gridWidth = 600; //pixels
			let gridSize = 5; //amount of cells per axis
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
					<GenerationCount generationCount={20} />
					<UI onCellNumInput={this.handleCellNumInput}/>
				</div>
			);
		}
	});

	ReactDOM.render(
		<GameBoard />,
		document.getElementById('react-app')
	);

})(window);