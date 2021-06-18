import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Recipes.css';

function Search() {
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
				`https://api.spoonacular.com/recipes/complexSearch?apiKey=fdde02e0fc0b4987bd9b175b0f55f263`,
				{
					params: {
						query: debouncedRecipe,
						instructionsRequired: true,
					},
				}
			);
			console.log(data.results);
			setRecipes(data.results);
		};
		if (debouncedRecipe) search();
	}, [debouncedRecipe]);

	const renderRecipes = recipes.map((recipe) => {
		return (
			<div className='search-recipe' key={recipe.id}>
				{recipe.title}
			</div>
		);
	});

	return (
		<div className='search'>
			<h3>Search for recipes</h3>
			<input
				value={recipe}
				placeholder='Search for recipes...'
				onChange={(e) => {
					setRecipe(e.target.value);
				}}
			/>

			<div className='search-container'>{renderRecipes}</div>
		</div>
	);
}

export default Search;
