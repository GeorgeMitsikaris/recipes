import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import './Recipe.css';

const Recipe = ({
	title,
	missedIngredients,
	usedIngredients,
	unusedIngredients,
	recipeId,
}) => {
  const [steps, setSteps] = useState([]);

	const getInstructions = async () => {
		const { data } = await axios.get(
			`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${process.env.REACT_APP_SPOONACULAR}`
		);
		setSteps(data[0].steps);
		console.log(steps);
	};

	const renderMissedIngredients = missedIngredients.map((missedIngredient) => {
		return (
			<span className='recipe__ingredients' key={uuid()}>
				{missedIngredient.name} <span className='recipe__dash'>-</span>
			</span>
		);
	});

  const renderSteps = steps.map(step => {
    console.log(step);
    return (
      <div><p>{step.number}</p>{step.step}</div>
    )
  })

	const renderUsedIngredients = usedIngredients.map((usedIngredient) => {
		return (
			<span className='recipe__ingredients' key={uuid()}>
				{usedIngredient.name} <span className='recipe__dash'>-</span>
			</span>
		);
	});

	const renderUnusedIngredients = unusedIngredients.map((unusedIngredient) => {
		return (
			<span className='recipe__ingredients' key={uuid()}>
				{unusedIngredient.name} <span className='recipe__dash'>-</span>
			</span>
		);
	});

	return (
		<>
			<div className = 'recipe__header'>
				<strong>Name:</strong>
				{title}
			</div>
			<div className = 'recipe__content'>
				<div className = 'recipe__wrap'>
					<strong>Ingredients:</strong>
          {renderUsedIngredients}
					{renderMissedIngredients}
				</div>
				<button onClick = {() => getInstructions()}>Get Instructions</button>
			</div>
      <div className = 'recipe__unused'>
        <strong>Unused Ingredients:</strong>
        {renderUnusedIngredients}
      </div>
      {renderSteps}
		</>
	);
};

export default Recipe;
