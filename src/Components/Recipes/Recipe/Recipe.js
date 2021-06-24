import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

import './Recipe.css';

const Recipe = ({ title, missedIngredients, recipeId }) => {
  let steps = [];
  const [rotateIcon, setRotateIcon] = useState(0);
  const [showContent, setShowContent] = useState(false)

	const getInstructions = async () => {
		const { data } = await axios.get(
			`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${process.env.REACT_APP_SPOONACULAR}`
		);
		steps = data[0].steps;
		console.log(steps);
	};

  const toggleRecipeContent = () => {
    setShowContent(content => content=!content);
    setRotateIcon(rotateIcon => rotateIcon === 0 ? rotateIcon = 180 : rotateIcon = 0);
  }

	const renderIngredients = missedIngredients.map((missedIngredient) => {
		return <div key={uuid()}>{missedIngredient.name}</div>;
	});

	return (
		<div className = 'recipe'>
			<div className = 'recipe__header' onClick = {toggleRecipeContent}>
				<div className = 'recipe__title'>{title}</div>
				<FontAwesomeIcon className="recipe__arrow" icon={faChevronCircleDown} rotation={rotateIcon} />
			</div>
			{/* <hr></hr> */}
			<div className={`recipe__content ${showContent ? 'show-content' : ''}`}>
				{showContent?renderIngredients:null}
				<button onClick={() => getInstructions()}>Get Instructions</button>
			</div>
		</div>
	);
};

export default Recipe;
