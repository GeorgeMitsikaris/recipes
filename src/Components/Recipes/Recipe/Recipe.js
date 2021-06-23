import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

import './Recipe.css';

const Recipe = ({ title, missedIngredients, recipeId }) => {
	// const [steps, setSteps] = useState([]);
  let steps = [];
  const [rotateIcon, setRotateIcon] = useState(0);

	const getInstructions = async () => {
		const { data } = await axios.get(
			`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${process.env.REACT_APP_SPOONACULAR}`
		);
		steps = data[0].steps;
		// setSteps(stepsObj.steps);
		// console.log(stepsObj.steps);
		console.log(steps);
	};

	const renderIngredients = missedIngredients.map((missedIngredient) => {
		return <div key={uuid()}>{missedIngredient.name}</div>;
	});

	return (
		<div className='recipe'>
			<div className='recipe__header'>
				<div className='recipe__title'>{title}</div>
				<FontAwesomeIcon className="recipe__arrow" icon={faChevronCircleDown} rotation={rotateIcon} />
			</div>
			<hr></hr>
			<div className='recipe__content'>
				{renderIngredients}
				<button onClick={() => getInstructions()}>Get Instructions</button>
			</div>
		</div>
	);
};

export default Recipe;
