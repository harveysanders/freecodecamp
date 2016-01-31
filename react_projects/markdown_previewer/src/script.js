(function() {

	var MarkdownPreview = React.createClass({
		getInitialState: function() {
			return {
				markdown: '`Enter markdown here.`'
			};
		},
		handleChange: function(e) {
			this.setState({
				markdown: e.target.value
			});
		},
		postMarkdown: function() {
			//bypassing XSS security, relying on marked to sanitize.
			//https://facebook.github.io/react/tips/dangerously-set-inner-html.html
			return {
				__html: marked(this.state.markdown.toString(), {sanitize: true})
			};
		},
		render: function(){
			return (
				<div class="container-fluid">
					<h1>Markdown Previewer</h1>
					<div class="row">
						<div class="col-md-6">
							<textarea name="markdown-input" rows="10" cols="50" value={this.state.value} onChange={this.handleChange}>
							</textarea>
						</div>
						<div class="col-md-6">
							<span dangerouslySetInnerHTML={this.postMarkdown()} />
						</div>
					</div>
				</div>
			)
		}
	});


	ReactDOM.render(<MarkdownPreview />, document.getElementById('app'));
})();