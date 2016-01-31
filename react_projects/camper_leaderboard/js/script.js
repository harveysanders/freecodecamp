"use strict";

(function () {
	// -Leaderboard
	// 	-camper list
	// 		-camper

	//TODO

	//move down chevron icon

	var testCampers = [{ "username": "SaintPeter", "img": "https://avatars.githubusercontent.com/u/553494?v=3", "alltime": 2108, "recent": 339, "lastUpdate": "2016-01-27T02:13:39.183Z" }, { "username": "abhisekp", "img": "https://avatars.githubusercontent.com/u/1029200?v=3", "alltime": 1732, "recent": 349, "lastUpdate": "2016-01-26T22:17:38.529Z" }, { "username": "Takumar", "img": "https://avatars.githubusercontent.com/u/2951935?v=3", "alltime": 1633, "recent": 539, "lastUpdate": "2016-01-27T00:53:56.800Z" }, { "username": "EllieAdam", "img": "https://avatars.githubusercontent.com/u/7389754?v=3", "alltime": 1555, "recent": 126, "lastUpdate": "2016-01-26T17:06:01.431Z" }];

	var endpoints = {
		alltime: 'http://fcctop100.herokuapp.com/api/fccusers/top/alltime',
		recent: 'http://fcctop100.herokuapp.com/api/fccusers/top/recent'
	};

	var Leaderboard = React.createClass({
		displayName: "Leaderboard",

		loadCampersFromServer: function loadCampersFromServer() {
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
		getInitialState: function getInitialState() {
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
		componentDidMount: function componentDidMount() {
			console.log('componentDidMount!');
			this.loadCampersFromServer();
		},
		handleClick: function handleClick(sortBy) {
			this.setState({ sortBy: sortBy }, this.loadCampersFromServer);
		},
		render: function render() {
			return React.createElement(
				"div",
				{ className: "leaderboard" },
				React.createElement(
					"header",
					null,
					"freeCodeCamp Leaderboard"
				),
				React.createElement(
					"table",
					{ className: "table table-striped" },
					React.createElement(ListHeader, { sortBy: this.state.sortBy, onClick: this.handleClick }),
					React.createElement(CamperList, { data: this.state.data })
				)
			);
		}
	});

	var ListHeader = React.createClass({
		displayName: "ListHeader",

		setToRecent: function setToRecent() {
			this.setState({ sortBy: 'recent' });
			this.props.onClick('recent');
		},
		setToAlltime: function setToAlltime() {
			this.setState({ sortBy: 'alltime' });
			this.props.onClick('alltime');
		},
		render: function render() {
			var recentHeader = this.props.sortBy === 'recent' ? React.createElement(
				"th",
				{ onClick: this.setToRecent },
				React.createElement(
					"a",
					{ href: "#" },
					"Points in past 30 days"
				),
				React.createElement("i", { className: "fa fa-chevron-down" })
			) : React.createElement(
				"th",
				{ onClick: this.setToRecent },
				React.createElement(
					"a",
					{ href: "#" },
					"Points in past 30 days"
				)
			);

			var alltimeHeader = this.props.sortBy === 'alltime' ? React.createElement(
				"th",
				{ onClick: this.setToAlltime },
				React.createElement(
					"a",
					{ href: "#" },
					"All time points "
				),
				React.createElement("i", { className: "fa fa-chevron-down" })
			) : React.createElement(
				"th",
				{ onClick: this.setToAlltime },
				React.createElement(
					"a",
					{ href: "#" },
					"All time points "
				)
			);

			return React.createElement(
				"thead",
				null,
				React.createElement(
					"tr",
					null,
					React.createElement(
						"th",
						null,
						"#"
					),
					React.createElement(
						"th",
						null,
						"Camper Name"
					),
					recentHeader,
					alltimeHeader
				)
			);
		}
	});

	var CamperList = React.createClass({
		displayName: "CamperList",

		render: function render() {
			var camperNodes = this.props.data.map(function (camper, place) {
				return React.createElement(
					"tr",
					{ className: "camper-row", key: camper.username },
					React.createElement(
						"td",
						null,
						place + 1
					),
					React.createElement(
						"td",
						null,
						React.createElement("img", { src: camper.img }),
						" ",
						camper.username
					),
					React.createElement(
						"td",
						null,
						camper.recent
					),
					React.createElement(
						"td",
						null,
						camper.alltime
					)
				);
			});
			return React.createElement(
				"tbody",
				null,
				camperNodes
			);
		}
	});

	ReactDOM.render(React.createElement(Leaderboard, { url: endpoints.alltime }), document.getElementById('react-app'));
})();