(function(window) {
	window.gameOfLife = window.gameOfLife || {};

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
		refreshTime: 200,
		grid: {
			gridSize: 25,
			gridWidth: 600,
			cells: [[{'cellSize':120,'xCoor':0,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':0,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':0,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':1,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':1,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':2,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':2,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':3,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':3,'isAlive':false}],[{'cellSize':120,'xCoor':0,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':1,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':2,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':3,'yCoor':4,'isAlive':false},{'cellSize':120,'xCoor':4,'yCoor':4,'isAlive':false}]]
		},
		generationCount: 0
	};	

	//Reducers
	//each reducer represents their named state

	const grid = (state = initialState.grid, action) => {
		switch (action.type) {
		case 'UPDATE_GRID_SIZE' : {
			return Object.assign(
				{},
				state,
				{gridSize: gridSize(state.gridSize, action)}
			);
		}
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
		//passing states down to cells reducer
		case 'RANDOMIZE_CELLS':
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

	const gridSize = (state = 20, action) => {
		switch (action.type) {
		case 'UPDATE_GRID_SIZE': {
			return action.gridSize;
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
		case 'RANDOMIZE_CELLS':
			return Object.assign({}, state, {
				isAlive: Math.floor(Math.random()*2) > 0 ? true : false
			});
		default: 
			return state;
		}
	};

	const cells = (state = [], action) => {
		//state should be cells

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
		case 'RANDOMIZE_CELLS':
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
		case 'STOP_PLAY':
			return false;
		case 'TOGGLE_PLAY':
			return !state;
		default:
			return state;
		}
	};

	const generationCount = (state = 0, action) => {
		switch (action.type) {
		case 'RESET_GAME':
			return 0;
		case 'INCREMENT_GENERATION':
			return state + 1;
		default: 
			return state;
		}
	};

	const { combineReducers } = Redux;

	const gameOfLife = combineReducers({
		//key corresponds to state object it mananges
		//values correspond to reducer functions that update the state
		grid: grid,
		isPlaying: isPlaying,
		generationCount: generationCount
		//since key/value match, ES6 obj literal shorthand allows omitting values
	});

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
		// event.preventDefault();
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
		</div>
	);

	const PlayControls = ({onPlayClick, onRandomClick, onResetClick}) => (
		<div className="btn-group" role="group" aria-label="play-controls">
			<button onClick={onPlayClick} type="button" className="btn btn-secondary">Play/Pause</button>
			<button onClick={onRandomClick} type="button" className="btn btn-secondary">Randomize Game</button>
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

	const UI = ({generationCount}) => (
		<div id='game-ui' >
			<div>
				Generations: {generationCount}
			</div>
			<div>
				cells per side: (5 will create a 5x5 grid)
				<SizeInput />
			
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
								type: 'STOP_PLAY'
							});
							logDispatch('STOP_PLAY');
							store.dispatch({
								type: 'RESET_GAME'
							});
							logDispatch('RESET_GAME');
						}
					}
					onRandomClick={
						() => {
							store.dispatch({
								type: 'RANDOMIZE_CELLS'
							});
							logDispatch('RANDOMIZE_CELLS');
						}
					}
				/>
				<div>
					* You can step through one generation at a time by using the right arrow key.
				</div>
			</div>
		</div>
	);

	class SizeInput extends Component {
		render() {
			return (
				<div>
					<input 
						type="text" 
						width='50%'
						placeholder={store.getState().grid.gridSize}
						ref={node => {
							this.input = node;
						}}
						onInput={()=>{
							store.dispatch({
								type: 'UPDATE_GRID_SIZE',
								gridSize: parseInt(this.input.value)
							});
							logDispatch('UPDATE_GRID_SIZE');
						}}
					/>
				</div>
			);
		}
	}

	class Game extends Component {
		componentDidMount() {
			store.dispatch({
				type: 'UPDATE_GRID_SIZE',
				gridSize: 20
			});
			logDispatch('UPDATE_GRID_SIZE');
			store.dispatch({
				type: 'RESET_GAME'
			});
			logDispatch('RESET_GAME');
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
					<UI 
						generationCount={store.getState().generationCount}
						/>
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

	setInterval(() => {
		if (store.getState().isPlaying) {
			store.dispatch({
				type: 'INCREMENT_GENERATION'
			});
			logDispatch('INCREMENT_GENERATION');
		}
	}, initialState.refreshTime);


})(window);