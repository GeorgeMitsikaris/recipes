import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import './Recipe.css';

const Recipe = ({ title, missedIngredients, recipeId }) => {
	let steps = [];

	const getInstructions = async () => {
		const { data } = await axios.get(
			`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${process.env.REACT_APP_SPOONACULAR}`
		);
		steps = data[0].steps;
		console.log(steps);
	};

	const renderIngredients = missedIngredients.map((missedIngredient) => {
		return (
			<span className='recipe__ingredients' key={uuid()}>
				{missedIngredient.name} <span className='recipe__dash'>-</span>
			</span>
		);
	});

	return (
		<>
			<div className='recipe__header'>
				<strong>Name:</strong>
				{title}
			</div>
			<div className={`recipe__content`}>
				<div className='recipe__wrap'>
					<strong>Ingredients:</strong>
					{renderIngredients}
				</div>
				<button onClick={() => getInstructions()}>Get Instructions</button>
			</div>
		</>
	);
};

export default Recipe;
