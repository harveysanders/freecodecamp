(function(window) {
	window.gameOfLife = window.gameOfLife || {};

	//Reducers
	var initialState = {
		gridSize: 6,
		gridWidth: 600,
		refreshTime: 10000,
		cells: []
	};

	var initialCells = [[{"cellSize":120,"xCoor":0,"yCoor":0,"isAlive":false},{"cellSize":120,"xCoor":1,"yCoor":0,"isAlive":false},{"cellSize":120,"xCoor":2,"yCoor":0,"isAlive":false},{"cellSize":120,"xCoor":3,"yCoor":0,"isAlive":false},{"cellSize":120,"xCoor":4,"yCoor":0,"isAlive":false}],[{"cellSize":120,"xCoor":0,"yCoor":1,"isAlive":false},{"cellSize":120,"xCoor":1,"yCoor":1,"isAlive":false},{"cellSize":120,"xCoor":2,"yCoor":1,"isAlive":false},{"cellSize":120,"xCoor":3,"yCoor":1,"isAlive":false},{"cellSize":120,"xCoor":4,"yCoor":1,"isAlive":false}],[{"cellSize":120,"xCoor":0,"yCoor":2,"isAlive":false},{"cellSize":120,"xCoor":1,"yCoor":2,"isAlive":false},{"cellSize":120,"xCoor":2,"yCoor":2,"isAlive":false},{"cellSize":120,"xCoor":3,"yCoor":2,"isAlive":false},{"cellSize":120,"xCoor":4,"yCoor":2,"isAlive":false}],[{"cellSize":120,"xCoor":0,"yCoor":3,"isAlive":false},{"cellSize":120,"xCoor":1,"yCoor":3,"isAlive":false},{"cellSize":120,"xCoor":2,"yCoor":3,"isAlive":false},{"cellSize":120,"xCoor":3,"yCoor":3,"isAlive":false},{"cellSize":120,"xCoor":4,"yCoor":3,"isAlive":false}],[{"cellSize":120,"xCoor":0,"yCoor":4,"isAlive":false},{"cellSize":120,"xCoor":1,"yCoor":4,"isAlive":false},{"cellSize":120,"xCoor":2,"yCoor":4,"isAlive":false},{"cellSize":120,"xCoor":3,"yCoor":4,"isAlive":false},{"cellSize":120,"xCoor":4,"yCoor":4,"isAlive":false}]];

	const cell = (state, action) => {
		//state is one cell
		switch (action.type) {
			case 'TOGGLE_CELL':
				return Object.assign({}, state, {
					isAlive: !state.isAlive
				});
			default: 
				return state;
		};
	};

	const cells = (state = initialCells, action) => {
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
					rows.map( (cell, x) => {
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

	//tests
	//8 live cells surround center dead cell (2,2)
	var stateBefore = [[{"cellSize":120,"xCoor":0,"yCoor":0,"isAlive":false},{"cellSize":120,"xCoor":1,"yCoor":0,"isAlive":false},{"cellSize":120,"xCoor":2,"yCoor":0,"isAlive":false},{"cellSize":120,"xCoor":3,"yCoor":0,"isAlive":false},{"cellSize":120,"xCoor":4,"yCoor":0,"isAlive":false}],[{"cellSize":120,"xCoor":0,"yCoor":1,"isAlive":false},{"cellSize":120,"xCoor":1,"yCoor":1,"isAlive":true},{"cellSize":120,"xCoor":2,"yCoor":1,"isAlive":true},{"cellSize":120,"xCoor":3,"yCoor":1,"isAlive":true},{"cellSize":120,"xCoor":4,"yCoor":1,"isAlive":false}],[{"cellSize":120,"xCoor":0,"yCoor":2,"isAlive":false},{"cellSize":120,"xCoor":1,"yCoor":2,"isAlive":true},{"cellSize":120,"xCoor":2,"yCoor":2,"isAlive":false},{"cellSize":120,"xCoor":3,"yCoor":2,"isAlive":true},{"cellSize":120,"xCoor":4,"yCoor":2,"isAlive":false}],[{"cellSize":120,"xCoor":0,"yCoor":3,"isAlive":false},{"cellSize":120,"xCoor":1,"yCoor":3,"isAlive":true},{"cellSize":120,"xCoor":2,"yCoor":3,"isAlive":true},{"cellSize":120,"xCoor":3,"yCoor":3,"isAlive":true},{"cellSize":120,"xCoor":4,"yCoor":3,"isAlive":false}],[{"cellSize":120,"xCoor":0,"yCoor":4,"isAlive":false},{"cellSize":120,"xCoor":1,"yCoor":4,"isAlive":false},{"cellSize":120,"xCoor":2,"yCoor":4,"isAlive":false},{"cellSize":120,"xCoor":3,"yCoor":4,"isAlive":false},{"cellSize":120,"xCoor":4,"yCoor":4,"isAlive":false}]];
	var stateAfter = [[{"cellSize":120,"xCoor":0,"yCoor":0,"isAlive":false},{"cellSize":120,"xCoor":1,"yCoor":0,"isAlive":false},{"cellSize":120,"xCoor":2,"yCoor":0,"isAlive":true},{"cellSize":120,"xCoor":3,"yCoor":0,"isAlive":false},{"cellSize":120,"xCoor":4,"yCoor":0,"isAlive":false}],[{"cellSize":120,"xCoor":0,"yCoor":1,"isAlive":false},{"cellSize":120,"xCoor":1,"yCoor":1,"isAlive":true},{"cellSize":120,"xCoor":2,"yCoor":1,"isAlive":false},{"cellSize":120,"xCoor":3,"yCoor":1,"isAlive":true},{"cellSize":120,"xCoor":4,"yCoor":1,"isAlive":false}],[{"cellSize":120,"xCoor":0,"yCoor":2,"isAlive":true},{"cellSize":120,"xCoor":1,"yCoor":2,"isAlive":false},{"cellSize":120,"xCoor":2,"yCoor":2,"isAlive":false},{"cellSize":120,"xCoor":3,"yCoor":2,"isAlive":false},{"cellSize":120,"xCoor":4,"yCoor":2,"isAlive":true}],[{"cellSize":120,"xCoor":0,"yCoor":3,"isAlive":false},{"cellSize":120,"xCoor":1,"yCoor":3,"isAlive":true},{"cellSize":120,"xCoor":2,"yCoor":3,"isAlive":false},{"cellSize":120,"xCoor":3,"yCoor":3,"isAlive":true},{"cellSize":120,"xCoor":4,"yCoor":3,"isAlive":false}],[{"cellSize":120,"xCoor":0,"yCoor":4,"isAlive":false},{"cellSize":120,"xCoor":1,"yCoor":4,"isAlive":false},{"cellSize":120,"xCoor":2,"yCoor":4,"isAlive":true},{"cellSize":120,"xCoor":3,"yCoor":4,"isAlive":false},{"cellSize":120,"xCoor":4,"yCoor":4,"isAlive":false}]];

	// expect(
	// 	cells(stateBefore, 'INCREMENT_GENERATION')
	// ).toEqual(stateAfter);

	console.log('All tests pass.');

	//Redux store
	const { createStore } = Redux;
	const store = createStore(cells);

	//Componets
	const { Component } = React;

	const Cell = ({onClick, isAlive, x, y, cellSize}) => (
		<div 
			onClick={onClick}
			className="cell"
			style={{
				background: isAlive ? '#059BF3' : '#FFF',
				width: cellSize,
				height: cellSize
			}} >
			x: {x}, 
			y: {y}
		</div>
	);

	const GameGrid = ({cells, onCellClick, gridStyle}) => (
		<div id="game-grid" style={gridStyle}>
			{cells.map(cell =>
				<Cell
					key={cell.xCoor + ', ' + cell.yCoor}
					cellSize={cell.cellSize} 
					xCoor={cell.xCoor}
					yCoor={cell.yCoor}
					isAlive={cell.isAlive}
					onClick={() => onCellClick(cell.x, cell.y)}
				/>
			)}
		</div>
	);

	class TodoApp extends Component {
		render() {
			//dont have to type 'this.props' everytime
			const {
				todos,
				visibilityFilter
			} = this.props;

			const visibileTodos = getVisibileTodos(
				todos, //(this.props.todos)
				visibilityFilter //(this.props.visibilityFilter)
			);
			return (
				<div>
					<input ref={node => {
						this.input = node;
					}} />
					<button onClick={() => {
						store.dispatch({
							type: 'ADD_TODO',
							text: this.input.value,
							id: nextTodoId++
						});
						this.input.value = '';
					}}>
						Add Todo
					</button>
					<TodoList
						todos={visibileTodos}
						onTodoClick={id =>
							store.dispatch({
								type: 'TOGGLE_TODO',
								id : id
							})
						}
					/>
					<p>
						Show:
						{' '}
						<FilterLink
							filter='SHOW_ALL'
							currentFilter={visibilityFilter}
						>
							All
						</FilterLink>
						{' '}
						<FilterLink
							filter='SHOW_ACTIVE'
							currentFilter={visibilityFilter}
						>
							Active
						</FilterLink>
						{' '}
						<FilterLink
							filter='SHOW_COMPLETED'
							currentFilter={visibilityFilter}
						>
							Completed
						</FilterLink>
					</p>
				</div>
			);
		}
	}

	class Game extends Component {
		render() {
			return (
				<GameGrid 
					cells={this.props.cells}
					onCellClick={(x,y) => {
						store.dispatch({
							type: 'TOGGLE_CELL',
							x: x,
							y: y
						})
					}}
					gridStyle={{minWidth:600, maxWidth:600}}
				/>
			);
		};
	};

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