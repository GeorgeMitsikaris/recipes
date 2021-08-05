import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Recipes.css';
import Recipe from './FindRecipe/FindRecipe';

const FindRecipes = () => {
	const [recipe, setRecipe] = useState('');
	const [debouncedRecipe, setDebouncedRecipe] = useState('');
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedRecipe(recipe);
		}, 1000);

		return () => {
			clearTimeout(timerId);
		};
	}, [recipe]);

	useEffect(() => {
		const search = async () => {
			const { data } = await axios.get(
				`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR}`,
				{
					params: {
						ingredients: debouncedRecipe,
						instructionsRequired: true,
						number: 40,
					},
				}
			);
			setRecipes(data);
		};
		if (debouncedRecipe) search();
	}, [debouncedRecipe]);

	const renderRecipes = recipes.map((recipe, i) => {
		return (
			<div className='search__recipe' key={recipe.id}>
				<Recipe
					recipeId={recipe.id}
					title={recipe.title}
					missedIngredients={recipe.missedIngredients}
					usedIngredients={recipe.usedIngredients}
					unusedIngredients={recipe.unusedIngredients}
				/>
			</div>
		);
	});

	return (
		<div className='search'>
			<h1>Search for recipes</h1>
			<input
				value={recipe}
				placeholder='Search for recipes...'
				onChange={(e) => {
					setRecipe(e.target.value);
				}}
			/>
			<div className='search__container'>{renderRecipes}</div>
		</div>
	);
};

export default FindRecipes;
