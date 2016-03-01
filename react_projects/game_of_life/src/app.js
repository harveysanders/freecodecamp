(function(window) {
	window.gameOfLife = window.gameOfLife || {};

	//TODO1:
	// figure out state tree to use size, width in grid creation
	
	// TODO2:
	// get Play/Pause Button to work

	// TODO3:
	// get generationCount to work

	// TODO4: 
	// get size input box to work

	//TODO5:
	//implement time travel

	//TODO6
	//split into modules
	
	//logger helper
	const logDispatch = (action) => {
		console.log('Dispatching ' + action);
		console.log('state: ');
		console.log(store.getState());
		console.log('----------------------');
	};

	var initialState = {
		isPlaying: true,
		refreshTime: 3000,
		grid: {
			gridSize: 6,
			gridWidth: 600,
			cells: [[{'cellSize':120,'xCoor':0,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':0,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':1,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':2,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':3,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':4,'isAlive':false}]]
		}
	};	

	//Reducers
	//each reducer represents their named state

	const grid = (state = initialState.grid, action) => {
		switch (action.type) {
		case 'RESET_GAME': {
			let newCells = [];
			const gridSize = state.gridSize;
			const gridWidth = state.gridWidth;

			for (let y = 0; y < gridSize; y++) {
				newCells.push([]);
				for (let x = 0; x < gridSize; x++) {
					newCells[y][x] = {
						cellSize: gridWidth / gridSize, 
						xCoor: x,
						yCoor: y,
						isAlive: false
					};
				}
			}

			return Object.assign(
				{}, 
				state, 
				{cells: newCells}
			);
		}
		case 'TOGGLE_CELL': 
		case 'INCREMENT_GENERATION' : {
			return Object.assign(
				{},
				state,
				{cells: cells(state.cells, action)}
			);
		}
		default:
			return state;
		}
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
		// let gridSize = 20;
		// let gridWidth = 600;

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
		// case 'RESET_GAME': {
		// 	let cells = [];

		// 	for (let y = 0; y < gridSize; y++) {
		// 		cells.push([]);
		// 		for (let x = 0; x < gridSize; x++) {
		// 			cells[y][x] = {
		// 				cellSize: gridWidth / gridSize, 
		// 				xCoor: x,
		// 				yCoor: y,
		// 				isAlive: false
		// 			};
		// 		}
		// 	}
		// 	return cells;
		// }
		case 'INCREMENT_GENERATION':
			return state.map( (rows, y) => {
				return rows.map( (cell, x) => {
					let liveNeighborCount = countLiveNeighbors(state, x, y);
					let newCell = Object.assign({}, cell);
					if (cell.isAlive) {
						if (liveNeighborCount < 2) {
							newCell.isAlive = false;
							// console.log('neighbors: ' + liveNeighborCount + '. cell (' + x + ', ' + y + ') dies');
							return newCell;

						}else if (liveNeighborCount === 2 || liveNeighborCount === 3) {
							// console.log('neighbors: ' + liveNeighborCount + '. cell (' + x + ', ' + y + ') lives still');
							return newCell;

						}else if (liveNeighborCount > 3) {
							// console.log('neighbors: ' + liveNeighborCount + '. cell (' + x + ', ' + y + ') dies');
							newCell.isAlive = false;
							return newCell;

						}
					} else if (!cell.isAlive && liveNeighborCount === 3) {
						// console.log('neighbors: ' + liveNeighborCount + '. cell (' + x + ', ' + y + ') is born!');
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
		grid: grid,
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

	// console.log('All tests pass.');

	//Redux store
	const { createStore } = Redux;
	const store = createStore(gameOfLife);

	//Keyboard listener
	document.onkeydown = function(event) {
		if (!event)
			event = window.event;
		let code = event.keyCode;
		if (event.charCode && code === 0)
			code = event.charCode;
		switch(code) {
		case 37:
			//left arrow key
			console.log('left key');
			break;
		case 39:
			//right arrow key
			console.log('right key');
			store.dispatch({
				type: 'INCREMENT_GENERATION'
			});
			logDispatch('INCREMENT_GENERATION');
			break;
		}
		event.preventDefault();
	};

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
			({x}, {y})
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
		<div id='game-ui' >
			Generations: {generationCount}
			cells per side:
			<input type="text" onChange={onInput} width='50%'/>
			<PlayControls 
				onPlayClick={
					() => {
						store.dispatch({
							type: 'TOGGLE_PLAY'
						});
						logDispatch('TOGGLE_PLAY');
					}
				}
				onResetClick={
					() => {
						store.dispatch({
							type: 'RESET_GAME'
						});
						logDispatch('RESET_GAME');
					}
				}
			/>
		</div>
	);


	class Game extends Component {
		componentDidMount() {
			// where does this go???
			// setInterval(() => {
			// 	console.log('calculating next generation..');
			// 	store.dispatch({
			// 		type: 'INCREMENT_GENERATION'
			// 	});
			// 	logDispatch('INCREMENT_GENERATION');
			// }, 10000); //get time from state
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
							logDispatch('TOGGLE_CELL');	
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
			<Game cells={store.getState().grid.cells}/>,
			document.getElementById('react-redux')
		);
	};

	store.subscribe(render);
	render();


	//Tests

})(window);