'use strict';

(function () {
	// ---------------Local Storge ----------------------

	/*
 check if recipes are in local storage
 	if not, load default recipes
 	else load recipes from local storage
 
 */
	var defaultRECIPES = [{ name: 'Pumpkin Pie', ingredients: ['Pumpkin Puree', 'Sweetened Condensed Milk', 'Eggs', 'Pumpkin Pie Spice', 'Pie Crust'] }, { name: 'Breakfast Sandwich', ingredients: ['Seeduction Bread', 'Advocado', 'Egg', 'Smoked Gouda', 'Tony Chacherie\'s'] }];

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
		displayName: 'IngredientsList',

		render: function render() {
			var ingredients = this.props.ingredients.map(function (ingredient) {
				return React.createElement(
					'li',
					{ key: ingredient },
					ingredient
				);
			});

			return React.createElement(
				'div',
				{ id: this.props.collapseID, className: 'panel-collapse collapse in', 'aria-labelledby': this.props.labelledBy },
				React.createElement(
					'div',
					{ className: 'panel-body' },
					React.createElement(
						'ul',
						null,
						ingredients
					)
				)
			);
		}
	});

	var Recipe = React.createClass({
		displayName: 'Recipe',

		render: function render() {
			var collapseID = 'collapse' + this.props.recipe.name.replace(/\s+/g, '');
			var headingName = this.props.recipe.name.replace(/\s+/g, '') + 'Heading';
			return React.createElement(
				'div',
				{ className: 'panel panel-default' },
				React.createElement(
					'div',
					{ className: 'panel-heading' },
					React.createElement(
						'a',
						{ className: 'panel-title', 'data-toggle': 'collapse', 'data-parent': '#accordion', href: "#" + collapseID, 'aria-expanded': 'false', 'aria-controls': collapseID },
						this.props.recipe.name
					)
				),
				React.createElement(IngredientsList, { labelledBy: headingName, collapseID: collapseID, ingredients: this.props.recipe.ingredients })
			);
		}
	});

	var RecipeList = React.createClass({
		displayName: 'RecipeList',

		render: function render() {
			var recipes = this.props.recipes.map(function (recipe) {
				return React.createElement(Recipe, { recipe: recipe, key: recipe.name });
			});

			return React.createElement(
				'div',
				{ className: 'panel-group', id: 'accordion', 'aria-multiselectable': 'true' },
				recipes
			);
		}
	});

	var AddRecipeBtn = React.createClass({
		displayName: 'AddRecipeBtn',

		render: function render() {
			return React.createElement(
				'a',
				{ href: '#AddRecipeModal', className: 'btn btn-default', 'data-toggle': 'modal' },
				'Add Recipe'
			);
		}
	});

	var AddRecipeModal = React.createClass({
		displayName: 'AddRecipeModal',

		getInitialState: function getInitialState() {
			return { name: '', ingredients: '' };
		},
		handleInput: function handleInput(name, ingredients) {
			console.log('handleInput on AddRecipeModal');
			this.setState({
				name: name,
				ingredients: ingredients
			});
		},
		handleAdd: function handleAdd() {
			console.log('handleAdd on AddRecipeModal');
			this.props.onUserAdd({
				name: this.state.name,
				ingredients: this.state.ingredients.split(',')
			});
		},
		render: function render() {
			return React.createElement(
				'div',
				{ id: 'AddRecipeModal', className: 'modal fade ' },
				React.createElement(
					'div',
					{ className: 'modal-dialog modal-lg' },
					React.createElement(
						'div',
						{ className: 'modal-content' },
						React.createElement(
							'div',
							{ className: 'modal-header' },
							React.createElement(
								'button',
								{ type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-hidden': 'true' },
								'×'
							),
							React.createElement(
								'h4',
								{ className: 'modal-title' },
								'Add a recipe!'
							)
						),
						React.createElement(
							'div',
							{ className: 'modal-body' },
							React.createElement(NewRecipeForm, { newRecipeName: this.state.name, newRecipeIngredients: this.state.ingredients, onUserInput: this.handleInput })
						),
						React.createElement(
							'div',
							{ className: 'modal-footer' },
							React.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.handleAdd },
								'Add Recipe'
							),
							React.createElement(
								'button',
								{ type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
								'Close'
							)
						)
					)
				)
			);
		}
	});

	var NewRecipeForm = React.createClass({
		displayName: 'NewRecipeForm',

		handleChange: function handleChange() {
			this.props.onUserInput(this.refs.recipeNameInput.value, this.refs.ingredientsInput.value);
		},
		render: function render() {
			return React.createElement(
				'form',
				null,
				React.createElement(
					'fieldset',
					{ className: 'form-group' },
					React.createElement(
						'label',
						{ htmlFor: 'recipeName' },
						'Recipe'
					),
					React.createElement('input', {
						type: 'text',
						className: 'form-control',
						placeholder: 'recipe name',
						value: this.props.newRecipeName,
						ref: 'recipeNameInput',
						onChange: this.handleChange //check if more efficient way
					})
				),
				React.createElement(
					'fieldset',
					{ className: 'form-group' },
					React.createElement(
						'label',
						{ htmlFor: 'recipeIngredients' },
						'Ingredients'
					),
					React.createElement('textarea', {
						className: 'form-control',
						placeholder: 'enter ingredients separated by commas',
						value: this.props.newRecipeIngredients,
						ref: 'ingredientsInput',
						onChange: this.handleChange
					})
				)
			);
		}
	});

	var RecipeBox = React.createClass({
		displayName: 'RecipeBox',

		loadRecipesFromLocalStorage: function loadRecipesFromLocalStorage() {
			if (typeof Storage !== "undefined") {

				if (!localStorage.getItem('recipes')) {
					this.setState({ recipes: defaultRECIPES });
				} else {
					this.setState({ recipes: getLocalData('recipes') });
				}
			} else {
				console.log("Sorry! No Web Storage support..");
			}
		},
		getInitialState: function getInitialState() {
			return { recipes: [] };
		},
		componentDidMount: function componentDidMount() {
			this.loadRecipesFromLocalStorage();
		},
		handleNewRecipe: function handleNewRecipe(recipe) {
			console.log('handleNewRecipe on RecipeBox. recipe: ' + recipe.name);
			var recipes = this.state.recipes;
			recipe.id = recipe.name;
			console.log('prev recipes: ', recipes);
			var newRecipes = recipes.push(recipe);
			console.log('new recipes: ', recipes);
			this.setState({ recipes: recipes });
			saveToLocalStorage('recipes', recipes);
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-md-12' },
					React.createElement(RecipeList, { recipes: this.state.recipes }),
					React.createElement(AddRecipeBtn, null),
					React.createElement(AddRecipeModal, { onUserAdd: this.handleNewRecipe })
				)
			);
		}
	});

	ReactDOM.render(React.createElement(RecipeBox, null), document.getElementById('react-app'));
})();