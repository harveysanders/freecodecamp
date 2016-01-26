"use strict";

(function () {

	var MarkdownPreview = React.createClass({
		displayName: "MarkdownPreview",

		getInitialState: function getInitialState() {
			return {
				markdown: '`Enter markdown here.`'
			};
		},
		handleChange: function handleChange(e) {
			this.setState({
				markdown: e.target.value
			});
		},
		postMarkdown: function postMarkdown() {
			//bypassing XSS security, relying on marked to sanitize.
			//https://facebook.github.io/react/tips/dangerously-set-inner-html.html
			return {
				__html: marked(this.state.markdown.toString(), { sanitize: true })
			};
		},
		render: function render() {
			return React.createElement(
				"div",
				{ "class": "container-fluid" },
				React.createElement(
					"h1",
					null,
					"Markdown Previewer"
				),
				React.createElement(
					"div",
					{ "class": "row" },
					React.createElement(
						"div",
						{ "class": "col-md-6" },
						React.createElement("textarea", { name: "markdown-input", rows: "10", cols: "50", value: this.state.value, onChange: this.handleChange })
					),
					React.createElement(
						"div",
						{ "class": "col-md-6" },
						React.createElement("span", { dangerouslySetInnerHTML: this.postMarkdown() })
					)
				)
			);
		}
	});

	ReactDOM.render(React.createElement(MarkdownPreview, null), document.getElementById('app'));
})();