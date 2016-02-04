(function() {
		// ---------------Local Storge ----------------------

		/*
		check if recipes are in local storage
			if not, load default recipes
			else load recipes from local storage



		*/
	var defaultRECIPES = [{name: 'Pumpkin Pie', ingredients: ['Pumpkin Puree', 'Sweetened Condensed Milk', 'Eggs', 'Pumpkin Pie Spice', 'Pie Crust']}, {name: 'Breakfast Sandwich', ingredients: ['Seeduction Bread', 'Advocado', 'Egg', 'Smoked Gouda', 'Tony Chacherie\'s']}];

	var currRecipes = [];

	function saveToLocalStorage(dataName, obj) {
		localStorage.setItem(dataName, JSON.stringify(obj));
	}

	function getLocalData(dataName) {
		return JSON.parse(localStorage.getItem(dataName));
	}

	//-------------------- React view -------------------

	//-recipe list
	// 	-recipe
	// 		-ingredients
	// 		-buttons
	// 			-delete
	// 			-edit
	// -add recipe button

	var IngredientsList = React.createClass({
		render: function() {
			var ingredients = this.props.ingredients.map(function(ingredient) {
				return <li key={ingredient}>{ingredient}</li>;
			});

			return (
				<div id={this.props.collapseID} className="panel-collapse collapse in" aria-labelledby={this.props.labelledBy}>
		      <div className="panel-body">
		        <ul>{ingredients}</ul>
		      </div>
		    </div>
			);
		}
	});

	var Recipe = React.createClass({
		render: function() {
			var collapseID = 'collapse' + this.props.recipe.name.replace(/\s+/g, '');
			var headingName = this.props.recipe.name.replace(/\s+/g, '') + 'Heading';
			return (
				<div className="panel panel-default">
					<div className="panel-heading">
		        <a className="panel-title" data-toggle="collapse" data-parent="#accordion" href={"#" + collapseID} aria-expanded="false" aria-controls={collapseID} >
		          {this.props.recipe.name}
		        </a>
					</div>
					<IngredientsList labelledBy={headingName} collapseID={collapseID} ingredients={this.props.recipe.ingredients} />
				</div>
			);
		}
	});

	var RecipeList = React.createClass({
		render: function() {
			var recipes = this.props.recipes.map(function(recipe) {
				return <Recipe recipe={recipe} key={recipe.name} />;
			});

			return (
				<div className="panel-group" id="accordion" aria-multiselectable="true">
					{recipes}
				</div>
			);
		}
	});

	var AddRecipeBtn = React.createClass({
		render: function() {
			return (
				<a href="#AddRecipeModal" className="btn btn-default" data-toggle="modal">
					Add Recipe
				</a>
			);
		}
	});

	var AddRecipeModal = React.createClass({
		getInitialState: function() {
			return {name: '', ingredients: ''}
		},
		handleInput: function(name, ingredients) {
			console.log('handleInput on AddRecipeModal');
			this.setState({
				name: name,
				ingredients: ingredients
			});
		},
		handleAdd: function() {
			console.log('handleAdd on AddRecipeModal');
			this.props.onUserAdd({
				name: this.state.name,
				ingredients: this.state.ingredients.split(',')
			});
		},
		render: function() {
			return (
				<div id="AddRecipeModal" className="modal fade ">
      
			    <div className="modal-dialog modal-lg">
			        <div className="modal-content">
		          
		          	<div className="modal-header"> 
		            	<button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
	                <h4 className="modal-title">Add a recipe!</h4>
		          	</div>
					 
						    <div className="modal-body">
						       <NewRecipeForm newRecipeName={this.state.name} newRecipeIngredients={this.state.ingredients} onUserInput={this.handleInput}/>
						    </div>
					 
						    <div className="modal-footer"> 
						      <button type="button" className="btn btn-primary" onClick={this.handleAdd} >Add Recipe</button>
						      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
						    </div>
							
			      </div>
			    </div>
		    </div> 
			);
		}
	});

	var NewRecipeForm = React.createClass({
		handleChange: function() {
			this.props.onUserInput(
				this.refs.recipeNameInput.value,
				this.refs.ingredientsInput.value
			);
		},
		render: function() {
			return (
				<form>
					<fieldset className="form-group">
						<label htmlFor="recipeName">Recipe</label>
						<input 
							type="text" 
							className="form-control" 
							placeholder="recipe name"
							value={this.props.newRecipeName}
							ref="recipeNameInput"
							onChange={this.handleChange} //check if more efficient way
							/>
					</fieldset>
					<fieldset className="form-group">
						<label htmlFor="recipeIngredients">Ingredients</label>
						<textarea 
							className="form-control" 
							placeholder="enter ingredients separated by commas"
							value={this.props.newRecipeIngredients}
							ref="ingredientsInput"
							onChange={this.handleChange}
							>
						</textarea>
					</fieldset>
				</form>
			);
		}
	});

	var RecipeBox = React.createClass({
		loadRecipesFromLocalStorage: function() {
			if(typeof(Storage) !== "undefined") {

				if (!localStorage.getItem('recipes')) { 
					this.setState({recipes: defaultRECIPES});
				} else {
					this.setState({recipes: getLocalData('recipes')});
				}
			} else {
			    console.log ("Sorry! No Web Storage support..");
			}
		},
		getInitialState: function() {
			return {recipes: []};
		},
		componentDidMount: function() {
			this.loadRecipesFromLocalStorage();
		},
		handleNewRecipe: function(recipe) {
			console.log('handleNewRecipe on RecipeBox. recipe: ' + recipe.name);
			var recipes = this.state.recipes;
			recipe.id = recipe.name;
			console.log('prev recipes: ', recipes);
			var newRecipes = recipes.push(recipe);
			console.log('new recipes: ', recipes);
			this.setState({recipes: recipes});
			saveToLocalStorage('recipes', recipes);

		},
		render: function() {
			return (
				<div className="row">
					<div className="col-md-12">
						<RecipeList recipes={this.state.recipes} />
						<AddRecipeBtn />
						<AddRecipeModal onUserAdd={this.handleNewRecipe} />
					</div>
				</div>
			);
		}
	});

	ReactDOM.render(
		<RecipeBox />,
		document.getElementById('react-app')
	);


})();