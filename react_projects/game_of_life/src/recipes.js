(function() {

	// TODO: add 'sure?' modal upon recipe delete attempt
	// TODO: clear all locally stored recipes

	var defaultRECIPES = [{name: 'Pumpkin Pie', ingredients: ['Pumpkin Puree', 'Sweetened Condensed Milk', 'Eggs', 'Pumpkin Pie Spice', 'Pie Crust']}, {name: 'Breakfast Sandwich', ingredients: ['Seeduction Bread', 'Advocado', 'Egg', 'Smoked Gouda', 'Tony Chacherie\'s']}];

	function saveToLocalStorage(dataName, obj) {
		localStorage.setItem(dataName, JSON.stringify(obj));
	}

	function getLocalData(dataName) {
		return JSON.parse(localStorage.getItem(dataName));
	}

	//-------------------- React view -------------------

	// -recipe box
	// 	-recipe list
	// 		-recipe
	// 			-ingredients
	// 			-buttons
	// 				-delete
	// 				-edit
	// 	-add recipe button

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

	var DeleteRecipeBtn = React.createClass({
		handleDeleteClick: function(e) {
			console.log('click: delete' + e);
			this.props.onClick();
		},
		render: function() {
			return (
				<button className="btn btn-default" onClick={this.handleDeleteClick} >
					Delete Recipe
				</button>
			);
		}
	});

	var EditRecipeBtn = React.createClass({
		render: function() {
			return (
				<a href={this.props.modalHref} className="btn btn-default" data-toggle="modal">
					Edit Recipe
				</a>
			);
		}
	});

	var Recipe = React.createClass({
		handleDeleteClick: function(e) {
			console.log('running delete on Recipe');
			this.props.onRecipeDelete(this.props.recipe);
		},

		render: function() {
			var elementId = this.props.recipe.name.replace(/\s+/g, '')
			var collapseID = 'collapse' + elementId;
			var headingName = elementId + 'Heading';

			return (
				<div className="panel panel-default">
					<div className="panel-heading">
				        <a className="panel-title" data-toggle="collapse" data-parent="#accordion" href={"#" + collapseID} aria-expanded="false" aria-controls={collapseID} >
				          {this.props.recipe.name}
				        </a>
					</div>
					<IngredientsList labelledBy={headingName} collapseID={collapseID} ingredients={this.props.recipe.ingredients} />
					<div className="recipe-ui-btns" >
						<DeleteRecipeBtn onClick={this.handleDeleteClick} />
						<EditRecipeBtn onClick={this.handleEditClick} modalHref={"#" + elementId + "EditRecipeModal"} />
					</div>
					<AddEditRecipeModal 
						id={elementId + "EditRecipeModal"} 
						recipe={this.props.recipe}
						onRecipeSave={this.props.onRecipeEdit} />
				</div>
			);
		}
	});

	var RecipeList = React.createClass({
		render: function() {
			var handleDeleteRecipe = this.props.onRecipeDelete; //why?
			var handleEditRecipe = this.props.onRecipeEdit; //why?
			var Recipes = this.props.recipes.map(function(recipe) {
				return <Recipe 
					recipe={recipe} 
					key={recipe.name} 
					onRecipeDelete={handleDeleteRecipe} 
					onRecipeEdit={handleEditRecipe} />;
			});

			return (
				<div className="panel-group" id="accordion" aria-multiselectable="true">
					{Recipes}
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

	var AddEditRecipeModal = React.createClass({
		getInitialState: function() {
			return {name: '', ingredients: ''}
		},
		componentDidMount: function() {
			var name = this.props.recipe.name || '';
			var ingredients = this.props.recipe.ingredients.toString() || '';
			this.setState({
				name: name,
				ingredients: ingredients
			});
		},
		handleInput: function(name, ingredients) {
			this.setState({
				name: name,
				ingredients: ingredients
			});
		},
		handleSaveClick: function() {
			console.log('save btn click');
			this.props.onRecipeSave({
				name: this.state.name,
				ingredients: this.state.ingredients.split(',')
			});
			$('#' + this.props.id).modal('hide');
		},
		render: function() {
			return (
				<div id={this.props.id} className="modal fade ">
      
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
						      <button type="button" className="btn btn-primary" onClick={this.handleSaveClick} >Save Recipe</button>
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
		handleNewRecipeSubmit: function(recipe) {
			var recipes = this.state.recipes;
			recipe.id = recipe.name; //need to add unique id to every element in state
			var newRecipes = recipes.concat([recipe]);
			this.setState({recipes: newRecipes});
			saveToLocalStorage('recipes', newRecipes);

		},
		handleEditRecipe: function(editedRecipe) {
			var recipes = this.state.recipes;
			var selectedRecipe = recipes.filter(function(recipe) {
				return editedRecipe.name === recipe.name;
			})[0];
			recipes.splice(recipes.indexOf(selectedRecipe), 1, editedRecipe);
			this.setState({recipes: recipes});
			saveToLocalStorage('recipes', recipes);
		},
		handleDeleteRecipe: function(recipeToDel) {
			var recipes = this.state.recipes;
			var filteredRecipes = recipes.filter(function(recipe) {
				return recipeToDel.name !== recipe.name;
			});
			this.setState({recipes: filteredRecipes});
			saveToLocalStorage('recipes', filteredRecipes);
		},
		render: function() {
			return (
				<div className="row">
					<div className="col-md-12">
						<RecipeList 
							recipes={this.state.recipes} 
							onRecipeDelete={this.handleDeleteRecipe} 
							onRecipeEdit={this.handleEditRecipe}/>
						<AddRecipeBtn />
						<AddEditRecipeModal onRecipeSave={this.handleNewRecipeSubmit} id="AddRecipeModal" recipe={{name: '', ingredients: []}} />
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