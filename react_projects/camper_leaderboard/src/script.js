(function() {
	// -Leaderboard
	// 	-camper list
	// 		-camper

	//TODO
		
		//move down chevron icon

	var testCampers = [{"username":"SaintPeter","img":"https://avatars.githubusercontent.com/u/553494?v=3","alltime":2108,"recent":339,"lastUpdate":"2016-01-27T02:13:39.183Z"},{"username":"abhisekp","img":"https://avatars.githubusercontent.com/u/1029200?v=3","alltime":1732,"recent":349,"lastUpdate":"2016-01-26T22:17:38.529Z"},{"username":"Takumar","img":"https://avatars.githubusercontent.com/u/2951935?v=3","alltime":1633,"recent":539,"lastUpdate":"2016-01-27T00:53:56.800Z"},{"username":"EllieAdam","img":"https://avatars.githubusercontent.com/u/7389754?v=3","alltime":1555,"recent":126,"lastUpdate":"2016-01-26T17:06:01.431Z"}];

	var endpoints = {
		alltime: 'http://fcctop100.herokuapp.com/api/fccusers/top/alltime',
		recent: 'http://fcctop100.herokuapp.com/api/fccusers/top/recent'
	};

	var Leaderboard = React.createClass({
		loadCampersFromServer: function() {
			console.log('url: ' + endpoints[this.state.sortBy]);
			// $.ajax({
			// 	url: endpoints[this.state.sortBy],
			// 	dataType: 'json',
			// 	cache: false,
			// 	success: function(data) {
			// 		this.setState({data: data});
			// 	}.bind(this),
			// 	error: function(xhr, status, err) {
			// 		console.error(this.props.url, status, err.toString());
			// 	}.bind(this)
			// });
		},
		getInitialState: function() {
			return {
				data: [{
					username: "loading data",
					img: null, //get spinning,
					recent: "hang on one sec..",
					alltime: null
				}],
				sortBy: "alltime"
			};
		},
		componentDidMount: function() {
			console.log('componentDidMount!');
			this.loadCampersFromServer();
		},
		handleClick: function(sortBy) {
			this.setState({sortBy: sortBy}, this.loadCampersFromServer);
		},
		render: function() {
			return (
				<div className="leaderboard">
					<header>freeCodeCamp Leaderboard</header>
					<table className="table table-striped">
						<ListHeader sortBy={this.state.sortBy} onClick={this.handleClick} />
						<CamperList data={this.state.data}/>
					</table>
				</div>
			);
		}
	});

	var ListHeader = React.createClass({
		setToRecent: function() {
			this.setState({sortBy: 'recent'});
			this.props.onClick('recent')
		},
		setToAlltime: function() {
			this.setState({sortBy: 'alltime'});
			this.props.onClick('alltime')
		},
		render: function() {
			var recentHeader = (this.props.sortBy === 'recent') ? 
			<th onClick={this.setToRecent}><a href="#">Points in past 30 days</a><i className="fa fa-chevron-down"></i></th> :
			<th onClick={this.setToRecent}><a href="#">Points in past 30 days</a></th>;

			var alltimeHeader = (this.props.sortBy === 'alltime') ? 
			<th onClick={this.setToAlltime}><a href="#">All time points </a><i className="fa fa-chevron-down"></i></th> :
			<th onClick={this.setToAlltime}><a href="#">All time points </a></th>;

			return (
				<thead>
					<tr>
						<th>#</th>
						<th>
							Camper Name 
						</th>
						{recentHeader}
						{alltimeHeader}
					</tr>
				</thead>
			);
		}
	});

	var CamperList = React.createClass({
		render: function() {
			var camperNodes = this.props.data.map(function(camper, place) {
				return (
					<tr className="camper-row" key={camper.username}>
						<td>{place + 1}</td>
						<td><img src={camper.img} /> {camper.username}</td>
						<td>{camper.recent}</td>
						<td>{camper.alltime}</td>
					</tr>
				);
			});
			return (
				<tbody>
					{camperNodes}
				</tbody>
			);
		}
	});

	ReactDOM.render(
		<Leaderboard url={endpoints.alltime}/>,
		document.getElementById('react-app')
	);
})();