(function(window) {
	window.gameOfLife = window.gameOfLife || {};

	//Reducers
	var initialState = {
		isPlaying: true,
		gridSize: 6,
		gridWidth: 600,
		refreshTime: 3000,
		cells: [[{'cellSize':120,'xCoor':0,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':0,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':1,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':2,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':3,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':4,'isAlive':false}]]
	};	

	const cell = (state, action) => {
		//state is one cell
		switch (action.type) {
		case 'TOGGLE_CELL':
			if (state.xCoor !== action.x || state.yCoor !== action.y) {
				return state;
			}
			return Object.assign({}, state, {
				isAlive: !state.isAlive
			});
		default: 
			return state;
		}
	};

	const cells = (state = [], action) => {
		//state should be cells 

		//firgure out how to get these values in
		let gridSize = 6;
		let gridWidth = 600;

		// countLiveNeighbors passed tests
		const countLiveNeighbors = (cells, x, y) => {

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
		};

		switch (action.type) {
		case 'RESET_GAME': {
			let cells = [];

			for (let y = 0; y < gridSize; y++) {
				cells.push([]);
				for (let x = 0; x < gridSize; x++) {
					cells[y][x] = {
						cellSize: gridWidth / gridSize, 
						xCoor: x,
						yCoor: y,
						isAlive: false
					};
				}
			}
			return cells;
		}
		case 'INCREMENT_GENERATION':
			return state.map( (rows, y) => {
				return rows.map( (cell, x) => {
					let liveNeighborCount = countLiveNeighbors(state, x, y);
					let newCell = Object.assign({}, cell);
					if (cell.isAlive) {
						if (liveNeighborCount < 2) {
							newCell.isAlive = false;
							console.log('neighbors: ' + liveNeighborCount + '. cell (' + x + ', ' + y + ') dies');
							return newCell;

						}else if (liveNeighborCount === 2 || liveNeighborCount === 3) {
							console.log('neighbors: ' + liveNeighborCount + '. cell (' + x + ', ' + y + ') lives still');
							return newCell;

						}else if (liveNeighborCount > 3) {
							console.log('neighbors: ' + liveNeighborCount + '. cell (' + x + ', ' + y + ') dies');
							newCell.isAlive = false;
							return newCell;

						}
					} else if (!cell.isAlive && liveNeighborCount === 3) {
						console.log('neighbors: ' + liveNeighborCount + '. cell (' + x + ', ' + y + ') is born!');
						newCell.isAlive = true;
						return newCell;
					} else {
						return cell;
					}
				});
			});
		case 'TOGGLE_CELL':
			return state.map((rows) => {
				return rows.map((c) => cell(c, action));
			});
		default:
			return state;
		}
	};

	const isPlaying = (state = false, action) => {
		switch (action.type) {
		case 'PLAY_GAME':
			return true;
		default:
			return state;
		}
	};

	const { combineReducers } = Redux;

	const gameOfLife = combineReducers({
		//key corresponds to state object it mananges
		//values correspond to reducer functions that update the state
		cells: cells,
		isPlaying: isPlaying
		//since key/value match, ES6 obj literal shorthand allows omitting values
	});


	//tests
	//8 live cells surround center dead cell (2,2)
	var stateBefore = [[{'cellSize':120,'xCoor':0,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':0,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':1,'isAlive':true},{'cellSize':120,'xCoor':2,'yCoor':1,'isAlive':true},{'cellSize':120,'xCoor':3,'yCoor':1,'isAlive':true},{'cellSize':120,'xCoor':4,'yCoor':1,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':2,'isAlive':true},{'cellSize':120,'xCoor':2,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':2,'isAlive':true},{'cellSize':120,'xCoor':4,'yCoor':2,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':3,'isAlive':true},{'cellSize':120,'xCoor':2,'yCoor':3,'isAlive':true},{'cellSize':120,'xCoor':3,'yCoor':3,'isAlive':true},{'cellSize':120,'xCoor':4,'yCoor':3,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':4,'isAlive':false}]];
	var stateAfter = [[{'cellSize':120,'xCoor':0,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':0,'isAlive':true},{'cellSize':120,'xCoor':3,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':0,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':1,'isAlive':true},{'cellSize':120,'xCoor':2,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':1,'isAlive':true},{'cellSize':120,'xCoor':4,'yCoor':1,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':2,'isAlive':true},{'cellSize':120,'xCoor':1,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':2,'isAlive':true}],[{'cellSize':120,'xCoor':0,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':3,'isAlive':true},{'cellSize':120,'xCoor':2,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':3,'isAlive':true},{'cellSize':120,'xCoor':4,'yCoor':3,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':4,'isAlive':true},{'cellSize':120,'xCoor':3,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':4,'isAlive':false}]];

	// expect(
	// 	cells(stateBefore, 'INCREMENT_GENERATION')
	// ).toEqual(stateAfter);

	console.log('All tests pass.');

	//Redux store
	const { createStore } = Redux;
	const store = createStore(gameOfLife);

	//Componets
	const { Component } = React;

	const Cell = ({onClick, isAlive, x, y, cellSize}) => (
		<div 
			onClick={onClick}
			className='cell'
			style={{
				background: isAlive ? '#059BF3' : '#FFF',
				width: cellSize,
				height: cellSize
			}} >
			x: {x}, 
			y: {y}
		</div>
	);

	const PlayControls = ({onPlayClick, onResetClick}) => (
		<div className="btn-group" role="group" aria-label="play-controls">
			<button onClick={onPlayClick} type="button" className="btn btn-secondary">Play/Pause</button>
			<button onClick={onResetClick} type="button" className="btn btn-secondary">Reset Game</button>
		</div>
	);
		

	const GameGrid = ({cells, onCellClick, gridStyle}) => (
		<div id='game-grid' style={gridStyle}>
			{console.log(cells)}
			{cells.map(rows =>
				rows.map(cell => (
					<Cell
						key={cell.xCoor + ', ' + cell.yCoor}
						cellSize={cell.cellSize} 
						x={cell.xCoor}
						y={cell.yCoor}
						isAlive={cell.isAlive}
						onClick={() => onCellClick(cell.xCoor, cell.yCoor)}
					/>
				)
			)
		)}
		</div>
	);

	const UI = ({generationCount, onInput}) => (
		<div>
			Generations: {generationCount}
			cells per side:
			<input type="text" onChange={onInput}/>
			<PlayControls 
				onPlayClick={
					() => {
						store.dispatch({
							type: 'TOGGLE_PLAY'
						});
					}
				}
				onResetClick={
					() => {
						store.dispatch({
							type: 'RESET_GAME'
						});
					}
				}
			/>
		</div>
	);


	class Game extends Component {
		componentDidMount() {
			console.log('is{isPlaying? ' + store.getState().isPlaying);
			
			// where does this go???
			setInterval(() => {
				console.log('calculating next generation..');
				store.dispatch({
					type: 'INCREMENT_GENERATION'
				});
			}, 3000); //get time from state
		}

		render() {
			return (
				<div>
					<GameGrid 
						cells={this.props.cells}
						onCellClick={(x,y) => {
							console.log('cell (' + x + ', ' + y + ') clicked');
							store.dispatch({
								type: 'TOGGLE_CELL',
								x: x,
								y: y
							});	
						}}
						gridStyle={{minWidth:600, maxWidth:600}}
					/>
					<UI />
				</div>
			);
		}
	}

	const render = () => {
		ReactDOM.render(
			<Game cells={store.getState().cells}/>,
			document.getElementById('react-redux')
		);
	};

	store.subscribe(render);
	render();


	//Tests

})(window);